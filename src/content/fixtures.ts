import type {
  FAQ,
  MediaAsset,
  Project,
  Service,
  ServiceCategory,
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
