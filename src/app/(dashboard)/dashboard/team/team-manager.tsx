"use client";

import Link from "next/link";
import { useState } from "react";

import {
  inviteMemberAction,
  removeMemberAction,
  cancelInvitationAction,
} from "@/server/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Dialog from "@radix-ui/react-dialog";
import {
  UserPlus,
  Mail,
  Trash2,
  Loader2,
  X,
  Building,
  Users,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

import type {
  Organization,
  OrganizationMember,
  OrganizationInvitation,
  Profile,
} from "@/db/schema";

export interface TeamMemberWithProfile extends OrganizationMember {
  profile?: Profile | null;
}

interface TeamManagerProps {
  organization: Organization;
  members: TeamMemberWithProfile[];
  invitations: OrganizationInvitation[];
}

export function TeamManager({
  organization,
  members: initialMembers,
  invitations: initialInvitations,
}: TeamManagerProps) {
  const [members, setMembers] = useState<TeamMemberWithProfile[]>(initialMembers);
  const [invitations, setInvitations] = useState<OrganizationInvitation[]>(initialInvitations);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [loading, setLoading] = useState(false);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim() || loading) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("email", inviteEmail);
    formData.append("role", inviteRole);

    const result = await inviteMemberAction(formData);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Invitation sent to ${inviteEmail}!`);
      setIsInviteOpen(false);
      setInviteEmail("");
      // Optimistically add invitation
      setInvitations((prev) => [
        {
          id: Math.random().toString(),
          organizationId: organization.id,
          email: inviteEmail,
          role: inviteRole,
          token: "",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
        },
        ...prev,
      ]);
    }

    setLoading(false);
  }

  async function handleRemoveMember(memberId: string) {
    if (!confirm("Are you sure you want to remove this member from the workspace?")) {
      return;
    }

    const result = await removeMemberAction(memberId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      toast.success("Member removed from workspace.");
    }
  }

  async function handleCancelInvitation(invitationId: string) {
    const result = await cancelInvitationAction(invitationId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
      toast.success("Invitation cancelled.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Workspace Banner */}
      <Card className="border-primary/20 from-primary/5 via-muted/30 bg-gradient-to-r to-transparent">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  {organization.name}
                  <Badge variant="outline" className="font-mono text-[10px] font-normal">
                    /{organization.slug}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-0.5 text-xs">
                  B2B Organization workspace with role-based member permissions
                </CardDescription>
              </div>
            </div>

            <Button onClick={() => setIsInviteOpen(true)} className="shrink-0 gap-2 font-semibold">
              <UserPlus className="h-4 w-4" /> Invite Team Member
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Per-Seat Billing & Seat Capacity Card */}
      <Card>
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Users className="text-primary h-4 w-4" />
                <h3 className="text-sm font-semibold tracking-tight">Seat Allocation & Usage</h3>
                <Badge variant="secondary" className="text-xs">
                  {members.length + invitations.length} of 10 Seats Used
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs">
                Your workspace includes per-seat pricing at $15/seat/month. Each active member or
                pending invite occupies 1 seat.
              </p>
              <div className="bg-muted mt-2 h-2 w-full max-w-md overflow-hidden rounded-full">
                <div
                  className={`h-full transition-all ${
                    (members.length + invitations.length) / 10 >= 0.8
                      ? "bg-amber-500"
                      : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(100, Math.round(((members.length + invitations.length) / 10) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="sm:text-right">
                <span className="text-muted-foreground block text-xs">Estimated Monthly Bill</span>
                <span className="text-lg font-bold">
                  ${(members.length + invitations.length) * 15}
                  <span className="text-muted-foreground text-xs font-normal"> / mo</span>
                </span>
              </div>

              <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                <Link href="/dashboard/billing">
                  <CreditCard className="h-3.5 w-3.5" />
                  Manage Plan
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Team Members ({members.length})</h2>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {members.length === 0 ? (
                <div className="text-muted-foreground py-12 text-center text-sm">
                  <Users className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  <p>No team members yet. Click &quot;Invite Member&quot; to add colleagues.</p>
                </div>
              ) : (
                <div className="min-w-[550px] divide-y text-sm">
                  <div className="text-muted-foreground bg-muted/30 grid grid-cols-12 px-6 py-3 text-xs font-semibold tracking-wider uppercase">
                    <div className="col-span-5">Member</div>
                    <div className="col-span-3">Role</div>
                    <div className="col-span-3">Joined</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>

                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="hover:bg-muted/10 grid grid-cols-12 items-center px-6 py-4 transition-colors"
                    >
                      <div className="col-span-5 flex items-center gap-3 overflow-hidden">
                        <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                          {member.profile?.fullName?.[0] ||
                            member.profile?.email?.[0]?.toUpperCase() ||
                            "U"}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-foreground truncate font-semibold">
                            {member.profile?.fullName || "Team Member"}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {member.profile?.email || "User"}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <Badge
                          variant={
                            member.role === "owner"
                              ? "default"
                              : member.role === "admin"
                                ? "success"
                                : "secondary"
                          }
                          className="text-[10px] font-bold uppercase"
                        >
                          {member.role}
                        </Badge>
                      </div>

                      <div className="text-muted-foreground col-span-3 text-xs">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </div>

                      <div className="col-span-1 text-right">
                        {member.role !== "owner" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                            title="Remove member"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Invitations List */}
      {invitations.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold tracking-tight">
            Pending Invitations ({invitations.length})
          </h2>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y text-sm">
                <div className="text-muted-foreground bg-muted/30 grid grid-cols-12 px-6 py-3 text-xs font-semibold tracking-wider uppercase">
                  <div className="col-span-6">Invited Email</div>
                  <div className="col-span-3">Assigned Role</div>
                  <div className="col-span-3 text-right">Actions</div>
                </div>

                {invitations.map((inv) => (
                  <div
                    key={inv.id}
                    className="hover:bg-muted/10 grid grid-cols-12 items-center px-6 py-3.5 transition-colors"
                  >
                    <div className="col-span-6 flex items-center gap-2 font-medium">
                      <Mail className="text-muted-foreground h-4 w-4 shrink-0" />
                      <span className="truncate">{inv.email}</span>
                    </div>

                    <div className="col-span-3">
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {inv.role}
                      </Badge>
                    </div>

                    <div className="col-span-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelInvitation(inv.id)}
                        className="text-muted-foreground hover:text-destructive h-7 px-2 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invite Member Modal */}
      <Dialog.Root open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-background/80 fixed inset-0 z-50 backdrop-blur-xs" />
          <Dialog.Content className="bg-card fixed top-[40%] left-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl border p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <Dialog.Title className="text-lg font-bold">Invite Team Member</Dialog.Title>
              <Dialog.Close asChild>
                <button aria-label="Close" className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-muted-foreground mb-4 text-xs">
              Send an invitation to join this workspace. They will receive access based on their
              assigned role.
            </Dialog.Description>

            <form onSubmit={handleInvite} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="colleague@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteRole">Workspace Role</Label>
                <select
                  id="inviteRole"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="border-input bg-background focus:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-hidden"
                >
                  <option value="member">Member (Standard Access)</option>
                  <option value="admin">Admin (Manage Members & Settings)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !inviteEmail.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending Invite...
                    </>
                  ) : (
                    "Send Invitation"
                  )}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
