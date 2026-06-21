import { projects, services } from "./fixtures";
import { siteSettings } from "./site-settings";
import {
  createWhatsAppLink,
  normalizeWhatsAppMessage,
} from "./contact-actions";
import type {
  Project,
  Service,
  WhatsAppMessageContext,
  WhatsAppMessageLink,
  WhatsAppMessageTemplate,
} from "./types";

export {
  createGeneralWhatsAppMessage,
  createWhatsAppLink,
  encodeWhatsAppMessage,
  generalWhatsAppLink,
} from "./contact-actions";

export const whatsappMessageTemplates = [
  {
    id: "general-contact",
    context: "general",
    label: "Genel bilgi ve randevu",
  },
  {
    id: "service-detail",
    context: "service",
    label: "Hizmet hakkında bilgi",
  },
  {
    id: "project-detail",
    context: "project",
    label: "Benzer proje talebi",
  },
] satisfies WhatsAppMessageTemplate[];

const serviceIntentMessages = {
  appointment:
    "Aracımın tipini ve bana uygun randevu saatini birazdan yazacağım.",
  quote:
    "Aracımın marka/modelini ve yaptırmak istediğim işlemleri yazacağım; fiyat almak istiyorum.",
  consultation:
    "Aracımı ve aklımdakini yazacağım; doğru hizmete yönlendirirseniz sevinirim.",
  "product-info":
    "Aracımın modelini ve aklımdaki ürünü yazacağım; seçenekleri öğrenmek istiyorum.",
  "project-review":
    "Aracımın birkaç fotoğrafını ve istediğim sonucu yazacağım; birlikte bakalım.",
} satisfies Record<Service["ctaContext"]["intent"], string>;

export const getWhatsAppTemplateByContext = (context: WhatsAppMessageContext) =>
  whatsappMessageTemplates.find((template) => template.context === context);

export const createServiceWhatsAppMessage = (service: Service) =>
  normalizeWhatsAppMessage(`
    Selam ${siteSettings.siteName} ekibi,
    ${service.title} hakkında yazıyorum.
    ${serviceIntentMessages[service.ctaContext.intent]}
  `);

export const createProjectWhatsAppMessage = (project: Project) => {
  const relatedServices = services.filter((service) =>
    project.serviceIds.includes(service.id),
  );
  const relatedServiceTitles = relatedServices
    .map((service) => service.title)
    .join(", ");
  const serviceMessageHints = relatedServices
    .map((service) => `- ${service.title}: ${service.ctaContext.messageHint}`)
    .join("\n");

  return normalizeWhatsAppMessage(`
    Selam ${siteSettings.siteName} ekibi,
    ${project.title} gibi bir iş yaptırmak istiyorum.
    İlgilendiğim hizmetler: ${relatedServiceTitles || "henüz net değil"}
    ${serviceMessageHints ? `Notlarım:\n${serviceMessageHints}` : "Aracımı ve beklentimi birazdan yazacağım."}
  `);
};

export const getServiceWhatsAppLink = (service: Service) =>
  ({
    label: service.ctaContext.label,
    href: createWhatsAppLink(createServiceWhatsAppMessage(service)),
    message: createServiceWhatsAppMessage(service),
  }) satisfies WhatsAppMessageLink;

export const getProjectWhatsAppLink = (project: Project) =>
  ({
    label: "Benzer iş için yaz",
    href: createWhatsAppLink(createProjectWhatsAppMessage(project)),
    message: createProjectWhatsAppMessage(project),
  }) satisfies WhatsAppMessageLink;

export const serviceWhatsAppLinks = services.map((service) => ({
  serviceId: service.id,
  ...getServiceWhatsAppLink(service),
}));

export const projectWhatsAppLinks = projects
  .filter(
    (project) =>
      project.status === "published" &&
      project.contentReadiness.productionCandidate,
  )
  .map((project) => ({
    projectId: project.id,
    ...getProjectWhatsAppLink(project),
  }));
