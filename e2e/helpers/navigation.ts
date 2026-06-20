import { expect, type Locator, type Page } from "@playwright/test";

import { whatsappHrefPattern } from "./constants";

export const getSiteHeader = (page: Page) =>
  page.getByRole("banner", { name: "Site üst menüsü" });

export const getDesktopNavigation = (page: Page) =>
  page.getByRole("navigation", { name: "Ana navigasyon" });

export const getMobileMenuButton = (page: Page) =>
  getSiteHeader(page).getByRole("button", {
    name: /Mobil menüyü (?:aç|kapat)/,
  });

export const getMobileNavigation = (page: Page) =>
  page.getByRole("navigation", { name: "Mobil ana navigasyon" });

export const getQuickContactBar = (page: Page) =>
  page.getByRole("complementary", { name: "Hızlı iletişim" });

export const getMobileMenuPanel = async (page: Page) => {
  const button = getMobileMenuButton(page);
  const menuId = await button.getAttribute("aria-controls");

  expect(menuId).toBeTruthy();

  return page.locator(`#${menuId}`);
};

export const openMobileMenu = async (page: Page) => {
  const button = getMobileMenuButton(page);

  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toHaveAttribute("aria-controls", /.+/);

  const panel = await getMobileMenuPanel(page);
  await button.scrollIntoViewIfNeeded();
  await button.click();

  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).toHaveAccessibleName("Mobil menüyü kapat");
  await expect(panel).toBeVisible();

  return { button, panel };
};

export const closeMobileMenu = async (page: Page) => {
  const button = getMobileMenuButton(page);

  await button.click();

  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toHaveAccessibleName("Mobil menüyü aç");

  const panel = await getMobileMenuPanel(page);
  await expect(panel).toBeHidden();
};

export const expectWhatsAppLink = async (link: Locator) => {
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", whatsappHrefPattern);
};
