import { test, expect } from "@playwright/test";

test.describe("Dynamic OpenGraph (OG) Image Generator", () => {
  test("GET /api/og returns 200 OK with PNG image binary", async ({ request }) => {
    const response = await request.get("/api/og");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");

    const body = await response.body();
    // PNG files always start with 89 50 4E 47 (.PNG magic bytes)
    expect(body.length).toBeGreaterThan(1000);
    expect(body[0]).toBe(0x89);
    expect(body[1]).toBe(0x50);
    expect(body[2]).toBe(0x4e);
    expect(body[3]).toBe(0x47);
  });

  test("GET /api/og supports dynamic parameters for title, description, and badge", async ({
    request,
  }) => {
    const params = new URLSearchParams({
      title: "Automated E2E Testing with Playwright",
      description: "Fast, reliable end-to-end test execution across modern browsers.",
      badge: "Testing",
      author: "Quality Team",
    });

    const response = await request.get(`/api/og?${params.toString()}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const body = await response.body();
    expect(body.length).toBeGreaterThan(1000);
  });

  test("Root layout includes default dynamic og:image and twitter:image tags", async ({ page }) => {
    await page.goto("/");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("/api/og");

    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute("content");
    expect(twitterImage).toBeTruthy();
    expect(twitterImage).toContain("/api/og");
  });

  test("Blog posts inject post-specific dynamic og:image with title and badge", async ({
    page,
  }) => {
    await page.goto("/blog/how-to-launch-saas-fast-in-2026");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("/api/og");
    const decodedUrl = decodeURIComponent(ogImage!.replace(/\+/g, " "));
    expect(decodedUrl).toContain("How to Launch a Profitable SaaS");
    expect(decodedUrl).toContain("badge=Blog");
  });

  test("Docs articles inject doc-specific dynamic og:image with category badge", async ({
    page,
  }) => {
    await page.goto("/docs/getting-started");
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toBeTruthy();
    expect(ogImage).toContain("/api/og");
    const decodedUrl = decodeURIComponent(ogImage!.replace(/\+/g, " "));
    expect(decodedUrl).toContain("Quick Start & Setup Guide");
    expect(decodedUrl).toContain("badge=Getting Started");
  });
});
