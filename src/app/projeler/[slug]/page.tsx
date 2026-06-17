import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getProjectWhatsAppLink,
  projects,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import type { MediaAsset, Project } from "@/content";
import { BeforeAfterViewer } from "@/components/before-after-viewer";
import { ProjectVideoGallery } from "@/components/project-video-gallery";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

const getProjectServices = (project: Project) =>
  services.filter((service) => project.serviceIds.includes(service.id));

const getServiceCategoryTitle = (categoryId: string) =>
  serviceCategories.find((category) => category.id === categoryId)?.title ??
  "Hizmet";

const getAssetTypeLabel = (asset: MediaAsset) => {
  if (asset.kind === "video") {
    return "Video";
  }

  if (asset.usage.includes("before-after")) {
    return "Before/After";
  }

  return "Görsel";
};

const getAssetSourceLabel = (asset: MediaAsset) => {
  const labels: Record<MediaAsset["source"], string> = {
    ai: "AI atmosfer",
    demo: "Demo medya",
    provided: "Sağlanan medya",
    real: "Gerçek medya",
  };

  return labels[asset.source];
};

const getAssetPermissionLabel = (asset: MediaAsset) => {
  if (!asset.hasUsagePermission) {
    return "İzin bekleniyor";
  }

  if (asset.requiresPrivacyReview) {
    return "Gizlilik kontrolü gerekli";
  }

  return "Kullanım uygun";
};

const getAssetDimensions = (asset: MediaAsset) => {
  if (!asset.width || !asset.height) {
    return "Ölçü bekleniyor";
  }

  return `${asset.width}x${asset.height}`;
};

const getProductionCandidateLabel = (project: Project) =>
  project.contentReadiness.productionCandidate
    ? "Production adayı"
    : "Taslak demo kayıt";

const MediaInventoryCard = ({
  asset,
  featured = false,
}: {
  asset: MediaAsset;
  featured?: boolean;
}) => (
  <article
    className={
      featured
        ? "rain-card project-media-card project-media-card--featured"
        : "rain-card project-media-card"
    }
  >
    <div className="project-media-card__preview" aria-hidden="true">
      <span>{getAssetTypeLabel(asset)}</span>
      <strong>{asset.kind === "video" ? "Video" : "Preview"}</strong>
      <small>{getAssetDimensions(asset)}</small>
    </div>

    <div className="project-media-card__body">
      <div className="project-media-card__status-row">
        <span className="project-media-card__pill">
          {getAssetSourceLabel(asset)}
        </span>
        <span className="project-media-card__pill">
          {getAssetPermissionLabel(asset)}
        </span>
        {asset.demo.replacementRequiredBeforeProduction ? (
          <span className="project-media-card__pill project-media-card__pill--warning">
            Production öncesi değişecek
          </span>
        ) : null}
      </div>

      <p className="rain-badge">{getAssetTypeLabel(asset)}</p>
      <h3>{asset.alt}</h3>
    </div>

    <dl className="project-media-card__meta">
      <div>
        <dt>Kaynak</dt>
        <dd>{getAssetSourceLabel(asset)}</dd>
      </div>
      <div>
        <dt>Dosya</dt>
        <dd>{asset.src}</dd>
      </div>
      {asset.posterSrc ? (
        <div>
          <dt>Poster</dt>
          <dd>{asset.posterSrc}</dd>
        </div>
      ) : null}
      <div>
        <dt>Ölçü</dt>
        <dd>{getAssetDimensions(asset)}</dd>
      </div>
      <div>
        <dt>Durum</dt>
        <dd>{getAssetPermissionLabel(asset)}</dd>
      </div>
    </dl>
    {asset.demo.note ? (
      <p className="project-media-card__note">{asset.demo.note}</p>
    ) : null}
  </article>
);

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proje Bulunamadı",
    };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectServices = getProjectServices(project);
  const whatsappLink = getProjectWhatsAppLink(project);
  const videoAssets = project.gallery.filter((asset) => asset.kind === "video");
  const imageAssets = project.gallery.filter((asset) => asset.kind === "image");
  const mediaAssets: MediaAsset[] = [
    project.cover,
    ...imageAssets,
    ...videoAssets,
  ];

  return (
    <main className="project-detail-page">
      <section
        className="project-detail-hero rain-section"
        aria-labelledby="project-detail-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container project-detail-hero__grid">
          <div className="project-detail-hero__content">
            <Link
              className="rain-link project-detail__back-link"
              href="/projeler"
            >
              Dönüşümlere dön
            </Link>
            <p className="rain-badge">{project.status}</p>
            <h1
              id="project-detail-title"
              className="rain-heading rain-heading--hero"
            >
              {project.title}
            </h1>
            <p className="project-detail-hero__summary">{project.summary}</p>
            <div className="project-detail-hero__actions">
              <a
                className="rain-button rain-button--primary"
                href={whatsappLink.href}
              >
                {whatsappLink.label}
              </a>
              <Link
                className="rain-button rain-button--secondary"
                href="/projeler"
              >
                Tüm Dönüşümler
              </Link>
            </div>
          </div>

          <aside className="rain-card project-detail-hero__panel">
            <span>RAIN SOUND / {siteSettings.address.city}</span>
            <strong>
              {project.vehicleLabel ?? "Araç bilgisi belirlenecek"}
            </strong>
            <dl className="project-detail-meta">
              <div>
                <dt>Demo</dt>
                <dd>
                  {project.demo.replacementRequiredBeforeProduction
                    ? "Demo içerik - production öncesi değişecek"
                    : "Gerçek içerik"}
                </dd>
              </div>
              <div>
                <dt>Yayın izni</dt>
                <dd>
                  {project.publishPermissionConfirmed
                    ? "Onaylandı"
                    : "Production öncesi bekleniyor"}
                </dd>
              </div>
              <div>
                <dt>Gizlilik</dt>
                <dd>
                  {project.privacyReviewed
                    ? "Kontrol edildi"
                    : "Production öncesi kontrol edilecek"}
                </dd>
              </div>
              <div>
                <dt>Yayın durumu</dt>
                <dd>{getProductionCandidateLabel(project)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        className="rain-section"
        aria-labelledby="project-readiness-title"
      >
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Production Hazırlığı</p>
          <h2
            id="project-readiness-title"
            className="rain-heading rain-heading--section"
          >
            Gerçek proje geldiğinde doldurulacak alanlar.
          </h2>
          <p>
            Bu kayıt şimdilik gerçek müşteri projesi değildir. Yayına aday hale
            gelmesi için medya, izin, before/after ve mobil kırpım kapılarından
            geçmelidir.
          </p>
        </div>

        <div className="rain-container rain-grid">
          <article className="rain-card">
            <p className="rain-badge">Gerçek Medya</p>
            <h3>Gerekli proje dosyaları</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.requiredRealMedia.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card">
            <p className="rain-badge">Before / After</p>
            <h3>Karşılaştırma gereksinimleri</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.beforeAfterRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card">
            <p className="rain-badge">Kabul Kapıları</p>
            <h3>Yayın öncesi kontroller</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.mediaAcceptanceGates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card">
            <p className="rain-badge">Mobil Kırpım</p>
            <h3>Küçük ekran kontrolleri</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.mobileCropRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="rain-section"
        aria-labelledby="project-services-title"
      >
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Bağlı Hizmetler</p>
          <h2
            id="project-services-title"
            className="rain-heading rain-heading--section"
          >
            Bu proje akışında kullanılan hizmetler.
          </h2>
        </div>

        {projectServices.length > 0 ? (
          <div className="rain-container rain-grid">
            {projectServices.map((service) => (
              <article
                key={service.id}
                className="rain-card project-service-card"
              >
                <p className="rain-badge">
                  {getServiceCategoryTitle(service.categoryId)}
                </p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link
                  className="rain-button rain-button--secondary"
                  href={`/hizmetler/${service.slug}`}
                >
                  Hizmeti İncele
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rain-container">
            <article className="rain-card project-empty-state">
              <p className="rain-badge">Bekleniyor</p>
              <h3>Bağlı hizmetler production öncesi eklenecek.</h3>
              <p>
                Bu proje için hizmet ilişkisi henüz kurulmadıysa sayfa boş
                kalmaz; ziyaretçi WhatsApp üzerinden bilgi almaya yönlendirilir.
              </p>
            </article>
          </div>
        )}
      </section>

      <section className="rain-section" aria-labelledby="project-gallery-title">
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Galeri</p>
          <h2
            id="project-gallery-title"
            className="rain-heading rain-heading--section"
          >
            Görsel ve video envanteri.
          </h2>
          <p>
            Medya dosyaları production öncesi gerçek görsellerle değiştirilecek;
            bu aşamada kaynak, izin ve demo notları takip edilir.
          </p>
        </div>

        {mediaAssets.length > 0 ? (
          <div className="rain-container rain-grid project-media-grid">
            {mediaAssets.map((asset, index) => (
              <MediaInventoryCard
                key={asset.id}
                asset={asset}
                featured={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="rain-container">
            <article className="rain-card project-empty-state">
              <p className="rain-badge">Medya Bekleniyor</p>
              <h3>Bu proje için galeri dosyaları henüz eklenmedi.</h3>
              <p>
                Gerçek fotoğraf, video ve kullanım izni hazır olduğunda medya
                envanteri bu alana bağlanacaktır.
              </p>
            </article>
          </div>
        )}
      </section>

      <section
        className="rain-section"
        aria-labelledby="project-before-after-title"
      >
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Before / After</p>
          <h2
            id="project-before-after-title"
            className="rain-heading rain-heading--section"
          >
            Karşılaştırma verileri.
          </h2>
        </div>

        {project.beforeAfter.length > 0 ? (
          <div className="rain-container project-before-after-list">
            {project.beforeAfter.map((pair) => (
              <BeforeAfterViewer key={pair.id} pair={pair} />
            ))}
          </div>
        ) : (
          <div className="rain-container">
            <article className="rain-card project-empty-state">
              <p className="rain-badge">Bekleniyor</p>
              <h3>Before/after görselleri henüz eklenmedi.</h3>
              <p>
                Gerçek uygulama öncesi ve sonrası fotoğraflar izinli şekilde
                hazırlandığında bu alan karşılaştırma bileşenine dönüşecektir.
              </p>
            </article>
          </div>
        )}
      </section>

      <ProjectVideoGallery videos={videoAssets} />

      <section className="rain-section project-detail-final-cta">
        <div className="rain-container rain-card project-detail-final-cta__card">
          <p className="rain-badge">Benzer Dönüşüm</p>
          <h2 className="rain-heading rain-heading--section">
            Bu akışa benzer bir uygulama için araç bilgini gönder.
          </h2>
          {project.demo.note ? <p>{project.demo.note}</p> : null}
          <a
            className="rain-button rain-button--primary"
            href={whatsappLink.href}
          >
            {whatsappLink.label}
          </a>
        </div>
      </section>
    </main>
  );
}
