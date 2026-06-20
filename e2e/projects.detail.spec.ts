import { expect, test } from "@playwright/test";

import {
  archivedDemoProjectPath,
  notFoundTitle,
} from "./helpers/project-fixtures";
import { desktopViewport } from "./helpers/viewports";

test.describe("archived demo project routes", () => {
  test.use({ viewport: desktopViewport });

  test("does not publish archived demo project detail pages", async ({
    page,
  }) => {
    const response = await page.goto(archivedDemoProjectPath);

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: notFoundTitle }),
    ).toBeVisible();
  });

  test("keeps archived demo media interactions unavailable publicly", async ({
    page,
  }) => {
    await page.goto(archivedDemoProjectPath);

    await expect(page.getByRole("slider")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Videoyu Aç" })).toHaveCount(
      0,
    );
  });
});
