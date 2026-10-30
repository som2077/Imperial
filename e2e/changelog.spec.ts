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
    await expect(page.getByText("v2.4.1")).toBeVisible();
    await expect(page.getByText("v1.0.0-rc")).toBeVisible();

    // Verify release titles and badges
    await expect(page.getByText("Universal Calculator World Update")).toBeVisible();
    await expect(page.getByText("Chess Pocket Release Candidate")).toBeVisible();

    // Verify specific feature highlights
    await expect(page.getByText(/Added 15 new scientific unit conversions/i)).toBeVisible();
    await expect(page.getByText(/Stockfish engine optimization/i)).toBeVisible();
  });

  test("should navigate back to the home page from header link", async ({ page }) => {
    await page.goto("/changelog");

    const homeLink = page.getByRole("link", { name: /Home/i }).first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();

    await expect(page).toHaveURL(/\/$/);
  });
});
