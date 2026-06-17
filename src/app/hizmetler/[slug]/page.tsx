import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getServiceWhatsAppLink,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const getServiceBySlug = (slug: string) =>
  publishedServices.find((service) => service.slug === slug);

const getCategoryById = (categoryId: string) =>
  serviceCategories.find((category) => category.id === categoryId);

const getRelatedServices = (serviceIdList: string[]) =>
  publishedServices.filter((service) => serviceIdList.includes(service.id));

export function generateStaticParams() {
  return publishedServices.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı",
    };
  }

  return {
    title: service.title,
    description: `${service.summary} ${service.pricingNote}`,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const category = getCategoryById(service.categoryId);
  const whatsappLink = getServiceWhatsAppLink(service);
  const relatedServices = getRelatedServices(service.relatedServiceIds);

  return (
    <main className="service-detail-page">
      <section
        className="service-detail-hero rain-section"
        aria-labelledby="service-detail-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container service-detail-hero__grid">
          <div className="service-detail-hero__content">
            <Link
              className="rain-link service-detail__back-link"
              href="/hizmetler"
            >
              Hizmetlere dön
            </Link>
            <p className="rain-badge">{category?.title ?? "Hizmet"}</p>
            <h1
              id="service-detail-title"
              className="rain-heading rain-heading--hero"
            >
              {service.title}
            </h1>
            <p className="service-detail-hero__summary">{service.summary}</p>
            <p>{service.description}</p>
            <div className="service-detail-hero__actions">
              <a
                className="rain-button rain-button--primary"
                href={whatsappLink.href}
              >
                {whatsappLink.label}
              </a>
              <Link
                className="rain-button rain-button--secondary"
                href="/hizmetler"
              >
                Tüm Hizmetler
              </Link>
            </div>
          </div>

          <aside className="rain-card service-detail-hero__panel">
            <span>RAIN SOUND / {siteSettings.address.city}</span>
            <strong>Fiyat ve kapsam araca göre netleşir.</strong>
            <dl className="service-detail-meta">
              <div>
                <dt>Süre</dt>
                <dd>{service.estimatedDurationNote}</dd>
              </div>
              <div>
                <dt>Fiyat</dt>
                <dd>{service.pricingNote}</dd>
              </div>
              <div>
                <dt>Garanti</dt>
                <dd>{service.warrantyNote}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        className="rain-section"
        aria-labelledby="service-benefits-title"
      >
        <div className="rain-container service-detail-two-column">
          <article className="rain-card service-detail-card">
            <p className="rain-badge">Faydalar</p>
            <h2
              id="service-benefits-title"
              className="rain-heading rain-heading--section"
            >
              Bu hizmet ne kazandırır?
            </h2>
            <ul className="service-detail-list">
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card service-detail-card">
            <p className="rain-badge">Süreç</p>
            <h2 className="rain-heading rain-heading--section">
              Standart uygulama akışı.
            </h2>
            <ol className="service-detail-steps">
              {service.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="service-media-title">
        <div className="rain-container service-detail-two-column">
          <article className="rain-card service-detail-card">
            <p className="rain-badge">Medya İhtiyacı</p>
            <h2
              id="service-media-title"
              className="rain-heading rain-heading--section"
            >
              Yayın öncesi toplanacak görseller.
            </h2>
            <ul className="service-detail-list">
              {service.mediaNeeds.map((need) => (
                <li key={need}>{need}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card service-detail-card service-detail-card--cta">
            <p className="rain-badge">WhatsApp Mesajı</p>
            <h2 className="rain-heading rain-heading--section">
              Doğru bilgi için araç detayını gönder.
            </h2>
            <p>{service.ctaContext.messageHint}</p>
            {service.demo.replacementRequiredBeforeProduction ? (
              <p className="service-detail-demo-note">
                Demo içerik notu: {service.demo.note}
              </p>
            ) : null}
            <a
              className="rain-button rain-button--primary"
              href={whatsappLink.href}
            >
              {whatsappLink.label}
            </a>
          </article>
        </div>
      </section>

      {relatedServices.length > 0 ? (
        <section
          className="rain-section service-detail-related"
          aria-labelledby="related-services-title"
        >
          <div className="rain-container home-section-heading">
            <p className="rain-badge">İlgili Hizmetler</p>
            <h2
              id="related-services-title"
              className="rain-heading rain-heading--section"
            >
              Bu hizmetle birlikte değerlendirilebilecek işlemler.
            </h2>
          </div>

          <div className="rain-container rain-grid">
            {relatedServices.map((relatedService) => {
              const relatedCategory = getCategoryById(
                relatedService.categoryId,
              );

              return (
                <article
                  key={relatedService.id}
                  className="rain-card service-card"
                >
                  <div className="service-card__header">
                    <p className="rain-badge">
                      {relatedCategory?.title ?? "Hizmet"}
                    </p>
                    <h3>{relatedService.title}</h3>
                    <p>{relatedService.summary}</p>
                  </div>
                  <div className="service-card__footer">
                    <Link
                      className="rain-button rain-button--secondary"
                      href={`/hizmetler/${relatedService.slug}`}
                    >
                      Detayları İncele
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
