import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
} from "lucide-react";

import {
  faqs,
  categoryVisualMedia,
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
  heroVisualMedia,
  serviceCategories,
  services,
  siteSettings,
  testimonials,
} from "@/content";
import { TrackedLink } from "@/components/analytics";
import { StructuredData } from "@/components/structured-data";
import {
  buildLocalBusinessJsonLd,
  buildPageMetadata,
  buildServiceListJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `${siteSettings.siteName} | Oto Detailing, Kaplama ve Ses Sistemleri`,
  description: `${siteSettings.siteName}, ${siteSettings.address.district}/${siteSettings.address.city} içinde oto detailing, seramik kaplama, PPF, cam filmi, araç kaplama, ses sistemleri ve modifiye uygulamaları sunan premium uygulama merkezi.`,
  path: "/",
});

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const publishedTestimonials = testimonials.filter(
  (testimonial) => testimonial.status === "published",
);

const homepageTestimonials = publishedTestimonials.slice(0, 4);
const homepageFaqs = faqs
  .filter((faq) => faq.status === "published")
  .slice(0, 3);

const getServicesForCategory = (categoryId: string) =>
  publishedServices.filter((service) => service.categoryId === categoryId);

const getTestimonialSourceLabel = (
  source: (typeof testimonials)[number]["source"],
) => {
  if (source === "google") {
    return "Google yorumu";
  }

  if (source === "instagram") {
    return "Instagram yorumu";
  }

  if (source === "whatsapp") {
    return "WhatsApp yorumu";
  }

  if (source === "direct") {
    return "Doğrudan yorum";
  }

  return null;
};

const getTestimonialDisplayName = (authorName: string) => {
  const [firstName] = authorName.trim().split(/\s+/);

  return firstName ? `${firstName[0].toLocaleUpperCase("tr-TR")}.` : "Müşteri";
};

const heroChips = [
  {
    icon: MapPin,
    label: `${siteSettings.address.district} / ${siteSettings.address.city}`,
  },
  { icon: Clock, label: "Pazartesi–Cumartesi 09:00–20:00" },
  { icon: ShieldCheck, label: "Kaliteli Ürün, Uygun fiyat" },
];

const marqueeItems = [
  "Oto Detailing",
  "Seramik Kaplama",
  "PPF Folyo",
  "Cam Filmi",
  "Araç Kaplama",
  "Ses Sistemleri",
  "Far Tasarımı",
  "Body Kit",
  "Varex Egzoz",
  "Pasta Cila",
];

const whyCards = [
  {
    icon: Sparkles,
    title: "Araç başında net fiyat",
    description:
      "Aracın durumu görüldükten sonra kapsam, süre ve fiyat net şekilde konuşulur.",
  },
  {
    icon: ShieldCheck,
    title: "Ürün ve işlem açık anlatılır",
    description:
      "Kullanılacak ürün, işlem sınırı ve bakım önerisi teslimden önce sade şekilde paylaşılır.",
  },
  {
    icon: Volume2,
    title: "Teslimde kontrol yapılır",
    description:
      "Uygulama sonrası araç birlikte kontrol edilir; eksik görülen nokta teslimden önce çözülür.",
  },
];

export default function Home() {
  const phoneContact = getContactByChannel("phone");
  const mapsLink = getSocialLinkByChannel("maps");
  const instagramLink = getSocialLinkByChannel("instagram");

  return (
    <main className="home-page">
      <StructuredData
        data={[
          buildLocalBusinessJsonLd(),
          buildServiceListJsonLd(publishedServices),
        ]}
      />

      <section className="rsg-hero" aria-labelledby="hero-title">
        <div className="rsg-hero__media">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={heroVisualMedia.mobile.src}
              type="image/avif"
            />
            <source
              media="(min-width: 768px)"
              srcSet={heroVisualMedia.desktop.src}
              type="image/avif"
            />
            <img
              src={heroVisualMedia.desktop.src}
              alt={heroVisualMedia.alt}
              className="rsg-hero__img"
              width={heroVisualMedia.desktop.width}
              height={heroVisualMedia.desktop.height}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="rsg-hero__scrim" />
        </div>

        <div className="rain-container rsg-hero__inner">
          <p className="rsg-eyebrow rsg-hero__eyebrow">
            <span className="rsg-eyebrow__dot" aria-hidden="true" />
            Eskişehir oto uygulama merkezi
          </p>

          <h1 id="hero-title" className="rsg-hero__title">
            <span className="rsg-hero__title-brand">
              {siteSettings.siteName}
            </span>
          </h1>

          <p className="rsg-hero__tagline">{siteSettings.tagline}</p>

          <div className="rsg-hero__actions">
            <Link
              className="rain-button rain-button--primary rsg-btn-lg"
              href="/hizmetler"
            >
              Hizmetleri Gör
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <ul className="rsg-hero__chips">
            {heroChips.map((chip) => (
              <li key={chip.label}>
                <chip.icon aria-hidden="true" size={15} />
                {chip.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="rsg-marquee" aria-hidden="true">
        <div className="rsg-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <span className="rsg-marquee__sep">/</span>
            </span>
          ))}
        </div>
      </div>

      <section
        className="rsg-section rsg-worlds-section"
        aria-labelledby="worlds-title"
      >
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Hizmetler</p>
          <h2 id="worlds-title" className="rsg-title">
            Dört ana hizmet alanı
          </h2>
          <p className="rsg-lead">
            İhtiyacına göre alanı seç, detayları hızlıca incele.
          </p>
        </div>

        <div className="rain-container rsg-worlds">
          {publishedCategories.map((category, index) => {
            const categoryServices = getServicesForCategory(category.id);
            const image =
              categoryVisualMedia[
                category.id as keyof typeof categoryVisualMedia
              ];

            return (
              <Link
                key={category.id}
                href={`/hizmetler#${category.slug}`}
                aria-label={`${category.title} alanı`}
                className="rsg-world"
                data-reveal
                data-size={index === 0 || index === 3 ? "wide" : "tall"}
              >
                <div className="rsg-world__media" aria-hidden="true">
                  {image ? (
                    <picture>
                      <source
                        media="(min-width: 768px)"
                        srcSet={image.src}
                        type="image/avif"
                      />
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="rsg-world__img"
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  ) : null}
                  <div className="rsg-world__scrim" />
                </div>

                <div className="rsg-world__body">
                  <span className="rsg-world__index">0{category.order}</span>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <span className="rsg-world__tags">
                    {categoryServices.slice(0, 3).map((service) => (
                      <span key={service.id}>{service.title}</span>
                    ))}
                  </span>
                  <span className="rsg-world__cta">
                    Alanı keşfet
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="rain-container rsg-worlds-more">
          <Link
            className="rain-button rain-button--ghost rsg-btn-lg"
            href="/hizmetler"
          >
            Tüm hizmetleri gör
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section
        className="rsg-section rsg-why-section"
        aria-labelledby="why-title"
      >
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Neden RAIN SOUND</p>
          <h2 id="why-title" className="rsg-title">
            Doğru iş, doğru anlatımla
          </h2>
        </div>

        <div className="rain-container rsg-why">
          {whyCards.map((card) => (
            <article key={card.title} className="rsg-why__card" data-reveal>
              <span className="rsg-why__icon" aria-hidden="true">
                <card.icon size={22} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="rsg-section rsg-testimonials-section"
        aria-labelledby="testimonials-title"
      >
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Müşteri Deneyimi</p>
          <h2 id="testimonials-title" className="rsg-title">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="rsg-lead">
            Google yorumlarından kısa seçmeler.
          </p>
          {mapsLink ? (
            <TrackedLink
              className="rain-link rsg-testimonials__review-link"
              event="directions_click"
              href={mapsLink.href}
              placement="home_testimonials"
              rel="noreferrer"
              target={mapsLink.target}
            >
              Google’daki tüm yorumları gör
              <ArrowUpRight aria-hidden="true" size={15} />
            </TrackedLink>
          ) : null}
        </div>

        <div className="rain-container rsg-testimonials">
          {homepageTestimonials.length > 0 ? (
            homepageTestimonials.map((testimonial) => {
              const sourceLabel = getTestimonialSourceLabel(testimonial.source);
              const displayName = getTestimonialDisplayName(
                testimonial.authorName,
              );

              return (
                <article
                  key={testimonial.id}
                  className="rsg-testimonials__card"
                  data-reveal
                >
                  <div className="rsg-testimonials__topline">
                    {testimonial.rating ? (
                      <div
                        className="rsg-testimonials__rating"
                        aria-label={`${testimonial.rating} yıldız`}
                        role="img"
                      >
                        {Array.from({ length: testimonial.rating }).map(
                          (_, index) => (
                            <Star
                              key={`${testimonial.id}-star-${index}`}
                              aria-hidden="true"
                              size={16}
                              fill="currentColor"
                            />
                          ),
                        )}
                      </div>
                    ) : null}
                    {sourceLabel ? (
                      <span className="rsg-testimonials__source">
                        {sourceLabel}
                      </span>
                    ) : null}
                  </div>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <div className="rsg-testimonials__meta">
                    <span>{displayName}</span>
                  </div>
                </article>
              );
            })
          ) : (
            <>
              <article className="rsg-testimonials__card rsg-testimonials__card--pending">
                <span className="rsg-testimonials__status">Bekleniyor</span>
                <h3>Yorumlar yakında</h3>
                <p>
                  İşletme onaylı gerçek müşteri yorumları geldiğinde burada
                  isim, kaynak ve puan bilgisiyle yayınlanacak.
                </p>
                <TrackedLink
                  className="rain-button rain-button--ghost rsg-testimonials__cta"
                  event="whatsapp_click"
                  href={generalWhatsAppLink.href}
                  placement="home_testimonials"
                >
                  <MessageCircle aria-hidden="true" size={17} />
                  WhatsApp ile Fiyat Al
                </TrackedLink>
              </article>

              {mapsLink ? (
                <article className="rsg-testimonials__card rsg-testimonials__card--maps">
                  <span className="rsg-testimonials__status">Google</span>
                  <h3>Google’da yorumlarımızı görün</h3>
                  <p>
                    Sahte yorum göstermemek için bu alanda yalnızca doğrulanmış
                    yorumlar yayınlanır. Güncel Google işletme kaydını dış
                    bağlantıdan kontrol edebilirsin.
                  </p>
                  <TrackedLink
                    className="rain-button rain-button--ghost rsg-testimonials__cta"
                    event="directions_click"
                    href={mapsLink.href}
                    placement="home_testimonials"
                    rel="noreferrer"
                    target={mapsLink.target}
                  >
                    <MapPin aria-hidden="true" size={17} />
                    Google’da Gör
                  </TrackedLink>
                </article>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section
        className="rsg-section rsg-cta-section"
        aria-labelledby="cta-title"
      >
        <div className="rain-container rsg-cta" data-reveal>
          <div className="rsg-cta__copy">
            <p className="rsg-eyebrow">İletişim</p>
            <h2 id="cta-title" className="rsg-title rsg-title--light">
              Atölyeye ulaş.
            </h2>
            <p className="rsg-lead rsg-cta__address">
              <span>{siteSettings.address.street}</span>
              <span>
                {siteSettings.address.postalCode}{" "}
                {siteSettings.address.district} / {siteSettings.address.city}
              </span>
            </p>
          </div>

          <div className="rsg-cta__actions">
            {mapsLink ? (
              <TrackedLink
                className="rain-button rain-button--primary rsg-btn-lg"
                event="directions_click"
                href={mapsLink.href}
                placement="home_contact"
                rel="noreferrer"
                target={mapsLink.target}
              >
                <MapPin aria-hidden="true" size={18} />
                Yol Tarifi
              </TrackedLink>
            ) : null}
            {phoneContact ? (
              <TrackedLink
                className="rain-button rain-button--ghost rsg-btn-lg"
                event="phone_click"
                href={phoneContact.href}
                placement="home_contact"
              >
                <Phone aria-hidden="true" size={18} />
                {phoneContact.value}
              </TrackedLink>
            ) : null}
            {instagramLink ? (
              <a
                className="rsg-cta__social"
                href={instagramLink.href}
                target={instagramLink.target}
                rel="noreferrer"
              >
                Instagram&apos;da gör @rainsound2634
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {homepageFaqs.length > 0 ? (
        <section
          className="rsg-section rsg-faq-section"
          aria-labelledby="faq-title"
        >
          <div className="rain-container rsg-section__head" data-reveal>
            <p className="rsg-eyebrow">Sık Sorulan</p>
            <h2 id="faq-title" className="rsg-title">
              Merak edilenler
            </h2>
            <p className="rsg-lead">
              Süre, fiyat ve randevu için temel cevaplar.
            </p>
          </div>
          <div className="rain-container rsg-faq">
            {homepageFaqs.map((faq) => (
              <details key={faq.id} className="rsg-faq__card" data-reveal>
                <summary>
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="rsg-faq__icon" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
