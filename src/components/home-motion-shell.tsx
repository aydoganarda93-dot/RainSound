"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { gsap, useGSAP } from "@/hooks/use-gsap";
import { useMotionPreferences } from "@/hooks/use-motion-preferences";
import { killGsapInstances } from "@/lib/motion";

export function HomeMotionShell({ children }: { children: ReactNode }) {
  const shellRef = useRef<HTMLElement>(null);
  const revealTweensRef = useRef<gsap.core.Tween[]>([]);
  const equalizerTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const motionPreferences = useMotionPreferences();

  useGSAP(
    () => {
      killGsapInstances([
        ...revealTweensRef.current,
        equalizerTimelineRef.current,
      ]);
      revealTweensRef.current = [];
      equalizerTimelineRef.current = null;

      const revealItems = gsap.utils.toArray<HTMLElement>(
        "[data-home-reveal], [data-home-card]",
      );
      const equalizerBars = gsap.utils.toArray<HTMLElement>(
        "[data-home-equalizer-bar]",
      );

      if (!motionPreferences.canUseRichMotion) {
        gsap.set([...revealItems, ...equalizerBars], {
          clearProps: "opacity,visibility,transform,willChange",
        });
        return;
      }

      gsap.set(revealItems, {
        autoAlpha: 0,
        willChange: "opacity,transform",
        y: 24,
      });

      gsap.set(equalizerBars, {
        opacity: 0.58,
        scaleY: 0.42,
        transformOrigin: "50% 100%",
        willChange: "opacity,transform",
      });

      const revealItem = (item: HTMLElement) => {
        const tween = gsap.to(item, {
          autoAlpha: 1,
          clearProps: "transform,willChange",
          duration: 0.72,
          ease: "power3.out",
          y: 0,
        });

        revealTweensRef.current.push(tween);
      };

      let observer: IntersectionObserver | null = null;

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) {
                continue;
              }

              revealItem(entry.target as HTMLElement);
              observer?.unobserve(entry.target);
            }
          },
          {
            rootMargin: "0px 0px -12% 0px",
            threshold: 0.16,
          },
        );

        for (const item of revealItems) {
          observer.observe(item);
        }
      } else {
        const revealTween = gsap.to(revealItems, {
          autoAlpha: 1,
          clearProps: "transform,willChange",
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.06,
          y: 0,
        });
        revealTweensRef.current.push(revealTween);
      }

      if (equalizerBars.length > 0) {
        const equalizerTimeline = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.18,
        });

        equalizerTimeline
          .to(equalizerBars, {
            duration: 0.46,
            ease: "sine.inOut",
            opacity: 1,
            scaleY: 1,
            stagger: 0.07,
          })
          .to(
            equalizerBars,
            {
              duration: 0.52,
              ease: "sine.inOut",
              opacity: 0.6,
              scaleY: 0.38,
              stagger: {
                each: 0.05,
                from: "end",
              },
            },
            "-=0.18",
          );

        equalizerTimelineRef.current = equalizerTimeline;
      }

      return () => {
        observer?.disconnect();
        killGsapInstances([
          ...revealTweensRef.current,
          equalizerTimelineRef.current,
        ]);
        revealTweensRef.current = [];
        equalizerTimelineRef.current = null;
        gsap.set([...revealItems, ...equalizerBars], {
          clearProps: "opacity,visibility,transform,willChange",
        });
      };
    },
    {
      dependencies: [motionPreferences.canUseRichMotion],
      scope: shellRef,
    },
  );

  return (
    <main
      ref={shellRef}
      className="home-page"
      data-low-cost-motion={
        motionPreferences.canUseLowCostMotion ? "true" : "false"
      }
      data-motion-mode={motionPreferences.motionMode}
      data-motion-ready={motionPreferences.canUseRichMotion ? "true" : "false"}
      data-reduced-motion={
        motionPreferences.shouldReduceMotion ? "true" : "false"
      }
    >
      {children}
    </main>
  );
}
