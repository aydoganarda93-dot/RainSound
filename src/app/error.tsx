"use client";

import { StatusView } from "@/components/status-view";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error(error);

  return (
    <StatusView
      eyebrow="Beklenmeyen hata"
      title="Bir şey ters gitti, ama iletişim yolları açık."
      description="Sayfa yüklenirken geçici bir sorun oluştu. Tekrar deneyebilir ya da RAIN SOUND ile WhatsApp üzerinden hızlıca iletişime geçebilirsin."
      onRetry={reset}
    />
  );
}
