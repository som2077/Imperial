"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { logActivity } from "@/lib/activity-logger";

export async function createApiKeyAction(formData: FormData) {
  const name = (formData.get("name") as string)?.trim() || "Default API Key";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    // Generate secure secret token
    const randomHex = crypto.randomBytes(20).toString("hex");
    const rawKey = `sk_live_${randomHex}`;
    const keyPrefix = `sk_live_${randomHex.slice(0, 4)}••••${randomHex.slice(-4)}`;

    // Hash raw key with SHA-256 for secure storage
    const keyHash = crypto.createHash("sha256").update(rawKey).digest("hex");

    await db.insert(apiKeys).values({
      userId: user.id,
      name,
      keyPrefix,
      keyHash,
    });

    await logActivity({
      userId: user.id,
      action: "api_key.created",
      entityType: "api_key",
      description: `Generated new API key "${name}" (${keyPrefix})`,
      metadata: { name, keyPrefix },
    });

    revalidatePath("/dashboard/api-keys");
    return {
      success: true,
      rawKey,
      name,
      keyPrefix,
    };
  } catch (error) {
    console.error("Failed to create API key:", error);
    return { error: "Failed to create API key" };
  }
}

export async function revokeApiKeyAction(keyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await db.delete(apiKeys).where(and(eq(apiKeys.id, keyId), eq(apiKeys.userId, user.id)));

    await logActivity({
      userId: user.id,
      action: "api_key.revoked",
      entityType: "api_key",
      entityId: keyId,
      description: `Revoked API key`,
    });

    revalidatePath("/dashboard/api-keys");
    return { success: true };
  } catch (error) {
    console.error("Failed to revoke API key:", error);
    return { error: "Failed to revoke API key" };
  }
}
