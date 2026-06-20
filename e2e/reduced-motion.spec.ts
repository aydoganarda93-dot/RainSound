import { test } from "@playwright/test";

import {
  emulateReducedMotion,
  expectDecorativeMotionPaused,
} from "./helpers/motion";
import { desktopViewport } from "./helpers/viewports";

test.describe("reduced motion", () => {
  test.use({ viewport: desktopViewport });

  test("pauses decorative marquee and equalizer motion on the home page", async ({
    page,
  }) => {
    await emulateReducedMotion(page);
    await page.goto("/");

    await expectDecorativeMotionPaused(page);
  });
});
