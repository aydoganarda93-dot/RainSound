import { projects, services } from "./fixtures";
import { businessContactLinks, siteSettings } from "./site-settings";
import type {
  Project,
  Service,
  WhatsAppMessageContext,
  WhatsAppMessageLink,
  WhatsAppMessageTemplate,
} from "./types";

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

const normalizeMessage = (message: string) =>
  message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

const serviceIntentMessages = {
  appointment: "Araç tipimi ve uygun randevu zamanımı paylaşmak istiyorum.",
  quote:
    "Araç marka/modelimi ve işlem kapsamını paylaşarak teklif almak istiyorum.",
  consultation:
    "Araç bilgimi ve beklentimi paylaşarak yönlendirme almak istiyorum.",
  "product-info":
    "Araç modelimi ve ürün beklentimi paylaşarak seçenekleri öğrenmek istiyorum.",
  "project-review":
    "Araç fotoğraflarımı ve istediğim sonucu paylaşarak değerlendirme almak istiyorum.",
} satisfies Record<Service["ctaContext"]["intent"], string>;

export const getWhatsAppTemplateByContext = (context: WhatsAppMessageContext) =>
  whatsappMessageTemplates.find((template) => template.context === context);

export const encodeWhatsAppMessage = (message: string) =>
  encodeURIComponent(normalizeMessage(message));

export const createWhatsAppLink = (message: string) =>
  `${businessContactLinks.whatsapp}?text=${encodeWhatsAppMessage(message)}`;

export const createGeneralWhatsAppMessage = () =>
  normalizeMessage(`
    Merhaba ${siteSettings.siteName},
    Hizmetleriniz hakkında bilgi almak ve uygun randevu zamanlarını öğrenmek istiyorum.
  `);

export const createServiceWhatsAppMessage = (service: Service) =>
  normalizeMessage(`
    Merhaba ${siteSettings.siteName},
    ${service.title} hizmeti hakkında bilgi almak istiyorum.
    Talep türü: ${service.ctaContext.label}
    ${serviceIntentMessages[service.ctaContext.intent]}
  `);

export const createProjectWhatsAppMessage = (project: Project) => {
  const relatedServices = services
    .filter((service) => project.serviceIds.includes(service.id))
    .map((service) => service.title)
    .join(", ");

  return normalizeMessage(`
    Merhaba ${siteSettings.siteName},
    ${project.title} benzeri bir uygulama hakkında bilgi almak istiyorum.
    İlgilendiğim hizmetler: ${relatedServices || "Belirlenecek"}
    Araç bilgimi ve beklentimi paylaşmak istiyorum.
  `);
};

export const generalWhatsAppLink = {
  label: siteSettings.primaryCta.label,
  href: createWhatsAppLink(createGeneralWhatsAppMessage()),
  message: createGeneralWhatsAppMessage(),
} satisfies WhatsAppMessageLink;

export const getServiceWhatsAppLink = (service: Service) =>
  ({
    label: service.ctaContext.label,
    href: createWhatsAppLink(createServiceWhatsAppMessage(service)),
    message: createServiceWhatsAppMessage(service),
  }) satisfies WhatsAppMessageLink;

export const getProjectWhatsAppLink = (project: Project) =>
  ({
    label: "Benzer proje için WhatsApp'tan bilgi al",
    href: createWhatsAppLink(createProjectWhatsAppMessage(project)),
    message: createProjectWhatsAppMessage(project),
  }) satisfies WhatsAppMessageLink;

export const serviceWhatsAppLinks = services.map((service) => ({
  serviceId: service.id,
  ...getServiceWhatsAppLink(service),
}));

export const projectWhatsAppLinks = projects.map((project) => ({
  projectId: project.id,
  ...getProjectWhatsAppLink(project),
}));
