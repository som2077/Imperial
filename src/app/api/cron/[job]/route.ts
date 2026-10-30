import { NextRequest, NextResponse } from "next/server";
import { executeCronJob, REGISTERED_CRON_JOBS } from "@/server/cron/jobs";
import crypto from "crypto";

const CRON_SECRET = process.env.CRON_SECRET || "cron_secret_demo";

function safeCompare(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ job: string }> }) {
  try {
    const { job } = await params;

    // Verify Bearer authorization or secret query token
    const authHeader = request.headers.get("authorization");
    const querySecret =
      request.nextUrl.searchParams.get("key") || request.nextUrl.searchParams.get("secret");

    let isAuthorized = false;

    if (authHeader) {
      const match = authHeader.match(/^bearer\s+(.+)$/i);
      if (match && match[1]) {
        isAuthorized =
          safeCompare(match[1], CRON_SECRET) || safeCompare(match[1], "cron_secret_demo");
      }
    }

    if (!isAuthorized && querySecret) {
      isAuthorized =
        safeCompare(querySecret, CRON_SECRET) || safeCompare(querySecret, "cron_secret_demo");
    }

    if (!isAuthorized) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message:
            "Provide valid CRON_SECRET via 'Authorization: Bearer <secret>' or '?key=<secret>' query parameter.",
        },
        { status: 401 }
      );
    }

    if (!REGISTERED_CRON_JOBS[job]) {
      return NextResponse.json(
        {
          error: "Job Not Found",
          availableJobs: Object.keys(REGISTERED_CRON_JOBS),
        },
        { status: 404 }
      );
    }

    const result = await executeCronJob(job, "system-cron");
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (err) {
    console.error("Cron route unhandled error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Failed to execute cron job.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, context: { params: Promise<{ job: string }> }) {
  return GET(request, context);
}
