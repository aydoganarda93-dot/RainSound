export const whatsappHrefPattern = /wa\.me\/905539304575/;
export const phoneHref = "tel:+905539304575";
export const mapsHrefPattern = /google\.com\/maps/;
export const heroWhatsAppLabel = "WhatsApp'tan Bilgi Al";

export const desktopNavigationCases = [
  {
    label: "Hizmetler",
    path: "/hizmetler",
    heading: /Aracın için\s+tek atölye/i,
  },
  {
    label: "Hakkımızda",
    path: "/hakkimizda",
    heading: "Aracın karakterini ortaya çıkar.",
  },
  {
    label: "İletişim",
    path: "/iletisim",
    heading: "Konuşalım",
  },
] as const;
