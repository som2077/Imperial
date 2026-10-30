import { test, expect } from "@playwright/test";

test.describe("Blog & Knowledge Base Suite (/blog)", () => {
  test("should render the blog index with all published articles", async ({ page }) => {
    await page.goto("/blog");

    // Check index title and badge
    await expect(page.locator("h1")).toContainText("The SaaS Playbook");
    await expect(page.locator("text=Engineering & Growth").first()).toBeVisible();

    // Verify known article titles are displayed
    await expect(
      page.getByText(/How to Launch a Profitable SaaS in Under 7 Days in 2026/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Why Drizzle ORM is Replacing Traditional ORMs for Modern SaaS/i)
    ).toBeVisible();

    // Verify article cards have read times and 'Read Article' CTA
    await expect(page.getByText(/5 min read/i).first()).toBeVisible();
    await expect(page.getByText(/Read Article/i).first()).toBeVisible();
  });

  test("should open an individual blog post and display content and metadata", async ({ page }) => {
    await page.goto("/blog");

    // Click on the first article
    const articleLink = page
      .getByRole("link", { name: /How to Launch a Profitable SaaS/i })
      .first();
    await expect(articleLink).toBeVisible();
    await articleLink.click();

    // Verify navigation to post slug
    await expect(page).toHaveURL(/\/blog\/how-to-launch-saas-fast-in-2026/);

    // Verify article title and author
    await expect(page.locator("h1")).toContainText(
      "How to Launch a Profitable SaaS in Under 7 Days in 2026"
    );
    await expect(page.getByText("Marc Dev")).toBeVisible();
    await expect(page.getByText("5 min read")).toBeVisible();

    // Verify article section content
    await expect(page.getByRole("heading", { name: /Skip the Plumbing Work/i })).toBeVisible();
  });

  test("should navigate back to blog index using 'Back to Blog' link", async ({ page }) => {
    await page.goto("/blog/how-to-launch-saas-fast-in-2026");

    const backLink = page.getByRole("link", { name: /Back to Blog/i });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.locator("h1")).toContainText("The SaaS Playbook");
  });

  test("should display 404 page for non-existent blog post slug", async ({ page }) => {
    await page.goto("/blog/non-existent-article-slug");

    await expect(page.locator("h1")).toContainText("Page Not Found");
    await expect(page.getByText("Error 404")).toBeVisible();
  });
});
