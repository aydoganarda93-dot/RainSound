import type {
  FAQ,
  MediaAsset,
  Project,
  Service,
  ServiceCategory,
  SiteSettings,
  Testimonial,
} from "./types";

const realContent: {
  isDemo: false;
  replacementRequiredBeforeProduction: false;
} = {
  isDemo: false,
  replacementRequiredBeforeProduction: false,
};

const demoContent = (note: string) =>
  ({
    isDemo: true,
    replacementRequiredBeforeProduction: true,
    note,
  }) satisfies MediaAsset["demo"];

export const siteSettings = {
  locale: "tr",
  siteName: "RAIN SOUND",
  legalName: "RAIN SOUND",
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
      href: "https://wa.me/905539304575",
      value: "+90 553 930 45 75",
      isPrimary: true,
    },
    {
      channel: "phone",
      label: "Telefon",
      href: "tel:+905539304575",
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
      label: "Instagram",
      href: "https://www.instagram.com/rainsound2634/",
      target: "_blank",
    },
    {
      label: "Google Maps",
      href: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x14cc3d75025d88ff:0x2767f568f912a257",
      target: "_blank",
    },
  ],
  primaryCta: {
    label: "WhatsApp'tan Bilgi Al",
    href: "https://wa.me/905539304575",
  },
} satisfies SiteSettings;

export const serviceCategories = [
  {
    id: "detailing",
    slug: "detailing",
    title: "Detailing",
    description: "Yıkama, boya yenileme ve parlaklık uygulamaları.",
    order: 1,
    accent: "purple",
    status: "published",
    demo: realContent,
  },
  {
    id: "protection",
    slug: "koruma",
    title: "Koruma",
    description: "PPF, cam filmi, seramik ve araç kaplama çözümleri.",
    order: 2,
    accent: "silver",
    status: "published",
    demo: realContent,
  },
  {
    id: "sound-tech",
    slug: "sound-tech",
    title: "Sound & Tech",
    description: "Ses, görüntü ve multimedya uygulamaları.",
    order: 3,
    accent: "purple",
    status: "published",
    demo: realContent,
  },
  {
    id: "design-performance",
    slug: "design-performance",
    title: "Design & Performance",
    description: "Far tasarımı, body kit ve performans görünümü.",
    order: 4,
    accent: "dark",
    status: "published",
    demo: realContent,
  },
] satisfies ServiceCategory[];

const demoHeroMedia = {
  id: "demo-hero-rain-sound",
  kind: "image",
  source: "demo",
  usage: ["hero", "service-card"],
  src: "/demo/hero-rain-sound.webp",
  alt: "RAIN SOUND için temsili koyu otomobil atmosferi",
  width: 1600,
  height: 900,
  hasUsagePermission: true,
  requiresPrivacyReview: false,
  demo: demoContent(
    "Production öncesi gerçek veya onaylı AI görselle değişecek.",
  ),
} satisfies MediaAsset;

export const services = [
  {
    id: "ceramic-coating",
    slug: "seramik-kaplama",
    categoryId: "protection",
    title: "Seramik Kaplama",
    summary: "Boya yüzeyi için parlaklık ve koruma odaklı uygulama.",
    description:
      "Araç durumuna göre hazırlık, yüzey temizliği ve koruma uygulaması planlanır.",
    benefits: ["Parlak görünüm", "Kolay temizlik", "Yüzey koruması"],
    process: [
      "Araç kontrolü",
      "Yüzey hazırlığı",
      "Uygulama",
      "Teslim kontrolü",
    ],
    estimatedDurationNote: "Aracın durumu ve uygulama kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Genel garanti vaadi yayınlanmaz; güncel bilgi WhatsApp'tan verilir.",
    media: [demoHeroMedia],
    relatedServiceIds: ["ppf-coating"],
    status: "published",
    demo: demoContent(
      "Hizmet metni P2.3 aşamasında gerçek içerikle genişletilecek.",
    ),
  },
  {
    id: "ppf-coating",
    slug: "ppf-kaplama",
    categoryId: "protection",
    title: "PPF Folyo Kaplama",
    summary: "Taş izi ve yüzey aşınmalarına karşı koruma uygulaması.",
    description:
      "Parça bazlı veya daha geniş kapsamlı koruma seçenekleri araç özelinde değerlendirilir.",
    benefits: ["Koruyucu film", "Parça bazlı seçenekler", "Temiz görünüm"],
    process: [
      "Alan seçimi",
      "Yüzey hazırlığı",
      "Folyo uygulaması",
      "Kenar kontrolü",
    ],
    estimatedDurationNote: "Aracın durumu ve uygulama kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Genel garanti vaadi yayınlanmaz; güncel bilgi WhatsApp'tan verilir.",
    media: [demoHeroMedia],
    relatedServiceIds: ["ceramic-coating"],
    status: "published",
    demo: demoContent(
      "Hizmet metni P2.3 aşamasında gerçek içerikle genişletilecek.",
    ),
  },
] satisfies Service[];

export const projects = [
  {
    id: "demo-detailing-project",
    slug: "demo-detailing-projesi",
    title: "Demo Detailing ve Koruma Projesi",
    summary:
      "Gerçek proje gelene kadar tasarım ve veri modeli için kullanılır.",
    vehicleLabel: "Demo araç",
    serviceIds: ["ceramic-coating", "ppf-coating"],
    cover: demoHeroMedia,
    gallery: [demoHeroMedia],
    beforeAfter: [],
    privacyReviewed: false,
    publishPermissionConfirmed: false,
    status: "draft",
    demo: demoContent("P12 öncesi gerçek proje ile değiştirilecek."),
  },
] satisfies Project[];

export const testimonials = [
  {
    id: "demo-testimonial",
    authorName: "Demo müşteri",
    source: "direct",
    quote: "Bu yorum yalnızca tasarım yerleşimini test etmek için kullanılır.",
    rating: 5,
    status: "draft",
    demo: demoContent(
      "Production'da gerçek müşteri yorumu olmadan yayınlanmayacak.",
    ),
  },
] satisfies Testimonial[];

export const faqs = [
  {
    id: "duration-note",
    question: "Uygulama ne kadar sürer?",
    answer:
      "Süre aracın durumu, boyutu ve seçilen uygulama kapsamına göre değişir.",
    relatedServiceIds: ["ceramic-coating", "ppf-coating"],
    order: 1,
    status: "published",
    demo: realContent,
  },
] satisfies FAQ[];
