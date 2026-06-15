import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RAIN SOUND | Oto Detailing ve Ses Sistemleri",
    template: "%s | RAIN SOUND",
  },
  description:
    "Eskişehir'de oto detailing, araç koruma, ses sistemleri, aksesuar ve modifiye uygulamaları.",
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
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
