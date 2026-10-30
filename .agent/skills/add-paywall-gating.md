---
name: add-paywall-gating
description: Gate dashboard features, pages, or actions behind an active subscription paywall (Pro or Enterprise).
---

# Skill: Add Subscription Paywall & Feature Gating

This skill guides an AI agent through restricting access to premium features based on subscription status.

## 1. Server-Side Status Verification

In Server Components (`page.tsx`) or Server Actions (`actions.ts`):

```tsx
import { createClient } from "@/lib/supabase/server";
import { getSubscriptionStatus, satisfiesPlanTier } from "@/lib/billing/paywall";

const supabase = await createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

// Fetch live user subscription tier ('free' | 'pro' | 'enterprise')
const { tier, isSubscribed } = await getSubscriptionStatus(user.id);
const hasAccess = satisfiesPlanTier(tier, "pro");
```

## 2. Client-Side Paywall Wrapper

Wrap your feature UI with the `<Paywall />` component:

```tsx
import { Paywall } from "@/components/dashboard/paywall";

<Paywall
  isAllowed={hasAccess}
  requiredTier="pro"
  featureTitle="AI Copilot & Tool Execution"
  featureDescription="Upgrade to Pro to execute live AI tools and stream reasoning chains."
  variant="blur" // "blur" for frosted glass lock overlay, or "card" for replacement card
>
  <YourFeatureComponent />
</Paywall>;
```

## 3. Protecting Server Actions

In mutating Server Actions, strictly reject unauthorized invocations:

```ts
if (!satisfiesPlanTier(tier, "pro")) {
  return { error: "Pro subscription required to perform this action." };
}
```
