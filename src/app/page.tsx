import Link from "next/link";

import {
  demoContentReport,
  faqs,
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
  projects,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import { HeroIntro } from "@/components/hero-intro";
import { HeroMediaShell } from "@/components/hero-media-shell";
import { HomeMotionShell } from "@/components/home-motion-shell";
import { StructuredData } from "@/components/structured-data";
import {
  buildLocalBusinessJsonLd,
  buildPageMetadata,
  buildServiceListJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: `${siteSettings.siteName} | Oto Detailing ve Ses Sistemleri`,
  description: `${siteSettings.siteName}, ${siteSettings.address.district}/${siteSettings.address.city} içinde oto detailing, araç koruma, ses sistemleri, aksesuar ve modifiye hizmetleri için WhatsApp odaklı tanıtım ve iletişim sitesi.`,
  path: "/",
});

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const featuredServices = services
  .filter((service) => service.status === "published")
  .slice(0, 6);

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const featuredProjects = projects.slice(0, 3);

const mapsLink = getSocialLinkByChannel("maps");

const instagramLink = getSocialLinkByChannel("instagram");

const weekdayHours = siteSettings.businessHours.find(
  (entry) => entry.day === "monday",
);

export default function Home() {
  const phoneContact = getContactByChannel("phone");

  return (
    <HomeMotionShell>
      <StructuredData
        data={[
          buildLocalBusinessJsonLd(),
          buildServiceListJsonLd(publishedServices),
        ]}
      />
      <section className="home-hero rain-section" aria-labelledby="hero-title">
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container home-hero__grid">
          <HeroIntro
            badge="Neon Performance Studio"
            title={siteSettings.siteName}
            tagline={siteSettings.tagline}
            description={`${siteSettings.description} Detailing, koruma, ses sistemi, aksesuar ve modifiye hizmetleri tek karakterli bir garaj deneyiminde birleşiyor.`}
            primaryCta={generalWhatsAppLink}
            secondaryCta={
              phoneContact
                ? {
                    href: phoneContact.href,
                    label: phoneContact.value,
                  }
                : undefined
            }
          />

          <div className="home-hero__media-stack">
            <HeroMediaShell />

            <aside
              className="rain-card home-hero__panel"
              aria-label="Hızlı özet"
            >
              <span className="home-hero__panel-kicker">
                {siteSettings.address.city} / {siteSettings.address.district}
              </span>
              <strong>Detailing, Sound & Tech, Design & Performance</strong>
              <p>
                Fiyat ve uygun randevu araç durumuna ve işleme göre değişir.
                Güncel bilgi WhatsApp üzerinden alınır.
              </p>
              <dl className="home-hero__stats">
                <div>
                  <dt>Hizmet</dt>
                  <dd>{services.length}+</dd>
                </div>
                <div>
                  <dt>Kategori</dt>
                  <dd>{publishedCategories.length}</dd>
                </div>
                <div>
                  <dt>Demo veri</dt>
                  <dd>{demoContentReport.summary.demoItems}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="services-title">
        <div className="rain-container home-section-heading" data-home-reveal>
          <p className="rain-badge">Hizmetler</p>
          <h2
            id="services-title"
            className="rain-heading rain-heading--section"
          >
            Aracın ihtiyacına göre seçilen uygulamalar.
          </h2>
          <p>
            İlk sürümde tüm fiyatlandırma WhatsApp üzerinden yürür. Sayfadaki
            içerikler tanıtım akışını kurar; gerçek medya ve detaylar sonraki
            fazlarda bağlanır.
          </p>
        </div>

        <div className="rain-container rain-grid home-service-grid">
          {featuredServices.map((service) => {
            const category = publishedCategories.find(
              (item) => item.id === service.categoryId,
            );

            return (
              <article
                key={service.id}
                className="rain-card home-card"
                data-home-card
              >
                <p className="rain-badge">{category?.title ?? "Hizmet"}</p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.benefits.slice(0, 2).map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <p className="home-card__note">{service.pricingNote}</p>
                <Link className="rain-link" href={`/hizmetler/${service.slug}`}>
                  {service.title} detayını incele
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="rain-section home-transform"
        aria-labelledby="projects-title"
      >
        <div className="rain-container home-section-heading" data-home-reveal>
          <p className="rain-badge">Dönüşümler</p>
          <h2
            id="projects-title"
            className="rain-heading rain-heading--section"
          >
            Proje akışı hazır, gerçek araç içerikleri için yer ayrıldı.
          </h2>
          <p>
            Bu bölüm şimdilik demo verilerle çalışır. Production öncesinde
            gerçek müşteri araçları, izin durumu ve medya kaynakları
            doğrulanacaktır.
          </p>
        </div>

        <div className="rain-container rain-grid">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="rain-card home-card home-project-card"
              data-home-card
            >
              <p className="rain-badge">Demo proje</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span>{project.vehicleLabel}</span>
              <strong>{project.serviceIds.length} bağlı hizmet</strong>
              <Link className="rain-link" href={`/projeler/${project.slug}`}>
                Proje akışını incele
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rain-section" aria-labelledby="trust-title">
        <div className="rain-container home-trust">
          <div className="home-section-heading" data-home-reveal>
            <p className="rain-badge">Güven</p>
            <h2 id="trust-title" className="rain-heading rain-heading--section">
              Net bilgi, doğru beklenti, WhatsApp üzerinden hızlı dönüş.
            </h2>
          </div>

          <div className="rain-grid">
            <article className="rain-card home-card" data-home-card>
              <h3>Fiyat şeffaflığı</h3>
              <p>
                Sabit fiyat gösterilmez. Araç durumu, işlem kapsamı ve ürün
                seçimine göre WhatsApp üzerinden bilgi verilir.
              </p>
            </article>
            <article className="rain-card home-card" data-home-card>
              <h3>Demo ayrımı</h3>
              <p>
                Demo ve gerçek içerik ayrımı veri seviyesinde takip edilir.
                Gerçek medya gelmeden proje sonucu gibi sunulmaz.
              </p>
            </article>
            <article className="rain-card home-card" data-home-card>
              <h3>Hizmet kapsamı</h3>
              <p>
                Seramik, PPF, ses sistemi, aksesuar ve modifiye işleri araç
                özelinde değerlendirilir.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="rain-section home-contact"
        aria-labelledby="contact-title"
      >
        <div className="rain-container home-contact__grid">
          <div className="home-section-heading" data-home-reveal>
            <p className="rain-badge">İletişim</p>
            <h2
              id="contact-title"
              className="rain-heading rain-heading--section"
            >
              {siteSettings.address.district} içinde randevu ve bilgi için en
              hızlı yol WhatsApp.
            </h2>
            <p>{siteSettings.address.display}</p>
          </div>

          <div className="rain-card home-contact__card" data-home-reveal>
            <a
              className="rain-button rain-button--primary"
              href={generalWhatsAppLink.href}
            >
              {generalWhatsAppLink.label}
            </a>
            {phoneContact ? (
              <a
                className="rain-button rain-button--secondary"
                href={phoneContact.href}
              >
                {phoneContact.value}
              </a>
            ) : null}
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
            {instagramLink ? (
              <a
                className="rain-link home-contact__social"
                href={instagramLink.href}
                target={instagramLink.target}
                rel="noreferrer"
              >
                Instagram: {instagramLink.label}
              </a>
            ) : null}
            {weekdayHours ? (
              <p>
                Pazartesi-Cumartesi {weekdayHours.opensAt}-
                {weekdayHours.closesAt}, Pazar kapalı.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {faqs.length > 0 ? (
        <section className="rain-section" aria-labelledby="faq-title">
          <div className="rain-container home-section-heading" data-home-reveal>
            <p className="rain-badge">Sık Sorulan</p>
            <h2 id="faq-title" className="rain-heading rain-heading--section">
              İlk cevaplar.
            </h2>
          </div>
          <div className="rain-container rain-grid">
            {faqs
              .filter((faq) => faq.status === "published")
              .map((faq) => (
                <article
                  key={faq.id}
                  className="rain-card home-card"
                  data-home-card
                >
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
