import type { Metadata } from "next";
import Link from "next/link";

import { generalWhatsAppLink, siteSettings } from "@/content";

export const metadata: Metadata = {
  title: "Çerez Bilgilendirmesi",
  description:
    "RAIN SOUND tanıtım sitesi çerez bilgilendirmesi: mevcut çerez, analitik ve üçüncü taraf bağlantı durumu.",
};

const cookieSections = [
  {
    title: "Mevcut çerez kullanımı",
    body: "Bu aşamada web sitesi doğrudan pazarlama, reklam hedefleme, üyelik takibi veya gelişmiş analitik için çerez yerleştirecek özel bir kod içermez.",
  },
  {
    title: "Zorunlu teknik işlemler",
    body: "Site Next.js tabanlı statik/SSR sayfalarla çalışır. Tarayıcı ve barındırma altyapısı sayfanın güvenli ve hızlı açılması için teknik kayıtlar veya geçici işlemler kullanabilir; bunlar pazarlama profili oluşturmak için tasarlanmamıştır.",
  },
  {
    title: "Analitik durumu",
    body: "Vercel Analytics, Google Analytics, Meta Pixel veya benzeri bir analitik/reklam takip sistemi bu aşamada aktif değildir. İleride eklenirse çerez bilgilendirmesi, kullanılan servis ve tercih yönetimi yaklaşımıyla güncellenmelidir.",
  },
  {
    title: "Üçüncü taraf bağlantılar",
    body: "WhatsApp, Instagram ve Google Maps bağlantılarına tıklandığında ilgili platformların kendi çerez ve gizlilik uygulamaları geçerli olabilir. Bu işlemler site dışındaki platformlarda gerçekleşir.",
  },
  {
    title: "Tercih yönetimi",
    body: "Site şu anda isteğe bağlı analitik veya reklam çerezi kullanmadığı için özel bir çerez tercih paneli sunmaz. Tarayıcı ayarlarından çerezleri engellemek veya silmek mümkündür.",
  },
];

export default function CookiesPage() {
  return (
    <main className="legal-page">
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
            <strong>Analitik ve reklam çerezi şu anda aktif değildir.</strong>
            <p>
              İleride analitik, reklam veya form entegrasyonu eklenirse bu metin
              ve tercih yönetimi yaklaşımı güncellenecektir.
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
