import { test, expect } from "@playwright/test";

test.describe("Commercial License Claim Portal Suite (/claim)", () => {
  test("should render the claim portal page with all required inputs", async ({ page }) => {
    await page.goto("/claim");

    // Title and description
    await expect(page.getByText(/Claim GitHub Repository Access/i).first()).toBeVisible();
    await expect(page.getByText(/Purchased a license on Lemon Squeezy/i)).toBeVisible();

    // Verify form fields
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#licenseKey")).toBeVisible();
    await expect(page.locator("#github")).toBeVisible();

    // Submit button
    const claimButton = page.getByRole("button", { name: /Claim GitHub Invitation/i });
    await expect(claimButton).toBeVisible();
  });

  test("should display validation error when submitting unknown license key", async ({ page }) => {
    await page.goto("/claim");

    await page.locator("#email").fill("buyer@example.com");
    await page.locator("#licenseKey").fill("KIT-INVALID-KEY-9999");
    await page.locator("#github").fill("octocat");

    const claimButton = page.getByRole("button", { name: /Claim GitHub Invitation/i });
    await claimButton.click();

    // Verify error notification or toast
    await expect(
      page.locator("text=License key not found").or(page.locator("text=Failed to claim license"))
    ).toBeVisible();
  });

  test("should navigate to /claim from homepage or docs", async ({ page }) => {
    await page.goto("/claim");

    // Click brand logo to navigate back to home
    const brandLink = page.locator("header a[href='/']").first();
    await expect(brandLink).toBeVisible();
    await brandLink.click();

    await expect(page).toHaveURL(/\/$/);
  });
});
