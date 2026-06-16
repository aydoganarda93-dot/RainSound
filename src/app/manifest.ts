import type { MetadataRoute } from "next";

import { siteSettings } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteSettings.siteName} Garage`,
    short_name: siteSettings.siteName,
    description: siteSettings.description,
    lang: siteSettings.locale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    categories: ["automotive", "business"],
  };
}
