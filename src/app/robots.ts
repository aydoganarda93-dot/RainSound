import type { MetadataRoute } from "next";

import { siteSettings } from "@/content";
import { buildAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: buildAbsoluteUrl("/sitemap.xml"),
    host: siteSettings.siteUrl,
  };
}
