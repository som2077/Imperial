"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { mediaAssets } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { generateUploadSignature, deleteCloudinaryAsset } from "@/lib/cloudinary";
import { logActivity } from "@/lib/activity-logger";

export interface RecordMediaAssetInput {
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  resourceType?: string;
  folder?: string;
}

/**
 * Generates signed parameters for direct browser upload to Cloudinary.
 */
export async function getMediaUploadSignature(folder = "user_uploads") {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required to generate upload signature." };
  }

  // Namespace folder by user ID for multi-tenant isolation
  const userFolder = `${folder}/${user.id}`;
  const signatureData = generateUploadSignature(userFolder);

  return { success: true, data: signatureData };
}

/**
 * Records newly uploaded asset metadata into Drizzle PostgreSQL.
 */
export async function recordMediaAsset(input: RecordMediaAssetInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  try {
    const [newAsset] = await db
      .insert(mediaAssets)
      .values({
        userId: user.id,
        publicId: input.publicId,
        url: input.url,
        secureUrl: input.secureUrl,
        format: input.format,
        bytes: input.bytes,
        width: input.width,
        height: input.height,
        resourceType: input.resourceType || "image",
        folder: input.folder,
      })
      .returning();

    revalidatePath("/dashboard/media");
    revalidatePath("/dashboard/settings");

    if (newAsset) {
      await logActivity({
        userId: user.id,
        action: "media.uploaded",
        entityType: "media",
        entityId: newAsset.id,
        description: `Uploaded media asset (${input.format || "file"})`,
        metadata: { format: input.format, bytes: input.bytes },
      });
    }

    return { success: true, asset: newAsset };
  } catch (err: unknown) {
    console.error("Failed to record media asset:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to record media asset.",
    };
  }
}

/**
 * Fetches all media assets uploaded by the current authenticated user.
 */
export async function getUserMediaAssets() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required.", assets: [] };
  }

  try {
    const assets = await db.query.mediaAssets.findMany({
      where: eq(mediaAssets.userId, user.id),
      orderBy: [desc(mediaAssets.createdAt)],
    });

    return { success: true, assets };
  } catch (err) {
    console.warn("Could not query media assets:", err);
    return { success: false, assets: [] };
  }
}

/**
 * Deletes a media asset from Cloudinary CDN and the database.
 */
export async function deleteMediaAsset(assetId: string, publicId?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Authentication required." };
  }

  try {
    // 1. Verify ownership in database first
    const existingAsset = await db.query.mediaAssets.findFirst({
      where: and(eq(mediaAssets.id, assetId), eq(mediaAssets.userId, user.id)),
    });

    if (!existingAsset) {
      return { error: "Asset not found or unauthorized." };
    }

    // 2. Delete verified asset from Cloudinary CDN
    const targetPublicId = existingAsset.publicId || publicId;
    if (targetPublicId) {
      await deleteCloudinaryAsset(targetPublicId);
    }

    // 3. Delete record from database
    await db
      .delete(mediaAssets)
      .where(and(eq(mediaAssets.id, assetId), eq(mediaAssets.userId, user.id)));

    await logActivity({
      userId: user.id,
      action: "media.deleted",
      entityType: "media",
      entityId: assetId,
      description: `Deleted media asset from storage`,
    });

    revalidatePath("/dashboard/media");
    revalidatePath("/dashboard/settings");

    return { success: true };
  } catch (err: unknown) {
    console.error("Failed to delete media asset:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to delete asset.",
    };
  }
}
