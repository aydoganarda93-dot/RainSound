import Link from "next/link";

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
            <a className="rain-link site-footer__link" href={phoneContact.href}>
              {phoneContact.value}
            </a>
          ) : null}
          {mapsLink ? (
            <a
              className="rain-link site-footer__link"
              href={mapsLink.href}
              target={mapsLink.target}
              rel="noreferrer"
            >
              Yol Tarifi Al
            </a>
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
          <a
            className="rain-link site-footer__link"
            href={generalWhatsAppLink.href}
          >
            {generalWhatsAppLink.label}
          </a>
        </div>
      </div>
    </footer>
  );
}

export function QuickContactBar() {
  const phoneContact = getContactByChannel("phone");

  return (
    <aside className="quick-contact" aria-label="Hızlı iletişim">
      <a
        className="rain-button rain-button--primary quick-contact__primary"
        href={generalWhatsAppLink.href}
      >
        WhatsApp
      </a>
      {phoneContact ? (
        <a
          className="rain-button rain-button--secondary quick-contact__link"
          href={phoneContact.href}
        >
          Ara
        </a>
      ) : null}
      {mapsLink ? (
        <a
          className="rain-button rain-button--secondary quick-contact__link"
          href={mapsLink.href}
          target={mapsLink.target}
          rel="noreferrer"
        >
          Yol Tarifi
        </a>
      ) : null}
    </aside>
  );
}
