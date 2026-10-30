import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { siteConfig } from "@/config/site";

export interface SubscriptionStatus {
  isSubscribed: boolean;
  tier: "free" | "pro" | "enterprise";
  status: string;
  variantId?: string | null;
  renewsAt?: Date | null;
}

/**
 * Checks whether a user has an active paid subscription.
 * Compares variant IDs against configured Pro / Enterprise plans.
 */
export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
  try {
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, userId),
    });

    if (!sub || sub.status !== "active") {
      return {
        isSubscribed: false,
        tier: "free",
        status: sub?.status || "inactive",
      };
    }

    const proVariantId =
      siteConfig.plans.find((p) => p.id === "pro")?.variantIdMonthly ||
      process.env.LEMON_SQUEEZY_PRO_VARIANT_ID;
    const proAnnualVariantId =
      siteConfig.plans.find((p) => p.id === "pro")?.variantIdAnnually ||
      process.env.LEMON_SQUEEZY_PRO_ANNUAL_VARIANT_ID;

    const enterpriseVariantId =
      siteConfig.plans.find((p) => p.id === "enterprise")?.variantIdMonthly ||
      process.env.LEMON_SQUEEZY_ENTERPRISE_VARIANT_ID;
    const enterpriseAnnualVariantId =
      siteConfig.plans.find((p) => p.id === "enterprise")?.variantIdAnnually ||
      process.env.LEMON_SQUEEZY_ENTERPRISE_ANNUAL_VARIANT_ID;

    let tier: "free" | "pro" | "enterprise" = "pro";

    if (
      sub.variantId === enterpriseVariantId ||
      sub.variantId === enterpriseAnnualVariantId ||
      sub.variantId === "enterprise"
    ) {
      tier = "enterprise";
    } else if (
      sub.variantId === proVariantId ||
      sub.variantId === proAnnualVariantId ||
      sub.variantId === "pro"
    ) {
      tier = "pro";
    }

    return {
      isSubscribed: true,
      tier,
      status: sub.status,
      variantId: sub.variantId,
      renewsAt: sub.renewsAt,
    };
  } catch (err) {
    console.warn("Could not query subscription status:", err);
    return {
      isSubscribed: false,
      tier: "free",
      status: "error",
    };
  }
}

/**
 * Validates if the user's active tier satisfies the required plan level.
 */
export function satisfiesPlanTier(
  userTier: "free" | "pro" | "enterprise",
  requiredTier: "free" | "pro" | "enterprise"
): boolean {
  if (requiredTier === "free") return true;
  if (requiredTier === "pro") return userTier === "pro" || userTier === "enterprise";
  if (requiredTier === "enterprise") return userTier === "enterprise";
  return false;
}
