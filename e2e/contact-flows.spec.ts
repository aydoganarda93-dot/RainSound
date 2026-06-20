import { expect, test } from "@playwright/test";

import {
  heroWhatsAppLabel,
  mapsHrefPattern,
  phoneHref,
} from "./helpers/constants";
import {
  expectWhatsAppLink,
  getQuickContactBar,
  getSiteHeader,
  openMobileMenu,
} from "./helpers/navigation";
import { desktopViewport, mobileViewport } from "./helpers/viewports";

test.describe("conversion contact links", () => {
  test.describe("desktop placements", () => {
    test.use({ viewport: desktopViewport });

    test("exposes WhatsApp links in hero and header", async ({ page }) => {
      await page.goto("/");

      await expectWhatsAppLink(
        page.getByRole("link", { name: heroWhatsAppLabel }).first(),
      );
      await expectWhatsAppLink(
        getSiteHeader(page).getByRole("link", {
          name: heroWhatsAppLabel,
        }),
      );
    });

    test("exposes phone and directions links in the quick contact bar", async ({
      page,
    }) => {
      await page.goto("/");

      const quickContact = getQuickContactBar(page);
      const phoneLink = quickContact.getByRole("link", { name: "Ara" });
      const directionsLink = quickContact.getByRole("link", {
        name: "Yol Tarifi",
      });

      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toHaveAttribute("href", phoneHref);

      await expect(directionsLink).toBeVisible();
      await expect(directionsLink).toHaveAttribute("href", mapsHrefPattern);
      await expect(directionsLink).toHaveAttribute("target", "_blank");
      await expect(directionsLink).toHaveAttribute("rel", "noreferrer");
    });

    test("exposes phone and directions links in the footer", async ({
      page,
    }) => {
      await page.goto("/");

      const footer = page.getByRole("contentinfo");
      const phoneLink = footer.getByRole("link", { name: "0553 930 45 75" });
      const directionsLink = footer.getByRole("link", {
        name: "Yol Tarifi Al",
      });

      await expect(phoneLink).toBeVisible();
      await expect(phoneLink).toHaveAttribute("href", phoneHref);

      await expect(directionsLink).toBeVisible();
      await expect(directionsLink).toHaveAttribute("href", mapsHrefPattern);
      await expect(directionsLink).toHaveAttribute("target", "_blank");
      await expect(directionsLink).toHaveAttribute("rel", "noreferrer");
    });
  });

  test.describe("mobile placements", () => {
    test.use({ viewport: mobileViewport });

    test("exposes WhatsApp in quick contact and the mobile menu", async ({
      page,
    }) => {
      await page.goto("/");

      await expectWhatsAppLink(
        getQuickContactBar(page).getByRole("link", { name: "WhatsApp" }),
      );

      await openMobileMenu(page);
      const panel = page.locator('[data-open="true"]');
      await expectWhatsAppLink(
        panel.getByRole("link", { name: heroWhatsAppLabel }),
      );
    });
  });
});
