import { test, expect } from "@playwright/test";

test.describe("Landing Page & Marketing Smoke Suite", () => {
  test("should render the landing page with hero header and CTA buttons", async ({ page }) => {
    await page.goto("/");

    // Verify main page elements
    await expect(page).toHaveTitle(/Imperial Tech/i);
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();

    // Verify Google Play link
    const playStoreLink = page
      .getByRole("link", { name: /Google Play Profile|Google Play/i })
      .first();
    await expect(playStoreLink).toBeVisible();
  });

  test("should display apps portfolio section on the homepage", async ({ page }) => {
    await page.goto("/");

    // Locate apps showcase section
    const portfolioSection = page
      .locator("#portfolio, section")
      .filter({ hasText: /Universal Calculator|Chess Pocket/i })
      .first();
    await expect(portfolioSection).toBeVisible();
  });

  test("should render footer with legal compliance and support links", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("link", { name: /Need help\?|Get Support/i }).first()
    ).toBeVisible();
    await expect(footer.getByRole("link", { name: /Terms of Service/i }).first()).toBeVisible();
    await expect(footer.getByRole("link", { name: /Privacy Policy/i }).first()).toBeVisible();
  });
});
