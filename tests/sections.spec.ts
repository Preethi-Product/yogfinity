import { test, expect } from "@playwright/test";

// PageLoader takes ~2.4s total (1.8s timer + 0.6s fade), then content fades in 0.8s
// We wait for content to be visible before checking sections
async function waitForPageLoad(page: any) {
  // Wait for the page loader to disappear and main content to be visible
  await page.waitForFunction(() => {
    const loader = document.querySelector(".fixed.inset-0.z-\\[100000\\]");
    return !loader || (loader as HTMLElement).style.opacity === "0" || !document.body.contains(loader);
  }, { timeout: 10000 }).catch(() => {});
  // Give content animations time to complete
  await page.waitForTimeout(3000);
}

test.describe("Page Sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("Hero section renders with heading and CTA button", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();

    // Check H1 heading exists and has text content
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(0);

    // Check CTA button
    const ctaButton = page.getByRole("button", { name: /Book Your First Class/i });
    await expect(ctaButton).toBeVisible();
  });

  test("Manifesto section renders with visible content", async ({ page }) => {
    const manifesto = page.locator("#about");
    await manifesto.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(manifesto).toBeVisible();

    // Check for quote text
    const quoteText = manifesto.locator("blockquote, p, [class*='quote']").first();
    const hasContent = await manifesto.textContent();
    expect(hasContent?.trim().length).toBeGreaterThan(10);
  });

  test("Method section renders with steps", async ({ page }) => {
    const method = page.locator("#method");
    await method.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(method).toBeVisible();

    const text = await method.textContent();
    expect(text).toContain("Assess");
    expect(text).toContain("Engineer");
    expect(text).toContain("Integrate");
  });

  test("Classes section renders all 4 class cards", async ({ page }) => {
    const classes = page.locator("#classes");
    await classes.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(classes).toBeVisible();

    const text = await classes.textContent();
    expect(text).toContain("Fascia Flow");
    expect(text).toContain("Mobility Architecture");
    expect(text).toContain("Yin Deep Tissue");
    expect(text).toContain("Recovery");

    // Check heading
    const heading = classes.locator("h2");
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toContain("Classes");
  });

  test("Teachers section renders with visible content", async ({ page }) => {
    const teachers = page.locator("#teachers");
    await teachers.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(teachers).toBeVisible();

    const text = await teachers.textContent();
    expect(text?.trim().length).toBeGreaterThan(20);
    expect(text).toContain("Aditi");
  });

  test("Studio section renders with visible content", async ({ page }) => {
    const studio = page.locator("#studio");
    await studio.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(studio).toBeVisible();

    const text = await studio.textContent();
    expect(text?.trim().length).toBeGreaterThan(10);
  });

  test("Testimonials section renders with visible content", async ({ page }) => {
    // Testimonials section - find by content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(500);

    const testimonialHeading = page.getByText("Voices of the Practice");
    await expect(testimonialHeading).toBeVisible();

    // Check testimonial quote
    const quoteText = page.getByText(/This isn't a yoga studio/);
    await expect(quoteText).toBeVisible();
  });

  test("BookingCTA section renders with CTA button", async ({ page }) => {
    const bookingSection = page.locator("#booking");
    await bookingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(bookingSection).toBeVisible();

    const ctaButton = bookingSection.getByRole("button", { name: /Claim Your Founding Spot/i });
    await expect(ctaButton).toBeVisible();
  });
});
