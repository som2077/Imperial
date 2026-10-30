import { test, expect } from "@playwright/test";

test.describe("Enterprise Activity & Audit Logs Suite", () => {
  test("should redirect unauthenticated users from /dashboard/activity to /login", async ({
    page,
  }) => {
    await page.goto("/dashboard/activity");
    await expect(page).toHaveURL(/\/login.*redirectTo=%2Fdashboard%2Factivity/);
    await expect(page.locator("text=Sign in").first()).toBeVisible();
  });

  test("should render the Enterprise Audit Logs documentation article", async ({ page }) => {
    await page.goto("/docs/enterprise-audit-logs");
    await expect(page.locator("h1")).toContainText("Enterprise Activity & Audit Logs");
    await expect(page.locator("text=Why Enterprise Audit Logging?")).toBeVisible();
    await expect(page.locator("text=Tracked Events & Architecture")).toBeVisible();
    await expect(page.locator("text=Non-Blocking Activity Logger")).toBeVisible();
  });

  test("should display Enterprise Audit Logs in Docs sidebar navigation", async ({ page }) => {
    await page.goto("/docs");
    const docLink = page.locator('aside nav a:has-text("Enterprise Activity & Audit Logs")');
    await expect(docLink).toBeVisible();
  });
});
