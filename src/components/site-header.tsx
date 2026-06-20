"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { generalWhatsAppLink } from "@/content/contact-actions";
import { primaryNavigation } from "@/content/navigation";
import { siteSettings } from "@/content/site-settings";
import { brandLogoMedia } from "@/content/visual-media";
import { trackWhatsAppClick } from "@/lib/analytics";

const focusableElementSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const isActiveNavigationItem = (pathname: string, matchPath: string) => {
  if (matchPath === "/") {
    return pathname === "/";
  }

  return pathname === matchPath || pathname.startsWith(`${matchPath}/`);
};

export function SiteHeader() {
  const pathname = usePathname();
  const mobileMenuId = useId();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const menu = mobileMenuRef.current;
    const focusableElements = Array.from(
      menu?.querySelectorAll<HTMLElement>(focusableElementSelector) ?? [],
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements.at(-1);

    firstFocusableElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus();
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
  }, [isMobileMenuOpen]);

  return (
    <header className="site-header" aria-label="Site üst menüsü">
      <div className="rain-container site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          aria-label="RAIN SOUND ana sayfa"
        >
          <span className="site-header__brand-mark" aria-hidden="true">
            <Image
              className="site-header__brand-mark-image"
              src={brandLogoMedia.src}
              alt=""
              width={brandLogoMedia.width}
              height={brandLogoMedia.height}
              priority
              sizes="(max-width: 767px) 3.125rem, 3.5rem"
            />
          </span>
          <span className="site-header__brand-text">
            {siteSettings.siteName}
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Ana navigasyon">
          {primaryNavigation.map((item) => {
            const isActive = isActiveNavigationItem(pathname, item.matchPath);

            return (
              <Link
                key={item.href}
                className="site-header__nav-link"
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive ? "true" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          className="rain-button rain-button--primary site-header__cta"
          href={generalWhatsAppLink.href}
          onClick={() => {
            trackWhatsAppClick({ placement: "header_cta" });
          }}
        >
          {generalWhatsAppLink.label}
        </a>

        <button
          ref={mobileMenuButtonRef}
          className="rain-icon-button site-header__menu-button"
          type="button"
          aria-label={
            isMobileMenuOpen ? "Mobil menüyü kapat" : "Mobil menüyü aç"
          }
          aria-controls={mobileMenuId}
          aria-expanded={isMobileMenuOpen}
          onClick={() => {
            setIsMobileMenuOpen((current) => !current);
          }}
        >
          <span className="site-header__menu-icon" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={mobileMenuRef}
        id={mobileMenuId}
        className="site-header__mobile-panel"
        data-open={isMobileMenuOpen ? "true" : undefined}
        hidden={!isMobileMenuOpen}
      >
        <nav
          className="site-header__mobile-nav"
          aria-label="Mobil ana navigasyon"
        >
          {primaryNavigation.map((item) => {
            const isActive = isActiveNavigationItem(pathname, item.matchPath);

            return (
              <Link
                key={item.href}
                className="site-header__mobile-link"
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a
          className="rain-button rain-button--primary site-header__mobile-cta"
          href={generalWhatsAppLink.href}
          onClick={() => {
            trackWhatsAppClick({ placement: "header_mobile_cta" });
            closeMobileMenu();
          }}
        >
          {generalWhatsAppLink.label}
        </a>
      </div>
    </header>
  );
}
