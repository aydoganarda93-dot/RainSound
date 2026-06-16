"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  generalWhatsAppLink,
  primaryNavigation,
  siteSettings,
} from "@/content";

const isActiveNavigationItem = (pathname: string, matchPath: string) => {
  if (matchPath === "/") {
    return pathname === "/";
  }

  return pathname === matchPath || pathname.startsWith(`${matchPath}/`);
};

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header" aria-label="Site üst menüsü">
      <div className="rain-container site-header__inner">
        <Link
          className="site-header__brand"
          href="/"
          aria-label="RAIN SOUND ana sayfa"
        >
          <span className="site-header__brand-mark" aria-hidden="true">
            RS
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
        >
          {generalWhatsAppLink.label}
        </a>
      </div>
    </header>
  );
}
