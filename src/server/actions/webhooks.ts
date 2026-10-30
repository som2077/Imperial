"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { webhookEndpoints, webhookDeliveries } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getOrCreateUserOrganization } from "@/server/actions/team";
import crypto from "crypto";
import { siteConfig } from "@/config/site";

export interface CreateWebhookInput {
  url: string;
  description: string;
  events: string[];
}

/**
 * Fetch all configured webhook endpoints for current user's organization
 */
export async function getWebhookEndpointsAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  try {
    const endpoints = await db.query.webhookEndpoints.findMany({
      where: eq(webhookEndpoints.organizationId, org.id),
      orderBy: [desc(webhookEndpoints.createdAt)],
      with: {
        deliveries: {
          orderBy: [desc(webhookDeliveries.createdAt)],
          limit: 5,
        },
      },
    });

    return {
      endpoints,
      organizationId: org.id,
    };
  } catch (err) {
    console.error("Error fetching webhooks:", err);
    return {
      endpoints: [],
      organizationId: org.id,
    };
  }
}

/**
 * Register a new outgoing webhook endpoint with an HMAC signing secret
 */
export async function createWebhookEndpointAction(input: CreateWebhookInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to configure webhooks." };
  }

  if (!input.url || (!input.url.startsWith("http://") && !input.url.startsWith("https://"))) {
    return { error: "Please provide a valid HTTP or HTTPS endpoint URL." };
  }

  if (!input.events || input.events.length === 0) {
    return { error: "Please select at least one event type to subscribe to." };
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  // Generate signing secret (whsec_...)
  const secret = `whsec_${crypto.randomBytes(24).toString("hex")}`;

  try {
    const [endpoint] = await db
      .insert(webhookEndpoints)
      .values({
        organizationId: org.id,
        userId: user.id,
        url: input.url.trim(),
        description: input.description.trim() || "Webhook Endpoint",
        secret,
        events: input.events,
        isActive: true,
      })
      .returning();

    revalidatePath("/dashboard/webhooks");
    return {
      success: true,
      secret,
      endpoint,
    };
  } catch (err) {
    console.error("Failed to create webhook endpoint:", err);
    return { error: "Failed to save webhook endpoint. Please try again." };
  }
}

/**
 * Toggle webhook endpoint active / paused state
 */
export async function toggleWebhookEndpointAction(endpointId: string, isActive: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  try {
    await db
      .update(webhookEndpoints)
      .set({
        isActive,
        updatedAt: new Date(),
      })
      .where(and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.organizationId, org.id)));

    revalidatePath("/dashboard/webhooks");
    return { success: true };
  } catch (err) {
    console.error("Failed to toggle webhook:", err);
    return { error: "Could not update webhook status." };
  }
}

/**
 * Delete a webhook endpoint and its delivery logs
 */
export async function deleteWebhookEndpointAction(endpointId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  try {
    await db
      .delete(webhookEndpoints)
      .where(and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.organizationId, org.id)));

    revalidatePath("/dashboard/webhooks");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete webhook:", err);
    return { error: "Could not delete webhook endpoint." };
  }
}

/**
 * Send a test ping event to the endpoint and log the delivery
 */
export async function testWebhookEndpointAction(endpointId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  const endpoint = await db.query.webhookEndpoints.findFirst({
    where: and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.organizationId, org.id)),
  });

  if (!endpoint) {
    return { error: "Endpoint not found." };
  }

  const payload = {
    id: `evt_test_${crypto.randomBytes(8).toString("hex")}`,
    event: "test.ping",
    createdAt: new Date().toISOString(),
    data: {
      message: `This is an automated test ping from ${siteConfig.name}.`,
      organizationId: org.id,
      triggeredBy: user.email,
    },
  };

  const bodyString = JSON.stringify(payload);
  const signature = crypto.createHmac("sha256", endpoint.secret).update(bodyString).digest("hex");

  const startTime = Date.now();
  let responseStatus = 0;
  let responseBody = "";

  try {
    const res = await fetch(endpoint.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": `sha256=${signature}`,
        "X-Webhook-Event": "test.ping",
        "User-Agent": "SaaS-Starter-Webhook/1.0",
      },
      body: bodyString,
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    responseStatus = res.status;
    const text = await res.text();
    responseBody = text.slice(0, 500); // Record up to 500 characters
  } catch (fetchErr: unknown) {
    responseStatus = 504;
    responseBody =
      fetchErr instanceof Error ? fetchErr.message : "Request timed out or failed to connect";
  }

  const durationMs = Date.now() - startTime;

  // Record delivery attempt in database
  try {
    await db.insert(webhookDeliveries).values({
      endpointId: endpoint.id,
      event: "test.ping",
      payload,
      responseStatus,
      responseBody,
      durationMs,
    });
  } catch (logErr) {
    console.warn("Could not record delivery log:", logErr);
  }

  revalidatePath("/dashboard/webhooks");

  return {
    success: responseStatus >= 200 && responseStatus < 300,
    status: responseStatus,
    durationMs,
    responseBody,
  };
}

/**
 * Fetch delivery history logs for an endpoint
 */
export async function getWebhookDeliveriesAction(endpointId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const org = await getOrCreateUserOrganization(user.id, user.email || "");

  // Verify ownership
  const endpoint = await db.query.webhookEndpoints.findFirst({
    where: and(eq(webhookEndpoints.id, endpointId), eq(webhookEndpoints.organizationId, org.id)),
  });

  if (!endpoint) {
    throw new Error("Endpoint not found");
  }

  const deliveries = await db.query.webhookDeliveries.findMany({
    where: eq(webhookDeliveries.endpointId, endpointId),
    orderBy: [desc(webhookDeliveries.createdAt)],
    limit: 20,
  });

  return deliveries;
}

/**
 * Core event dispatcher: dispatches matching webhook events to all active subscribed endpoints
 */
export async function dispatchWebhookEvent(
  organizationId: string,
  event: string,
  data: Record<string, unknown>
) {
  try {
    const endpoints = await db.query.webhookEndpoints.findMany({
      where: and(
        eq(webhookEndpoints.organizationId, organizationId),
        eq(webhookEndpoints.isActive, true)
      ),
    });

    // Filter endpoints that are subscribed to this event
    const matchingEndpoints = endpoints.filter(
      (ep) => ep.events.includes(event) || ep.events.includes("*")
    );

    if (matchingEndpoints.length === 0) return;

    const payload = {
      id: `evt_${crypto.randomBytes(12).toString("hex")}`,
      event,
      createdAt: new Date().toISOString(),
      data,
    };

    const bodyString = JSON.stringify(payload);

    // Asynchronously dispatch to all matching endpoints
    for (const ep of matchingEndpoints) {
      const signature = crypto.createHmac("sha256", ep.secret).update(bodyString).digest("hex");

      const startTime = Date.now();

      fetch(ep.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": `sha256=${signature}`,
          "X-Webhook-Event": event,
          "User-Agent": "SaaS-Starter-Webhook/1.0",
        },
        body: bodyString,
        signal: AbortSignal.timeout(8000),
      })
        .then(async (res) => {
          const durationMs = Date.now() - startTime;
          const text = await res.text();
          await db.insert(webhookDeliveries).values({
            endpointId: ep.id,
            event,
            payload,
            responseStatus: res.status,
            responseBody: text.slice(0, 500),
            durationMs,
          });
        })
        .catch(async (err: unknown) => {
          const durationMs = Date.now() - startTime;
          await db.insert(webhookDeliveries).values({
            endpointId: ep.id,
            event,
            payload,
            responseStatus: 500,
            responseBody: err instanceof Error ? err.message : "Network error",
            durationMs,
          });
        });
    }
  } catch (err) {
    console.error("Error in dispatchWebhookEvent:", err);
  }
}
