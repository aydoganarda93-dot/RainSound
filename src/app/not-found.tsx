import { StatusView } from "@/components/status-view";

export default function NotFound() {
  return (
    <StatusView
      eyebrow="Sayfa bulunamadı"
      statusCode="404"
      title="Aradığın sayfa garaja giriş yapmamış."
      description="Bu bağlantı taşınmış veya henüz hazırlanıyor olabilir. Ana sayfaya dönebilir ya da doğrudan WhatsApp üzerinden RAIN SOUND ile iletişime geçebilirsin."
    />
  );
}
