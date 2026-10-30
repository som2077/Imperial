"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUserNotificationsAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { notifications: [], unreadCount: 0 };
  }

  try {
    const list = await db.query.notifications.findMany({
      where: eq(notifications.userId, user.id),
      orderBy: [desc(notifications.createdAt)],
      limit: 20,
    });

    const unreadCount = list.filter((n) => !n.isRead).length;

    return {
      notifications: list,
      unreadCount,
    };
  } catch (err) {
    console.error("Failed to query notifications:", err);
    return { notifications: [], unreadCount: 0 };
  }
}

export async function markNotificationAsReadAction(notificationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  try {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(and(eq(notifications.id, notificationId), eq(notifications.userId, user.id)));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Failed to mark notification read:", err);
    return { error: "Failed to update notification." };
  }
}

export async function markAllNotificationsAsReadAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  try {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(and(eq(notifications.userId, user.id), eq(notifications.isRead, false)));

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    console.error("Failed to clear notifications:", err);
    return { error: "Failed to clear notifications." };
  }
}

export async function createNotification({
  userId,
  title,
  message,
  type = "info",
  link,
  organizationId,
}: {
  userId: string;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "alert";
  link?: string;
  organizationId?: string;
}) {
  try {
    const [row] = await db
      .insert(notifications)
      .values({
        userId,
        title,
        message,
        type,
        link,
        organizationId,
        isRead: false,
      })
      .returning();

    return row;
  } catch (err) {
    console.error("Could not insert notification:", err);
    return null;
  }
}
