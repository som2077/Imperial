import { test, expect } from "@playwright/test";

test.describe("Public API v1 & Security Health Suite", () => {
  test("GET /api/v1/metrics should reject unauthenticated requests with 401", async ({
    request,
  }) => {
    const response = await request.get("/api/v1/metrics");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  test("POST /api/v1/events should reject invalid token format with 401", async ({ request }) => {
    const response = await request.post("/api/v1/events", {
      headers: {
        Authorization: "Bearer malformed_token_without_prefix",
      },
      data: {
        eventName: "user.action",
      },
    });
    expect(response.status()).toBe(401);
  });

  test("GET /api/cron/[job] should reject unauthenticated requests with 401", async ({
    request,
  }) => {
    const response = await request.get("/api/cron/webhook-retries");
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.error).toBe("Unauthorized");
  });

  test("GET /api/cron/[job] should execute valid job with secret query token", async ({
    request,
  }) => {
    const cronSecret = process.env.CRON_SECRET || "cron_secret_demo";
    const response = await request.get(`/api/cron/webhook-retries?key=${cronSecret}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.jobName).toBeDefined();
    expect(typeof body.durationMs).toBe("number");
  });
});
