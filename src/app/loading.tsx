import { StatusView } from "@/components/status-view";

export default function Loading() {
  return (
    <StatusView
      eyebrow="Yükleniyor"
      title="RAIN SOUND deneyimi hazırlanıyor."
      description="İçerik yüklenirken iletişim yolları erişilebilir kalır. Dilersen beklemeden WhatsApp üzerinden bilgi alabilirsin."
      isLoading
    />
  );
}
