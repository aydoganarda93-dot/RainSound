export type Locale = "tr";

export type Slug = string;

export type PublishStatus = "draft" | "published" | "archived";

export type DemoState = {
  isDemo: boolean;
  replacementRequiredBeforeProduction: boolean;
  note?: string;
};

export type LinkTarget = "_self" | "_blank";

export type ExternalLink = {
  label: string;
  href: string;
  target?: LinkTarget;
};

export type ContactChannel =
  | "phone"
  | "whatsapp"
  | "instagram"
  | "maps"
  | "email";

export type ContactLink = {
  channel: ContactChannel;
  label: string;
  href: string;
  value: string;
  isPrimary?: boolean;
};

export type BusinessHoursDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type BusinessHoursEntry = {
  day: BusinessHoursDay;
  opensAt: string | null;
  closesAt: string | null;
  isClosed: boolean;
  note?: string;
};

export type SiteSettings = {
  locale: Locale;
  siteName: string;
  legalName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
    countryCode: "TR";
    display: string;
  };
  contacts: ContactLink[];
  businessHours: BusinessHoursEntry[];
  socialLinks: ExternalLink[];
  primaryCta: {
    label: string;
    href: string;
  };
};

export type MediaKind = "image" | "video" | "logo" | "document";

export type MediaSource = "real" | "ai" | "demo" | "provided";

export type MediaUsage =
  | "hero"
  | "service-card"
  | "project-gallery"
  | "before-after"
  | "logo"
  | "social"
  | "general";

export type MediaAsset = {
  id: string;
  kind: MediaKind;
  source: MediaSource;
  usage: MediaUsage[];
  src: string;
  alt: string;
  width?: number;
  height?: number;
  posterSrc?: string;
  credit?: string;
  hasUsagePermission: boolean;
  requiresPrivacyReview: boolean;
  demo: DemoState;
};

export type ServiceCategory = {
  id: string;
  slug: Slug;
  title: string;
  shortTitle?: string;
  description: string;
  order: number;
  accent: "purple" | "silver" | "dark";
  status: PublishStatus;
  demo: DemoState;
};

export type Service = {
  id: string;
  slug: Slug;
  categoryId: ServiceCategory["id"];
  title: string;
  summary: string;
  description: string;
  benefits: string[];
  process: string[];
  estimatedDurationNote: string;
  pricingNote: string;
  warrantyNote: string;
  media: MediaAsset[];
  relatedServiceIds: Service["id"][];
  status: PublishStatus;
  demo: DemoState;
};

export type BeforeAfterPair = {
  id: string;
  before: MediaAsset;
  after: MediaAsset;
  label: string;
};

export type Project = {
  id: string;
  slug: Slug;
  title: string;
  summary: string;
  vehicleLabel?: string;
  serviceIds: Service["id"][];
  cover: MediaAsset;
  gallery: MediaAsset[];
  beforeAfter: BeforeAfterPair[];
  completedAt?: string;
  privacyReviewed: boolean;
  publishPermissionConfirmed: boolean;
  status: PublishStatus;
  demo: DemoState;
};

export type Testimonial = {
  id: string;
  authorName: string;
  source?: "google" | "instagram" | "whatsapp" | "direct";
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  relatedProjectId?: Project["id"];
  status: PublishStatus;
  demo: DemoState;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  relatedServiceIds?: Service["id"][];
  order: number;
  status: PublishStatus;
  demo: DemoState;
};
