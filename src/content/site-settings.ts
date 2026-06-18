import type { ContactChannel, SiteSettings } from "./types";

export const businessContactLinks = {
  whatsapp: "https://wa.me/905539304575",
  phone: "tel:+905539304575",
  instagram: "https://www.instagram.com/rainsound2634/",
  maps: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x14cc3d75025d88ff:0x2767f568f912a257",
} as const;

export const siteSettings = {
  locale: "tr",
  siteName: "RAIN SOUND",
  legalName: "RAIN SOUND",
  siteUrl: "https://rain-sound.vercel.app",
  tagline: "Aracın karakterini ortaya çıkar.",
  description:
    "Eskişehir'de oto detailing, araç koruma, ses sistemleri, aksesuar ve modifiye uygulamaları.",
  address: {
    street: "Ihlamurkent, Yaşar Kemal Cd. No:8 D:C",
    district: "Odunpazarı",
    city: "Eskişehir",
    postalCode: "26050",
    countryCode: "TR",
    display:
      "Ihlamurkent, Yaşar Kemal Cd. No:8 D:C, 26050 Odunpazarı/Eskişehir",
  },
  contacts: [
    {
      channel: "whatsapp",
      label: "WhatsApp",
      href: businessContactLinks.whatsapp,
      value: "+90 553 930 45 75",
      isPrimary: true,
    },
    {
      channel: "phone",
      label: "Telefon",
      href: businessContactLinks.phone,
      value: "0553 930 45 75",
    },
  ],
  businessHours: [
    { day: "monday", opensAt: "09:00", closesAt: "20:00", isClosed: false },
    { day: "tuesday", opensAt: "09:00", closesAt: "20:00", isClosed: false },
    {
      day: "wednesday",
      opensAt: "09:00",
      closesAt: "20:00",
      isClosed: false,
    },
    { day: "thursday", opensAt: "09:00", closesAt: "20:00", isClosed: false },
    { day: "friday", opensAt: "09:00", closesAt: "20:00", isClosed: false },
    { day: "saturday", opensAt: "09:00", closesAt: "20:00", isClosed: false },
    { day: "sunday", opensAt: null, closesAt: null, isClosed: true },
  ],
  socialLinks: [
    {
      channel: "instagram",
      label: "Instagram",
      href: businessContactLinks.instagram,
      target: "_blank",
    },
    {
      channel: "maps",
      label: "Google Maps",
      href: businessContactLinks.maps,
      target: "_blank",
    },
  ],
  primaryCta: {
    label: "WhatsApp'tan Bilgi Al",
    href: businessContactLinks.whatsapp,
  },
} satisfies SiteSettings;

export const getContactByChannel = (channel: ContactChannel) =>
  siteSettings.contacts.find((contact) => contact.channel === channel);

export const getSocialLinkByChannel = (
  channel: Extract<ContactChannel, "instagram" | "maps">,
) => siteSettings.socialLinks.find((link) => link.channel === channel);
