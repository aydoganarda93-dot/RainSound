import { expect, test } from "@playwright/test";

import {
  closeMobileMenu,
  getMobileMenuButton,
  getMobileNavigation,
  openMobileMenu,
} from "./helpers/navigation";
import { mobileViewport } from "./helpers/viewports";

test.describe("mobile header menu", () => {
  test.use({ viewport: mobileViewport });

  test("opens with correct aria state and traps initial focus in the panel", async ({
    page,
  }) => {
    await page.goto("/");

    const { button, panel } = await openMobileMenu(page);
    const menuId = await button.getAttribute("aria-controls");

    expect(menuId).toBeTruthy();
    await expect(button).toHaveAttribute("aria-controls", menuId!);
    await expect(panel).toHaveAttribute("id", menuId!);
    await expect(getMobileNavigation(page)).toBeVisible();

    const firstMobileLink = getMobileNavigation(page).getByRole("link").first();
    await expect(firstMobileLink).toBeFocused();
  });

  test("closes from the toggle button", async ({ page }) => {
    await page.goto("/");

    await openMobileMenu(page);
    await closeMobileMenu(page);
  });

  test("navigates to iletisim and resets the closed menu on the new page", async ({
    page,
  }) => {
    await page.goto("/");

    await openMobileMenu(page);
    await getMobileNavigation(page)
      .getByRole("link", { name: "İletişim" })
      .click();

    await expect(page).toHaveURL(/\/iletisim$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Konuşalım" }),
    ).toBeVisible();

    const menuButton = getMobileMenuButton(page);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toHaveAccessibleName("Mobil menüyü aç");
  });
});
