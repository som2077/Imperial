import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { licenses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const licenseKey = String(body.licenseKey || "").trim();

    if (!licenseKey) {
      return NextResponse.json({ valid: false, error: "License key is required" }, { status: 400 });
    }

    let license = null;
    try {
      license = await db.query.licenses.findFirst({
        where: eq(licenses.licenseKey, licenseKey),
      });
    } catch {
      license = null;
    }

    if (!license) {
      return NextResponse.json(
        { valid: false, error: "Invalid license key. No record found." },
        { status: 404 }
      );
    }

    if (license.status !== "active") {
      return NextResponse.json(
        { valid: false, error: `License is ${license.status}. Please contact support.` },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      licenseKey: license.licenseKey,
      planType: license.planType,
      status: license.status,
      activationsCount: license.activationsCount,
      maxActivations: license.maxActivations,
      githubUsername: license.githubUsername,
      githubInviteSent: license.githubInviteSent,
    });
  } catch (error: unknown) {
    console.error("License verification failed:", error);
    return NextResponse.json({ valid: false, error: "Internal server error" }, { status: 500 });
  }
}
