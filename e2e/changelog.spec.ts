import { test, expect } from "@playwright/test";

test.describe("Changelog & Product Updates Suite (/changelog)", () => {
  test("should render the changelog timeline with release versions and highlights", async ({
    page,
  }) => {
    await page.goto("/changelog");

    // Title and badge
    await expect(page.locator("h1")).toContainText("Changelog & Releases");
    await expect(page.getByText("Product Roadmap")).toBeVisible();

    // Verify key version tags are visible
    await expect(page.getByText("v3.2.0")).toBeVisible();
    await expect(page.getByText("v3.1.0")).toBeVisible();
    await expect(page.getByText("v2.0.0")).toBeVisible();

    // Verify release titles and badges
    await expect(page.getByText("Resilience & Security Hardening")).toBeVisible();
    await expect(page.getByText("AI Elements & Copilot Studio")).toBeVisible();
    await expect(page.getByText("Full-Stack Core Architecture")).toBeVisible();

    // Verify specific feature highlights
    await expect(page.getByText(/Vercel AI SDK v7 integration with Tool Calling/i)).toBeVisible();
    await expect(
      page.getByText(/Next.js 16 App Router & React 19 Turbopack engine/i)
    ).toBeVisible();
  });

  test("should navigate back to the home page from header link", async ({ page }) => {
    await page.goto("/changelog");

    const homeLink = page.getByRole("link", { name: /Home/i }).first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    await expect(page).toHaveURL(/\/$/);
  });
});
