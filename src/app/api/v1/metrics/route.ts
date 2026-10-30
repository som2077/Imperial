import { NextResponse } from "next/server";
import { validateApiToken } from "@/lib/api-auth";
import { db } from "@/db";
import { organizationMembers, apiKeys, webhookEndpoints } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/metrics
 * Returns workspace health metrics, team count, key counts, and active webhooks.
 */
export async function GET(request: Request) {
  const auth = await validateApiToken(request);
  if (!auth.success) {
    return auth.response;
  }

  const { context } = auth;

  try {
    const [members, keys, webhooks] = await Promise.all([
      db.query.organizationMembers.findMany({
        where: eq(organizationMembers.organizationId, context.organization.id),
      }),
      db.query.apiKeys.findMany({
        where: eq(apiKeys.userId, context.user.id),
      }),
      db.query.webhookEndpoints.findMany({
        where: eq(webhookEndpoints.organizationId, context.organization.id),
      }),
    ]);

    const activeWebhooksCount = webhooks.filter((w) => w.isActive).length;

    return NextResponse.json({
      data: {
        organization: {
          id: context.organization.id,
          name: context.organization.name,
        },
        metrics: {
          teamMembersCount: members.length + 1, // members + owner
          apiKeysCount: keys.length,
          webhooksTotal: webhooks.length,
          webhooksActive: activeWebhooksCount,
          subscriptionStatus: context.subscription?.status || "free",
        },
      },
      meta: {
        apiVersion: "v1",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Error generating API metrics:", err);
    return NextResponse.json(
      {
        error: {
          code: "internal_error",
          message: "Failed to query workspace metrics.",
        },
      },
      { status: 500 }
    );
  }
}
