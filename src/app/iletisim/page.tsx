import { Camera, Clock, MapPin, MessageCircle, Phone } from "lucide-react";

import {
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
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

  return `${entry.opensAt} – ${entry.closesAt}`;
};

export default function ContactPage() {
  const phoneContact = getContactByChannel("phone");
  const whatsappContact = getContactByChannel("whatsapp");
  const instagramLink = getSocialLinkByChannel("instagram");
  const mapsLink = getSocialLinkByChannel("maps");

  const channels = [
    whatsappContact && {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsappContact.value,
      href: generalWhatsAppLink.href,
      external: false,
    },
    phoneContact && {
      icon: Phone,
      label: "Telefon",
      value: phoneContact.value,
      href: phoneContact.href,
      external: false,
    },
    instagramLink && {
      icon: Camera,
      label: "Instagram",
      value: instagramLink.label,
      href: instagramLink.href,
      external: true,
    },
    mapsLink && {
      icon: MapPin,
      label: "Yol Tarifi",
      value: "Google Maps",
      href: mapsLink.href,
      external: true,
    },
  ].filter(Boolean) as Array<{
    icon: typeof MessageCircle;
    label: string;
    value: string;
    href: string;
    external: boolean;
  }>;

  return (
    <main className="rsg-page">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd(pageBreadcrumbs.contact),
          buildLocalBusinessJsonLd(),
        ]}
      />
      <Breadcrumbs items={pageBreadcrumbs.contact} />

      <section className="rsg-pagehero" aria-labelledby="contact-page-title">
        <div className="rsg-pagehero__glow rsg-pagehero__glow--right" aria-hidden="true" />
        <div className="rain-container rsg-pagehero__inner">
          <div className="rsg-pagehero__lead-col">
            <p className="rsg-eyebrow" data-reveal>
              <span className="rsg-eyebrow__dot" aria-hidden="true" />
              İletişim
            </p>
            <h1
              id="contact-page-title"
              className="rsg-pagehero__title rsg-title--xl"
              data-reveal
              style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            >
              Konuşalım
            </h1>
            <p
              className="rsg-lead"
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              Araç bilgini ve beklentini gönder; en hızlı dönüş WhatsApp&apos;tan.
            </p>
            <div
              className="rsg-pagehero__actions"
              data-reveal
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
            >
              <a
                className="rain-button rain-button--primary rsg-btn-lg"
                href={generalWhatsAppLink.href}
              >
                <MessageCircle aria-hidden="true" size={18} />
                {generalWhatsAppLink.label}
              </a>
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
            </div>
          </div>

          <aside
            className="rsg-card rsg-card--accent rsg-pagehero__aside"
            data-reveal
            style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow rsg-eyebrow--muted">Adres</p>
            <address className="rsg-address">
              <strong>{siteSettings.legalName}</strong>
              <span>{siteSettings.address.street}</span>
              <span>
                {siteSettings.address.postalCode}{" "}
                {siteSettings.address.district}/{siteSettings.address.city}
              </span>
            </address>
          </aside>
        </div>
      </section>

      <section className="rsg-section" aria-labelledby="contact-channels-title">
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Kanallar</p>
          <h2 id="contact-channels-title" className="rsg-title">
            Hızlı iletişim
          </h2>
        </div>

        <div className="rain-container rsg-grid-auto">
          {channels.map((channel, index) => (
            <a
              key={channel.label}
              href={channel.href}
              className="rsg-feature"
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noreferrer" : undefined}
              data-reveal
              style={{ "--reveal-delay": `${0.05 * (index % 4)}s` } as React.CSSProperties}
            >
              <span className="rsg-feature__icon" aria-hidden="true">
                <channel.icon size={20} />
              </span>
              <h3>{channel.label}</h3>
              <p>{channel.value}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="rsg-section rsg-cta-section" aria-labelledby="contact-hours-title">
        <div className="rain-container rsg-grid-2">
          <article className="rsg-card" data-reveal>
            <p className="rsg-eyebrow">
              <Clock aria-hidden="true" size={15} />
              Çalışma Saatleri
            </p>
            <h2 id="contact-hours-title" className="rsg-title">
              Haftalık plan
            </h2>
            <dl className="rsg-meta">
              {siteSettings.businessHours.map((entry) => (
                <div key={entry.day} className="rsg-meta__row">
                  <dt>{dayLabels[entry.day]}</dt>
                  <dd>{formatBusinessHours(entry)}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article
            className="rsg-card rsg-card--accent"
            data-reveal
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow">Konum</p>
            <h2 className="rsg-title">Uygulama merkezi</h2>
            <p>{siteSettings.address.display}</p>
            {mapsLink ? (
              <a
                className="rain-button rain-button--primary rsg-btn-lg"
                href={mapsLink.href}
                target={mapsLink.target}
                rel="noreferrer"
              >
                <MapPin aria-hidden="true" size={18} />
                Haritada Aç
              </a>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
}
