import { test, expect } from "@playwright/test";

test.describe("Authentication Flows & Forms Suite", () => {
  test("should render login page with password and magic link options", async ({ page }) => {
    await page.goto("/login");

    // Title and Card header
    await expect(page.locator("text=Sign in").first()).toBeVisible();

    // Mode tabs
    const passwordTab = page.getByRole("button", { name: "Password", exact: true });
    const magicLinkTab = page.getByRole("button", { name: /magic link/i });
    await expect(passwordTab).toBeVisible();
    await expect(magicLinkTab).toBeVisible();

    // Email and Password inputs in default tab
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();

    // Switch to Magic Link tab
    await magicLinkTab.click();
    await expect(page.getByRole("button", { name: /send magic link/i })).toBeVisible();
    await expect(page.locator('input[name="password"]')).not.toBeVisible();
  });

  test("should navigate smoothly to registration page and back to sign in", async ({ page }) => {
    await page.goto("/login");
    const signUpLink = page.getByRole("link", { name: /sign up/i });
    await signUpLink.click();

    await expect(page).toHaveURL(/\/register/);
    await expect(page.locator("text=Create an account").first()).toBeVisible();
    await expect(page.locator('input[name="fullName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();

    // Return to sign in
    const signInLink = page.getByRole("link", { name: /sign in/i });
    await signInLink.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("should navigate to forgot-password page and render recovery form", async ({ page }) => {
    await page.goto("/login");

    const forgotPasswordLink = page.getByRole("link", { name: /forgot password\?/i });
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();

    await expect(page).toHaveURL(/\/forgot-password/);
    await expect(
      page.locator("h2, h3, div").filter({ hasText: "Reset Password" }).first()
    ).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /send reset link/i })).toBeVisible();

    // Navigate back to sign in
    const backToSignIn = page.getByRole("link", { name: /back to sign in/i });
    await expect(backToSignIn).toBeVisible();
    await backToSignIn.click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("should redirect unauthenticated users accessing /dashboard to /login with redirectTo", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login/);
    expect(page.url()).toContain("redirectTo");
    expect(page.url()).toContain("dashboard");
  });
});
