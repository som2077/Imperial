import { NextResponse } from "next/server";
import { db } from "@/db";
import { apiKeys, profiles, subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getOrCreateUserOrganization } from "@/server/actions/team";
import { rateLimit, rateLimitExceededResponse } from "@/lib/rate-limit";
import crypto from "crypto";

export interface AuthenticatedApiContext {
  apiKey: typeof apiKeys.$inferSelect;
  user: typeof profiles.$inferSelect;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
  subscription: typeof subscriptions.$inferSelect | null;
}

export type ApiValidationResult =
  { success: true; context: AuthenticatedApiContext } | { success: false; response: NextResponse };

/**
 * Validates incoming `Authorization: Bearer sk_live_...` headers against hashed keys in the database.
 */
export async function validateApiToken(request: Request): Promise<ApiValidationResult> {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: {
            code: "missing_token",
            message:
              "Missing or malformed Authorization header. Expected 'Authorization: Bearer sk_live_...'",
          },
        },
        { status: 401 }
      ),
    };
  }

  const rawKey = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!rawKey.startsWith("sk_live_")) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: {
            code: "invalid_key_format",
            message: "Invalid API key format. Production keys must begin with 'sk_live_'.",
          },
        },
        { status: 401 }
      ),
    };
  }

  // Compute SHA-256 hash of the provided raw token
  const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

  try {
    const keyRecord = await db.query.apiKeys.findFirst({
      where: eq(apiKeys.keyHash, keyHash),
    });

    if (!keyRecord) {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: {
              code: "invalid_token",
              message: "The provided API key does not exist or has been revoked.",
            },
          },
          { status: 401 }
        ),
      };
    }

    // Enforce 60 requests per minute per API Key
    const limitResult = rateLimit({
      key: `api_key:${keyRecord.id}`,
      limit: 60,
      windowSeconds: 60,
    });

    if (!limitResult.success) {
      return {
        success: false,
        response: rateLimitExceededResponse(limitResult),
      };
    }

    // Update lastUsedAt timestamp asynchronously
    db.update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, keyRecord.id))
      .catch((err) => console.warn("Failed to update apiKey lastUsedAt:", err));

    // Retrieve user profile
    const userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, keyRecord.userId),
    });

    if (!userProfile) {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: {
              code: "user_not_found",
              message: "Associated user profile could not be found.",
            },
          },
          { status: 401 }
        ),
      };
    }

    // Retrieve user's organization
    const org = await getOrCreateUserOrganization(userProfile.id, userProfile.email);

    // Retrieve active subscription
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userProfile.id),
    });

    return {
      success: true,
      context: {
        apiKey: keyRecord,
        user: userProfile,
        organization: {
          id: org.id,
          name: org.name,
          slug: org.slug,
        },
        subscription: sub || null,
      },
    };
  } catch (err) {
    console.error("API token validation exception:", err);
    return {
      success: false,
      response: NextResponse.json(
        {
          error: {
            code: "internal_error",
            message: "An internal server error occurred while validating the API key.",
          },
        },
        { status: 500 }
      ),
    };
  }
}
