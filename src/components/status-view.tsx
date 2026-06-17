"use client";

import Link from "next/link";

import {
  generalWhatsAppLink,
  getContactByChannel,
  siteSettings,
} from "@/content";

type StatusViewProps = {
  eyebrow: string;
  title: string;
  description: string;
  statusCode?: string;
  isLoading?: boolean;
  onRetry?: () => void;
};

export function StatusView({
  eyebrow,
  title,
  description,
  statusCode,
  isLoading = false,
  onRetry,
}: StatusViewProps) {
  const phoneContact = getContactByChannel("phone");

  return (
    <main className="status-view">
      <div className="development-shell__glow" aria-hidden="true" />

      <section
        className="rain-container rain-container--readable rain-card status-view__card"
        aria-labelledby="status-title"
        aria-busy={isLoading || undefined}
      >
        <p className="rain-badge status-view__eyebrow">{eyebrow}</p>
        {statusCode ? <p className="status-view__code">{statusCode}</p> : null}
        <h1 id="status-title" className="rain-heading rain-heading--section">
          {title}
        </h1>
        <p className="status-view__description">{description}</p>

        <div className="status-view__actions">
          <Link className="rain-button rain-button--secondary" href="/">
            Ana Sayfaya Dön
          </Link>
          <a
            className="rain-button rain-button--primary"
            href={generalWhatsAppLink.href}
          >
            {generalWhatsAppLink.label}
          </a>
          {phoneContact ? (
            <a
              className="rain-button rain-button--secondary"
              href={phoneContact.href}
            >
              {phoneContact.value}
            </a>
          ) : null}
          {onRetry ? (
            <button
              className="rain-button rain-button--secondary"
              type="button"
              onClick={onRetry}
            >
              Tekrar Dene
            </button>
          ) : null}
        </div>

        <p className="status-view__note">{siteSettings.tagline}</p>
      </section>
    </main>
  );
}
