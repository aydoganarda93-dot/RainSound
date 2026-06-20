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
    Merhaba ${siteSettings.siteName},
    Hizmetleriniz hakkında bilgi almak ve uygun randevu zamanlarını öğrenmek istiyorum.
  `);

export const generalWhatsAppLink = {
  label: siteSettings.primaryCta.label,
  href: createWhatsAppLink(createGeneralWhatsAppMessage()),
  message: createGeneralWhatsAppMessage(),
} satisfies WhatsAppMessageLink;
