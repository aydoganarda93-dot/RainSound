import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { siteSettings } from "@/content";

import "./globals.css";

const siteUrl = new URL(siteSettings.siteUrl);
const metadataTitle = `${siteSettings.siteName} | Oto Detailing ve Ses Sistemleri`;
const metadataKeywords = [
  "Rain Sound",
  "Eskişehir oto detailing",
  "Eskişehir oto ses sistemi",
  "seramik kaplama",
  "pasta cila",
  "PPF kaplama",
  "cam filmi",
  "oto aksesuar",
  "araç kaplama",
];

const rainSans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-rain-sans",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteSettings.siteName,
  title: {
    default: metadataTitle,
    template: `%s | ${siteSettings.siteName}`,
  },
  description: siteSettings.description,
  keywords: metadataKeywords,
  creator: siteSettings.legalName,
  publisher: siteSettings.legalName,
  category: "Automotive",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: siteSettings.siteName,
    title: metadataTitle,
    description: siteSettings.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary",
    title: metadataTitle,
    description: siteSettings.description,
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteSettings.locale}>
      <body className={`${rainSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
