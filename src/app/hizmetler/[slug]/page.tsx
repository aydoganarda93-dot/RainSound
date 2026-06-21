import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";

import {
  getServiceWhatsAppLink,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import { ServiceViewTracker, TrackedLink } from "@/components/analytics";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildServiceJsonLd,
  getServiceBreadcrumbs,
} from "@/lib/seo";

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

  const category = getCategoryById(service.categoryId);

  return buildPageMetadata({
    title: service.title,
    description: `${siteSettings.address.district}/${siteSettings.address.city} için ${service.summary} ${category ? `${category.title} kategorisinde ` : ""}${service.pricingNote}`,
    path: `/hizmetler/${service.slug}`,
    type: "article",
  });
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
  const breadcrumbs = getServiceBreadcrumbs(service);

  return (
    <main className="rsg-page">
      <ServiceViewTracker
        serviceId={service.id}
        slug={service.slug}
        title={service.title}
      />
      <StructuredData
        data={[buildBreadcrumbJsonLd(breadcrumbs), buildServiceJsonLd(service)]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <section
        className="rsg-pagehero rsg-pagehero--compact"
        aria-labelledby="service-detail-title"
      >
        <div
          className="rsg-pagehero__glow rsg-pagehero__glow--right"
          aria-hidden="true"
        />
        <div className="rain-container rsg-pagehero__inner">
          <div className="rsg-pagehero__lead-col">
            <Link className="rsg-backlink" href="/hizmetler" data-reveal>
              <ArrowLeft aria-hidden="true" size={16} />
              Hizmetler
            </Link>
            <p className="rsg-eyebrow" data-reveal>
              <span className="rsg-eyebrow__dot" aria-hidden="true" />
              {category?.title ?? "Hizmet"}
            </p>
            <h1
              id="service-detail-title"
              className="rsg-pagehero__title rsg-title--xl"
              data-reveal
              style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            >
              {service.title}
            </h1>
            <p
              className="rsg-lead"
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              {service.summary}
            </p>
            <div
              className="rsg-pagehero__actions"
              data-reveal
              style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
            >
              <TrackedLink
                className="rain-button rain-button--primary rsg-btn-lg"
                context="service"
                event="whatsapp_click"
                href={whatsappLink.href}
                placement="service_detail"
                serviceSlug={service.slug}
              >
                <MessageCircle aria-hidden="true" size={18} />
                {whatsappLink.label}
              </TrackedLink>
            </div>
          </div>

          <aside
            className="rsg-card rsg-card--accent rsg-card--compact rsg-pagehero__aside"
            data-reveal
            style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow rsg-eyebrow--muted">
              Araca göre netleşir
            </p>
            <dl className="rsg-meta">
              <div>
                <dt>Süre</dt>
                <dd>{service.estimatedDurationNote}</dd>
              </div>
              <div>
                <dt>Fiyat</dt>
                <dd>{service.pricingNote}</dd>
              </div>
              <div>
                <dt>Koşullar</dt>
                <dd>{service.warrantyNote}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="rsg-section" aria-labelledby="service-benefits-title">
        <div className="rain-container rsg-grid-2">
          {service.benefits.length > 0 ? (
            <article className="rsg-card" data-reveal>
              <p className="rsg-eyebrow">Faydalar</p>
              <h2 id="service-benefits-title" className="rsg-title">
                Ne kazandırır?
              </h2>
              <ul className="rsg-checklist">
                {service.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ) : null}

          {service.process.length > 0 ? (
            <article
              className="rsg-card"
              data-reveal
              style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
            >
              <p className="rsg-eyebrow">Süreç</p>
              <h2 className="rsg-title">Uygulama akışı</h2>
              <ol className="rsg-steps">
                {service.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ) : null}
        </div>
      </section>

      <section
        className="rsg-section rsg-section--tight"
        aria-labelledby="service-cta-title"
      >
        <div className="rain-container rsg-cta" data-reveal>
          <div className="rsg-cta__copy">
            <p className="rsg-eyebrow">İletişim</p>
            <h2 id="service-cta-title" className="rsg-title rsg-title--light">
              Araç detayını gönder.
            </h2>
            <p className="rsg-lead">{service.ctaContext.messageHint}</p>
          </div>
          <div className="rsg-cta__actions">
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              context="service"
              event="whatsapp_click"
              href={whatsappLink.href}
              placement="service_detail"
              serviceSlug={service.slug}
            >
              <MessageCircle aria-hidden="true" size={18} />
              {whatsappLink.label}
            </TrackedLink>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 ? (
        <section
          className="rsg-section"
          aria-labelledby="related-services-title"
        >
          <div className="rain-container rsg-section__head" data-reveal>
            <p className="rsg-eyebrow">İlgili Hizmetler</p>
            <h2 id="related-services-title" className="rsg-title">
              Birlikte değerlendir
            </h2>
          </div>

          <div className="rain-container rsg-grid-auto">
            {relatedServices.map((relatedService, index) => {
              const relatedCategory = getCategoryById(
                relatedService.categoryId,
              );

              return (
                <Link
                  key={relatedService.id}
                  href={`/hizmetler/${relatedService.slug}`}
                  aria-label={`${relatedService.title} hizmetini incele`}
                  className="rsg-feature"
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${0.05 * (index % 3)}s`,
                    } as React.CSSProperties
                  }
                >
                  <span className="rsg-feature__index">
                    {relatedCategory?.title ?? "Hizmet"}
                  </span>
                  <h3>{relatedService.title}</h3>
                  <p>{relatedService.summary}</p>
                  <span className="rsg-service__cta" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </main>
  );
}
