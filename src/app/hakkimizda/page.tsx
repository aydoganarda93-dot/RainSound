import Link from "next/link";

import {
  generalWhatsAppLink,
  getContactByChannel,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
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

export default function AboutPage() {
  const phoneContact = getContactByChannel("phone");
  const whatsappContact = getContactByChannel("whatsapp");

  return (
    <main className="about-page">
      <StructuredData
        data={[
          buildBreadcrumbJsonLd(pageBreadcrumbs.about),
          buildLocalBusinessJsonLd(),
        ]}
      />
      <Breadcrumbs items={pageBreadcrumbs.about} />
      <section
        className="about-hero rain-section"
        aria-labelledby="about-page-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container about-hero__grid">
          <div className="about-hero__content">
            <p className="rain-badge">Hakkımızda</p>
            <h1
              id="about-page-title"
              className="rain-heading rain-heading--hero"
            >
              {siteSettings.tagline}
            </h1>
            <p>
              {siteSettings.description} {siteSettings.siteName},{" "}
              {siteSettings.address.district} içinde araç görünümünü, koruma
              ihtiyacını, ses teknolojisini ve modifiye karakterini aynı çatı
              altında ele alan tanıtım odaklı bir garaj deneyimi sunar.
            </p>
          </div>

          <aside className="rain-card about-hero__panel">
            <span>
              {siteSettings.address.city} / {siteSettings.address.district}
            </span>
            <strong>{publishedServices.length}+ hizmet tek merkezde.</strong>
            <p>
              Sabit fiyat yayınlanmaz. Araç durumu, işlem kapsamı ve ürün seçimi
              WhatsApp üzerinden netleştirilir.
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

      <section className="rain-section" aria-labelledby="about-trust-title">
        <div className="rain-container home-section-heading">
          <p className="rain-badge">İşletme Güveni</p>
          <h2
            id="about-trust-title"
            className="rain-heading rain-heading--section"
          >
            Net beklenti, doğru yönlendirme, araca göre işlem.
          </h2>
          <p>
            Bu web sitesi fiyat listesi gibi değil, doğru hizmete hızlı ulaşma
            noktası gibi çalışır. Gerçek işlem kapsamı araç görülmeden veya araç
            bilgisi alınmadan kesinleştirilmez.
          </p>
        </div>

        <div className="rain-container rain-grid about-principles">
          <article className="rain-card about-card">
            <p className="rain-badge">01</p>
            <h3>Fiyat WhatsApp üzerinden netleşir</h3>
            <p>
              Fiyatlar araca, ürün seçimine, uygulama kapsamına ve mevcut yüzey
              durumuna göre değişir. Bu yüzden sayfada sabit fiyat gösterilmez.
            </p>
          </article>
          <article className="rain-card about-card">
            <p className="rain-badge">02</p>
            <h3>Demo ve gerçek içerik ayrımı korunur</h3>
            <p>
              Gerçek müşteri aracı ve izinli medya gelmeden demo içerik gerçek
              uygulama sonucu gibi sunulmaz.
            </p>
          </article>
          <article className="rain-card about-card">
            <p className="rain-badge">03</p>
            <h3>Hizmet kapsamı araç özelinde değerlendirilir</h3>
            <p>
              Detailing, PPF, ses sistemi, far tasarımı, body kit ve egzoz gibi
              işler araç modeli ve beklentiye göre planlanır.
            </p>
          </article>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="about-services-title">
        <div className="rain-container about-services__grid">
          <div className="home-section-heading">
            <p className="rain-badge">Hizmet Kapsamı</p>
            <h2
              id="about-services-title"
              className="rain-heading rain-heading--section"
            >
              Detailing, koruma, ses teknolojisi ve modifiye aynı akışta.
            </h2>
            <p>
              Hizmetler kategori bazında ayrılır; her kategoride doğru işlem,
              doğru medya ve doğru WhatsApp mesajı ayrı takip edilir.
            </p>
            <Link
              className="rain-button rain-button--secondary"
              href="/hizmetler"
            >
              Tüm Hizmetleri İncele
            </Link>
          </div>

          <div className="rain-grid about-category-grid">
            {publishedCategories.map((category) => (
              <article key={category.id} className="rain-card about-card">
                <p className="rain-badge">{category.title}</p>
                <h3>{category.description}</h3>
                <p>
                  {
                    publishedServices.filter(
                      (service) => service.categoryId === category.id,
                    ).length
                  }{" "}
                  hizmet bu kategori altında takip ediliyor.
                </p>
                <Link
                  className="rain-link"
                  href={`/hizmetler#${category.slug}`}
                >
                  {category.title} hizmetlerini incele
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rain-section about-contact-strip">
        <div className="rain-container rain-card about-contact-strip__card">
          <p className="rain-badge">İletişim</p>
          <h2 className="rain-heading rain-heading--section">
            Randevu ve bilgi için en hızlı yol WhatsApp.
          </h2>
          <p>{siteSettings.address.display}</p>
          <div className="about-contact-strip__actions">
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
            {whatsappContact ? (
              <Link
                className="rain-button rain-button--secondary"
                href="/iletisim"
              >
                Tüm İletişim Bilgileri
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
