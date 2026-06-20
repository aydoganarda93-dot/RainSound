import { expect, test } from "@playwright/test";

import { desktopNavigationCases } from "./helpers/constants";
import { getDesktopNavigation } from "./helpers/navigation";
import { desktopViewport } from "./helpers/viewports";

test.describe("desktop primary navigation", () => {
  test.use({ viewport: desktopViewport });

  for (const navCase of desktopNavigationCases) {
    test(`navigates to ${navCase.path} from the header`, async ({ page }) => {
      await page.goto("/");

      const desktopNav = getDesktopNavigation(page);
      await expect(desktopNav).toBeVisible();

      await desktopNav.getByRole("link", { name: navCase.label }).click();

      await expect(page).toHaveURL(new RegExp(`${navCase.path}$`));
      await expect(
        page.getByRole("heading", { level: 1, name: navCase.heading }),
      ).toBeVisible();
    });
  }

  test("returns to the home page from Ana Sayfa", async ({ page }) => {
    await page.goto("/hizmetler");

    await getDesktopNavigation(page)
      .getByRole("link", { name: "Ana Sayfa" })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "RAIN SOUND" }),
    ).toBeVisible();
  });
});
