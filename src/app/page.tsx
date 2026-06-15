const serviceGroups = [
  "Detailing",
  "Koruma",
  "Sound & Tech",
  "Design & Performance",
];

export default function Home() {
  return (
    <main className="development-shell">
      <div className="development-shell__glow" aria-hidden="true" />

      <section className="development-card" aria-labelledby="page-title">
        <p className="development-card__eyebrow">Geliştirme Ön İzlemesi</p>
        <h1 id="page-title">RAIN SOUND</h1>
        <p className="development-card__tagline">
          Aracın karakterini ortaya çıkar.
        </p>
        <p className="development-card__description">
          Premium detailing, koruma, ses sistemleri ve otomotiv uygulamaları
          için yeni dijital deneyim hazırlanıyor.
        </p>

        <ul className="service-list" aria-label="Planlanan hizmet kategorileri">
          {serviceGroups.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        <p className="development-card__status">
          Bu ekran geçicidir. Tasarım sistemi ve gerçek içerikler sonraki
          geliştirme aşamalarında eklenecektir.
        </p>
      </section>
    </main>
  );
}
