import { test, expect } from "@playwright/test";

test.describe("Onboarding Wizard Suite (/onboarding)", () => {
  test("should redirect unauthenticated users from /onboarding to /login with redirectTo", async ({
    page,
  }) => {
    await page.goto("/onboarding");
    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).toContain("redirectTo");
  });

  test("should render the Onboarding Wizard documentation guide in docs index", async ({
    page,
  }) => {
    await page.goto("/docs/onboarding-wizard");
    await expect(
      page.locator("text=Interactive Multi-Step Onboarding Wizard").first()
    ).toBeVisible();
    await expect(page.locator("text=High-Converting User Onboarding").first()).toBeVisible();
    await expect(page.locator("text=Step 1: Workspace Setup").first()).toBeVisible();
  });
});
