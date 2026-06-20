import { expect, test } from "@playwright/test";

import {
  archivedDemoProjectPath,
  notFoundTitle,
} from "./helpers/project-fixtures";
import { desktopViewport } from "./helpers/viewports";

test.describe("projects gallery", () => {
  test.use({ viewport: desktopViewport });

  test("loads vitrin cards without publishing demo project details", async ({
    page,
  }) => {
    await page.goto("/projeler");

    await expect(
      page.getByRole("heading", { level: 1, name: /Çalışma\s+alanlarımız/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Dört uzmanlık alanı" }),
    ).toBeVisible();

    const firstCategoryCard = page
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { level: 3 }) })
      .first();

    await expect(firstCategoryCard).toBeVisible();
    await expect(firstCategoryCard).toHaveAttribute("href", /\/hizmetler#/);

    const response = await page.goto(archivedDemoProjectPath);

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { level: 1, name: notFoundTitle }),
    ).toBeVisible();
  });
});
