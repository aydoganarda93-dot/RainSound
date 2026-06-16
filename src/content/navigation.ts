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
    label: "Projeler",
    href: "/projeler",
    matchPath: "/projeler",
  },
  {
    label: "İletişim",
    href: "/iletisim",
    matchPath: "/iletisim",
  },
] satisfies NavigationItem[];
