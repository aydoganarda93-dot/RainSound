import type { HeroMediaScene, MediaAsset } from "./types";

const heroDemoState = {
  isDemo: true,
  replacementRequiredBeforeProduction: true,
  note: "Bekleniyor: gerçek çekim yok; mevcut AI atmosfer asset'i gerçek uygulama veya müşteri projesi gibi sunulmadan placeholder olarak tutulur.",
};

const heroPoster = {
  id: "ai-hero-poster-wide-01",
  kind: "image",
  source: "ai",
  usage: ["hero"],
  src: "/media/ai/hero/ai-hero-rain-sound-classic-wide.avif",
  alt: "Rain Sound için temsili neon otomobil hero posteri",
  width: 1536,
  height: 1024,
  hasUsagePermission: true,
  requiresPrivacyReview: false,
  demo: heroDemoState,
} satisfies MediaAsset;

export const heroMediaScene = {
  id: "rain-sound-ai-hero-scene",
  title: "Neon araç hero sahnesi",
  description:
    "Araç ana silüeti, far kapalı/açık katmanları, duman ve ışık taraması için animasyonsuz hazırlık sahnesi.",
  poster: heroPoster,
  layers: [
    {
      id: "hero-vehicle-base",
      label: "Araç ana gövde",
      role: "vehicle-base",
      plannedSrc: "/media/ai/hero/ai-hero-car-base-wide-01.avif",
      source: "ai",
      status: "placeholder",
      description:
        "Desktop ve mobil kompozisyonu taşıyacak ana araç gövdesi. Gerçek sonuç gibi sunulmayacak.",
      alt: "Temsili neon otomobil ana gövde katmanı",
      demo: heroDemoState,
    },
    {
      id: "hero-headlights-off",
      label: "Far kapalı katman",
      role: "headlights-off",
      plannedSrc: "/media/ai/hero/ai-hero-headlights-off-01.avif",
      source: "ai",
      status: "placeholder",
      description:
        "Far açılışından önceki sakin katman. P8.2'de statik olarak birleştirilir.",
      alt: "Temsili araç far kapalı katmanı",
      demo: heroDemoState,
    },
    {
      id: "hero-headlights-on",
      label: "Far açık katman",
      role: "headlights-on",
      plannedSrc: "/media/ai/hero/ai-hero-headlights-on-01.avif",
      source: "ai",
      status: "placeholder",
      description:
        "P8.3/P8.4 animasyonlarında kontrollü açılış için kullanılacak ışık katmanı.",
      alt: "Temsili araç far açık katmanı",
      demo: heroDemoState,
    },
    {
      id: "hero-smoke-bed",
      label: "Duman zemin katmanı",
      role: "smoke",
      plannedSrc: "/media/ai/hero/ai-hero-smoke-bed-01.avif",
      source: "ai",
      status: "placeholder",
      description:
        "Drift/duman hissini taşıyacak düşük kontrastlı atmosfer katmanı.",
      alt: "Temsili kontrollü duman katmanı",
      demo: heroDemoState,
    },
    {
      id: "hero-light-sweep",
      label: "Kaporta ışık taraması",
      role: "light-sweep",
      plannedSrc: "/media/ai/hero/ai-hero-light-sweep-01.avif",
      source: "ai",
      status: "placeholder",
      description:
        "Kaporta yansıması için ileride GSAP timeline'a bağlanacak ışık katmanı.",
      alt: "Temsili mor kaporta ışık taraması katmanı",
      demo: heroDemoState,
    },
  ],
  fallback: {
    reducedMotionLabel: "Statik poster modu",
    lowConnectionLabel: "Düşük bağlantı modu",
    note: "Reduced-motion veya düşük bağlantıda katmanlı hareket yerine tek poster/placeholder ve CTA'lar korunur.",
  },
  demo: heroDemoState,
} satisfies HeroMediaScene;
