import { test, expect } from "@playwright/test";

async function waitForPageLoad(page: any) {
  await page.waitForTimeout(3000);
}

async function openBookingModal(page: any) {
  // Open the mobile menu first (since we're on mobile viewport)
  const hamburger = page.getByRole("button", { name: /Open menu/i });
  await expect(hamburger).toBeVisible();
  await hamburger.click();
  await page.waitForTimeout(500);

  // Click "Book a Class" inside the mobile menu
  const bookBtn = page.getByRole("button", { name: /Book a Class/i });
  await expect(bookBtn).toBeVisible();
  await bookBtn.click();
  await page.waitForTimeout(500);

  // Modal should now be open
  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible({ timeout: 5000 });
  return modal;
}

test.describe("Booking Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForPageLoad(page);
  });

  test("Clicking CTA button opens the booking modal", async ({ page }) => {
    // Scroll to booking CTA section
    const bookingSection = page.locator("#booking");
    await bookingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Click the main CTA button
    const ctaButton = bookingSection.getByRole("button", { name: /Claim Your Founding Spot/i });
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    await page.waitForTimeout(500);

    // Modal should be open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible({ timeout: 5000 });
  });

  test("Modal contains name, email, phone fields and class selector", async ({ page }) => {
    const modal = await openBookingModal(page);

    // Check form fields
    const nameField = modal.locator("#bk-name");
    const emailField = modal.locator("#bk-email");
    const phoneField = modal.locator("#bk-phone");
    const classSelect = modal.locator("#bk-class");

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(phoneField).toBeVisible();
    await expect(classSelect).toBeVisible();

    // Verify field types
    expect(await nameField.getAttribute("type")).toBe("text");
    expect(await emailField.getAttribute("type")).toBe("email");
    expect(await phoneField.getAttribute("type")).toBe("tel");
    expect(await classSelect.evaluate((el) => el.tagName.toLowerCase())).toBe("select");
  });

  test("Submitting empty form shows validation errors", async ({ page }) => {
    const modal = await openBookingModal(page);

    // Click submit without filling anything
    const submitBtn = modal.getByRole("button", { name: /Confirm Booking/i });
    await submitBtn.click();
    await page.waitForTimeout(300);

    // Check that validation error messages appear
    const nameError = page.locator("#bk-name-error");
    const emailError = page.locator("#bk-email-error");
    const phoneError = page.locator("#bk-phone-error");

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(phoneError).toBeVisible();

    expect(await nameError.textContent()).toContain("Please enter your name");
    expect(await emailError.textContent()).toContain("Please enter your email");
    expect(await phoneError.textContent()).toContain("Please enter your phone number");
  });

  test("Submitting with invalid email shows email validation error", async ({ page }) => {
    const modal = await openBookingModal(page);

    // Fill name and phone but use invalid email
    await modal.locator("#bk-name").fill("Test User");
    await modal.locator("#bk-email").fill("not-a-valid-email");
    await modal.locator("#bk-phone").fill("1234567890");

    const submitBtn = modal.getByRole("button", { name: /Confirm Booking/i });
    await submitBtn.click();
    await page.waitForTimeout(300);

    // Should show email validation error
    const emailError = page.locator("#bk-email-error");
    await expect(emailError).toBeVisible();
    expect(await emailError.textContent()).toContain("valid email");
  });

  test("Submit with valid data shows confirmation or API response", async ({ page }) => {
    const modal = await openBookingModal(page);

    // Fill in all valid data
    await modal.locator("#bk-name").fill("Test User");
    await modal.locator("#bk-email").fill("test@example.com");
    await modal.locator("#bk-phone").fill("1234567890");
    await modal.locator("#bk-class").selectOption("Fascia Flow");

    // Submit the form
    const submitBtn = modal.getByRole("button", { name: /Confirm Booking/i });
    await submitBtn.click();

    // Wait for either success or error response
    await page.waitForTimeout(3000);

    // Check for success state (booking confirmed) OR error state (API failed but UI responded)
    const successHeading = page.getByText("You're booked.");
    const submitError = page.locator('[role="alert"]');
    const errorText = modal.locator(".text-red-400");

    const hasSuccess = await successHeading.isVisible().catch(() => false);
    const hasError = await submitError.isVisible().catch(() => false);
    const hasErrorMsg = await errorText.isVisible().catch(() => false);

    console.log(`Booking result - success: ${hasSuccess}, error: ${hasError || hasErrorMsg}`);

    // Either success OR an error message should be shown (not silent failure)
    expect(hasSuccess || hasError || hasErrorMsg).toBe(true);
  });

  test("Booking modal can be closed with X button", async ({ page }) => {
    const modal = await openBookingModal(page);

    // Close with X button
    const closeButton = page.getByRole("button", { name: /^Close$/i }).first();
    await closeButton.click();
    await page.waitForTimeout(500);

    await expect(modal).not.toBeVisible();
  });

  test("Booking modal closes when clicking outside (backdrop)", async ({ page }) => {
    const modal = await openBookingModal(page);

    // The backdrop button is behind the modal dialog - click at a coordinate outside the dialog
    // The modal dialog is centered; click at the very top-left corner (outside dialog)
    const viewportSize = page.viewportSize();
    const vw = viewportSize?.width ?? 393;

    // Click in the top-left corner (should hit backdrop since modal is centered)
    await page.mouse.click(5, 5);
    await page.waitForTimeout(800);

    await expect(modal).not.toBeVisible();
  });

  test("Class selector has all 4 class options", async ({ page }) => {
    const modal = await openBookingModal(page);
    const classSelect = modal.locator("#bk-class");

    const options = await classSelect.locator("option").allTextContents();
    console.log("Class options:", options);

    expect(options).toContain("Fascia Flow");
    expect(options).toContain("Mobility Architecture");
    expect(options).toContain("Yin Deep Tissue");
    expect(options).toContain("Recovery");
  });
});
