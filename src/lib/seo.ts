import type { Metadata } from "next";

import { siteSettings } from "@/content";
import type { Project, Service } from "@/content";

export type SitePath = `/${string}`;

export type BreadcrumbItem = {
  label: string;
  href: SitePath;
};

export type JsonLd = Record<string, unknown>;

export type SitemapRoute = {
  label: string;
  path: SitePath;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: SitePath;
  type?: "website" | "article";
};

export const staticSitemapRoutes = [
  {
    label: siteSettings.siteName,
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    label: "Hakkımızda",
    path: "/hakkimizda",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    label: "Hizmetler",
    path: "/hizmetler",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    label: "Dönüşümler",
    path: "/projeler",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    label: "İletişim ve Yol Tarifi",
    path: "/iletisim",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    label: "Gizlilik Politikası",
    path: "/gizlilik",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    label: "Çerez Bilgilendirmesi",
    path: "/cerezler",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] satisfies SitemapRoute[];

const getPageTitle = (title: string) =>
  title === siteSettings.siteName
    ? title
    : `${title} | ${siteSettings.siteName}`;

export const buildAbsoluteUrl = (path: SitePath) =>
  new URL(path, siteSettings.siteUrl).toString();

const businessId = buildAbsoluteUrl("/#business");

const schemaDayByBusinessDay = {
  monday: "https://schema.org/Monday",
  tuesday: "https://schema.org/Tuesday",
  wednesday: "https://schema.org/Wednesday",
  thursday: "https://schema.org/Thursday",
  friday: "https://schema.org/Friday",
  saturday: "https://schema.org/Saturday",
  sunday: "https://schema.org/Sunday",
} satisfies Record<
  (typeof siteSettings.businessHours)[number]["day"],
  `https://schema.org/${string}`
>;

const phoneContact = siteSettings.contacts.find(
  (contact) => contact.channel === "phone",
);

const getTelephoneValue = () =>
  phoneContact?.href.replace("tel:", "") ?? phoneContact?.value;

export const buildPageMetadata = ({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata => {
  const pageTitle = getPageTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: "tr_TR",
      url: path,
      siteName: siteSettings.siteName,
      title: pageTitle,
      description,
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
    },
  };
};

export const createBreadcrumbs = (
  currentPage: BreadcrumbItem,
  parents: BreadcrumbItem[] = [],
) =>
  [
    {
      label: "Ana Sayfa",
      href: "/",
    },
    ...parents,
    currentPage,
  ] satisfies BreadcrumbItem[];

export const pageBreadcrumbs = {
  about: createBreadcrumbs({
    label: "Hakkımızda",
    href: "/hakkimizda",
  }),
  services: createBreadcrumbs({
    label: "Hizmetler",
    href: "/hizmetler",
  }),
  projects: createBreadcrumbs({
    label: "Galeri",
    href: "/projeler",
  }),
  contact: createBreadcrumbs({
    label: "İletişim",
    href: "/iletisim",
  }),
  privacy: createBreadcrumbs({
    label: "Gizlilik Politikası",
    href: "/gizlilik",
  }),
  cookies: createBreadcrumbs({
    label: "Çerez Bilgilendirmesi",
    href: "/cerezler",
  }),
} as const;

export const getServiceBreadcrumbs = (service: Service) =>
  createBreadcrumbs(
    {
      label: service.title,
      href: `/hizmetler/${service.slug}`,
    },
    [
      {
        label: "Hizmetler",
        href: "/hizmetler",
      },
    ],
  );

export const getProjectBreadcrumbs = (project: Project) =>
  createBreadcrumbs(
    {
      label: project.title,
      href: `/projeler/${project.slug}`,
    },
    [
      {
        label: "Galeri",
        href: "/projeler",
      },
    ],
  );

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) =>
  ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.href),
    })),
  }) satisfies JsonLd;

export const buildLocalBusinessJsonLd = () =>
  ({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": businessId,
    name: siteSettings.legalName,
    url: siteSettings.siteUrl,
    description: siteSettings.description,
    telephone: getTelephoneValue(),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.street,
      addressLocality: siteSettings.address.district,
      addressRegion: siteSettings.address.city,
      postalCode: siteSettings.address.postalCode,
      addressCountry: siteSettings.address.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: siteSettings.address.city,
    },
    openingHoursSpecification: siteSettings.businessHours
      .filter((entry) => !entry.isClosed && entry.opensAt && entry.closesAt)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schemaDayByBusinessDay[entry.day],
        opens: entry.opensAt,
        closes: entry.closesAt,
      })),
    sameAs: siteSettings.socialLinks.map((link) => link.href),
  }) satisfies JsonLd;

export const buildServiceJsonLd = (service: Service) =>
  ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": buildAbsoluteUrl(`/hizmetler/${service.slug}#service`),
    name: service.title,
    description: service.description,
    serviceType: service.title,
    areaServed: {
      "@type": "City",
      name: siteSettings.address.city,
    },
    provider: {
      "@id": businessId,
    },
    url: buildAbsoluteUrl(`/hizmetler/${service.slug}`),
  }) satisfies JsonLd;

export const buildServiceListJsonLd = (serviceList: Service[]) =>
  ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: serviceList.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildServiceJsonLd(service),
    })),
  }) satisfies JsonLd;
