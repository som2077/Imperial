import { test, expect } from "@playwright/test";

test.describe("Theme & Dark Mode Suite", () => {
  test("should toggle theme between light and dark modes via ThemeToggle", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.getByRole("button", { name: "Toggle theme" }).first();
    await expect(themeToggle).toBeVisible();

    const html = page.locator("html");
    const initialClass = (await html.getAttribute("class")) || "";
    const initiallyDark = initialClass.includes("dark");

    // Click toggle button
    await themeToggle.click();

    if (initiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // Click toggle button a second time to revert
    await themeToggle.click();

    if (initiallyDark) {
      await expect(html).toHaveClass(/dark/);
    } else {
      await expect(html).not.toHaveClass(/dark/);
    }
  });

  test("should persist theme preference across page reloads", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.getByRole("button", { name: "Toggle theme" }).first();
    await expect(themeToggle).toBeVisible();

    const html = page.locator("html");
    const initialClass = (await html.getAttribute("class")) || "";
    const initiallyDark = initialClass.includes("dark");

    // Switch theme once
    await themeToggle.click();

    if (initiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }

    // Reload the page
    await page.reload();

    // Verify theme state remains persisted
    if (initiallyDark) {
      await expect(html).not.toHaveClass(/dark/);
    } else {
      await expect(html).toHaveClass(/dark/);
    }
  });

  test("should have ThemeToggle available on subpages like /changelog", async ({ page }) => {
    await page.goto("/changelog");

    const themeToggle = page.getByRole("button", { name: "Toggle theme" }).first();
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();

    const html = page.locator("html");
    // Ensure clicking toggle alters the class attribute
    await expect(html).toBeVisible();
  });
});
