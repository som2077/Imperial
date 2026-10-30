import { NextResponse } from "next/server";
import { validateApiToken } from "@/lib/api-auth";
import { dispatchWebhookEvent } from "@/server/actions/webhooks";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/v1/events
 * Ingests external custom events and triggers subscribed outgoing webhooks.
 */
export async function POST(request: Request) {
  const auth = await validateApiToken(request);
  if (!auth.success) {
    return auth.response;
  }

  const { context } = auth;

  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: {
            code: "invalid_json",
            message: "Could not parse JSON payload.",
          },
        },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          error: {
            code: "invalid_body",
            message: "Request body must be a valid JSON object.",
          },
        },
        { status: 400 }
      );
    }

    const { event, data } = body;

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        {
          error: {
            code: "missing_event_name",
            message:
              "Payload must include an 'event' string property (e.g. 'custom.alert', 'user.action').",
          },
        },
        { status: 400 }
      );
    }

    const eventId = `evt_${crypto.randomBytes(12).toString("hex")}`;
    const payloadData = data && typeof data === "object" ? data : {};

    // Await outgoing webhook dispatching so serverless execution completes reliably
    await dispatchWebhookEvent(context.organization.id, event, {
      ...payloadData,
      source: "api_v1",
      submittedByApiKey: context.apiKey.keyPrefix,
    });

    return NextResponse.json(
      {
        data: {
          id: eventId,
          event,
          status: "dispatched",
          organizationId: context.organization.id,
          createdAt: new Date().toISOString(),
        },
        meta: {
          apiVersion: "v1",
        },
      },
      { status: 202 }
    );
  } catch (err) {
    console.error("Error processing API event:", err);
    return NextResponse.json(
      {
        error: {
          code: "internal_error",
          message: "An error occurred while processing the event.",
        },
      },
      { status: 500 }
    );
  }
}
