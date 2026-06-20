import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Wallet,
  Wrench,
} from "lucide-react";

import {
  generalWhatsAppLink,
  getContactByChannel,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import { TrackedLink } from "@/components/analytics";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
  buildPageMetadata,
  pageBreadcrumbs,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hakkımızda",
  description: `${siteSettings.siteName} ${siteSettings.address.district}/${siteSettings.address.city}; oto detailing, araç koruma, ses sistemleri, aksesuar ve modifiye hizmetlerini tek garaj deneyiminde sunar.`,
  path: "/hakkimizda",
});

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const principles = [
  {
    icon: Wallet,
    title: "Fiyat WhatsApp'ta netleşir",
    description: "Araca, ürüne ve kapsama göre değiştiği için sabit fiyat yok.",
  },
  {
    icon: ShieldCheck,
    title: "Abartısız, net anlatım",
    description: "Kanıtsız iddia değil; araç durumuna göre doğru beklenti.",
  },
  {
    icon: Wrench,
    title: "Araç özelinde planlama",
    description: "Her işlem aracın modeline ve beklentine göre kurgulanır.",
  },
];

export default function AboutPage() {
  const phoneContact = getContactByChannel("phone");

  return (
    <main className="rsg-page">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd(pageBreadcrumbs.about),
          buildLocalBusinessJsonLd(),
        ]}
      />
      <Breadcrumbs items={pageBreadcrumbs.about} />

      <section className="rsg-pagehero" aria-labelledby="about-page-title">
        <div
          className="rsg-pagehero__glow rsg-pagehero__glow--right"
          aria-hidden="true"
        />
        <div className="rain-container rsg-pagehero__inner">
          <div className="rsg-pagehero__lead-col">
            <p className="rsg-eyebrow" data-reveal>
              <span className="rsg-eyebrow__dot" aria-hidden="true" />
              Hakkımızda
            </p>
            <h1
              id="about-page-title"
              className="rsg-pagehero__title rsg-title--xl"
              data-reveal
              style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            >
              {siteSettings.tagline}
            </h1>
            <p
              className="rsg-lead"
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              {siteSettings.address.district} içinde görünüm, koruma, ses ve
              karakter aynı atölyede buluşur.
            </p>
          </div>

          <aside
            className="rsg-card rsg-card--accent rsg-pagehero__aside"
            data-reveal
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow rsg-eyebrow--muted">
              {siteSettings.address.city} / {siteSettings.address.district}
            </p>
            <h2>{publishedServices.length}+ hizmet, tek merkez.</h2>
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              event="whatsapp_click"
              href={generalWhatsAppLink.href}
              placement="about_page"
            >
              <MessageCircle aria-hidden="true" size={18} />
              {generalWhatsAppLink.label}
            </TrackedLink>
          </aside>
        </div>
      </section>

      <section className="rsg-section" aria-labelledby="about-principles-title">
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">İşletme Yaklaşımı</p>
          <h2 id="about-principles-title" className="rsg-title">
            Net beklenti, doğru yönlendirme
          </h2>
        </div>

        <div className="rain-container rsg-grid-3">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="rsg-feature"
              data-reveal
              style={
                { "--reveal-delay": `${0.06 * index}s` } as React.CSSProperties
              }
            >
              <span className="rsg-feature__icon" aria-hidden="true">
                <principle.icon size={20} />
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rsg-section" aria-labelledby="about-services-title">
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Hizmet Kapsamı</p>
          <h2 id="about-services-title" className="rsg-title">
            Dört alan, tek akış
          </h2>
        </div>

        <div className="rain-container rsg-grid-auto">
          {publishedCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/hizmetler#${category.slug}`}
              className="rsg-feature"
              data-reveal
              style={
                {
                  "--reveal-delay": `${0.05 * (index % 4)}s`,
                } as React.CSSProperties
              }
            >
              <span className="rsg-feature__index">0{category.order}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <span className="rsg-service__cta" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="rsg-section rsg-cta-section"
        aria-labelledby="about-cta-title"
      >
        <div className="rain-container rsg-cta" data-reveal>
          <div className="rsg-cta__copy">
            <p className="rsg-eyebrow">İletişim</p>
            <h2 id="about-cta-title" className="rsg-title rsg-title--light">
              En hızlı yol WhatsApp.
            </h2>
            <p className="rsg-lead">{siteSettings.address.display}</p>
          </div>
          <div className="rsg-cta__actions">
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              event="whatsapp_click"
              href={generalWhatsAppLink.href}
              placement="about_page"
            >
              <MessageCircle aria-hidden="true" size={18} />
              {generalWhatsAppLink.label}
            </TrackedLink>
            {phoneContact ? (
              <TrackedLink
                className="rain-button rain-button--ghost rsg-btn-lg"
                event="phone_click"
                href={phoneContact.href}
                placement="about_page"
              >
                {phoneContact.value}
              </TrackedLink>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
