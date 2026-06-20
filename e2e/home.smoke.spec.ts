import { expect, test } from "@playwright/test";

import { expectNoBlockingA11yViolations } from "./helpers/axe";
import { desktopViewport, mobileViewport } from "./helpers/viewports";

const heroWhatsAppLabel = "WhatsApp'tan Bilgi Al";
const heroSeoTitle = /RAIN SOUND\s+Eskişehir Araç Detailing ve Dönüşüm Merkezi/;

test.describe("home page smoke", () => {
  test.use({ viewport: desktopViewport });

  test("shows hero title and accessible WhatsApp CTA", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1, name: heroSeoTitle }),
    ).toBeVisible();

    const heroWhatsApp = page
      .getByRole("link", { name: heroWhatsAppLabel })
      .first();

    await expect(heroWhatsApp).toBeVisible();
    await expect(heroWhatsApp).toHaveAttribute("href", /wa\.me\/905539304575/);
  });

  test("shows Google testimonials without publishing archived demo comments", async ({
    page,
  }) => {
    await page.goto("/");

    const testimonials = page.getByRole("region", {
      name: "Müşterilerimiz Ne Diyor?",
    });

    await expect(testimonials).toBeVisible();
    await expect(
      testimonials.getByRole("heading", {
        level: 2,
        name: "Müşterilerimiz Ne Diyor?",
      }),
    ).toBeVisible();
    await expect(testimonials.getByText("A.").first()).toBeVisible();
    await expect(testimonials.getByText("Atılay ARSLANCAN")).toHaveCount(0);
    await expect(
      testimonials.getByText("Tüm Google yorumlarını görün"),
    ).toHaveCount(0);
    await expect(testimonials.getByText("Google yorumu").first()).toBeVisible();
    await expect(
      testimonials.getByRole("link", { name: "Randevu Sorgula" }),
    ).toHaveCount(0);
    await expect(
      testimonials.getByRole("link", { name: "WhatsApp ile Fiyat Al" }),
    ).toHaveCount(0);
    await expect(page.getByText("Demo müşteri")).toHaveCount(0);
  });

  test("has no critical or serious axe violations", async ({ page }) => {
    await page.goto("/");
    await expectNoBlockingA11yViolations(page);
  });
});

test.describe("home page mobile layout", () => {
  test.use({ viewport: mobileViewport });

  test("keeps the mobile home page compact and readable", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".rsg-marquee")).toBeHidden();
    await expect(page.locator(".rsg-service:visible")).toHaveCount(6);
    await expect(page.locator(".rsg-testimonials__card:visible")).toHaveCount(
      3,
    );

    const allServicesLink = page.getByRole("link", {
      name: "Tüm hizmetleri gör",
    });

    await expect(allServicesLink).toBeVisible();
    await expect(allServicesLink).toHaveAttribute("href", "/hizmetler");

    const viewportWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );

    expect(scrollWidth).toBe(viewportWidth);
  });
});
