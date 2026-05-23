import { test, expect } from "@playwright/test";

async function waitForPageLoad(page: any) {
  await page.waitForTimeout(3000);
}

test.describe("Responsive / Mobile Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("No horizontal overflow on the page (scrollWidth <= viewportWidth)", async ({ page }) => {
    const viewportSize = page.viewportSize();
    const viewportWidth = viewportSize?.width ?? 393;

    const overflowInfo = await page.evaluate(() => {
      const sections = document.querySelectorAll("section, header, footer, main");
      const overflowing: { selector: string; scrollWidth: number; offsetWidth: number }[] = [];
      sections.forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 2) {
          overflowing.push({
            selector: el.tagName + (el.id ? `#${el.id}` : "") + (el.className ? `.${el.className.split(" ")[0]}` : ""),
            scrollWidth: el.scrollWidth,
            offsetWidth: el.clientWidth,
          });
        }
      });
      return {
        bodyScrollWidth: document.body.scrollWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        overflowingElements: overflowing,
      };
    });

    console.log(`Viewport width: ${viewportWidth}`);
    console.log(`Body scrollWidth: ${overflowInfo.bodyScrollWidth}`);
    console.log(`Document scrollWidth: ${overflowInfo.documentScrollWidth}`);
    if (overflowInfo.overflowingElements.length > 0) {
      console.log("Overflowing elements:", JSON.stringify(overflowInfo.overflowingElements));
    }

    expect(overflowInfo.documentScrollWidth).toBeLessThanOrEqual(viewportWidth + 2);
  });

  test("Hero heading font size is >= 12px", async ({ page }) => {
    const h1 = page.locator("h1").first();
    const fontSize = await h1.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return parseFloat(style.fontSize);
    });
    console.log(`Hero h1 font size: ${fontSize}px`);
    expect(fontSize).toBeGreaterThanOrEqual(12);
  });

  test("Hero CTA button text is readable (font size >= 12px)", async ({ page }) => {
    const ctaButton = page.getByRole("button", { name: /Book Your First Class/i });
    const fontSize = await ctaButton.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return parseFloat(style.fontSize);
    });
    console.log(`CTA button font size: ${fontSize}px`);
    expect(fontSize).toBeGreaterThanOrEqual(12);
  });

  test("Section headings have readable font sizes (>= 12px)", async ({ page }) => {
    const sections = ["#about", "#method", "#classes", "#teachers", "#booking"];
    for (const sectionId of sections) {
      const section = page.locator(sectionId);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const heading = section.locator("h2").first();
      const isVisible = await heading.isVisible().catch(() => false);
      if (!isVisible) {
        console.log(`No visible h2 found in ${sectionId}`);
        continue;
      }

      const fontSize = await heading.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return parseFloat(style.fontSize);
      });
      console.log(`${sectionId} h2 font size: ${fontSize}px`);
      expect(fontSize).toBeGreaterThanOrEqual(12);
    }
  });

  test("Images do not overflow their containers", async ({ page }) => {
    // Scroll through the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const overflowingImages = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const overflowing: { src: string; imgWidth: number; parentWidth: number }[] = [];
      images.forEach((img) => {
        const parent = img.parentElement;
        if (!parent) return;
        if (img.naturalWidth === 0) return; // Skip unloaded images
        const imgRect = img.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        if (imgRect.right > parentRect.right + 2 || imgRect.left < parentRect.left - 2) {
          overflowing.push({
            src: img.src,
            imgWidth: Math.round(imgRect.width),
            parentWidth: Math.round(parentRect.width),
          });
        }
      });
      return overflowing;
    });

    if (overflowingImages.length > 0) {
      console.log("Overflowing images:", JSON.stringify(overflowingImages));
    }

    expect(overflowingImages).toHaveLength(0);
  });

  test("Booking modal fits within mobile viewport", async ({ page }) => {
    const viewportSize = page.viewportSize();
    const viewportWidth = viewportSize?.width ?? 393;
    const viewportHeight = viewportSize?.height ?? 851;

    // Open booking modal via mobile menu (since navbar CTA is hidden on mobile)
    const hamburger = page.getByRole("button", { name: /Open menu/i });
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await page.waitForTimeout(500);

    const bookBtn = page.getByRole("button", { name: /Book a Class/i });
    await expect(bookBtn).toBeVisible();
    await bookBtn.click();
    await page.waitForTimeout(500);

    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });

    const modalBox = await modal.boundingBox();
    console.log(`Modal dimensions: ${JSON.stringify(modalBox)}`);
    console.log(`Viewport: ${viewportWidth}x${viewportHeight}`);

    expect(modalBox).not.toBeNull();
    // Modal should not overflow horizontally
    expect(modalBox!.x).toBeGreaterThanOrEqual(0);
    expect(modalBox!.x + modalBox!.width).toBeLessThanOrEqual(viewportWidth + 2);

    // Modal container should have scroll capability (max-h-[92vh])
    // Just check it starts within reasonable viewport bounds
    expect(modalBox!.y).toBeGreaterThanOrEqual(0);
  });

  test("Main page sections are not hidden with display:none or visibility:hidden", async ({ page }) => {
    const sectionIds = ["#about", "#method", "#classes", "#teachers", "#booking"];

    for (const sectionId of sectionIds) {
      const section = page.locator(sectionId);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const isHidden = await section.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.display === "none" || style.visibility === "hidden";
      });

      if (isHidden) {
        console.warn(`Section ${sectionId} is hidden via CSS`);
      }
      expect(isHidden).toBe(false);
    }
  });

  test("Navbar stays fixed at top when scrolling", async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);

    const header = page.locator("header");
    const boundingBox = await header.boundingBox();
    console.log(`Header position after scroll: ${JSON.stringify(boundingBox)}`);

    // Fixed header should stay at top
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.y).toBeLessThanOrEqual(5); // Allow tiny offset
  });
});
