import { siteSettings } from "./site-settings";
import type { WhatsAppMessageLink } from "./types";

export const normalizeWhatsAppMessage = (message: string) =>
  message
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

export const encodeWhatsAppMessage = (message: string) =>
  encodeURIComponent(normalizeWhatsAppMessage(message));

const whatsappContactHref =
  siteSettings.contacts.find((contact) => contact.channel === "whatsapp")
    ?.href ?? siteSettings.primaryCta.href;

export const createWhatsAppLink = (message: string) =>
  `${whatsappContactHref}?text=${encodeWhatsAppMessage(message)}`;

export const createGeneralWhatsAppMessage = () =>
  normalizeWhatsAppMessage(`
    Selam ${siteSettings.siteName} ekibi,
    Sitenizi gördüm. Hizmetleriniz hakkında bilgi almak istiyorum; müsait randevu saatlerinizi de öğrenebilir miyim?
  `);

export const generalWhatsAppLink = {
  label: siteSettings.primaryCta.label,
  href: createWhatsAppLink(createGeneralWhatsAppMessage()),
  message: createGeneralWhatsAppMessage(),
} satisfies WhatsAppMessageLink;
