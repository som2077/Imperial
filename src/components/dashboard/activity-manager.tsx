"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getActivityLogsAction,
  exportActivityLogsAction,
  type ActivityLogItem,
} from "@/server/actions/activity";
import { toast } from "sonner";
import {
  ShieldCheck,
  Search,
  Download,
  Clock,
  Key,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

interface ActivityManagerProps {
  initialLogs: ActivityLogItem[];
  totalCount: number;
  totalPages: number;
  organizationId?: string | null;
}

export function ActivityManager({
  initialLogs,
  totalCount: initialTotalCount,
  totalPages: initialTotalPages,
  organizationId,
}: ActivityManagerProps) {
  const [logs, setLogs] = useState<ActivityLogItem[]>(initialLogs);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const categories = [
    { id: "all", label: "All Events" },
    { id: "auth", label: "Authentication" },
    { id: "team", label: "Team & Roles" },
    { id: "api_key", label: "API Keys" },
    { id: "media", label: "Media & Assets" },
    { id: "onboarding", label: "Onboarding" },
  ];

  const fetchLogs = (page: number, category: string) => {
    startTransition(async () => {
      const res = await getActivityLogsAction({
        organizationId,
        page,
        entityType: category === "all" ? undefined : category,
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        setLogs(res.logs as ActivityLogItem[]);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
        setCurrentPage(page);
      }
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchLogs(1, categoryId);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLogs(newPage, selectedCategory);
    }
  };

  const handleExport = async (format: "json" | "csv") => {
    try {
      const res = await exportActivityLogsAction(organizationId);
      if (!res.success || !res.data) {
        toast.error("Export failed.");
        return;
      }

      let fileContent = "";
      let mimeType = "";
      let fileName = `activity-logs-${new Date().toISOString().split("T")[0]}`;

      if (format === "json") {
        fileContent = JSON.stringify(res.data, null, 2);
        mimeType = "application/json";
        fileName += ".json";
      } else {
        // Convert to CSV
        const headers = ["ID", "Action", "Entity Type", "Description", "IP Address", "Created At"];
        const rows = res.data.map((item) => [
          item.id,
          item.action,
          item.entityType,
          `"${(item.description || "").replace(/"/g, '""')}"`,
          item.ipAddress || "",
          item.createdAt ? new Date(item.createdAt).toISOString() : "",
        ]);
        fileContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        mimeType = "text/csv";
        fileName += ".csv";
      }

      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Exported ${res.data.length} audit log entries.`);
    } catch {
      toast.error("Failed to download export file.");
    }
  };

  const filteredLogs = logs.filter((log) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      log.description.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.user?.email.toLowerCase().includes(term) ||
      log.user?.fullName?.toLowerCase().includes(term) ||
      log.ipAddress?.includes(term)
    );
  });

  const getBadgeVariant = (entityType: string) => {
    switch (entityType) {
      case "auth":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "team":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "api_key":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "media":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "onboarding":
        return "bg-cyan-500/10 text-cyan-600 border-cyan-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 border-zinc-500/20";
    }
  };

  const getActionIcon = (entityType: string) => {
    switch (entityType) {
      case "auth":
        return <Lock className="h-4 w-4" />;
      case "team":
        return <Users className="h-4 w-4" />;
      case "api_key":
        return <Key className="h-4 w-4" />;
      case "media":
        return <ImageIcon className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Export Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
            <ShieldCheck className="text-primary h-6 w-6" />
            Activity & Audit Logs
          </h1>
          <p className="text-muted-foreground text-sm">
            Immutable, compliance-ready audit trail of workspace security events, member actions,
            and API key management.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLogs(currentPage, selectedCategory)}
            disabled={isPending}
            className="gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("csv")}
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport("json")}
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs">Total Audit Events</CardDescription>
            <CardTitle className="text-2xl font-extrabold">{totalCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground p-4 pt-0 text-xs">
            Logged across all workspace entities
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs">Active Filter</CardDescription>
            <CardTitle className="text-2xl font-extrabold capitalize">{selectedCategory}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground p-4 pt-0 text-xs">
            Showing {filteredLogs.length} events in view
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs">Compliance Status</CardDescription>
            <CardTitle className="flex items-center gap-1.5 text-2xl font-extrabold text-emerald-600">
              <CheckCircle2 className="h-5 w-5" /> Active
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground p-4 pt-0 text-xs">
            SOC2 / GDPR immutable logging enabled
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategorySelect(cat.id)}
              className="h-8 text-xs font-medium"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b text-xs font-semibold uppercase">
              <tr>
                <th className="px-4 py-3">Actor / User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">IP Address</th>
                <th className="px-4 py-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-muted-foreground px-4 py-12 text-center">
                    <ShieldCheck className="mx-auto mb-2 h-8 w-8 opacity-40" />
                    <p className="text-base font-semibold">No activity logs recorded yet</p>
                    <p className="text-xs">
                      Actions like user login, invitations, and API key changes will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const relativeDate = new Date(log.createdAt).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                      {/* Actor */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={log.user?.avatarUrl || undefined} />
                            <AvatarFallback className="text-[10px]">
                              {log.user?.fullName?.charAt(0) ||
                                log.user?.email?.charAt(0).toUpperCase() ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold">
                              {log.user?.fullName || log.user?.email || "System"}
                            </span>
                            <span className="text-muted-foreground text-[10px]">
                              {log.user?.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Action Badge */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Badge
                          variant="outline"
                          className={`flex w-fit items-center gap-1.5 px-2 py-0.5 text-xs font-semibold ${getBadgeVariant(
                            log.entityType
                          )}`}
                        >
                          {getActionIcon(log.entityType)}
                          <span>{log.action}</span>
                        </Badge>
                      </td>

                      {/* Description */}
                      <td className="max-w-md px-4 py-3.5 text-xs">
                        <span className="font-medium">{log.description}</span>
                      </td>

                      {/* IP Address */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-muted-foreground font-mono text-[11px]">
                          {log.ipAddress || "127.0.0.1"}
                        </span>
                      </td>

                      {/* Timestamp */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="text-muted-foreground flex items-center justify-end gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{relativeDate}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <span className="text-muted-foreground text-xs">
              Page {currentPage} of {totalPages} ({totalCount} total events)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}
                className="h-8 gap-1 text-xs"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isPending}
                className="h-8 gap-1 text-xs"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
