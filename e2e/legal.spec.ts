import { test, expect } from "@playwright/test";

test.describe("Legal & Compliance Pages Suite", () => {
  test("should render Terms of Service page with legal clauses and home link", async ({ page }) => {
    await page.goto("/terms");

    await expect(page.locator("h1")).toContainText("Terms of Service");
    await expect(page.getByRole("heading", { name: /1\. Agreement to Terms/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /2\. Subscriptions & Billing/i })).toBeVisible();

    const homeLink = page.getByRole("link", { name: /Home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("should render Privacy Policy page with data collection terms and home link", async ({
    page,
  }) => {
    await page.goto("/privacy");

    await expect(page.locator("h1")).toContainText("Privacy Policy");
    await expect(page.getByRole("heading", { name: /1\. Information We Collect/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /2\. How We Use Information/i })).toBeVisible();

    const homeLink = page.getByRole("link", { name: /Home/i });
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("should navigate to terms and privacy from homepage footer links", async ({ page }) => {
    await page.goto("/");

    // Locate terms link in footer
    const termsLink = page.locator("footer").getByRole("link", { name: /Terms of Service/i });
    await expect(termsLink).toBeVisible();
    await termsLink.click();
    await expect(page).toHaveURL(/\/terms/);

    // Go back and test privacy link
    await page.goto("/");
    const privacyLink = page.locator("footer").getByRole("link", { name: /Privacy Policy/i });
    await expect(privacyLink).toBeVisible();
    await privacyLink.click();
    await expect(page).toHaveURL(/\/privacy/);
  });
});
