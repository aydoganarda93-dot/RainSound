"use client";

import { useId, useRef } from "react";

import type { HeroMediaScene } from "@/content";
import { heroMediaScene } from "@/content";
import { gsap, useGSAP } from "@/hooks/use-gsap";
import { useMotionPreferences } from "@/hooks/use-motion-preferences";
import { killGsapInstances } from "@/lib/motion";

const getMotionModeLabel = ({
  fallback,
  isLowPowerDevice,
  isSaveDataEnabled,
  isSlowConnection,
  prefersReducedMotion,
  shouldReduceMotion,
}: Pick<HeroMediaScene, "fallback"> & {
  isLowPowerDevice: boolean;
  isSaveDataEnabled: boolean;
  isSlowConnection: boolean;
  prefersReducedMotion: boolean;
  shouldReduceMotion: boolean;
}) => {
  if (prefersReducedMotion) {
    return `${fallback.reducedMotionLabel}: hareket azaltma tercihi açık`;
  }

  if (isSaveDataEnabled || isSlowConnection) {
    return `${fallback.lowConnectionLabel}: veri veya bağlantı tasarrufu`;
  }

  if (isLowPowerDevice) {
    return "Düşük maliyetli poster modu: mobil veya düşük donanım algılandı";
  }

  return shouldReduceMotion ? "Güvenli statik mod" : "Kontrollü motion aktif";
};

export function HeroMediaShell({
  scene = heroMediaScene,
}: {
  scene?: HeroMediaScene;
}) {
  const titleId = useId();
  const shellRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const motionPreferences = useMotionPreferences();
  const motionModeLabel = getMotionModeLabel({
    fallback: scene.fallback,
    isLowPowerDevice: motionPreferences.isLowPowerDevice,
    isSaveDataEnabled: motionPreferences.isSaveDataEnabled,
    isSlowConnection: motionPreferences.isSlowConnection,
    prefersReducedMotion: motionPreferences.prefersReducedMotion,
    shouldReduceMotion: motionPreferences.shouldReduceMotion,
  });

  useGSAP(
    () => {
      killGsapInstances([timelineRef.current]);
      timelineRef.current = null;

      if (!motionPreferences.canUseRichMotion) {
        gsap.set(
          [".hero-media-shell__layer--smoke", ".hero-media-shell__light-sweep"],
          { clearProps: "opacity,visibility,transform,willChange" },
        );
        return;
      }

      gsap.set(
        [".hero-media-shell__layer--smoke", ".hero-media-shell__light-sweep"],
        { willChange: "transform,opacity" },
      );

      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        repeat: -1,
        yoyo: true,
      });

      timeline
        .to(
          ".hero-media-shell__layer--smoke",
          {
            duration: 7,
            opacity: 0.86,
            xPercent: 3,
            yPercent: -2,
          },
          0,
        )
        .to(
          ".hero-media-shell__light-sweep",
          {
            duration: 3.2,
            opacity: 0.92,
            xPercent: -10,
          },
          0,
        )
        .to(
          ".hero-media-shell__light-sweep",
          {
            duration: 3.8,
            opacity: 0.42,
            xPercent: 14,
          },
          ">",
        );

      timelineRef.current = timeline;

      return () => {
        killGsapInstances([timeline]);
        timelineRef.current = null;
      };
    },
    {
      dependencies: [motionPreferences.canUseRichMotion],
      scope: shellRef,
    },
  );

  return (
    <figure
      ref={shellRef}
      className="rain-card hero-media-shell"
      aria-labelledby={titleId}
      data-low-cost-motion={
        motionPreferences.canUseLowCostMotion ? "true" : "false"
      }
      data-motion-mode={motionPreferences.motionMode}
      data-motion-ready={motionPreferences.canUseRichMotion ? "true" : "false"}
      data-reduced-motion={
        motionPreferences.shouldReduceMotion ? "true" : "false"
      }
    >
      <div className="hero-media-shell__stage" aria-hidden="true">
        <div className="hero-media-shell__layer hero-media-shell__layer--poster" />
        <div className="hero-media-shell__layer hero-media-shell__layer--smoke" />
        <div className="hero-media-shell__vehicle">
          <div className="hero-media-shell__car-body" />
          <div className="hero-media-shell__headlights hero-media-shell__headlights--off" />
          <div className="hero-media-shell__headlights hero-media-shell__headlights--on" />
          <div className="hero-media-shell__light-sweep" />
        </div>
      </div>

      <figcaption className="hero-media-shell__caption">
        <p className="rain-badge">Hero medya kabuğu</p>
        <p className="rain-sr-only">{motionPreferences.motionModeLabel}</p>
        <h2 id={titleId}>{scene.title}</h2>
        <p>{scene.description}</p>
        <dl className="hero-media-shell__meta">
          <div>
            <dt>Durum</dt>
            <dd>{motionModeLabel}</dd>
          </div>
          <div>
            <dt>Kaynak</dt>
            <dd>AI/demo placeholder</dd>
          </div>
          <div>
            <dt>Katman</dt>
            <dd>{scene.layers.length} planlı</dd>
          </div>
        </dl>
        <ul className="hero-media-shell__layers">
          {scene.layers.map((layer) => (
            <li key={layer.id}>
              <span>{layer.label}</span>
              <small>{layer.status}</small>
            </li>
          ))}
        </ul>
        <p className="hero-media-shell__note">{scene.fallback.note}</p>
      </figcaption>
    </figure>
  );
}
