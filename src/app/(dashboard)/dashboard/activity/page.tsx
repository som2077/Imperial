import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getActivityLogsAction } from "@/server/actions/activity";
import { ActivityManager } from "@/components/dashboard/activity-manager";
import { getOrCreateUserOrganization } from "@/server/actions/team";

export const metadata = {
  title: "Activity & Audit Logs | Dashboard",
  description:
    "Review workspace audit events, security modifications, and team actions for compliance.",
};

export default async function ActivityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  const org = await getOrCreateUserOrganization(user.id, user.email);
  const result = await getActivityLogsAction({
    organizationId: org?.id,
    limit: 20,
  });

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <ActivityManager
        initialLogs={result.logs}
        totalCount={result.totalCount}
        totalPages={result.totalPages}
        organizationId={org?.id}
      />
    </div>
  );
}
