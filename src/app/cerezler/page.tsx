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
  title: "Çerez Bilgilendirmesi",
  description:
    "RAIN SOUND tanıtım sitesi çerez bilgilendirmesi: mevcut çerez, analitik ve üçüncü taraf bağlantı durumu.",
  path: "/cerezler",
});

const cookieSections = [
  {
    title: "Mevcut çerez kullanımı",
    body: "Site pazarlama, reklam hedefleme veya üyelik takibi için çerez kullanmaz. Vercel Analytics ve Speed Insights ile anonim/özet trafik ve performans ölçümü yapılır; kişisel reklam profili oluşturulmaz.",
  },
  {
    title: "Zorunlu teknik işlemler",
    body: "Site Next.js tabanlı statik/SSR sayfalarla çalışır. Tarayıcı ve barındırma altyapısı sayfanın güvenli ve hızlı açılması için teknik kayıtlar veya geçici işlemler kullanabilir; bunlar pazarlama profili oluşturmak için tasarlanmamıştır.",
  },
  {
    title: "Analitik durumu",
    body: "Vercel Analytics sayfa görüntülemelerini ve temel trafik verilerini özet şekilde ölçer. Speed Insights Core Web Vitals (LCP, INP, CLS) gibi performans metriklerini toplar. Google Analytics, Meta Pixel veya benzeri reklam/analitik araçları aktif değildir.",
  },
  {
    title: "Üçüncü taraf bağlantılar",
    body: "WhatsApp, Instagram ve Google Maps bağlantılarına tıklandığında ilgili platformların kendi çerez ve gizlilik uygulamaları geçerli olabilir. Bu işlemler site dışındaki platformlarda gerçekleşir.",
  },
  {
    title: "Tercih yönetimi",
    body: "Reklam veya pazarlama çerezi kullanılmadığı için özel bir çerez tercih paneli sunulmaz. Tarayıcı ayarlarından çerezleri engellemek veya silmek mümkündür. Vercel ölçüm araçları hakkında ayrıntılı bilgi için Vercel gizlilik politikasına bakılabilir.",
  },
];

export default function CookiesPage() {
  return (
    <main className="legal-page">
      <StructuredData data={buildBreadcrumbJsonLd(pageBreadcrumbs.cookies)} />
      <Breadcrumbs items={pageBreadcrumbs.cookies} />
      <section
        className="legal-hero rain-section"
        aria-labelledby="cookies-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container legal-hero__grid">
          <div className="legal-hero__content">
            <p className="rain-badge">Çerezler</p>
            <h1 id="cookies-title" className="rain-heading rain-heading--hero">
              Çerez Bilgilendirmesi
            </h1>
            <p>
              Bu sayfa, tanıtım sitesinde çerez, analitik ve üçüncü taraf
              bağlantı kullanımının mevcut durumunu sade şekilde açıklar.
            </p>
          </div>

          <aside className="rain-card legal-hero__panel">
            <span>{siteSettings.siteName}</span>
            <strong>Vercel Analytics ve Speed Insights kullanılır.</strong>
            <p>
              Trafik ve performans ölçümü yapılır; reklam veya pazarlama çerezi
              kullanılmaz. Google Analytics veya Meta Pixel aktif değildir.
            </p>
          </aside>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="cookies-content-title">
        <div className="rain-container legal-content">
          <div className="home-section-heading">
            <p className="rain-badge">Kapsam</p>
            <h2
              id="cookies-content-title"
              className="rain-heading rain-heading--section"
            >
              Şimdilik tanıtım sitesi düzeyinde, sade çerez yaklaşımı.
            </h2>
          </div>

          <div className="legal-section-list">
            {cookieSections.map((section) => (
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
          <p className="rain-badge">Bağlantılı Sayfa</p>
          <h2 className="rain-heading rain-heading--section">
            Kişisel veri yaklaşımı için gizlilik metnini de incele.
          </h2>
          <div className="legal-final-cta__actions">
            <Link
              className="rain-button rain-button--secondary"
              href="/gizlilik"
            >
              Gizlilik Politikası
            </Link>
            <a
              className="rain-button rain-button--primary"
              href={generalWhatsAppLink.href}
            >
              {generalWhatsAppLink.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
