import { expect, test } from "@playwright/test";

import { desktopViewport } from "./helpers/viewports";

test.describe("services page smoke", () => {
  test.use({ viewport: desktopViewport });

  test("loads the services hub with its primary heading", async ({ page }) => {
    await page.goto("/hizmetler");

    await expect(page).toHaveURL(/\/hizmetler$/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Aracın için\s+tek atölye/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "WhatsApp'tan Bilgi Al" }).first(),
    ).toBeVisible();
  });
});
