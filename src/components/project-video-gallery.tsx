"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { MediaAsset } from "@/content";

const focusableElementSelector = [
  "a[href]",
  "button:not([disabled])",
  "video[controls]",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const sourceLabels: Record<MediaAsset["source"], string> = {
  ai: "AI atmosfer",
  demo: "Demo medya",
  provided: "Sağlanan medya",
  real: "Gerçek medya",
};

const getPermissionLabel = (asset: MediaAsset) => {
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

const getVideoType = (src: string) => {
  if (src.endsWith(".mp4")) {
    return "video/mp4";
  }

  if (src.endsWith(".webm")) {
    return "video/webm";
  }

  return undefined;
};

export function ProjectVideoGallery({ videos }: { videos: MediaAsset[] }) {
  const modalTitleId = useId();
  const [activeVideo, setActiveVideo] = useState<MediaAsset | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const closeModal = () => {
    setActiveVideo(null);
  };

  const openModal = (video: MediaAsset) => {
    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setActiveVideo(video);
  };

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) {
      previouslyFocusedElementRef.current?.focus();
      return;
    }

    const modal = modalRef.current;
    const focusableElements = Array.from(
      modal?.querySelectorAll<HTMLElement>(focusableElementSelector) ?? [],
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements.at(-1);

    firstFocusableElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (
        event.key !== "Tab" ||
        !firstFocusableElement ||
        !lastFocusableElement
      ) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  if (videos.length === 0) {
    return null;
  }

  return (
    <>
      <section
        className="rain-section project-video-section"
        aria-labelledby="project-video-title"
      >
        <div className="rain-container home-section-heading">
          <p className="rain-badge">Video</p>
          <h2
            id="project-video-title"
            className="rain-heading rain-heading--section"
          >
            Kullanıcı kontrollü video önizlemeleri.
          </h2>
          <p>
            Videolar otomatik başlamaz. Demo video verileri gerçek çekim gelene
            kadar kaynak, izin, poster ve production öncesi değişim bilgisiyle
            gösterilir.
          </p>
        </div>

        <div className="rain-container rain-grid project-video-grid">
          {videos.map((video) => (
            <article key={video.id} className="rain-card project-video-card">
              <div className="project-video-card__poster" aria-hidden="true">
                <span>Poster</span>
                <strong>Video</strong>
                <small>{video.posterSrc ?? "Poster bekleniyor"}</small>
              </div>

              <div className="project-video-card__body">
                <div className="project-media-card__status-row">
                  <span className="project-media-card__pill">
                    {sourceLabels[video.source]}
                  </span>
                  <span className="project-media-card__pill">
                    {getPermissionLabel(video)}
                  </span>
                  {video.demo.replacementRequiredBeforeProduction ? (
                    <span className="project-media-card__pill project-media-card__pill--warning">
                      Production öncesi değişecek
                    </span>
                  ) : null}
                </div>

                <h3>{video.alt}</h3>
                <dl className="project-video-card__meta">
                  <div>
                    <dt>Dosya</dt>
                    <dd>{video.src}</dd>
                  </div>
                  <div>
                    <dt>Poster</dt>
                    <dd>{video.posterSrc ?? "Bekleniyor"}</dd>
                  </div>
                  <div>
                    <dt>Ölçü</dt>
                    <dd>{getAssetDimensions(video)}</dd>
                  </div>
                </dl>

                {video.demo.note ? <p>{video.demo.note}</p> : null}

                <button
                  className="rain-button rain-button--primary"
                  type="button"
                  onClick={() => openModal(video)}
                >
                  Videoyu Aç
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeVideo ? (
        <div
          className="project-video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          ref={modalRef}
        >
          <button
            className="project-video-modal__backdrop"
            type="button"
            aria-label="Video penceresini kapat"
            tabIndex={-1}
            onClick={closeModal}
          />

          <div className="project-video-modal__panel">
            <div className="project-video-modal__header">
              <div>
                <p className="rain-badge">Kullanıcı Kontrollü Video</p>
                <h2 id={modalTitleId}>{activeVideo.alt}</h2>
              </div>
              <button
                className="rain-button rain-button--secondary"
                type="button"
                onClick={closeModal}
              >
                Kapat
              </button>
            </div>

            <video
              className="project-video-modal__video"
              controls
              playsInline
              preload="metadata"
              poster={activeVideo.posterSrc}
            >
              <source
                src={activeVideo.src}
                type={getVideoType(activeVideo.src)}
              />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>

            <dl className="project-video-modal__meta">
              <div>
                <dt>Kaynak</dt>
                <dd>{sourceLabels[activeVideo.source]}</dd>
              </div>
              <div>
                <dt>İzin</dt>
                <dd>{getPermissionLabel(activeVideo)}</dd>
              </div>
              <div>
                <dt>Dosya</dt>
                <dd>{activeVideo.src}</dd>
              </div>
              <div>
                <dt>Poster</dt>
                <dd>{activeVideo.posterSrc ?? "Bekleniyor"}</dd>
              </div>
            </dl>

            {activeVideo.demo.note ? (
              <p className="project-video-modal__note">
                {activeVideo.demo.note}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
