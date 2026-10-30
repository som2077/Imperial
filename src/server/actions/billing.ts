"use server";

import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession, getCustomerPortalUrl } from "@/lib/lemonsqueezy";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkoutAction(formData: FormData): Promise<void> {
  const variantId =
    (formData.get("variantId") as string) || process.env.LEMON_SQUEEZY_PRO_VARIANT_ID || "12345";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  let checkoutUrl: string | undefined;
  try {
    checkoutUrl = await createCheckoutSession({
      variantId,
      userId: user.id,
      userEmail: user.email,
    });
  } catch (error) {
    console.error("Failed to generate checkout session:", error);
  }

  if (checkoutUrl) {
    redirect(checkoutUrl);
  } else {
    redirect("/dashboard/billing");
  }
}

export async function openCustomerPortalAction(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let portalUrl: string | undefined;
  try {
    const sub = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.userId, user.id),
    });

    if (sub?.lemonSqueezySubscriptionId) {
      portalUrl = await getCustomerPortalUrl(sub.lemonSqueezySubscriptionId);
    }
  } catch (error) {
    console.error("Failed to open customer portal:", error);
  }

  if (portalUrl) {
    redirect(portalUrl);
  } else {
    redirect("/dashboard/billing");
  }
}
