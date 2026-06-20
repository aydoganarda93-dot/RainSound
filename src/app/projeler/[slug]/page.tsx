import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getServiceWhatsAppLink,
  getProjectWhatsAppLink,
  projects,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import type { MediaAsset, Project } from "@/content";
import { ProjectViewTracker, TrackedLink } from "@/components/analytics";
import { BeforeAfterViewer } from "@/components/before-after-viewer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectVideoGallery } from "@/components/project-video-gallery";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  getProjectBreadcrumbs,
} from "@/lib/seo";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const publishedProjects = projects.filter(
  (project) =>
    project.status === "published" &&
    project.contentReadiness.productionCandidate,
);

const getProjectBySlug = (slug: string) =>
  publishedProjects.find((project) => project.slug === slug);

const getProjectServices = (project: Project) =>
  services.filter((service) => project.serviceIds.includes(service.id));

const getSuggestedServices = (project: Project) => {
  const projectServices = getProjectServices(project);
  const suggestedServiceIds = new Set(
    projectServices.flatMap((service) => service.relatedServiceIds),
  );

  return services
    .filter(
      (service) =>
        suggestedServiceIds.has(service.id) &&
        !project.serviceIds.includes(service.id),
    )
    .slice(0, 4);
};

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
  return publishedProjects.map((project) => ({
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

  const projectServices = getProjectServices(project)
    .map((service) => service.title)
    .join(", ");

  return buildPageMetadata({
    title: project.title,
    description: projectServices
      ? `${siteSettings.address.district}/${siteSettings.address.city} demo proje akışı. ${project.summary} Bağlı hizmetler: ${projectServices}.`
      : `${siteSettings.address.district}/${siteSettings.address.city} demo proje akışı. ${project.summary}`,
    path: `/projeler/${project.slug}`,
    type: "article",
  });
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
  const suggestedServices = getSuggestedServices(project);
  const whatsappLink = getProjectWhatsAppLink(project);
  const videoAssets = project.gallery.filter((asset) => asset.kind === "video");
  const imageAssets = project.gallery.filter((asset) => asset.kind === "image");
  const mediaAssets: MediaAsset[] = [
    project.cover,
    ...imageAssets,
    ...videoAssets,
  ];
  const breadcrumbs = getProjectBreadcrumbs(project);

  return (
    <main className="project-detail-page">
      <ProjectViewTracker
        projectId={project.id}
        slug={project.slug}
        title={project.title}
      />
      <StructuredData data={buildBreadcrumbJsonLd(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />
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
              <TrackedLink
                className="rain-button rain-button--primary"
                context="project"
                event="whatsapp_click"
                href={whatsappLink.href}
                placement="project_detail"
                projectSlug={project.slug}
              >
                {whatsappLink.label}
              </TrackedLink>
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
            <p className="rain-badge">Production Blocker</p>
            <h3>Yayına engel durumlar</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.productionBlockers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

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

          <article className="rain-card">
            <p className="rain-badge">Gizlilik</p>
            <h3>Plaka ve kişisel bilgi kontrolü</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.privacyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card">
            <p className="rain-badge">İzin</p>
            <h3>Medya kullanım izni</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.permissionChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rain-card">
            <p className="rain-badge">Performans</p>
            <h3>Görsel/video bütçesi</h3>
            <ul className="project-detail-list">
              {project.contentReadiness.performanceChecklist.map((item) => (
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
            {projectServices.map((service) => {
              const serviceWhatsAppLink = getServiceWhatsAppLink(service);

              return (
                <article
                  key={service.id}
                  className="rain-card project-service-card"
                >
                  <p className="rain-badge">
                    {getServiceCategoryTitle(service.categoryId)}
                  </p>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="project-service-card__context">
                    <strong>{service.ctaContext.label}</strong>
                    <span>{service.ctaContext.messageHint}</span>
                  </div>
                  <div className="project-service-card__actions">
                    <Link
                      className="rain-button rain-button--secondary"
                      href={`/hizmetler/${service.slug}`}
                    >
                      Hizmeti İncele
                    </Link>
                    <TrackedLink
                      className="rain-button rain-button--primary"
                      context="service"
                      event="whatsapp_click"
                      href={serviceWhatsAppLink.href}
                      placement="project_detail"
                      serviceSlug={service.slug}
                    >
                      Hizmete Özel Sor
                    </TrackedLink>
                  </div>
                </article>
              );
            })}
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

      <section className="rain-section" aria-labelledby="project-context-title">
        <div className="rain-container project-context-grid">
          <article className="rain-card project-whatsapp-context">
            <p className="rain-badge">WhatsApp Bağlamı</p>
            <h2
              id="project-context-title"
              className="rain-heading rain-heading--section"
            >
              Mesaj, bu projedeki hizmetlerle birlikte açılır.
            </h2>
            <p>
              Kullanıcı WhatsApp&apos;a geçtiğinde proje adı, bağlı hizmetler ve
              hizmetlerin talep bağlamı mesaj içinde hazır gelir.
            </p>
            <pre>{whatsappLink.message}</pre>
            <TrackedLink
              className="rain-button rain-button--primary"
              context="project"
              event="whatsapp_click"
              href={whatsappLink.href}
              placement="project_detail"
              projectSlug={project.slug}
            >
              {whatsappLink.label}
            </TrackedLink>
          </article>

          <article className="rain-card project-suggested-services">
            <p className="rain-badge">Benzer Hizmetler</p>
            <h2 className="rain-heading rain-heading--section">
              Bu akışla birlikte düşünülebilecek hizmetler.
            </h2>
            {suggestedServices.length > 0 ? (
              <div className="project-suggested-services__list">
                {suggestedServices.map((service) => (
                  <Link
                    key={service.id}
                    className="rain-link"
                    href={`/hizmetler/${service.slug}`}
                  >
                    {getServiceCategoryTitle(service.categoryId)} /{" "}
                    {service.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p>
                Bu demo proje için ek hizmet önerisi yok; gerçek proje
                geldiğinde hizmet ilişkileri yeniden değerlendirilecek.
              </p>
            )}
          </article>
        </div>
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
              <BeforeAfterViewer
                key={pair.id}
                pair={pair}
                projectSlug={project.slug}
              />
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
