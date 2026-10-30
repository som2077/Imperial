import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { licenses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inviteGitHubCollaborator } from "@/lib/github/collaborator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const licenseKey = String(body.licenseKey || "").trim();
    const customerEmail = String(body.customerEmail || "")
      .trim()
      .toLowerCase();
    const rawGithub = String(body.githubUsername || "")
      .trim()
      .replace(/^@/, "");

    if (!licenseKey || !customerEmail || !rawGithub) {
      return NextResponse.json(
        {
          success: false,
          error: "License key, purchase email, and GitHub username are all required.",
        },
        { status: 400 }
      );
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
        { success: false, error: "License key not found. Please verify your purchase key." },
        { status: 404 }
      );
    }

    if (license.customerEmail.toLowerCase() !== customerEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email does not match the original purchase order for this license key.",
        },
        { status: 403 }
      );
    }

    if (license.status !== "active") {
      return NextResponse.json(
        { success: false, error: `License is ${license.status}. Please contact support.` },
        { status: 403 }
      );
    }

    // Attempt to dispatch GitHub repository invitation
    const inviteResult = await inviteGitHubCollaborator(rawGithub);
    if (!inviteResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: inviteResult.error || `Could not invite GitHub user @${rawGithub}`,
        },
        { status: 422 }
      );
    }

    // Update database record
    await db
      .update(licenses)
      .set({
        githubUsername: rawGithub,
        githubInviteSent: true,
        claimedAt: new Date(),
        activationsCount: license.activationsCount < 1 ? 1 : license.activationsCount,
        updatedAt: new Date(),
      })
      .where(eq(licenses.id, license.id));

    return NextResponse.json({
      success: true,
      message: `Repository invitation sent to @${rawGithub}! Check your email or github.com/som2077/saas-kit-template/invitations to accept.`,
      status: inviteResult.status,
    });
  } catch (error: unknown) {
    console.error("License claim error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while claiming license" },
      { status: 500 }
    );
  }
}
