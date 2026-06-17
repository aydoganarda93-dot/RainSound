import type { Metadata } from "next";
import Link from "next/link";

import {
  getProjectWhatsAppLink,
  projects,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import type { Project } from "@/content";

export const metadata: Metadata = {
  title: "Dönüşümler",
  description:
    "RAIN SOUND dönüşüm ve proje vitrini: detailing, koruma, ses sistemi, far tasarımı, body kit ve performans odaklı demo proje akışları.",
};

const projectList = projects;

const getProjectServices = (project: Project) =>
  services.filter((service) => project.serviceIds.includes(service.id));

const getServiceCategoryTitle = (categoryId: string) =>
  serviceCategories.find((category) => category.id === categoryId)?.title ??
  "Hizmet";

const getPermissionLabel = (project: Project) => {
  if (project.privacyReviewed && project.publishPermissionConfirmed) {
    return "Yayın izni hazır";
  }

  return "Yayın öncesi izin kontrolü gerekli";
};

const getProductionCandidateLabel = (project: Project) =>
  project.contentReadiness.productionCandidate
    ? "Production adayı"
    : "Taslak demo kayıt";

export default function ProjectsPage() {
  return (
    <main className="projects-page">
      <section
        className="projects-hero rain-section"
        aria-labelledby="projects-page-title"
      >
        <div className="development-shell__glow" aria-hidden="true" />

        <div className="rain-container projects-hero__grid">
          <div className="projects-hero__content">
            <p className="rain-badge">Dönüşümler</p>
            <h1
              id="projects-page-title"
              className="rain-heading rain-heading--hero"
            >
              Proje vitrini için sağlam bir iskelet.
            </h1>
            <p>
              Gerçek müşteri araçları gelene kadar bu alan demo projelerle veri
              akışını, hizmet ilişkilerini, galeri yapısını ve WhatsApp dönüşüm
              yolunu test eder.
            </p>
          </div>

          <aside className="rain-card projects-hero__panel">
            <span>{siteSettings.address.city} / Rain Sound Garage</span>
            <strong>{projectList.length} demo dönüşüm akışı hazır.</strong>
            <p>
              Production öncesinde her projenin gerçek medya, gizlilik kontrolü
              ve yayın izni ayrı ayrı doğrulanacaktır.
            </p>
          </aside>
        </div>
      </section>

      <section className="rain-section" aria-labelledby="projects-list-title">
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Proje Kartları</p>
          <h2
            id="projects-list-title"
            className="rain-heading rain-heading--section"
          >
            Her kart hem demo durumunu hem de bağlı hizmetleri açık gösterir.
          </h2>
          <p>
            Şimdilik gerçek sonuç iddiası kurulmaz. Kartlar tasarım, içerik ve
            dönüşüm akışı için demo proje verisini görünür kılar.
          </p>
        </div>

        <div className="rain-container rain-grid projects-grid">
          {projectList.map((project) => {
            const projectServices = getProjectServices(project);
            const whatsappLink = getProjectWhatsAppLink(project);

            return (
              <article key={project.id} className="rain-card project-card">
                <div className="project-card__header">
                  <p className="rain-badge">{project.status}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>

                <dl className="project-card__meta">
                  <div>
                    <dt>Araç</dt>
                    <dd>{project.vehicleLabel ?? "Belirlenecek"}</dd>
                  </div>
                  <div>
                    <dt>Demo</dt>
                    <dd>
                      {project.demo.replacementRequiredBeforeProduction
                        ? "Demo içerik"
                        : "Gerçek içerik"}
                    </dd>
                  </div>
                  <div>
                    <dt>İzin</dt>
                    <dd>{getPermissionLabel(project)}</dd>
                  </div>
                  <div>
                    <dt>Yayın</dt>
                    <dd>{getProductionCandidateLabel(project)}</dd>
                  </div>
                </dl>

                {projectServices.length > 0 ? (
                  <div className="project-card__services">
                    {projectServices.map((service) => (
                      <span key={service.id}>
                        {getServiceCategoryTitle(service.categoryId)} /{" "}
                        {service.title}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="project-card__fallback">
                    Bağlı hizmetler production öncesi netleştirilecek.
                  </p>
                )}

                <div className="project-card__footer">
                  <Link
                    className="rain-button rain-button--primary"
                    href={`/projeler/${project.slug}`}
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
    </main>
  );
}
