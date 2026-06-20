import { expect, type Page } from "@playwright/test";

export const emulateReducedMotion = async (page: Page) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
};

export const expectDecorativeMotionPaused = async (page: Page) => {
  const marqueeAnimation = await page
    .locator(".rsg-marquee__track")
    .evaluate((element) => getComputedStyle(element).animationName);

  const equalizerAnimation = await page
    .locator(".rsg-hero__eq span")
    .first()
    .evaluate((element) => getComputedStyle(element).animationName);

  expect(marqueeAnimation).toBe("none");
  expect(equalizerAnimation).toBe("none");
};
