"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Play,
  Clock,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Terminal,
  Calendar,
  Sparkles,
} from "lucide-react";
import { triggerCronJobAction } from "@/server/actions/admin";

interface RegisteredJobItem {
  id: string;
  name: string;
  description: string;
  schedule: string;
  lastRun: {
    status: string;
    durationMs: number;
    itemsProcessed: number;
    executedAt: string | Date;
    triggeredBy: string;
  } | null;
}

interface JobLogItem {
  id: string;
  jobName: string;
  status: string;
  itemsProcessed: number;
  durationMs: number;
  errorDetails: string | null;
  triggeredBy: string;
  executedAt: string | Date;
}

export function JobsManager({
  initialJobs,
  initialLogs,
}: {
  initialJobs: RegisteredJobItem[];
  initialLogs: JobLogItem[];
}) {
  const [jobs, setJobs] = useState<RegisteredJobItem[]>(initialJobs);
  const [logs, setLogs] = useState<JobLogItem[]>(initialLogs);
  const [runningJobId, setRunningJobId] = useState<string | null>(null);

  const handleRunNow = async (jobId: string) => {
    setRunningJobId(jobId);
    try {
      const res = await triggerCronJobAction(jobId);

      if (res.success) {
        toast.success(
          `Executed '${res.jobName}' successfully in ${res.durationMs}ms (${res.itemsProcessed} items processed)!`
        );

        // Update local jobs state
        setJobs((prev) =>
          prev.map((j) =>
            j.id === jobId
              ? {
                  ...j,
                  lastRun: {
                    status: "success",
                    durationMs: res.durationMs || 0,
                    itemsProcessed: res.itemsProcessed || 0,
                    executedAt: new Date(),
                    triggeredBy: "manual-admin",
                  },
                }
              : j
          )
        );

        // Prepend to history log
        setLogs((prev) => [
          {
            id: `log_${Date.now()}`,
            jobName: jobId,
            status: "success",
            itemsProcessed: res.itemsProcessed || 0,
            durationMs: res.durationMs || 0,
            errorDetails: res.errorDetails || null,
            triggeredBy: "manual-admin",
            executedAt: new Date(),
          },
          ...prev,
        ]);
      } else {
        toast.error(res.error || "Execution failed.");
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Error triggering job.");
    } finally {
      setRunningJobId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Info Banner */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Automation Status</CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              100% Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              {jobs.length} registered background tasks ready for execution.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Standard Runner</CardDescription>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Clock className="text-primary h-5 w-5" />
              Vercel & QStash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Protected by Bearer <code className="text-primary">CRON_SECRET</code> header.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Cron Endpoint</CardDescription>
            <CardTitle className="flex items-center gap-2 font-mono text-sm font-bold">
              <Terminal className="text-muted-foreground h-4 w-4" />
              /api/cron/[job]
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Supports GET & POST with query token or Bearer authorization.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registered Jobs List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Registered Automation Tasks</CardTitle>
              <CardDescription className="text-xs">
                Scheduled background routines for retries, alerts, and system hygiene.
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1 text-xs">
              <Sparkles className="text-primary h-3 w-3" />
              {jobs.length} Active Tasks
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-border divide-y">
            {jobs.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center text-sm">
                <Clock className="mx-auto mb-2 h-8 w-8 opacity-40" />
                <p>No automation jobs currently registered.</p>
              </div>
            ) : (
              jobs.map((job) => {
                const isRunning = runningJobId === job.id;

                return (
                  <div
                    key={job.id}
                    className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold">{job.name}</h4>
                        <Badge variant="secondary" className="font-mono text-[10px]">
                          {job.id}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-xs">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                        <span className="text-muted-foreground inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Schedule:{" "}
                          <span className="text-foreground font-medium">{job.schedule}</span>
                        </span>
                        {job.lastRun && (
                          <span className="text-muted-foreground inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            Last Run:{" "}
                            <span className="text-foreground font-medium">
                              {job.lastRun.durationMs}ms ({job.lastRun.itemsProcessed} items)
                            </span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleRunNow(job.id)}
                        disabled={isRunning}
                        className="gap-1.5 text-xs font-semibold"
                      >
                        {isRunning ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5 fill-current" />
                            Run Now
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Execution History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Execution History Log</CardTitle>
              <CardDescription className="text-xs">
                Audited run history with execution duration, payload counts, and error reports.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="gap-1 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center text-xs">
              No task runs recorded yet. Click &quot;Run Now&quot; above to execute a job manually.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-border text-muted-foreground border-b font-medium">
                    <th className="pb-2">Task</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Items</th>
                    <th className="pb-2">Latency</th>
                    <th className="pb-2">Triggered By</th>
                    <th className="pb-2">Output Details</th>
                    <th className="pb-2">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/30">
                      <td className="py-2.5 font-mono font-medium">{log.jobName}</td>
                      <td className="py-2.5">
                        <Badge
                          variant={log.status === "success" ? "outline" : "destructive"}
                          className="text-[10px] uppercase"
                        >
                          {log.status}
                        </Badge>
                      </td>
                      <td className="py-2.5 font-medium">{log.itemsProcessed}</td>
                      <td className="py-2.5 font-mono">{log.durationMs}ms</td>
                      <td className="text-muted-foreground py-2.5">{log.triggeredBy}</td>
                      <td className="text-muted-foreground max-w-xs truncate py-2.5">
                        {log.errorDetails || "OK"}
                      </td>
                      <td className="text-muted-foreground py-2.5 whitespace-nowrap">
                        {new Date(log.executedAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
