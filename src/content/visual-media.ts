export const heroVisualMedia = {
  desktop: {
    src: "/media/ai/hero/ai-hero-rain-sound-classic-wide.avif",
    width: 1536,
    height: 1024,
  },
  mobile: {
    src: "/media/ai/hero/ai-hero-rain-sound-classic-mobile.avif",
    width: 960,
    height: 640,
  },
  alt: "",
} as const;

export const aiImagePlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23050505'/%3E%3Cstop offset='.55' stop-color='%2317171d'/%3E%3Cstop offset='1' stop-color='%238b3dff' stop-opacity='.45'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='16' height='10' fill='url(%23g)'/%3E%3C/svg%3E";

export const categoryVisualMedia = {
  detailing: {
    src: "/media/ai/services/ai-service-ceramic-paint-01.avif",
    width: 1200,
    height: 900,
    alt: "",
  },
  protection: {
    src: "/media/ai/services/ai-service-ppf-film-01.avif",
    width: 1200,
    height: 900,
    alt: "",
  },
  "sound-tech": {
    src: "/media/ai/services/ai-service-sound-install-01.avif",
    width: 1200,
    height: 900,
    alt: "",
  },
  "design-performance": {
    src: "/media/ai/services/ai-service-performance-front-01.avif",
    width: 1200,
    height: 900,
    alt: "",
  },
} as const;

export const showcaseVisualMedia = {
  src: "/media/ai/services/ai-service-performance-front-01.avif",
  width: 1200,
  height: 900,
  alt: "",
} as const;

export const brandLogoMedia = {
  src: "/media/provided/logo/rain-sound-profile.png",
  width: 640,
  height: 640,
  alt: "RAIN SOUND",
} as const;
