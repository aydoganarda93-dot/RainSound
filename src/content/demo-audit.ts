import {
  faqs,
  projects,
  serviceCategories,
  services,
  testimonials,
} from "./fixtures";
import type {
  DemoAuditCollection,
  DemoAuditItem,
  DemoContentReport,
  DemoState,
  MediaAsset,
  MediaSource,
  Project,
  PublishStatus,
} from "./types";

const mediaSources = ["real", "ai", "demo", "provided"] as const;

const createAuditItem = ({
  collection,
  id,
  label,
  status,
  source,
  demo,
}: {
  collection: DemoAuditCollection;
  id: string;
  label: string;
  status?: PublishStatus;
  source?: MediaSource;
  demo: DemoState;
}) =>
  ({
    collection,
    id,
    label,
    status,
    source,
    demo,
  }) satisfies DemoAuditItem;

const getProjectMedia = (project: Project) => [
  project.cover,
  ...project.gallery,
  ...project.beforeAfter.flatMap((pair) => [pair.before, pair.after]),
];

const getUniqueMedia = () => {
  const media = new Map<string, MediaAsset>();

  for (const service of services) {
    for (const asset of service.media) {
      media.set(asset.id, asset);
    }
  }

  for (const project of projects) {
    for (const asset of getProjectMedia(project)) {
      media.set(asset.id, asset);
    }
  }

  return [...media.values()];
};

const getMediaSourceCounts = (mediaAssets: MediaAsset[]) =>
  mediaSources.reduce(
    (counts, source) => ({
      ...counts,
      [source]: mediaAssets.filter((asset) => asset.source === source).length,
    }),
    {
      real: 0,
      ai: 0,
      demo: 0,
      provided: 0,
    } satisfies Record<MediaSource, number>,
  );

export const demoContentAuditItems = [
  ...serviceCategories.map((category) =>
    createAuditItem({
      collection: "service-category",
      id: category.id,
      label: category.title,
      status: category.status,
      demo: category.demo,
    }),
  ),
  ...services.map((service) =>
    createAuditItem({
      collection: "service",
      id: service.id,
      label: service.title,
      status: service.status,
      demo: service.demo,
    }),
  ),
  ...projects.map((project) =>
    createAuditItem({
      collection: "project",
      id: project.id,
      label: project.title,
      status: project.status,
      demo: project.demo,
    }),
  ),
  ...getUniqueMedia().map((asset) =>
    createAuditItem({
      collection: "media",
      id: asset.id,
      label: asset.alt,
      source: asset.source,
      demo: asset.demo,
    }),
  ),
  ...testimonials.map((testimonial) =>
    createAuditItem({
      collection: "testimonial",
      id: testimonial.id,
      label: testimonial.authorName,
      status: testimonial.status,
      demo: testimonial.demo,
    }),
  ),
  ...faqs.map((faq) =>
    createAuditItem({
      collection: "faq",
      id: faq.id,
      label: faq.question,
      status: faq.status,
      demo: faq.demo,
    }),
  ),
] satisfies DemoAuditItem[];

export const demoContentProductionBlockers = demoContentAuditItems.filter(
  (item) => item.demo.replacementRequiredBeforeProduction,
);

export const demoContentReport = {
  summary: {
    totalItems: demoContentAuditItems.length,
    demoItems: demoContentAuditItems.filter((item) => item.demo.isDemo).length,
    productionBlockers: demoContentProductionBlockers.length,
    realItems: demoContentAuditItems.filter((item) => !item.demo.isDemo).length,
    mediaSourceCounts: getMediaSourceCounts(getUniqueMedia()),
  },
  items: demoContentAuditItems,
  productionBlockers: demoContentProductionBlockers,
} satisfies DemoContentReport;
