"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { activityLogs, profiles } from "@/db/schema";
import { eq, desc, and, or, sql } from "drizzle-orm";

export interface GetActivityLogsOptions {
  organizationId?: string | null;
  entityType?: string;
  page?: number;
  limit?: number;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  description: string;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: unknown;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
  } | null;
}

export async function getActivityLogsAction(options: GetActivityLogsOptions = {}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized", logs: [], totalCount: 0, totalPages: 0 };
    }

    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const offset = (page - 1) * limit;

    // Filter by organization if provided, otherwise for the user
    const whereConditions = [];
    if (options.organizationId) {
      whereConditions.push(eq(activityLogs.organizationId, options.organizationId));
    } else {
      whereConditions.push(
        or(eq(activityLogs.userId, user.id), eq(activityLogs.organizationId, user.id))
      );
    }

    if (options.entityType && options.entityType !== "all") {
      whereConditions.push(eq(activityLogs.entityType, options.entityType));
    }

    const whereClause = whereConditions.length > 1 ? and(...whereConditions) : whereConditions[0];

    // Fetch logs with user join
    const rawLogs = await db
      .select({
        id: activityLogs.id,
        action: activityLogs.action,
        entityType: activityLogs.entityType,
        entityId: activityLogs.entityId,
        description: activityLogs.description,
        ipAddress: activityLogs.ipAddress,
        userAgent: activityLogs.userAgent,
        metadata: activityLogs.metadata,
        createdAt: activityLogs.createdAt,
        user: {
          id: profiles.id,
          email: profiles.email,
          fullName: profiles.fullName,
          avatarUrl: profiles.avatarUrl,
        },
      })
      .from(activityLogs)
      .leftJoin(profiles, eq(activityLogs.userId, profiles.id))
      .where(whereClause)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit)
      .offset(offset);

    // Count total
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(activityLogs)
      .where(whereClause);

    const totalCount = countResult?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      logs: rawLogs,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);
    return {
      error: "Failed to load audit logs",
      logs: [],
      totalCount: 0,
      totalPages: 0,
    };
  }
}

export async function exportActivityLogsAction(organizationId?: string | null) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Unauthorized", data: null };
    }

    const whereClause = organizationId
      ? eq(activityLogs.organizationId, organizationId)
      : eq(activityLogs.userId, user.id);

    const records = await db
      .select()
      .from(activityLogs)
      .where(whereClause)
      .orderBy(desc(activityLogs.createdAt))
      .limit(1000);

    return {
      success: true,
      data: records,
    };
  } catch (error) {
    console.error("Failed to export activity logs:", error);
    return { error: "Failed to export logs", data: null };
  }
}
