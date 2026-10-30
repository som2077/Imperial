"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { organizations, organizationMembers, organizationInvitations, profiles } from "@/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

export async function getUserOrganizations(userId?: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const targetUserId = userId && user.id === userId ? userId : user.id;

    const ownedOrgs = await db.query.organizations.findMany({
      where: eq(organizations.ownerId, targetUserId),
    });

    const memberships = await db.query.organizationMembers.findMany({
      where: eq(organizationMembers.userId, targetUserId),
    });

    const memberOrgIds = memberships
      .map((m) => m.organizationId)
      .filter((id) => !ownedOrgs.some((o) => o.id === id));

    const memberOrgs =
      memberOrgIds.length > 0
        ? await db.query.organizations.findMany({
            where: inArray(organizations.id, memberOrgIds),
          })
        : [];

    return [...ownedOrgs, ...memberOrgs];
  } catch (e) {
    console.warn("Failed to fetch user organizations:", e);
    return [];
  }
}

export async function createOrganizationAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  if (!name || name.length < 2 || name.length > 50) {
    return { error: "Organization name must be between 2 and 50 characters." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const slug = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")}-${crypto.randomBytes(3).toString("hex")}`;

    const [newOrg] = await db
      .insert(organizations)
      .values({
        name,
        slug,
        ownerId: user.id,
      })
      .returning();

    await db.insert(organizationMembers).values({
      organizationId: newOrg.id,
      userId: user.id,
      role: "owner",
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/team");
    return { success: true, organization: newOrg };
  } catch (error) {
    console.error("Failed to create organization:", error);
    return { error: "Failed to create organization." };
  }
}

export async function getOrCreateUserOrganization(userId: string, userEmail: string) {
  // Check if user is owner of an organization
  let org = await db.query.organizations.findFirst({
    where: eq(organizations.ownerId, userId),
  });

  if (!org) {
    // Check if member of any org
    const membership = await db.query.organizationMembers.findFirst({
      where: eq(organizationMembers.userId, userId),
    });

    if (membership) {
      const foundOrg = await db.query.organizations.findFirst({
        where: eq(organizations.id, membership.organizationId),
      });
      if (foundOrg) return foundOrg;
    }

    // Otherwise create a default organization for them
    const orgName = `${userEmail.split("@")[0]}'s Team`;
    const slug = `${userEmail
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}-${crypto.randomBytes(3).toString("hex")}`;

    const [newOrg] = await db
      .insert(organizations)
      .values({
        name: orgName,
        slug,
        ownerId: userId,
      })
      .returning();

    await db.insert(organizationMembers).values({
      organizationId: newOrg.id,
      userId: userId,
      role: "owner",
    });

    org = newOrg;
  }

  return org;
}

export async function inviteMemberAction(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const rawRole = (formData.get("role") as string) || "member";
  // Whitelist roles to prevent privilege escalation
  const role = rawRole === "admin" ? "admin" : "member";

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email address." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { error: "Unauthorized" };
  }

  try {
    const org = await getOrCreateUserOrganization(user.id, user.email);

    // Enforce RBAC: Caller must be owner or admin
    const callerMembership = await db.query.organizationMembers.findFirst({
      where: and(
        eq(organizationMembers.organizationId, org.id),
        eq(organizationMembers.userId, user.id)
      ),
    });

    const isOrgOwner = org.ownerId === user.id;
    if (!isOrgOwner && (!callerMembership || callerMembership.role !== "admin")) {
      return { error: "Permission denied. Only workspace owners and admins can invite members." };
    }

    // Check if already a member
    const existingProfile = await db.query.profiles.findFirst({
      where: eq(profiles.email, email),
    });

    if (existingProfile) {
      const alreadyMember = await db.query.organizationMembers.findFirst({
        where: and(
          eq(organizationMembers.organizationId, org.id),
          eq(organizationMembers.userId, existingProfile.id)
        ),
      });

      if (alreadyMember) {
        return { error: "This user is already a member of your workspace." };
      }
    }

    // Check seat capacity & usage
    const currentMembers = await db.query.organizationMembers.findMany({
      where: eq(organizationMembers.organizationId, org.id),
    });
    const currentInvites = await db.query.organizationInvitations.findMany({
      where: eq(organizationInvitations.organizationId, org.id),
    });

    const totalSeatsUsed = currentMembers.length + currentInvites.length;
    const maxSeatCapacity = 10; // Free / Standard tier threshold

    if (totalSeatsUsed >= maxSeatCapacity) {
      return {
        error: `Workspace seat limit reached (${totalSeatsUsed}/${maxSeatCapacity}). Upgrade your seat plan to invite more members.`,
      };
    }

    // Create invitation record
    const token = crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 1000 * 60 * 60 * 24); // 7 days

    await db.insert(organizationInvitations).values({
      organizationId: org.id,
      email,
      role,
      token,
      expiresAt,
    });

    await logActivity({
      userId: user.id,
      organizationId: org.id,
      action: "team.member_invited",
      entityType: "team",
      description: `Invited ${email} with role "${role}" to workspace`,
      metadata: { email, role },
    });

    revalidatePath("/dashboard/team");
    return { success: true, email, role };
  } catch (error) {
    console.error("Failed to invite member:", error);
    return { error: "Failed to send invitation." };
  }
}

export async function removeMemberAction(memberId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    return { error: "Unauthorized" };
  }

  try {
    const org = await getOrCreateUserOrganization(user.id, user.email);

    // Enforce RBAC: Caller must be owner or admin
    const callerMembership = await db.query.organizationMembers.findFirst({
      where: and(
        eq(organizationMembers.organizationId, org.id),
        eq(organizationMembers.userId, user.id)
      ),
    });

    const isOrgOwner = org.ownerId === user.id;
    if (!isOrgOwner && (!callerMembership || callerMembership.role !== "admin")) {
      return { error: "Permission denied. Only workspace owners and admins can remove members." };
    }

    // Prevent removing the workspace owner
    const member = await db.query.organizationMembers.findFirst({
      where: and(
        eq(organizationMembers.id, memberId),
        eq(organizationMembers.organizationId, org.id)
      ),
    });

    if (!member) {
      return { error: "Member not found in this workspace." };
    }

    if (member.role === "owner") {
      return { error: "Cannot remove the organization owner." };
    }

    await db.delete(organizationMembers).where(eq(organizationMembers.id, memberId));

    await logActivity({
      userId: user.id,
      organizationId: org.id,
      action: "team.member_removed",
      entityType: "team",
      entityId: memberId,
      description: `Removed team member from workspace`,
    });

    revalidatePath("/dashboard/team");
    return { success: true };
  } catch (error) {
    console.error("Failed to remove member:", error);
    return { error: "Failed to remove member." };
  }
}

export async function cancelInvitationAction(invitationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const invite = await db.query.organizationInvitations.findFirst({
      where: eq(organizationInvitations.id, invitationId),
    });

    if (!invite) {
      return { error: "Invitation not found." };
    }

    // Verify tenant ownership: User must be owner or admin of the organization
    const callerMembership = await db.query.organizationMembers.findFirst({
      where: and(
        eq(organizationMembers.organizationId, invite.organizationId),
        eq(organizationMembers.userId, user.id)
      ),
    });

    const isOrgOwner = await db.query.organizations.findFirst({
      where: and(eq(organizations.id, invite.organizationId), eq(organizations.ownerId, user.id)),
    });

    if (!isOrgOwner && (!callerMembership || callerMembership.role !== "admin")) {
      return {
        error: "Permission denied. Only workspace owners and admins can cancel invitations.",
      };
    }

    await db.delete(organizationInvitations).where(eq(organizationInvitations.id, invitationId));

    revalidatePath("/dashboard/team");
    return { success: true };
  } catch (error) {
    console.error("Failed to cancel invitation:", error);
    return { error: "Failed to cancel invitation." };
  }
}

export async function getOrganizationSeatUsageAction(organizationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const members = await db.query.organizationMembers.findMany({
      where: eq(organizationMembers.organizationId, organizationId),
    });
    const invites = await db.query.organizationInvitations.findMany({
      where: eq(organizationInvitations.organizationId, organizationId),
    });

    const usedSeats = members.length + invites.length;
    const maxSeats = 10;
    const seatPriceUsd = 15;

    return {
      usedSeats,
      maxSeats,
      membersCount: members.length,
      pendingInvitesCount: invites.length,
      seatPriceUsd,
      monthlyEstimatedCost: usedSeats * seatPriceUsd,
    };
  } catch (error) {
    console.error("Failed to fetch seat usage:", error);
    return {
      usedSeats: 1,
      maxSeats: 10,
      membersCount: 1,
      pendingInvitesCount: 0,
      seatPriceUsd: 15,
      monthlyEstimatedCost: 15,
    };
  }
}
