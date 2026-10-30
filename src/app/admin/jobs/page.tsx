import { getRegisteredJobsStatus, getCronHistoryLogs } from "@/server/cron/jobs";
import { JobsManager } from "./jobs-manager";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function AdminJobsPage() {
  const [jobs, logs] = await Promise.all([getRegisteredJobsStatus(), getCronHistoryLogs(30)]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Cron Jobs & Automation</h1>
          <Badge variant="outline" className="gap-1 text-xs">
            <Sparkles className="text-primary h-3 w-3" />
            Background Runner
          </Badge>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          Monitor scheduled maintenance tasks, test jobs manually with instant feedback, and inspect
          execution audit trails.
        </p>
      </div>

      <JobsManager initialJobs={jobs} initialLogs={logs} />
    </div>
  );
}
