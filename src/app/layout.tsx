import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { siteSettings } from "@/content";

import "./globals.css";

const rainSans = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-rain-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${siteSettings.siteName} | Oto Detailing ve Ses Sistemleri`,
    template: `%s | ${siteSettings.siteName}`,
  },
  description: siteSettings.description,
};

export const viewport: Viewport = {
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
