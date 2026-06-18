import Image from "next/image";
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
  Volume2,
} from "lucide-react";

import {
  faqs,
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import type { Service } from "@/content";
import { HomeMotionShell } from "@/components/home-motion-shell";
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

const categoryImages: Record<string, string> = {
  detailing: "/media/ai/showcase/cat-detailing.png",
  protection: "/media/ai/showcase/cat-protection.png",
  "sound-tech": "/media/ai/showcase/cat-sound.png",
  "design-performance": "/media/ai/showcase/cat-performance.png",
};

const getServicesForCategory = (categoryId: string) =>
  publishedServices.filter((service) => service.categoryId === categoryId);

const heroChips = [
  { icon: MapPin, label: `${siteSettings.address.district} / ${siteSettings.address.city}` },
  { icon: Clock, label: "Pazartesi–Cumartesi 09:00–20:00" },
  { icon: ShieldCheck, label: "Fiyat WhatsApp'ta netleşir" },
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
    title: "Tek merkezde tam dönüşüm",
    description:
      "Yıkamadan seramik kaplamaya, ses sisteminden body kit'e kadar aracın görünümü, koruması ve karakteri aynı atölyede konuşulur.",
  },
  {
    icon: ShieldCheck,
    title: "Net kapsam, doğru beklenti",
    description:
      "Süre, kapsam ve sonuç araç durumuna göre açıkça anlatılır; abartılı vaat yerine doğru işlem önerilir.",
  },
  {
    icon: Volume2,
    title: "Sesten görünüme detay",
    description:
      "Pioneer, amfi ve subwoofer kurulumundan far ve egzoz detayına kadar her uygulama aracın bütünlüğü düşünülerek planlanır.",
  },
];

const getServiceHref = (service: Service) => `/hizmetler/${service.slug}`;

export default function Home() {
  const phoneContact = getContactByChannel("phone");
  const mapsLink = getSocialLinkByChannel("maps");
  const instagramLink = getSocialLinkByChannel("instagram");

  return (
    <HomeMotionShell>
      <StructuredData
        data={[
          buildLocalBusinessJsonLd(),
          buildServiceListJsonLd(publishedServices),
        ]}
      />

      <section className="rsg-hero" aria-labelledby="hero-title">
        <div className="rsg-hero__media" aria-hidden="true">
          <Image
            src="/media/ai/showcase/hero-wide.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="rsg-hero__img"
          />
          <div className="rsg-hero__scrim" />
        </div>

        <div className="rain-container rsg-hero__inner">
          <p className="rsg-eyebrow" data-home-reveal>
            <span className="rsg-eyebrow__dot" aria-hidden="true" />
            Detailing • Koruma • Ses • Performans
          </p>

          <h1 id="hero-title" className="rsg-hero__title" data-home-reveal>
            {siteSettings.siteName}
          </h1>

          <p className="rsg-hero__tagline" data-home-reveal>
            {siteSettings.tagline}
          </p>

          <p className="rsg-hero__desc" data-home-reveal>
            {siteSettings.address.city} / {siteSettings.address.district}{" "}
            içinde oto detailing, seramik kaplama, PPF, araç kaplama, ses
            sistemleri ve modifiye uygulamalarını tek atölyede topluyoruz.
          </p>

          <div className="rsg-hero__actions" data-home-reveal>
            <a
              className="rain-button rain-button--primary rsg-btn-lg"
              href={generalWhatsAppLink.href}
            >
              <MessageCircle aria-hidden="true" size={18} />
              {generalWhatsAppLink.label}
            </a>
            <Link
              className="rain-button rain-button--ghost rsg-btn-lg"
              href="/hizmetler"
            >
              Hizmetleri Keşfet
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>

          <ul className="rsg-hero__chips" data-home-reveal>
            {heroChips.map((chip) => (
              <li key={chip.label}>
                <chip.icon aria-hidden="true" size={15} />
                {chip.label}
              </li>
            ))}
          </ul>

          <div
            className="rsg-hero__eq"
            aria-hidden="true"
            data-home-equalizer
          >
            {Array.from({ length: 14 }, (_, index) => (
              <span key={index} data-home-equalizer-bar />
            ))}
          </div>
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

      <section className="rsg-section rsg-worlds-section" aria-labelledby="worlds-title">
        <div className="rain-container rsg-section__head" data-home-reveal>
          <p className="rsg-eyebrow">Hizmet Dünyaları</p>
          <h2 id="worlds-title" className="rsg-title">
            Aracın için dört uzmanlık alanı
          </h2>
          <p className="rsg-lead">
            Her alan kendi içinde detaylı uygulamalar sunar. Aracının
            ihtiyacına göre alanı seç, kapsamı WhatsApp&apos;ta birlikte
            netleştirelim.
          </p>
        </div>

        <div className="rain-container rsg-worlds">
          {publishedCategories.map((category, index) => {
            const categoryServices = getServicesForCategory(category.id);
            const image = categoryImages[category.id];

            return (
              <Link
                key={category.id}
                href={`/hizmetler#${category.slug}`}
                className="rsg-world"
                data-home-card
                data-size={index === 0 || index === 3 ? "wide" : "tall"}
              >
                <div className="rsg-world__media" aria-hidden="true">
                  {image ? (
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(min-width: 64rem) 50vw, 100vw"
                      className="rsg-world__img"
                    />
                  ) : null}
                  <div className="rsg-world__scrim" />
                </div>

                <div className="rsg-world__body">
                  <span className="rsg-world__index">
                    0{category.order}
                  </span>
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
      </section>

      <section className="rsg-showcase" aria-labelledby="showcase-title">
        <div className="rsg-showcase__media" aria-hidden="true">
          <Image
            src="/media/ai/showcase/cat-performance.png"
            alt=""
            fill
            sizes="100vw"
            className="rsg-showcase__img"
          />
          <div className="rsg-showcase__scrim" />
        </div>
        <div className="rain-container rsg-showcase__inner" data-home-reveal>
          <p className="rsg-eyebrow">Atölye atmosferi</p>
          <h2 id="showcase-title" className="rsg-title rsg-title--light">
            Karanlık zemin, doğru ışık, temiz işçilik.
          </h2>
          <p className="rsg-lead">
            Aracını teslim ettiğinde sadece temiz değil; bakımlı, korunmuş ve
            karakteri öne çıkmış olarak geri alırsın.
          </p>
          <a
            className="rain-button rain-button--primary rsg-btn-lg"
            href={generalWhatsAppLink.href}
          >
            <MessageCircle aria-hidden="true" size={18} />
            Aracını Konuşalım
          </a>
        </div>
      </section>

      <section className="rsg-section" aria-labelledby="services-title">
        <div className="rain-container rsg-section__head" data-home-reveal>
          <p className="rsg-eyebrow">Tüm Uygulamalar</p>
          <h2 id="services-title" className="rsg-title">
            Detaydaki her hizmet
          </h2>
          <p className="rsg-lead">
            Listeden ihtiyacına en yakın uygulamayı seç, içeriğini ve sürecini
            incele.
          </p>
        </div>

        <div className="rain-container rsg-service-grid">
          {publishedServices.map((service) => {
            const category = publishedCategories.find(
              (item) => item.id === service.categoryId,
            );

            return (
              <Link
                key={service.id}
                href={getServiceHref(service)}
                className="rsg-service"
                data-home-card
              >
                <span className="rsg-service__cat">
                  {category?.title ?? "Hizmet"}
                </span>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <span className="rsg-service__cta" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rsg-section rsg-why-section" aria-labelledby="why-title">
        <div className="rain-container rsg-section__head" data-home-reveal>
          <p className="rsg-eyebrow">Neden RAIN SOUND</p>
          <h2 id="why-title" className="rsg-title">
            Doğru iş, doğru anlatımla
          </h2>
        </div>

        <div className="rain-container rsg-why">
          {whyCards.map((card) => (
            <article key={card.title} className="rsg-why__card" data-home-card>
              <span className="rsg-why__icon" aria-hidden="true">
                <card.icon size={22} />
              </span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rsg-section rsg-cta-section" aria-labelledby="cta-title">
        <div className="rain-container rsg-cta" data-home-reveal>
          <div className="rsg-cta__copy">
            <p className="rsg-eyebrow">İletişim</p>
            <h2 id="cta-title" className="rsg-title rsg-title--light">
              En hızlı yol WhatsApp.
            </h2>
            <p className="rsg-lead">{siteSettings.address.display}</p>
          </div>

          <div className="rsg-cta__actions">
            <a
              className="rain-button rain-button--primary rsg-btn-lg"
              href={generalWhatsAppLink.href}
            >
              <MessageCircle aria-hidden="true" size={18} />
              WhatsApp&apos;tan Bilgi Al
            </a>
            {phoneContact ? (
              <a
                className="rain-button rain-button--ghost rsg-btn-lg"
                href={phoneContact.href}
              >
                <Phone aria-hidden="true" size={18} />
                {phoneContact.value}
              </a>
            ) : null}
            {mapsLink ? (
              <a
                className="rain-button rain-button--ghost rsg-btn-lg"
                href={mapsLink.href}
                target={mapsLink.target}
                rel="noreferrer"
              >
                <MapPin aria-hidden="true" size={18} />
                Yol Tarifi
              </a>
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

      {faqs.length > 0 ? (
        <section className="rsg-section rsg-faq-section" aria-labelledby="faq-title">
          <div className="rain-container rsg-section__head" data-home-reveal>
            <p className="rsg-eyebrow">Sık Sorulan</p>
            <h2 id="faq-title" className="rsg-title">
              İlk cevaplar
            </h2>
          </div>
          <div className="rain-container rsg-faq">
            {faqs
              .filter((faq) => faq.status === "published")
              .map((faq) => (
                <article key={faq.id} className="rsg-faq__card" data-home-card>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
          </div>
        </section>
      ) : null}
    </HomeMotionShell>
  );
}
