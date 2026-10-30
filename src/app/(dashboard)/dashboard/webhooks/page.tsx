import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWebhookEndpointsAction } from "@/server/actions/webhooks";
import { WebhookManager } from "./webhook-manager";
import { Webhook } from "lucide-react";

export const metadata = {
  title: "Outgoing Webhooks",
  description: "Connect your workspace to external services like Zapier, Slack, or custom APIs.",
};

export default async function WebhooksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard/webhooks");
  }

  const { endpoints, organizationId } = await getWebhookEndpointsAction();

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
          <Webhook className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outgoing Webhooks</h1>
          <p className="text-muted-foreground mt-1">
            Configure automated HTTP POST webhooks with HMAC signatures for Zapier, Slack, and
            external systems.
          </p>
        </div>
      </div>

      <WebhookManager initialEndpoints={endpoints} organizationId={organizationId} />
    </div>
  );
}
