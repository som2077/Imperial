import { test, expect } from "@playwright/test";

test.describe("Documentation Center Suite (/docs)", () => {
  test("should render documentation index with default getting-started guide", async ({ page }) => {
    await page.goto("/docs");

    // Main title and category badge
    await expect(page.locator("h1")).toContainText("Quick Start & Setup Guide");
    await expect(page.locator("text=Getting Started").first()).toBeVisible();

    // Verify content sections are rendered
    await expect(page.getByRole("heading", { name: /Prerequisites/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Next Guides in Documentation/i })
    ).toBeVisible();

    // Verify sidebar navigation categories
    await expect(page.locator("aside").getByText("Core Stack", { exact: true })).toBeVisible();
    await expect(page.locator("aside").getByText("Integrations", { exact: true })).toBeVisible();
  });

  test("should navigate to another guide via sidebar links", async ({ page }) => {
    await page.goto("/docs");

    // Click 'Application Architecture' in sidebar
    const archLink = page.locator("aside").getByRole("link", { name: /Application Architecture/i });
    await expect(archLink).toBeVisible();
    await archLink.click();

    await expect(page).toHaveURL(/\/docs\/architecture-overview/);
    await expect(page.locator("h1")).toContainText("Application Architecture");
  });

  test("should navigate via pagination links at bottom of article", async ({ page }) => {
    await page.goto("/docs/getting-started");

    // Locate the 'Next' pagination button
    const nextLink = page.getByRole("link", { name: /Next/i });
    await expect(nextLink).toBeVisible();
    await nextLink.click();

    await expect(page).toHaveURL(/\/docs\/syncing-upstream/);
    await expect(page.locator("h1")).toContainText("Staying Updated with Upstream Releases");
  });

  test("should return 404 page when visiting an invalid documentation slug", async ({ page }) => {
    await page.goto("/docs/invalid-slug-does-not-exist");

    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(page.getByText("Error 404")).toBeVisible();
  });
});
