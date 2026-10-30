"use client";

import { useState } from "react";
import { impersonateUserAction } from "@/server/actions/admin";
import { type Profile, type Subscription, type Organization } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, CreditCard, Key, Search, LogIn, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserWithRelations extends Profile {
  subscriptions?: Subscription[];
  ownedOrganizations?: Organization[];
}

export function AdminManager({
  kpis,
  initialUsers,
}: {
  kpis: {
    totalUsers: number;
    totalOrganizations: number;
    activeSubscriptions: number;
    totalApiKeys: number;
  };
  initialUsers: UserWithRelations[];
}) {
  const [users] = useState<UserWithRelations[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [impersonatingId, setImpersonatingId] = useState<string | null>(null);
  const router = useRouter();

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) || (u.fullName && u.fullName.toLowerCase().includes(q))
    );
  });

  const handleImpersonate = async (targetUser: UserWithRelations) => {
    setImpersonatingId(targetUser.id);
    try {
      const res = await impersonateUserAction(targetUser.id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(`Now impersonating ${targetUser.fullName || targetUser.email}!`);
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Failed to start impersonation session.");
    } finally {
      setImpersonatingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor platform metrics, inspect user accounts, and trigger customer support
          impersonation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase">
              Total Users
            </CardTitle>
            <Users className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalUsers}</div>
            <p className="text-muted-foreground mt-1 text-[11px]">Registered profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase">
              Workspaces
            </CardTitle>
            <Building2 className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalOrganizations}</div>
            <p className="text-muted-foreground mt-1 text-[11px]">B2B organizations created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase">
              Paid Subscribers
            </CardTitle>
            <CreditCard className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {kpis.activeSubscriptions}
            </div>
            <p className="text-muted-foreground mt-1 text-[11px]">Active Lemon Squeezy plans</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-xs font-semibold uppercase">
              Developer Keys
            </CardTitle>
            <Key className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.totalApiKeys}</div>
            <p className="text-muted-foreground mt-1 text-[11px]">Active tokens provisioned</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Directory Table */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle className="text-lg">User Management Directory</CardTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Inspect accounts and log into customer sessions to diagnose reported issues.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search user or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground border-b font-semibold">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Platform Role</th>
                  <th className="px-4 py-3">Subscription</th>
                  <th className="px-4 py-3">Joined</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-muted-foreground py-8 text-center">
                      No users matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const activeSub = u.subscriptions?.find((s) => s.status === "active");
                    return (
                      <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border font-bold">
                              {u.avatarUrl ? (
                                <Image
                                  src={u.avatarUrl}
                                  alt="Avatar"
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              ) : (
                                <span>{u.email[0].toUpperCase()}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="text-foreground truncate font-semibold">
                                {u.fullName || "Unnamed User"}
                              </div>
                              <div className="text-muted-foreground truncate font-mono text-[11px]">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <Badge
                            variant={u.role === "admin" ? "destructive" : "secondary"}
                            className="text-[10px]"
                          >
                            {u.role === "admin" ? "Super Admin" : "User"}
                          </Badge>
                        </td>

                        <td className="px-4 py-3">
                          {activeSub ? (
                            <Badge className="border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400">
                              Active Pro
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground text-[10px]">
                              Free Starter
                            </Badge>
                          )}
                        </td>

                        <td className="text-muted-foreground px-4 py-3 whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={impersonatingId === u.id}
                            onClick={() => handleImpersonate(u)}
                            className="h-7 gap-1.5 text-xs"
                          >
                            {impersonatingId === u.id ? (
                              <UserCheck className="h-3 w-3 animate-pulse" />
                            ) : (
                              <LogIn className="h-3 w-3" />
                            )}
                            Impersonate
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
