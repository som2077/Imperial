import { lemonSqueezySetup, createCheckout, getSubscription } from "@lemonsqueezy/lemonsqueezy.js";

export function initLemonSqueezy() {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  if (!apiKey) {
    console.warn("LEMON_SQUEEZY_API_KEY is not set in environment variables.");
    return;
  }
  lemonSqueezySetup({
    apiKey,
  });
}

export interface CheckoutOptions {
  variantId: string;
  userId: string;
  userEmail: string;
  redirectUrl?: string;
}

export async function createCheckoutSession({
  variantId,
  userId,
  userEmail,
  redirectUrl,
}: CheckoutOptions) {
  initLemonSqueezy();

  const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
  if (!storeId) {
    throw new Error("LEMON_SQUEEZY_STORE_ID is missing.");
  }

  const checkout = await createCheckout(storeId, variantId, {
    checkoutData: {
      email: userEmail,
      custom: {
        userId,
      },
    },
    productOptions: {
      redirectUrl:
        redirectUrl ||
        `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing`,
    },
  });

  return checkout.data?.data.attributes.url;
}

export async function getCustomerPortalUrl(subscriptionId: string) {
  initLemonSqueezy();
  const sub = await getSubscription(subscriptionId);
  return sub.data?.data.attributes.urls.customer_portal;
}
