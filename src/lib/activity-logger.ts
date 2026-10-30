import { db } from "@/db";
import { activityLogs } from "@/db/schema";
import { headers } from "next/headers";

export interface LogActivityParams {
  userId: string;
  organizationId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  description: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Universal Non-Blocking Audit Activity Logger.
 * Records audit logs into PostgreSQL with IP address and User-Agent capture.
 */
export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    let clientIp = params.ipAddress;
    let clientUa = params.userAgent;

    if (!clientIp || !clientUa) {
      try {
        const headerList = await headers();
        if (!clientIp) {
          clientIp =
            headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            headerList.get("x-real-ip") ||
            "127.0.0.1";
        }
        if (!clientUa) {
          clientUa = headerList.get("user-agent") || undefined;
        }
      } catch {
        // Headers unavailable in background tasks or isolated scripts
      }
    }

    await db.insert(activityLogs).values({
      userId: params.userId,
      organizationId: params.organizationId || null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId || null,
      description: params.description,
      ipAddress: clientIp || "127.0.0.1",
      userAgent: clientUa ? clientUa.slice(0, 255) : null,
      metadata: params.metadata || null,
    });
  } catch (error) {
    // Audit log insertion should never break the primary user flow
    console.warn("Failed to record activity log:", error);
  }
}
