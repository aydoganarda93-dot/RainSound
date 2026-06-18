"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  // Scroll-triggered reveal — re-runs on route change so SPA navigation works.
  useEffect(() => {
    if (!isClientReady) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const cancelDeferred = afterHydration(() => {
      if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        document.documentElement.removeAttribute("data-fx");
        for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
          el.classList.add("is-visible");
        }
        return;
      }

      document.documentElement.setAttribute("data-fx", "on");

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
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
    });

    return () => {
      cancelDeferred();
      observer?.disconnect();
    };
  }, [pathname, isClientReady]);

  // Custom cursor follower — set up once, only for fine pointers.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) {
      return;
    }

    const ring = document.createElement("div");
    ring.className = "rsg-cursor";
    ring.setAttribute("aria-hidden", "true");
    document.body.append(ring);

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let frame = 0;
    let active = false;

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!active) {
        active = true;
        ring.classList.add("is-active");
      }
      const interactive = (event.target as HTMLElement)?.closest?.(
        "a, button, [role='button'], input, textarea, select, label, summary",
      );
      ring.classList.toggle("is-hover", Boolean(interactive));
    };

    const onLeave = () => {
      active = false;
      ring.classList.remove("is-active");
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      ring.remove();
    };
  }, []);

  return null;
}
