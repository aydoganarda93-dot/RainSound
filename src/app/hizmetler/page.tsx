import Link from "next/link";
import {
  ArrowUpRight,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  generalWhatsAppLink,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import { TrackedLink } from "@/components/analytics";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildServiceListJsonLd,
  pageBreadcrumbs,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hizmetler",
  description: `${siteSettings.siteName} ${siteSettings.address.district}/${siteSettings.address.city} hizmetleri: detailing, seramik kaplama, PPF, cam filmi, araç kaplama, oto ses sistemleri, aksesuar, far tasarımı, body kit ve varex egzoz.`,
  path: "/hizmetler",
});

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const categoryIcons: Record<string, LucideIcon> = {
  detailing: Sparkles,
  protection: ShieldCheck,
  "sound-tech": Volume2,
  "design-performance": Gauge,
};

const serviceFocusLabels: Record<string, string> = {
  detailing: "Parlaklık odaklı",
  protection: "Koruma odaklı",
  "sound-tech": "Ses ve konfor",
  "design-performance": "Görünüm odaklı",
};

const getServicesByCategory = (categoryId: string) =>
  publishedServices.filter((service) => service.categoryId === categoryId);

const getServiceCardTags = (categoryId: string) => [
  serviceFocusLabels[categoryId] ?? "Hizmet odaklı",
  "Araç görülünce netleşir",
];

export default function ServicesPage() {
  return (
    <main className="rsg-page">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd(pageBreadcrumbs.services),
          buildServiceListJsonLd(publishedServices),
        ]}
      />
      <Breadcrumbs items={pageBreadcrumbs.services} />

      <section className="rsg-pagehero" aria-labelledby="services-page-title">
        <div
          className="rsg-pagehero__glow rsg-pagehero__glow--right"
          aria-hidden="true"
        />
        <div className="rain-container rsg-pagehero__inner">
          <div className="rsg-pagehero__lead-col">
            <p className="rsg-eyebrow" data-reveal>
              <span className="rsg-eyebrow__dot" aria-hidden="true" />
              Hizmetler
            </p>
            <h1
              id="services-page-title"
              aria-label="Aracın için tek atölye"
              className="rsg-pagehero__title rsg-title--xl"
              data-reveal
              style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            >
              Aracın için
              <br />
              tek atölye
            </h1>
            <p
              className="rsg-lead"
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              Detailing, koruma, ses ve tasarım — dört alan, tek çatı.
            </p>
          </div>

          <aside
            className="rsg-card rsg-card--accent rsg-card--compact rsg-pagehero__aside"
            data-reveal
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow rsg-eyebrow--muted">
              {publishedCategories.length} alan / {publishedServices.length}{" "}
              hizmet
            </p>
            <h2>Araç fotoğrafı gönder, fiyat al.</h2>
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              event="whatsapp_click"
              href={generalWhatsAppLink.href}
              placement="services_page"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Araç Fotoğrafı Gönder
            </TrackedLink>
          </aside>
        </div>
      </section>

      <div className="rain-container rsg-chips-wrap">
        <nav className="rsg-chips" aria-label="Hizmet kategorileri" data-reveal>
          {publishedCategories.map((category) => (
            <a key={category.id} href={`#${category.slug}`}>
              {category.title}
            </a>
          ))}
        </nav>
      </div>

      {publishedCategories.map((category) => {
        const categoryServices = getServicesByCategory(category.id);
        const Icon = categoryIcons[category.id] ?? Sparkles;

        return (
          <section
            key={category.id}
            id={category.slug}
            className="rsg-section services-category"
            aria-labelledby={`${category.slug}-title`}
          >
            <div className="rain-container rsg-section__head" data-reveal>
              <p className="rsg-eyebrow">
                <Icon aria-hidden="true" size={15} />
                Alan 0{category.order}
              </p>
              <h2 id={`${category.slug}-title`} className="rsg-title">
                {category.title}
              </h2>
              <p className="rsg-lead">{category.description}</p>
            </div>

            <div className="rain-container rsg-grid-auto">
              {categoryServices.map((service, index) => {
                const serviceTags = getServiceCardTags(service.categoryId);

                return (
                  <Link
                    key={service.id}
                    href={`/hizmetler/${service.slug}`}
                    aria-label={`${service.title} hizmetini incele`}
                    className="rsg-feature"
                    data-reveal
                    style={
                      {
                        "--reveal-delay": `${0.05 * (index % 3)}s`,
                      } as React.CSSProperties
                    }
                  >
                    <h3>{service.title}</h3>
                    <span className="rsg-feature__tags">
                      {serviceTags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </span>
                    <p>{service.summary}</p>
                    <span className="rsg-service__cta" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <section
        className="rsg-section rsg-cta-section"
        aria-labelledby="services-cta-title"
      >
        <div className="rain-container rsg-cta" data-reveal>
          <div className="rsg-cta__copy">
            <p className="rsg-eyebrow">Kararsız mısın?</p>
            <h2 id="services-cta-title" className="rsg-title rsg-title--light">
              Araç fotoğrafı gönder, fiyat al.
            </h2>
            <p className="rsg-lead">
              Aracın fotoğrafını, modelini ve istediğin sonucu paylaş; kapsamı
              hızlıca netleştirelim.
            </p>
          </div>
          <div className="rsg-cta__actions">
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              event="whatsapp_click"
              href={generalWhatsAppLink.href}
              placement="services_page"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Araç Fotoğrafı Gönder
            </TrackedLink>
          </div>
        </div>
      </section>
    </main>
  );
}
