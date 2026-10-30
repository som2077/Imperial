"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles, organizations, organizationMembers, organizationInvitations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

export interface OnboardingState {
  user: {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    onboardingCompleted: boolean;
    rolePersona: string | null;
    companySize: string | null;
    projectGoal: string | null;
  } | null;
  defaultWorkspace: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
  } | null;
}

export interface CompleteOnboardingInput {
  workspaceName: string;
  rolePersona: string;
  companySize: string;
  projectGoal: string;
  logoUrl?: string;
  inviteEmails?: string[];
}

export async function getOnboardingState(): Promise<{
  state: OnboardingState | null;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { state: null, error: "Unauthorized" };
  }

  try {
    let profile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });

    if (!profile) {
      const [newProfile] = await db
        .insert(profiles)
        .values({
          id: user.id,
          email: user.email!,
          fullName: user.user_metadata?.full_name || null,
          onboardingCompleted: false,
        })
        .returning();
      profile = newProfile;
    }

    const org = await db.query.organizations.findFirst({
      where: eq(organizations.ownerId, user.id),
    });

    return {
      state: {
        user: {
          id: profile.id,
          email: profile.email,
          fullName: profile.fullName,
          avatarUrl: profile.avatarUrl,
          onboardingCompleted: profile.onboardingCompleted,
          rolePersona: profile.rolePersona,
          companySize: profile.companySize,
          projectGoal: profile.projectGoal,
        },
        defaultWorkspace: org
          ? {
              id: org.id,
              name: org.name,
              slug: org.slug,
              logoUrl: org.logoUrl,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("Failed to fetch onboarding state:", error);
    return {
      state: {
        user: {
          id: user.id,
          email: user.email || "",
          fullName: user.user_metadata?.full_name || null,
          avatarUrl: null,
          onboardingCompleted: false,
          rolePersona: null,
          companySize: null,
          projectGoal: null,
        },
        defaultWorkspace: null,
      },
    };
  }
}

export async function completeOnboardingAction(payload: CompleteOnboardingInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized. Please log in." };
  }

  try {
    const rawName = payload.workspaceName.trim();
    const orgName = rawName || `${user.user_metadata?.full_name || "Personal"}'s Workspace`;
    const slugBase = orgName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");
    const slug = `${slugBase || "workspace"}-${crypto.randomBytes(3).toString("hex")}`;

    // 1. Create or update workspace
    let org = await db.query.organizations.findFirst({
      where: eq(organizations.ownerId, user.id),
    });

    if (!org) {
      const [newOrg] = await db
        .insert(organizations)
        .values({
          name: orgName,
          slug,
          logoUrl: payload.logoUrl || null,
          ownerId: user.id,
        })
        .returning();
      org = newOrg;

      await db.insert(organizationMembers).values({
        organizationId: newOrg.id,
        userId: user.id,
        role: "owner",
      });
    } else {
      await db
        .update(organizations)
        .set({
          name: orgName,
          logoUrl: payload.logoUrl || org.logoUrl,
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, org.id));
    }

    // 2. Update profile with persona metadata and mark onboarding completed
    await db
      .update(profiles)
      .set({
        onboardingCompleted: true,
        rolePersona: payload.rolePersona || "founder",
        companySize: payload.companySize || "solo",
        projectGoal: payload.projectGoal || "saas",
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, user.id));

    // 3. Process team invites if supplied
    if (payload.inviteEmails && payload.inviteEmails.length > 0 && org) {
      for (const email of payload.inviteEmails) {
        const cleanEmail = email.trim().toLowerCase();
        if (cleanEmail && cleanEmail.includes("@")) {
          const token = crypto.randomBytes(32).toString("hex");
          const expiresAt = new Date();
          expiresAt.setDate(expiresAt.getDate() + 7);

          await db.insert(organizationInvitations).values({
            organizationId: org.id,
            email: cleanEmail,
            role: "member",
            token,
            expiresAt,
          });
        }
      }
    }

    if (org) {
      await logActivity({
        userId: user.id,
        organizationId: org.id,
        action: "onboarding.completed",
        entityType: "onboarding",
        entityId: org.id,
        description: `Completed onboarding for workspace "${orgName}" as ${payload.rolePersona || "founder"}`,
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/team");
    revalidatePath("/onboarding");
    return { success: true, redirectUrl: "/dashboard" };
  } catch (error) {
    console.error("Failed to complete onboarding:", error);
    return { error: "Failed to complete onboarding. Please try again." };
  }
}

export async function skipOnboardingAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // Ensure default workspace exists
    const org = await db.query.organizations.findFirst({
      where: eq(organizations.ownerId, user.id),
    });

    if (!org) {
      const orgName = `${user.user_metadata?.full_name || "Personal"}'s Workspace`;
      const slug = `workspace-${crypto.randomBytes(3).toString("hex")}`;
      const [newOrg] = await db
        .insert(organizations)
        .values({
          name: orgName,
          slug,
          ownerId: user.id,
        })
        .returning();

      await db.insert(organizationMembers).values({
        organizationId: newOrg.id,
        userId: user.id,
        role: "owner",
      });
    }

    await db
      .update(profiles)
      .set({
        onboardingCompleted: true,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, user.id));

    revalidatePath("/dashboard");
    revalidatePath("/onboarding");
    return { success: true, redirectUrl: "/dashboard" };
  } catch (error) {
    console.error("Failed to skip onboarding:", error);
    return { error: "Failed to skip onboarding." };
  }
}
