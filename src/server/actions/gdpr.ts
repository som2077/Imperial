"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import {
  profiles,
  subscriptions,
  organizations,
  organizationMembers,
  apiKeys,
  webhookEndpoints,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * Generates complete JSON export of user's personal and workspace data
 */
export async function exportUserDataAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    const [userProfile, userSubs, ownedOrgs, memberships, userKeys, userWebhooks] =
      await Promise.all([
        db.query.profiles.findFirst({ where: eq(profiles.id, user.id) }),
        db.query.subscriptions.findMany({ where: eq(subscriptions.userId, user.id) }),
        db.query.organizations.findMany({ where: eq(organizations.ownerId, user.id) }),
        db.query.organizationMembers.findMany({
          where: eq(organizationMembers.userId, user.id),
        }),
        db.query.apiKeys.findMany({ where: eq(apiKeys.userId, user.id) }),
        db.query.webhookEndpoints.findMany({ where: eq(webhookEndpoints.userId, user.id) }),
      ]);

    const exportBundle = {
      exportedAt: new Date().toISOString(),
      account: {
        id: user.id,
        email: user.email,
        createdAt: user.created_at,
      },
      profile: userProfile,
      subscriptions: userSubs,
      ownedOrganizations: ownedOrgs,
      organizationMemberships: memberships,
      developerApiKeys: userKeys.map((k) => ({
        id: k.id,
        name: k.name,
        prefix: k.keyPrefix,
        createdAt: k.createdAt,
        lastUsedAt: k.lastUsedAt,
      })),
      webhookEndpoints: userWebhooks.map((w) => ({
        id: w.id,
        url: w.url,
        description: w.description,
        events: w.events,
        isActive: w.isActive,
        createdAt: w.createdAt,
      })),
    };

    return {
      success: true,
      jsonData: JSON.stringify(exportBundle, null, 2),
    };
  } catch (err) {
    console.error("Failed to export user data:", err);
    return { error: "Failed to generate data export." };
  }
}

/**
 * Permanently deletes user account and all associated workspace records
 */
export async function deleteAccountAction(confirmation: string) {
  if (confirmation.trim() !== "DELETE") {
    return { error: "Please type DELETE exactly to confirm account removal." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // Delete profile (Drizzle CASCADE foreign keys delete organizations, subscriptions, keys, webhooks)
    await db.delete(profiles).where(eq(profiles.id, user.id));

    // Sign out from Supabase Auth
    await supabase.auth.signOut();
  } catch (err) {
    console.error("Account deletion error:", err);
    return { error: "Failed to completely delete account." };
  }

  redirect("/login");
}
