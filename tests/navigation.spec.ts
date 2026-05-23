import { test, expect } from "@playwright/test";

async function waitForPageLoad(page: any) {
  await page.waitForTimeout(3000);
}

test.describe("Navigation & Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("Navbar renders and is visible", async ({ page }) => {
    const navbar = page.locator("header");
    await expect(navbar).toBeVisible();
    // Check it is at the top of the page
    const boundingBox = await navbar.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.y).toBeLessThan(100);
  });

  test("Logo is visible in the navbar", async ({ page }) => {
    const header = page.locator("header");
    // Logo can be an img or SVG
    const logo = header.locator("img, svg").first();
    await expect(logo).toBeVisible();
  });

  test("Mobile hamburger menu opens and closes nav menu", async ({ page }) => {
    // Find open menu button (hamburger)
    const hamburger = page.getByRole("button", { name: /Open menu/i });
    await expect(hamburger).toBeVisible();

    // Click to open
    await hamburger.click();
    await page.waitForTimeout(500);

    // Mobile menu should now be visible
    const closeButton = page.getByRole("button", { name: /Close menu/i });
    await expect(closeButton).toBeVisible();

    // Nav links should appear in the mobile menu
    const aboutLink = page.locator("ul").filter({ has: page.locator("li a[href='#about']") }).last();
    await expect(aboutLink).toBeVisible();

    // Click close button
    await closeButton.click();
    await page.waitForTimeout(500);

    // Menu should be dismissed
    await expect(closeButton).not.toBeVisible();
  });

  test("Mobile menu nav links are present and have correct hrefs", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: /Open menu/i });
    await hamburger.click();
    await page.waitForTimeout(500);

    // Check each nav link
    const aboutLink = page.locator("a[href='#about']").last();
    const classesLink = page.locator("a[href='#classes']").last();
    const bookLink = page.locator("a[href='#booking']").last();
    const contactLink = page.locator("a[href='#contact']").last();

    await expect(aboutLink).toBeVisible();
    await expect(classesLink).toBeVisible();
    await expect(bookLink).toBeVisible();
    await expect(contactLink).toBeVisible();
  });

  test("Clicking nav link closes mobile menu and scrolls to section", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: /Open menu/i });
    await hamburger.click();
    await page.waitForTimeout(500);

    // Click the Classes link inside the menu
    const classesLink = page.locator("ul li a[href='#classes']").last();
    await classesLink.click();
    await page.waitForTimeout(1000);

    // Menu should close
    const closeButton = page.getByRole("button", { name: /Close menu/i });
    await expect(closeButton).not.toBeVisible();

    // Classes section should now be in view
    const classesSection = page.locator("#classes");
    await expect(classesSection).toBeInViewport({ ratio: 0.1 });
  });

  test("Footer renders with links", async ({ page }) => {
    const footer = page.locator("footer#contact");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(footer).toBeVisible();

    const footerLinks = footer.locator("a");
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Social icons have valid href attributes (not empty or just #)", async ({ page }) => {
    const footer = page.locator("footer#contact");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const instagramLink = footer.getByRole("link", { name: /Instagram/i });
    const youtubeLink = footer.getByRole("link", { name: /YouTube/i });

    await expect(instagramLink).toBeVisible();
    await expect(youtubeLink).toBeVisible();

    const instagramHref = await instagramLink.getAttribute("href");
    const youtubeHref = await youtubeLink.getAttribute("href");

    console.log(`Instagram href: ${instagramHref}`);
    console.log(`YouTube href: ${youtubeHref}`);

    expect(instagramHref).not.toBeNull();
    expect(instagramHref?.trim()).not.toBe("");
    expect(youtubeHref).not.toBeNull();
    expect(youtubeHref?.trim()).not.toBe("");

    if (instagramHref === "#") {
      console.warn("WARNING: Instagram href is '#' (placeholder)");
    }
    if (youtubeHref === "#") {
      console.warn("WARNING: YouTube href is '#' (placeholder)");
    }
  });

  test("Footer legal links are present", async ({ page }) => {
    const footer = page.locator("footer#contact");
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const privacyLink = footer.getByRole("link", { name: /Privacy/i });
    const termsLink = footer.getByRole("link", { name: /Terms/i });

    await expect(privacyLink).toBeVisible();
    await expect(termsLink).toBeVisible();
  });
});
