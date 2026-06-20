import { expect, test } from "@playwright/test";

import { expectNoBlockingA11yViolations } from "./helpers/axe";
import { desktopViewport } from "./helpers/viewports";

const siteName = "RAIN SOUND";
const heroWhatsAppLabel = "WhatsApp'tan Bilgi Al";

test.describe("home page smoke", () => {
  test.use({ viewport: desktopViewport });

  test("shows hero title and accessible WhatsApp CTA", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: siteName }),
    ).toBeVisible();

    const heroWhatsApp = page
      .getByRole("link", { name: heroWhatsAppLabel })
      .first();

    await expect(heroWhatsApp).toBeVisible();
    await expect(heroWhatsApp).toHaveAttribute("href", /wa\.me\/905539304575/);
  });

  test("has no critical or serious axe violations", async ({ page }) => {
    await page.goto("/");
    await expectNoBlockingA11yViolations(page);
  });
});
