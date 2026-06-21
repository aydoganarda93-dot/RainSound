import Link from "next/link";

import { TrackedLink } from "@/components/analytics";
import {
  generalWhatsAppLink,
  getContactByChannel,
  getSocialLinkByChannel,
  legalNavigation,
  primaryNavigation,
  siteSettings,
} from "@/content";

const mapsLink = getSocialLinkByChannel("maps");

export function SiteFooter() {
  const phoneContact = getContactByChannel("phone");

  return (
    <footer className="site-footer">
      <div className="rain-container site-footer__inner">
        <div className="site-footer__brand-block">
          <Link className="site-footer__brand" href="/">
            {siteSettings.siteName}
          </Link>
          <p className="site-footer__tagline">{siteSettings.tagline}</p>
          <p className="site-footer__description">{siteSettings.description}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Alt menü">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              className="rain-link site-footer__link"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <address className="site-footer__contact">
          <span>{siteSettings.address.display}</span>
          {phoneContact ? (
            <TrackedLink
              className="rain-link site-footer__link"
              event="phone_click"
              href={phoneContact.href}
              placement="footer_contact"
            >
              {phoneContact.value}
            </TrackedLink>
          ) : null}
          {mapsLink ? (
            <TrackedLink
              className="rain-link site-footer__link"
              event="directions_click"
              href={mapsLink.href}
              placement="footer_contact"
              rel="noreferrer"
              target={mapsLink.target}
            >
              Yol Tarifi Al
            </TrackedLink>
          ) : null}
        </address>
      </div>

      <div className="rain-container site-footer__bottom">
        <span>
          © {new Date().getFullYear()} {siteSettings.legalName}
        </span>
        <div className="site-footer__legal-links">
          {legalNavigation.map((item) => (
            <Link
              key={item.href}
              className="rain-link site-footer__link"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <TrackedLink
            className="rain-link site-footer__link"
            event="whatsapp_click"
            href={generalWhatsAppLink.href}
            placement="footer_bottom"
          >
            {generalWhatsAppLink.label}
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
