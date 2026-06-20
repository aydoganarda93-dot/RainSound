import { expect, test } from "@playwright/test";

import {
  archivedDemoProjectPath,
  notFoundTitle,
} from "./helpers/project-fixtures";
import { desktopViewport } from "./helpers/viewports";

test.describe("projects gallery", () => {
  test.use({ viewport: desktopViewport });

  test("keeps the removed gallery index unavailable publicly", async ({
    page,
  }) => {
    const galleryResponse = await page.goto("/projeler");

    expect(galleryResponse?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: notFoundTitle }),
    ).toBeVisible();

    const archivedResponse = await page.goto(archivedDemoProjectPath);

    expect(archivedResponse?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: notFoundTitle }),
    ).toBeVisible();
  });
});
