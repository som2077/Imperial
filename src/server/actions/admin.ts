"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const IMPERSONATE_COOKIE = "x-impersonate-user-id";

/**
 * Verify if current session belongs to an authorized super admin
 */
async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  // Check if role is admin (or fallback if user is the first platform developer)
  const isAdmin = profile?.role === "admin";
  return { user, profile, isAdmin };
}

/**
 * Get comprehensive platform metrics & user roster for super admin
 */
export async function getAdminMetricsAction() {
  const { isAdmin } = await verifyAdmin();
  if (!isAdmin) {
    throw new Error("Forbidden: Super Admin access required.");
  }

  try {
    const [allProfiles, allOrgs, allSubs, allKeys] = await Promise.all([
      db.query.profiles.findMany({
        orderBy: [desc(profiles.createdAt)],
        limit: 100,
        with: {
          subscriptions: true,
          ownedOrganizations: true,
        },
      }),
      db.query.organizations.findMany(),
      db.query.subscriptions.findMany(),
      db.query.apiKeys.findMany(),
    ]);

    const activeSubsCount = allSubs.filter((s) => s.status === "active").length;

    return {
      kpis: {
        totalUsers: allProfiles.length,
        totalOrganizations: allOrgs.length,
        activeSubscriptions: activeSubsCount,
        totalApiKeys: allKeys.length,
      },
      users: allProfiles,
    };
  } catch (err) {
    console.error("Error fetching admin metrics:", err);
    throw new Error("Failed to load admin data");
  }
}

/**
 * Impersonate any user account for customer support
 */
export async function impersonateUserAction(targetUserId: string) {
  const { isAdmin } = await verifyAdmin();
  if (!isAdmin) {
    return { error: "Forbidden: Only super admins can impersonate users." };
  }

  const targetProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, targetUserId),
  });

  if (!targetProfile) {
    return { error: "Target user not found." };
  }

  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATE_COOKIE, targetUserId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 2, // 2 hours
  });

  revalidatePath("/dashboard");
  return { success: true, targetUser: targetProfile };
}

/**
 * Exit impersonation mode and return to admin session
 */
export async function exitImpersonationAction() {
  const cookieStore = await cookies();
  cookieStore.delete(IMPERSONATE_COOKIE);
  revalidatePath("/dashboard");
  return { success: true };
}

/**
 * Check if current session is in impersonation mode
 */
export async function getImpersonationStatusAction() {
  const cookieStore = await cookies();
  const impersonatedId = cookieStore.get(IMPERSONATE_COOKIE)?.value;

  if (!impersonatedId) {
    return { isImpersonating: false, user: null };
  }

  try {
    const targetProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, impersonatedId),
    });

    if (!targetProfile) {
      return { isImpersonating: false, user: null };
    }

    return {
      isImpersonating: true,
      user: {
        id: targetProfile.id,
        email: targetProfile.email,
        fullName: targetProfile.fullName,
      },
    };
  } catch {
    return { isImpersonating: false, user: null };
  }
}

/**
 * Dispatch test transactional email
 */
export async function sendTestEmailAction(emailType: string, recipientEmail: string) {
  const { isAdmin } = await verifyAdmin();
  if (!isAdmin) {
    return { error: "Unauthorized: Admin access required." };
  }

  const to = recipientEmail.trim().toLowerCase();
  if (!to || !to.includes("@")) {
    return { error: "Please provide a valid recipient email address." };
  }

  try {
    const { sendWelcomeEmail, sendTeamInviteEmail, sendMagicLinkEmail, sendReceiptEmail } =
      await import("@/lib/email");

    switch (emailType) {
      case "welcome":
        await sendWelcomeEmail({ to, name: "Admin Test User" });
        break;
      case "team-invite":
        await sendTeamInviteEmail({
          to,
          inviterName: "Platform Admin",
          workspaceName: "Starter Kit HQ",
          role: "admin",
          inviteLink: "http://localhost:3000/dashboard/team",
        });
        break;
      case "magic-link":
        await sendMagicLinkEmail({
          to,
          magicLink: "http://localhost:3000/auth/callback?code=test_123456",
          code: "948215",
        });
        break;
      case "receipt":
        await sendReceiptEmail({
          to,
          customerName: "Admin Test User",
          invoiceId: "INV-2026-TEST",
          planName: "Pro Tier (Monthly)",
          amount: "$29.00",
        });
        break;
      default:
        return { error: `Unknown email type: ${emailType}` };
    }

    return { success: true };
  } catch (err: unknown) {
    return { error: (err as Error).message || "Failed to dispatch test email." };
  }
}

/**
 * Trigger background cron job manually from Admin UI
 */
export async function triggerCronJobAction(jobName: string) {
  const { isAdmin } = await verifyAdmin();
  if (!isAdmin) {
    throw new Error("Forbidden: Super Admin access required.");
  }

  const { executeCronJob } = await import("@/server/cron/jobs");
  return executeCronJob(jobName, "manual-admin");
}
