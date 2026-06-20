"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Defer DOM mutations until after React hydration on route changes. */
const afterHydration = (callback: () => void) => {
  let cancelled = false;
  let outerFrame = 0;
  let innerFrame = 0;

  outerFrame = requestAnimationFrame(() => {
    innerFrame = requestAnimationFrame(() => {
      if (!cancelled) {
        callback();
      }
    });
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(outerFrame);
    cancelAnimationFrame(innerFrame);
  };
};

export function SiteFx() {
  const pathname = usePathname();

  // Scroll-triggered reveal — re-runs on route change so SPA navigation works.
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const cancelDeferred = afterHydration(() => {
      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        document.documentElement.removeAttribute("data-fx");
        for (const el of document.querySelectorAll<HTMLElement>(
          "[data-reveal]",
        )) {
          el.classList.add("is-visible");
        }
        return;
      }

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-reveal]:not(.is-visible)",
        ),
      );

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          element.classList.add("is-visible");
          continue;
        }
        observer.observe(element);
      }

      document.documentElement.setAttribute("data-fx", "on");
    });

    return () => {
      cancelDeferred();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
