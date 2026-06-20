import type { MetadataRoute } from "next";

import { services } from "@/content";
import { buildAbsoluteUrl, staticSitemapRoutes } from "@/lib/seo";

const lastModified = new Date("2026-06-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = staticSitemapRoutes.map((route) => ({
    url: buildAbsoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const serviceRoutes = services
    .filter((service) => service.status === "published")
    .map((service) => ({
      url: buildAbsoluteUrl(`/hizmetler/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...staticRoutes, ...serviceRoutes];
}
