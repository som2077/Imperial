import { test, expect } from "@playwright/test";

test.describe("404 Not Found Handling Suite", () => {
  test("should render custom 404 page for unknown URLs", async ({ page }) => {
    await page.goto("/unknown-nonexistent-route-404");

    // Verify 404 badges and headings
    await expect(page.getByText("Error 404")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(
      page.getByText(/The page you are looking for doesn't exist or has been moved/i)
    ).toBeVisible();

    // Verify navigation buttons
    await expect(page.getByRole("link", { name: /Go to Home/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Dashboard/i })).toBeVisible();
  });

  test("should navigate back to home page when clicking 'Go to Home' button", async ({ page }) => {
    await page.goto("/some-missing-page");

    const homeButton = page.getByRole("link", { name: /Go to Home/i });
    await expect(homeButton).toBeVisible();
    await homeButton.click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should redirect unauthenticated users to login when clicking 'Dashboard' from 404", async ({
    page,
  }) => {
    await page.goto("/another-missing-path");

    const dashboardButton = page.getByRole("link", { name: /Dashboard/i });
    await expect(dashboardButton).toBeVisible();
    await dashboardButton.click();

    // Unauthenticated access to dashboard should redirect to login
    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).toContain("redirectTo");
  });
});
