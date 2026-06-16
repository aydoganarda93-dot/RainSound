import {
  generalWhatsAppLink,
  getContactByChannel,
  serviceCategories,
  siteSettings,
} from "@/content";

const serviceGroups = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order)
  .map((category) => category.title);

export default function Home() {
  const phoneContact = getContactByChannel("phone");

  return (
    <main className="development-shell">
      <div className="development-shell__glow" aria-hidden="true" />

      <div className="rain-container development-shell__container">
        <section
          className="rain-container--readable development-card"
          aria-labelledby="page-title"
        >
          <p className="development-card__eyebrow">Geliştirme Ön İzlemesi</p>
          <h1 id="page-title">{siteSettings.siteName}</h1>
          <p className="development-card__tagline">{siteSettings.tagline}</p>
          <p className="development-card__description">
            {siteSettings.description} Yeni dijital deneyim hazırlanıyor.
          </p>

          <div className="development-card__actions">
            <a
              className="development-card__cta"
              href={generalWhatsAppLink.href}
            >
              {generalWhatsAppLink.label}
            </a>
            {phoneContact ? (
              <a
                className="development-card__secondary-link"
                href={phoneContact.href}
              >
                {phoneContact.value}
              </a>
            ) : null}
          </div>

          <ul
            className="service-list"
            aria-label="Planlanan hizmet kategorileri"
          >
            {serviceGroups.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <p className="development-card__status">
            Bu ekran geçicidir. Tasarım sistemi ve gerçek içerikler sonraki
            geliştirme aşamalarında eklenecektir.
          </p>
        </section>
      </div>
    </main>
  );
}
