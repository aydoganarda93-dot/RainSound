import type { NavigationItem } from "./types";

export const primaryNavigation = [
  {
    label: "Ana Sayfa",
    href: "/",
    matchPath: "/",
    isPrimary: true,
  },
  {
    label: "Hizmetler",
    href: "/hizmetler",
    matchPath: "/hizmetler",
  },
  {
    label: "Hakkımızda",
    href: "/hakkimizda",
    matchPath: "/hakkimizda",
  },
  {
    label: "İletişim",
    href: "/iletisim",
    matchPath: "/iletisim",
  },
] satisfies NavigationItem[];

export const legalNavigation = [
  {
    label: "Gizlilik Politikası",
    href: "/gizlilik",
    matchPath: "/gizlilik",
  },
  {
    label: "Çerez Bilgilendirmesi",
    href: "/cerezler",
    matchPath: "/cerezler",
  },
] satisfies NavigationItem[];
