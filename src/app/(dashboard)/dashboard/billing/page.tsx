import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { checkoutAction, openCustomerPortalAction } from "@/server/actions/billing";
import { CheckCircle2, CreditCard, ExternalLink } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userSubscription = null;
  if (user) {
    try {
      userSubscription = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, user.id),
      });
    } catch (err) {
      console.warn("DB not connected yet:", err);
    }
  }

  const isSubscribed = userSubscription?.status === "active";

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Plans</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and view your current billing status.
        </p>
      </div>

      {/* Current Subscription Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Current Plan</CardTitle>
            <Badge variant={isSubscribed ? "success" : "secondary"}>
              {userSubscription?.status?.toUpperCase() || "FREE"}
            </Badge>
          </div>
          <CardDescription>
            {isSubscribed
              ? "You have full access to all Pro features."
              : "You are currently on the Free tier. Upgrade to unlock Pro features."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 text-sm">
          {userSubscription?.renewsAt && (
            <p>
              Next renewal date:{" "}
              <strong className="text-foreground">
                {new Date(userSubscription.renewsAt).toLocaleDateString()}
              </strong>
            </p>
          )}
          {userSubscription?.endsAt && (
            <p>
              Subscription ends on:{" "}
              <strong className="text-foreground">
                {new Date(userSubscription.endsAt).toLocaleDateString()}
              </strong>
            </p>
          )}
        </CardContent>
        {isSubscribed && (
          <CardFooter>
            <form action={openCustomerPortalAction}>
              <Button variant="outline" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Manage in Lemon Squeezy Portal
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </form>
          </CardFooter>
        )}
      </Card>

      {/* Available Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Free Tier</CardTitle>
            <CardDescription>Basic access for testing side projects</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic features
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Community support
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={!isSubscribed}>
              {!isSubscribed ? "Current Plan" : "Downgrade to Free"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary flex flex-col justify-between shadow-sm">
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>Unlimited projects and priority access</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> All features included
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Priority Resend email quotas
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Supabase storage bucket access
            </div>
          </CardContent>
          <CardFooter>
            {isSubscribed ? (
              <Button className="w-full" disabled>
                Active
              </Button>
            ) : (
              <form action={checkoutAction} className="w-full">
                <input
                  type="hidden"
                  name="variantId"
                  value={process.env.LEMON_SQUEEZY_PRO_VARIANT_ID || "12345"}
                />
                <Button type="submit" className="w-full">
                  Upgrade to Pro
                </Button>
              </form>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
