import { expect, test } from "@playwright/test";

import {
  heroWhatsAppLabel,
  mapsHrefPattern,
  phoneHref,
} from "./helpers/constants";
import {
  expectWhatsAppLink,
  getSiteHeader,
  openMobileMenu,
} from "./helpers/navigation";
import { desktopViewport, mobileViewport } from "./helpers/viewports";

test.describe("conversion contact links", () => {
  test.describe("desktop placements", () => {
    test.use({ viewport: desktopViewport });

    test("exposes WhatsApp link in the header", async ({ page }) => {
      await page.goto("/");

      await expectWhatsAppLink(
        getSiteHeader(page).getByRole("link", {
          name: heroWhatsAppLabel,
        }),
      );
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

    test("shows the real shopfront visual on the contact page", async ({
      page,
    }) => {
      await page.goto("/iletisim");

      const shopfrontImage = page.getByRole("img", {
        name: "RAIN SOUND Odunpazarı uygulama merkezi girişi",
      });

      await expect(shopfrontImage).toBeVisible();
      await expect(shopfrontImage).toHaveAttribute(
        "src",
        "/media/real/brand/rain-sound-shopfront.jpg",
      );
      await expect
        .poll(() =>
          shopfrontImage.evaluate(
            (image) => (image as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
    });
  });

  test.describe("mobile placements", () => {
    test.use({ viewport: mobileViewport });

    test("exposes WhatsApp in the mobile menu", async ({ page }) => {
      await page.goto("/");

      await openMobileMenu(page);
      const panel = page.locator('[data-open="true"]');
      await expectWhatsAppLink(
        panel.getByRole("link", { name: heroWhatsAppLabel }),
      );
    });
  });
});
