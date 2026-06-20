import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import {
  aiImagePlaceholder,
  categoryVisualMedia,
  generalWhatsAppLink,
  serviceCategories,
  services,
  siteSettings,
} from "@/content";
import { TrackedLink } from "@/components/analytics";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  pageBreadcrumbs,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Galeri",
  description: `${siteSettings.siteName} ${siteSettings.address.district}/${siteSettings.address.city} çalışma alanları: detailing, koruma, ses sistemleri ve performans odaklı uygulama atmosferi.`,
  path: "/projeler",
});

const publishedCategories = serviceCategories
  .filter((category) => category.status === "published")
  .sort((current, next) => current.order - next.order);

const countServices = (categoryId: string) =>
  services.filter(
    (service) =>
      service.categoryId === categoryId && service.status === "published",
  ).length;

const getCategoryImage = (categoryId: string) =>
  categoryVisualMedia[categoryId as keyof typeof categoryVisualMedia];

export default function ProjectsPage() {
  return (
    <main className="rsg-page">
      <StructuredData data={buildBreadcrumbJsonLd(pageBreadcrumbs.projects)} />
      <Breadcrumbs items={pageBreadcrumbs.projects} />

      <section className="rsg-pagehero" aria-labelledby="projects-page-title">
        <div
          className="rsg-pagehero__glow rsg-pagehero__glow--right"
          aria-hidden="true"
        />
        <div className="rain-container rsg-pagehero__inner">
          <div className="rsg-pagehero__lead-col">
            <p className="rsg-eyebrow" data-reveal>
              <span className="rsg-eyebrow__dot" aria-hidden="true" />
              Galeri
            </p>
            <h1
              id="projects-page-title"
              className="rsg-pagehero__title rsg-title--xl"
              data-reveal
              style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}
            >
              Çalışma
              <br />
              alanlarımız
            </h1>
            <p
              className="rsg-lead"
              data-reveal
              style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}
            >
              Karanlık zemin, doğru ışık, temiz işçilik. Aracın benzer bir
              dönüşüm için bizi WhatsApp&apos;tan yakala.
            </p>
          </div>

          <aside
            className="rsg-card rsg-card--accent rsg-pagehero__aside"
            data-reveal
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            <p className="rsg-eyebrow rsg-eyebrow--muted">
              Atmosfer görselleri
            </p>
            <p>
              Gerçek müşteri projeleri izinleriyle birlikte yakında burada
              yayınlanacak.
            </p>
            <TrackedLink
              className="rain-button rain-button--primary rsg-btn-lg"
              event="whatsapp_click"
              href={generalWhatsAppLink.href}
              placement="projects_page"
            >
              <MessageCircle aria-hidden="true" size={18} />
              Benzer İş İçin Yaz
            </TrackedLink>
          </aside>
        </div>
      </section>

      <section
        className="rsg-section rsg-cta-section"
        aria-labelledby="projects-gallery-title"
      >
        <div className="rain-container rsg-section__head" data-reveal>
          <p className="rsg-eyebrow">Vitrin</p>
          <h2 id="projects-gallery-title" className="rsg-title">
            Dört uzmanlık alanı
          </h2>
        </div>

        <div className="rain-container rsg-worlds">
          {publishedCategories.map((category, index) => (
            <Link
              key={category.id}
              href={`/hizmetler#${category.slug}`}
              className="rsg-world"
              data-reveal
              data-size={index === 0 || index === 3 ? "wide" : "tall"}
              style={
                {
                  "--reveal-delay": `${0.06 * (index % 4)}s`,
                } as React.CSSProperties
              }
            >
              <div className="rsg-world__media" aria-hidden="true">
                <Image
                  src={getCategoryImage(category.id).src}
                  alt={getCategoryImage(category.id).alt}
                  fill
                  sizes="(min-width: 64rem) 50vw, 100vw"
                  className="rsg-world__img"
                  loading="lazy"
                  fetchPriority="low"
                  placeholder="blur"
                  blurDataURL={aiImagePlaceholder}
                />
                <div className="rsg-world__scrim" />
              </div>
              <div className="rsg-world__body">
                <span className="rsg-world__index">
                  {countServices(category.id)} hizmet
                </span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="rsg-world__cta">
                  Alanı keşfet
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
