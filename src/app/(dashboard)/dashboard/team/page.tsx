import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { organizationMembers, organizationInvitations, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getOrCreateUserOrganization } from "@/server/actions/team";
import { TeamManager } from "./team-manager";
import type { TeamMemberWithProfile } from "./team-manager";

export const metadata = {
  title: "Team & Organizations | Workspace Management",
  description: "Manage organization workspaces, team members, and role permissions.",
};

export default async function TeamPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return null;
  }

  let org = null;
  const membersWithProfiles: TeamMemberWithProfile[] = [];
  let invitations: (typeof organizationInvitations.$inferSelect)[] = [];

  try {
    org = await getOrCreateUserOrganization(user.id, user.email);

    if (org) {
      const rawMembers = await db.query.organizationMembers.findMany({
        where: eq(organizationMembers.organizationId, org.id),
      });

      // Populate member profiles
      for (const m of rawMembers) {
        const profile = await db.query.profiles.findFirst({
          where: eq(profiles.id, m.userId),
        });
        membersWithProfiles.push({
          ...m,
          profile: profile || null,
        });
      }

      invitations = await db.query.organizationInvitations.findMany({
        where: eq(organizationInvitations.organizationId, org.id),
      });
    }
  } catch (error) {
    console.warn("Database team query error or pending migration:", error);
  }

  if (!org) {
    return (
      <div className="text-muted-foreground py-12 text-center text-sm">
        Unable to load workspace. Please verify database connection.
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organization & Team</h1>
        <p className="text-muted-foreground mt-1">
          Collaborate with your team, manage member permissions, and invite new colleagues.
        </p>
      </div>

      <TeamManager organization={org} members={membersWithProfiles} invitations={invitations} />
    </div>
  );
}
