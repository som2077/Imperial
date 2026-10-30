"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const fullName = formData.get("fullName") as string;
  const avatarUrl = formData.get("avatarUrl") as string | null;

  try {
    const existing = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });

    if (existing) {
      await db
        .update(profiles)
        .set({
          fullName,
          ...(avatarUrl ? { avatarUrl } : {}),
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, user.id));
    } else {
      await db.insert(profiles).values({
        id: user.id,
        email: user.email!,
        fullName,
        avatarUrl: avatarUrl || null,
      });
    }

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { error: "Failed to update profile" };
  }
}
