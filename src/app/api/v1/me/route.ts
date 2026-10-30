import { NextResponse } from "next/server";
import { validateApiToken } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/v1/me
 * Returns authenticated user, profile, workspace, and subscription details.
 */
export async function GET(request: Request) {
  try {
    const auth = await validateApiToken(request);
    if (!auth.success) {
      return auth.response;
    }

    const { context } = auth;

    return NextResponse.json({
      data: {
        user: {
          id: context.user.id,
          email: context.user.email,
          fullName: context.user.fullName,
          avatarUrl: context.user.avatarUrl,
          role: context.user.role,
          createdAt: context.user.createdAt,
        },
        organization: {
          id: context.organization.id,
          name: context.organization.name,
          slug: context.organization.slug,
        },
        apiKey: {
          id: context.apiKey.id,
          name: context.apiKey.name,
          prefix: context.apiKey.keyPrefix,
          createdAt: context.apiKey.createdAt,
        },
        subscription: context.subscription
          ? {
              status: context.subscription.status,
              variantId: context.subscription.variantId,
              renewsAt: context.subscription.renewsAt,
              endsAt: context.subscription.endsAt,
            }
          : {
              status: "free",
              tier: "Free Starter",
            },
      },
      meta: {
        apiVersion: "v1",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("Error in /api/v1/me:", err);
    return NextResponse.json(
      {
        error: {
          code: "internal_error",
          message: "Failed to retrieve account details.",
        },
      },
      { status: 500 }
    );
  }
}
