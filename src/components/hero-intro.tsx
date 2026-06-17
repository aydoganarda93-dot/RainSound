"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/hooks/use-gsap";
import { useMotionPreferences } from "@/hooks/use-motion-preferences";
import { killGsapInstances } from "@/lib/motion";

type HeroIntroProps = {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function HeroIntro({
  badge,
  title,
  tagline,
  description,
  primaryCta,
  secondaryCta,
}: HeroIntroProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const motionPreferences = useMotionPreferences();

  useGSAP(
    () => {
      killGsapInstances([timelineRef.current]);
      timelineRef.current = null;

      const motionItems = gsap.utils.toArray<HTMLElement>(
        "[data-hero-intro-motion]",
      );

      if (!motionPreferences.canUseRichMotion) {
        gsap.set(motionItems, {
          clearProps: "opacity,visibility,transform,willChange",
        });
        return;
      }

      gsap.set(motionItems, { willChange: "opacity,transform" });

      const timeline = gsap.timeline({
        defaults: {
          duration: 0.72,
          ease: "power3.out",
        },
        onComplete: () => {
          gsap.set(motionItems, { clearProps: "transform,willChange" });
        },
      });

      timeline.fromTo(
        motionItems,
        {
          autoAlpha: 0.01,
          y: 18,
        },
        {
          autoAlpha: 1,
          stagger: 0.08,
          y: 0,
        },
      );

      timelineRef.current = timeline;

      return () => {
        killGsapInstances([timeline]);
        timelineRef.current = null;
      };
    },
    {
      dependencies: [motionPreferences.canUseRichMotion],
      scope: introRef,
    },
  );

  return (
    <div
      ref={introRef}
      className="home-hero__content"
      data-motion-mode={motionPreferences.motionMode}
      data-low-cost-motion={
        motionPreferences.canUseLowCostMotion ? "true" : "false"
      }
      data-motion-ready={motionPreferences.canUseRichMotion ? "true" : "false"}
      data-reduced-motion={
        motionPreferences.shouldReduceMotion ? "true" : "false"
      }
    >
      <p className="rain-sr-only">{motionPreferences.motionModeLabel}</p>
      <p className="rain-badge" data-hero-intro-motion>
        {badge}
      </p>
      <h1
        id="hero-title"
        className="rain-heading rain-heading--hero"
        data-hero-intro-motion
      >
        {title}
      </h1>
      <p className="home-hero__tagline" data-hero-intro-motion>
        {tagline}
      </p>
      <p className="home-hero__description" data-hero-intro-motion>
        {description}
      </p>

      <div className="home-hero__actions" data-hero-intro-motion>
        <a className="rain-button rain-button--primary" href={primaryCta.href}>
          {primaryCta.label}
        </a>
        {secondaryCta ? (
          <a
            className="rain-button rain-button--secondary"
            href={secondaryCta.href}
          >
            {secondaryCta.label}
          </a>
        ) : null}
      </div>

      <div
        className="home-hero__equalizer"
        aria-hidden="true"
        data-hero-intro-motion
        data-home-equalizer
      >
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} data-home-equalizer-bar />
        ))}
      </div>
    </div>
  );
}
