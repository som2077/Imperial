import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { subscriptions, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import { AIAssistant } from "@/components/dashboard/ai-assistant";
import { getServerDictionary } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const { dictionary } = await getServerDictionary();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userSubscription = null;
  let userProfile = null;

  if (user) {
    try {
      userSubscription = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, user.id),
      });
      userProfile = await db.query.profiles.findFirst({
        where: eq(profiles.id, user.id),
      });
    } catch (err) {
      console.warn("Database query skipped or not connected yet:", err);
    }
  }

  const isSubscribed = userSubscription?.status === "active";

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {dictionary.dashboard.welcomeTitle},{" "}
          {userProfile?.fullName || user?.email?.split("@")[0] || "Maker"}!
        </h1>
        <p className="text-muted-foreground mt-1">{dictionary.dashboard.welcomeSubtitle}</p>
      </div>

      {/* Metrics / Status Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subscription Tier</CardTitle>
            <CreditCard className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {isSubscribed ? "Pro Plan" : "Free Tier"}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Status:{" "}
              <Badge variant={isSubscribed ? "success" : "secondary"} className="ml-1">
                {userSubscription?.status || "Free"}
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Database (Drizzle)</CardTitle>
            <Zap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connected</div>
            <p className="text-muted-foreground mt-1 text-xs">
              PostgreSQL via Supabase Connection Pool
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Authentication</CardTitle>
            <CheckCircle2 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active Session</div>
            <p className="text-muted-foreground mt-1 text-xs">Protected by Supabase SSR Cookies</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Copilot Component */}
      <AIAssistant />

      {/* Quick Action Banner */}
      <Card className="border-primary/20 from-primary/5 via-muted/40 bg-gradient-to-r to-transparent">
        <CardHeader>
          <CardTitle>Get Ready for Production</CardTitle>
          <CardDescription>
            Configure your environment variables in{" "}
            <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">.env.local</code> to
            unlock full Lemon Squeezy billing and Resend email functionality.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/dashboard/billing">
            <Button className="gap-2">
              Manage Billing <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="outline">Update Profile</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
