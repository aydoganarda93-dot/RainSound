import type { Metadata } from "next";
import Link from "next/link";

import {
  generalWhatsAppLink,
  getServiceWhatsAppLink,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "RAIN SOUND Eskişehir hizmetleri: detailing, seramik kaplama, PPF, cam filmi, araç kaplama, oto ses sistemleri, aksesuar, far tasarımı, body kit ve varex egzoz.",
};

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const publishedServices = services.filter(
  (service) => service.status === "published",
);

const getServicesByCategory = (categoryId: string) =>
  publishedServices.filter((service) => service.categoryId === categoryId);

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section
        className="services-hero rain-section"
        aria-labelledby="services-page-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container services-hero__grid">
          <div className="services-hero__content">
            <p className="rain-badge">Hizmetler</p>
            <h1
              id="services-page-title"
              className="rain-heading rain-heading--hero"
            >
              Aracın karakterini ortaya çıkar.
            </h1>
            <p>
              RAIN SOUND; detailing, koruma, ses sistemi, aksesuar ve modifiye
              işlerini tek bir tanıtım akışında toplar. Fiyatlar araç, ürün ve
              işlem kapsamına göre WhatsApp üzerinden netleştirilir.
            </p>
          </div>

          <aside className="rain-card services-hero__panel">
            <span className="services-hero__panel-label">
              {publishedCategories.length} kategori / {publishedServices.length}{" "}
              hizmet
            </span>
            <strong>{siteSettings.address.city} içi hızlı iletişim</strong>
            <p>
              İstediğin hizmeti seç, araç bilgini WhatsApp üzerinden gönder.
              Sabit fiyat yayınlanmaz; doğru bilgi işlem ve araca göre verilir.
            </p>
            <a
              className="rain-button rain-button--primary"
              href={generalWhatsAppLink.href}
            >
              {generalWhatsAppLink.label}
            </a>
          </aside>
        </div>
      </section>

      <nav
        className="rain-section services-index"
        aria-label="Hizmet kategorileri"
      >
        <div className="rain-container services-index__inner">
          {publishedCategories.map((category) => (
            <a
              key={category.id}
              className="services-index__link"
              href={`#${category.slug}`}
            >
              <span>{category.title}</span>
              <small>{getServicesByCategory(category.id).length} hizmet</small>
            </a>
          ))}
        </div>
      </nav>

      {publishedCategories.map((category) => {
        const categoryServices = getServicesByCategory(category.id);

        return (
          <section
            key={category.id}
            id={category.slug}
            className="rain-section services-category"
            aria-labelledby={`${category.slug}-title`}
          >
            <div className="rain-container services-category__heading">
              <div>
                <p className="rain-badge">{category.title}</p>
                <h2
                  id={`${category.slug}-title`}
                  className="rain-heading rain-heading--section"
                >
                  {category.description}
                </h2>
              </div>
              <p>
                Bu kategorideki her hizmet için süreç, fayda, süre/fiyat notu ve
                medya ihtiyacı veri katmanından beslenir.
              </p>
            </div>

            <div className="rain-container rain-grid services-category__grid">
              {categoryServices.map((service) => {
                const whatsappLink = getServiceWhatsAppLink(service);

                return (
                  <article key={service.id} className="rain-card service-card">
                    <div className="service-card__header">
                      <p className="rain-badge">{category.title}</p>
                      <h3>{service.title}</h3>
                      <p>{service.summary}</p>
                    </div>

                    <div className="service-card__body">
                      <div>
                        <strong>Öne çıkan faydalar</strong>
                        <ul>
                          {service.benefits.slice(0, 3).map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                          ))}
                        </ul>
                      </div>

                      <dl className="service-card__meta">
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
                    </div>

                    <div className="service-card__footer">
                      {service.demo.replacementRequiredBeforeProduction ? (
                        <p className="service-card__demo-note">
                          Demo içerik - yayın öncesi gerçek medya ile
                          doğrulanacak.
                        </p>
                      ) : null}
                      <Link
                        className="rain-button rain-button--primary"
                        href={`/hizmetler/${service.slug}`}
                      >
                        Detayları İncele
                      </Link>
                      <a
                        className="rain-button rain-button--secondary"
                        href={whatsappLink.href}
                      >
                        {whatsappLink.label}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <section className="rain-section services-final-cta">
        <div className="rain-container rain-card services-final-cta__card">
          <p className="rain-badge">Kararsız kaldıysan</p>
          <h2 className="rain-heading rain-heading--section">
            Araç fotoğrafını gönder, doğru hizmeti birlikte netleştirelim.
          </h2>
          <p>
            {siteSettings.address.display} adresindeki uygulama merkezinde
            hizmet kapsamı araç durumuna göre değerlendirilir.
          </p>
          <a
            className="rain-button rain-button--primary"
            href={generalWhatsAppLink.href}
          >
            WhatsApp’tan Genel Bilgi Al
          </a>
        </div>
      </section>
    </main>
  );
}
