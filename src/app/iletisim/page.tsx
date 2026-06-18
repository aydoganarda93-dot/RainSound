import Link from "next/link";

import {
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import type { BusinessHoursEntry } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildLocalBusinessJsonLd,
  buildPageMetadata,
  pageBreadcrumbs,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "İletişim ve Yol Tarifi",
  description:
    "RAIN SOUND Eskişehir iletişim bilgileri: WhatsApp, telefon, Instagram, yol tarifi, adres ve çalışma saatleri.",
  path: "/iletisim",
});

const dayLabels: Record<BusinessHoursEntry["day"], string> = {
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
};

const formatBusinessHours = (entry: BusinessHoursEntry) => {
  if (entry.isClosed) {
    return "Kapalı";
  }

  return `${entry.opensAt}-${entry.closesAt}`;
};

export default function ContactPage() {
  const phoneContact = getContactByChannel("phone");
  const whatsappContact = getContactByChannel("whatsapp");
  const instagramLink = getSocialLinkByChannel("instagram");
  const mapsLink = getSocialLinkByChannel("maps");

  return (
    <main className="contact-page">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd(pageBreadcrumbs.contact),
          buildLocalBusinessJsonLd(),
        ]}
      />
      <Breadcrumbs items={pageBreadcrumbs.contact} />
      <section
        className="contact-hero rain-section"
        aria-labelledby="contact-page-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container contact-hero__grid">
          <div className="contact-hero__content">
            <p className="rain-badge">İletişim</p>
            <h1
              id="contact-page-title"
              className="rain-heading rain-heading--hero"
            >
              Aracın için doğru işlem burada netleşir.
            </h1>
            <p>
              Randevu, fiyat ve hizmet kapsamı araç durumuna göre belirlenir. En
              hızlı dönüş için WhatsApp üzerinden araç bilgini ve beklentini
              paylaşabilirsin.
            </p>
            <div className="contact-hero__actions">
              <a
                className="rain-button rain-button--primary"
                href={generalWhatsAppLink.href}
              >
                {generalWhatsAppLink.label}
              </a>
              {mapsLink ? (
                <a
                  className="rain-button rain-button--secondary"
                  href={mapsLink.href}
                  target={mapsLink.target}
                  rel="noreferrer"
                >
                  Yol Tarifi Al
                </a>
              ) : null}
            </div>
          </div>

          <aside className="rain-card contact-hero__panel">
            <span>
              {siteSettings.address.city} / {siteSettings.address.district}
            </span>
            <strong>{siteSettings.address.display}</strong>
            <p>
              Pazartesi-Cumartesi 09:00-20:00 arası hizmet verilir. Pazar günü
              kapalıdır.
            </p>
          </aside>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="contact-links-title">
        <div className="rain-container contact-grid">
          <article className="rain-card contact-card">
            <p className="rain-badge">Kanallar</p>
            <h2
              id="contact-links-title"
              className="rain-heading rain-heading--section"
            >
              Hızlı iletişim.
            </h2>
            <div className="contact-link-list">
              {whatsappContact ? (
                <a
                  className="rain-button rain-button--primary"
                  href={generalWhatsAppLink.href}
                >
                  WhatsApp: {whatsappContact.value}
                </a>
              ) : null}
              {phoneContact ? (
                <a
                  className="rain-button rain-button--secondary"
                  href={phoneContact.href}
                >
                  Telefon: {phoneContact.value}
                </a>
              ) : null}
              {instagramLink ? (
                <a
                  className="rain-button rain-button--secondary"
                  href={instagramLink.href}
                  target={instagramLink.target}
                  rel="noreferrer"
                >
                  {instagramLink.label}
                </a>
              ) : null}
              {mapsLink ? (
                <a
                  className="rain-button rain-button--secondary"
                  href={mapsLink.href}
                  target={mapsLink.target}
                  rel="noreferrer"
                >
                  {mapsLink.label}
                </a>
              ) : null}
            </div>
          </article>

          <article className="rain-card contact-card">
            <p className="rain-badge">Adres</p>
            <h2 className="rain-heading rain-heading--section">
              Uygulama merkezi.
            </h2>
            <address className="contact-address">
              <strong>{siteSettings.legalName}</strong>
              <span>{siteSettings.address.street}</span>
              <span>
                {siteSettings.address.postalCode}{" "}
                {siteSettings.address.district}/{siteSettings.address.city}
              </span>
            </address>
            {mapsLink ? (
              <a
                className="rain-link contact-card__text-link"
                href={mapsLink.href}
                target={mapsLink.target}
                rel="noreferrer"
              >
                Haritada aç ve yol tarifi al
              </a>
            ) : null}
          </article>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="business-hours-title">
        <div className="rain-container contact-grid">
          <article className="rain-card contact-card">
            <p className="rain-badge">Çalışma Saatleri</p>
            <h2
              id="business-hours-title"
              className="rain-heading rain-heading--section"
            >
              Haftalık plan.
            </h2>
            <dl className="business-hours-list">
              {siteSettings.businessHours.map((entry) => (
                <div key={entry.day}>
                  <dt>{dayLabels[entry.day]}</dt>
                  <dd>{formatBusinessHours(entry)}</dd>
                </div>
              ))}
            </dl>
            <p>
              Özel gün çalışma saatleri değişken olabileceği için bu aşamada
              ayrıca yayınlanmaz.
            </p>
          </article>

          <article className="rain-card contact-card">
            <p className="rain-badge">Hizmet Kapsamı</p>
            <h2 className="rain-heading rain-heading--section">
              Görüşmede ne netleşir?
            </h2>
            <ul className="contact-service-list">
              {serviceCategories
                .filter((category) => category.status === "published")
                .map((category) => (
                  <li key={category.id}>
                    <Link href={`/hizmetler#${category.slug}`}>
                      <strong>{category.title}</strong>
                    </Link>
                    <span>
                      {
                        services.filter(
                          (service) => service.categoryId === category.id,
                        ).length
                      }{" "}
                      hizmet
                    </span>
                  </li>
                ))}
            </ul>
            <Link
              className="rain-button rain-button--secondary"
              href="/hizmetler"
            >
              Hizmetleri İncele
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
