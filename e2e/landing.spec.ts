import { test, expect } from "@playwright/test";

test.describe("Landing Page & Marketing Smoke Suite", () => {
  test("should render the landing page with hero header and CTA buttons", async ({ page }) => {
    await page.goto("/");

    // Verify main page elements
    await expect(page).toHaveTitle(/SaaS|Next\.js/i);
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();

    // Verify Login / Dashboard links
    const signInButton = page.getByRole("link", { name: /sign in|login/i }).first();
    await expect(signInButton).toBeVisible();
  });

  test("should display pricing plans on the homepage", async ({ page }) => {
    await page.goto("/");

    // Locate pricing section or pricing cards
    const pricingSection = page
      .locator("section")
      .filter({ hasText: /pricing|plans|hobby|pro/i })
      .first();
    await expect(pricingSection).toBeVisible();
  });

  test("should toggle language via LanguageSwitcher and update UI text", async ({ page }) => {
    await page.goto("/");

    // Find and click language switcher button in header
    const langButton = page
      .locator("header")
      .getByRole("button")
      .filter({ hasText: /🇺🇸|English/i })
      .first();
    await expect(langButton).toBeVisible();
    await langButton.click();

    // Click Spanish option from dropdown menu
    const spanishOption = page.getByRole("menuitem").filter({ hasText: /Español/i });
    await expect(spanishOption).toBeVisible();
    await spanishOption.click();

    // Verify html tag lang attribute updated to 'es'
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    // Verify translated hero text is rendered
    await expect(page.locator("h1")).toContainText(/Lanza tu SaaS/i);
  });
});
