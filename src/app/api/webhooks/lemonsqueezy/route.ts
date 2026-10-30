import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { subscriptions, webhookEvents, licenses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inviteGitHubCollaborator } from "@/lib/github/collaborator";
import { sendLicenseDeliveryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

    if (!webhookSecret) {
      console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is not configured.");
      return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    // Verify HMAC signature
    const hmac = crypto.createHmac("sha256", webhookSecret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (
      digest.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(digest, signatureBuffer)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name as string;
    const customData = payload.meta?.custom_data;
    const attributes = payload.data?.attributes;

    // Log the webhook in audit table
    await db.insert(webhookEvents).values({
      eventName,
      payload,
      processed: false,
    });

    // Handle Subscription events
    if (
      eventName === "subscription_created" ||
      eventName === "subscription_updated" ||
      eventName === "subscription_resumed" ||
      eventName === "subscription_cancelled" ||
      eventName === "subscription_expired"
    ) {
      const subscriptionId = String(payload.data?.id);
      const customerId = String(attributes?.customer_id);
      const variantId = String(attributes?.variant_id);
      const status = attributes?.status as string; // 'active', 'cancelled', etc.
      const userId = customData?.user_id;

      const renewsAt = attributes?.renews_at ? new Date(attributes.renews_at) : null;
      const endsAt = attributes?.ends_at ? new Date(attributes.ends_at) : null;
      const trialEndsAt = attributes?.trial_ends_at ? new Date(attributes.trial_ends_at) : null;

      // Check if subscription already exists
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.lemonSqueezySubscriptionId, subscriptionId),
      });

      if (existing) {
        await db
          .update(subscriptions)
          .set({
            status,
            variantId,
            renewsAt,
            endsAt,
            trialEndsAt,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.lemonSqueezySubscriptionId, subscriptionId));
      } else if (userId) {
        await db.insert(subscriptions).values({
          userId,
          lemonSqueezyCustomerId: customerId,
          lemonSqueezySubscriptionId: subscriptionId,
          orderId: String(attributes?.order_id || ""),
          status,
          variantId,
          renewsAt,
          endsAt,
          trialEndsAt,
        });
      }
    }

    // Handle Commercial License Purchase (One-time orders)
    if (eventName === "order_created") {
      const orderId = String(payload.data?.id || attributes?.first_order_item?.order_id || "");
      const customerEmail = String(attributes?.user_email || "")
        .toLowerCase()
        .trim();
      const customerName = String(attributes?.user_name || "Valued Developer").trim();
      const rawGithub =
        customData?.github_username ||
        attributes?.first_order_item?.custom_fields?.github_username ||
        "";
      const githubUsername = String(rawGithub).trim().replace(/^@/, "");

      // Generate unique high-entropy commercial license key (e.g., KIT-8F92-4B1C-99E0)
      const part1 = crypto.randomBytes(2).toString("hex").toUpperCase();
      const part2 = crypto.randomBytes(2).toString("hex").toUpperCase();
      const part3 = crypto.randomBytes(2).toString("hex").toUpperCase();
      const generatedLicenseKey = `KIT-${part1}-${part2}-${part3}`;

      // Check if order already processed
      const existingLicense = await db.query.licenses.findFirst({
        where: eq(licenses.orderId, orderId),
      });

      if (!existingLicense && customerEmail) {
        let inviteSent = false;

        // If GitHub username was provided at checkout, invite immediately
        if (githubUsername) {
          const inviteResult = await inviteGitHubCollaborator(githubUsername);
          inviteSent = inviteResult.success;
        }

        const [createdLicense] = await db
          .insert(licenses)
          .values({
            licenseKey: generatedLicenseKey,
            orderId,
            customerEmail,
            customerName,
            githubUsername: githubUsername || null,
            status: "active",
            planType: "standard",
            maxActivations: 1,
            githubInviteSent: inviteSent,
            claimedAt: inviteSent ? new Date() : null,
          })
          .returning();

        // Send license credentials and invite email to customer
        await sendLicenseDeliveryEmail({
          to: customerEmail,
          customerName,
          licenseKey: createdLicense.licenseKey,
          orderId,
          planName: "SAAS-Kit Commercial License",
          githubUsername: githubUsername || undefined,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing Lemon Squeezy webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
