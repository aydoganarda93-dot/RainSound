import Link from "next/link";

import { generalWhatsAppLink, siteSettings } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  pageBreadcrumbs,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Gizlilik Politikası",
  description:
    "RAIN SOUND tanıtım sitesi gizlilik politikası: mevcut veri toplama durumu, iletişim kanalları ve üçüncü taraf bağlantılar.",
  path: "/gizlilik",
});

const privacySections = [
  {
    title: "Bu sitenin amacı",
    body: `${siteSettings.siteName} web sitesi; hizmetleri, proje akışlarını, adresi ve iletişim kanallarını tanıtmak için hazırlanmıştır. Bu aşamada site üzerinde randevu formu, üyelik alanı, ödeme sistemi, CMS giriş alanı veya yorum alanı bulunmaz.`,
  },
  {
    title: "Doğrudan veri toplama durumu",
    body: "Site şu anda ziyaretçiden doğrudan ad, soyad, e-posta, araç plakası veya ödeme bilgisi isteyen bir form çalıştırmaz. Ziyaretçi iletişimi WhatsApp, telefon, Instagram veya Google Maps gibi harici bağlantılar üzerinden başlatır.",
  },
  {
    title: "WhatsApp ve telefon iletişimi",
    body: "WhatsApp veya telefon üzerinden paylaşılan araç fotoğrafı, marka/model, iletişim bilgisi ve işlem beklentisi bu web sitesinin içinde değil, seçilen iletişim kanalının kendi sistemi içinde gerçekleşir. Bu bilgiler yalnızca talebi yanıtlamak ve hizmet kapsamını netleştirmek amacıyla kullanılmalıdır.",
  },
  {
    title: "Demo ve medya içerikleri",
    body: "Sitede demo/AI/temsili içerik ile gerçek müşteri aracı içerikleri ayrıştırılarak takip edilir. Gerçek müşteri aracı, plaka, kişi görüntüsü veya tanımlanabilir detay içeren medya yayınlanmadan önce izin ve gizlilik kontrolü yapılmalıdır.",
  },
  {
    title: "Üçüncü taraf bağlantılar",
    body: "Sitede WhatsApp, Instagram ve Google Maps bağlantıları bulunabilir. Bu bağlantılar açıldığında ilgili platformların kendi gizlilik politikaları ve çerez uygulamaları geçerli olur.",
  },
  {
    title: "Analitik, CMS ve formlar",
    body: "Bu aşamada analitik, CMS, form altyapısı veya e-posta pazarlama entegrasyonu aktif değildir. İleride bu sistemlerden biri eklenirse bu gizlilik metni veri türleri, saklama süresi, amaç ve kullanıcı hakları açısından güncellenmelidir.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <StructuredData data={buildBreadcrumbJsonLd(pageBreadcrumbs.privacy)} />
      <Breadcrumbs items={pageBreadcrumbs.privacy} />
      <section
        className="legal-hero rain-section"
        aria-labelledby="privacy-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container legal-hero__grid">
          <div className="legal-hero__content">
            <p className="rain-badge">Gizlilik</p>
            <h1 id="privacy-title" className="rain-heading rain-heading--hero">
              Gizlilik Politikası
            </h1>
            <p>
              Bu metin, mevcut tanıtım sitesi kapsamındaki veri toplama durumunu
              açıklar. Hukuki danışmanlık yerine geçmez; yayın öncesi işletme ve
              hukuki gereksinimlere göre tekrar gözden geçirilmelidir.
            </p>
          </div>

          <aside className="rain-card legal-hero__panel">
            <span>{siteSettings.legalName}</span>
            <strong>Form, CMS ve analitik şu anda aktif değildir.</strong>
            <p>
              Ziyaretçi iletişimi site içi form yerine WhatsApp, telefon,
              Instagram ve yol tarifi bağlantıları üzerinden ilerler.
            </p>
          </aside>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="privacy-content-title">
        <div className="rain-container legal-content">
          <div className="home-section-heading">
            <p className="rain-badge">Kapsam</p>
            <h2
              id="privacy-content-title"
              className="rain-heading rain-heading--section"
            >
              Tanıtım sitesi için sade ve mevcut duruma uygun bilgilendirme.
            </h2>
          </div>

          <div className="legal-section-list">
            {privacySections.map((section) => (
              <article key={section.title} className="rain-card legal-card">
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rain-section legal-final-cta">
        <div className="rain-container rain-card legal-final-cta__card">
          <p className="rain-badge">İletişim</p>
          <h2 className="rain-heading rain-heading--section">
            Gizlilikle ilgili soru için doğrudan iletişime geç.
          </h2>
          <div className="legal-final-cta__actions">
            <a
              className="rain-button rain-button--primary"
              href={generalWhatsAppLink.href}
            >
              {generalWhatsAppLink.label}
            </a>
            <Link
              className="rain-button rain-button--secondary"
              href="/iletisim"
            >
              İletişim Bilgileri
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
