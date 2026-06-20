import type {
  FAQ,
  MediaAsset,
  Project,
  ProjectContentReadiness,
  Service,
  ServiceCategory,
  Testimonial,
} from "./types";

const realContent: {
  isDemo: false;
  replacementRequiredBeforeProduction: false;
} = {
  isDemo: false,
  replacementRequiredBeforeProduction: false,
};

const demoContent = (note: string) =>
  ({
    isDemo: true,
    replacementRequiredBeforeProduction: true,
    note,
  }) satisfies MediaAsset["demo"];

export const serviceCategories = [
  {
    id: "detailing",
    slug: "detailing",
    title: "Detailing",
    description: "Yıkama, boya yenileme ve parlaklık uygulamaları.",
    order: 1,
    accent: "purple",
    status: "published",
    demo: realContent,
  },
  {
    id: "protection",
    slug: "koruma",
    title: "Koruma",
    description: "PPF, cam filmi, seramik ve araç kaplama çözümleri.",
    order: 2,
    accent: "silver",
    status: "published",
    demo: realContent,
  },
  {
    id: "sound-tech",
    slug: "sound-tech",
    title: "Sound & Tech",
    description: "Ses, görüntü ve multimedya uygulamaları.",
    order: 3,
    accent: "purple",
    status: "published",
    demo: realContent,
  },
  {
    id: "design-performance",
    slug: "design-performance",
    title: "Design & Performance",
    description: "Far tasarımı, body kit ve performans görünümü.",
    order: 4,
    accent: "dark",
    status: "published",
    demo: realContent,
  },
] satisfies ServiceCategory[];

const pendingAiServiceMedia = {
  id: "pending-ai-service-atmosphere",
  kind: "image",
  source: "ai",
  usage: ["hero", "service-card"],
  src: "/media/ai/hero/ai-hero-rain-sound-classic-wide.avif",
  alt: "RAIN SOUND icin temsili AI otomobil atmosferi",
  width: 1536,
  height: 1024,
  hasUsagePermission: true,
  requiresPrivacyReview: false,
  demo: demoContent(
    "Bekleniyor: gerçek hizmet/proje çekimi yok; P10 mobil LCP stratejisini bozmamak için mevcut AI atmosfer placeholder'ı korunur.",
  ),
} satisfies MediaAsset;

const serviceVisuals = {
  paint: {
    imageSrc: "/media/ai/services/ai-service-ceramic-paint-01.avif",
    imageAlt: "Rain Sound icin boya parlakligi ve seramik koruma atmosferi",
  },
  protection: {
    imageSrc: "/media/ai/services/ai-service-ppf-film-01.avif",
    imageAlt: "Rain Sound icin PPF ve yuzey koruma atmosferi",
  },
  sound: {
    imageSrc: "/media/ai/services/ai-service-sound-install-01.avif",
    imageAlt: "Rain Sound icin oto ses sistemi montaj atmosferi",
  },
  performance: {
    imageSrc: "/media/ai/services/ai-service-performance-front-01.avif",
    imageAlt: "Rain Sound icin far ve performans tasarim atmosferi",
  },
} as const;

const demoProjectMedia = ({
  note,
  ...asset
}: Omit<
  MediaAsset,
  "source" | "hasUsagePermission" | "requiresPrivacyReview" | "demo"
> & {
  note: string;
}) =>
  ({
    ...asset,
    source: "demo",
    hasUsagePermission: true,
    requiresPrivacyReview: false,
    demo: demoContent(note),
  }) satisfies MediaAsset;

const draftProjectReadiness = ({
  requiredRealMedia,
  beforeAfterRequirements,
}: {
  requiredRealMedia: string[];
  beforeAfterRequirements: string[];
}) =>
  ({
    productionCandidate: false,
    realProjectRequired: true,
    permissionStatus: "not-started",
    productionBlockers: [
      "Gerçek proje medyası henüz yok.",
      "Araç sahibi yayın izni doğrulanmadı.",
      "Plaka, yüz, konum ve kişisel bilgi kontrolü yapılmadı.",
      "Demo medya production güven kanıtı olarak değişmeden kullanılamaz.",
      "Görsel/video performans bütçesi gerçek dosyalarla doğrulanmadı.",
    ],
    privacyChecklist: [
      "Plaka görünüyorsa bulanıklaştırma, kırpma veya açık izin uygulanacak.",
      "Yüz, kişi silüeti veya müşteri kimliği görünüyorsa yayın izni alınacak.",
      "Konum, ev/iş yeri, belge, telefon veya kişisel veri içeren detaylar kaldırılacak.",
      "Araç sahibi onayı olmadan gerçek müşteri aracı portfolyo kanıtı yapılmayacak.",
    ],
    permissionChecklist: [
      "Araç sahibi veya işletme yetkilisi yayın iznini doğrulayacak.",
      "Kullanılan ürün/marka görsellerinde yanıltıcı stok/fiyat iddiası kurulmayacak.",
      "Before/after çiftleri aynı araç ve aynı işlem için izinli şekilde kullanılacak.",
      "Medya kaynağı `real`, `provided`, `ai` veya `demo` olarak envantere işlenecek.",
    ],
    performanceChecklist: [
      "Kapak ve galeri görselleri AVIF/WebP türevleriyle optimize edilecek.",
      "Video dosyaları WebM/MP4, posterli ve otomatik ses başlatmadan sunulacak.",
      "Hero dışı proje medyası ilk yüklemede gereksiz yüksek öncelik taşımayacak.",
      "Mobil kırpım ve dosya ağırlığı P6.5 hedefleriyle kontrol edilecek.",
    ],
    requiredRealMedia,
    beforeAfterRequirements,
    mediaAcceptanceGates: [
      "Gerçek müşteri/proje medyası eklenecek.",
      "Araç sahibi yayın izni doğrulanacak.",
      "Plaka, yüz, konum ve kişisel bilgi kontrolü yapılacak.",
      "Demo medya production öncesi kaldırılacak veya gerçek içerikle değiştirilecek.",
      "Her medya için kaynak türü, alt metin ve mobil kırpım kontrolü tamamlanacak.",
    ],
    mobileCropRequirements: [
      "Desktop ve mobil kırpımlar ayrı kontrol edilecek.",
      "CTA, başlık ve ana özne mobilde kapanmayacak.",
      "Mobil kırpımda plaka, yüz veya konum bilgisi yeni görünür hale gelmeyecek.",
    ],
  }) satisfies ProjectContentReadiness;

export const services = [
  {
    id: "interior-exterior-wash",
    slug: "ic-dis-yikama",
    categoryId: "detailing",
    title: "İç Dış Yıkama",
    summary:
      "Günlük kullanım kirini temizleyip aracı teslimata hazır gösterir.",
    description:
      "Araç içi ve dışı kullanım durumuna göre kontrol edilir; dış yüzey, jant, iç trim ve temel kabin temizliği planlanır.",
    benefits: [
      "Temiz ve bakımlı görünüm",
      "Kabin içinde ferahlık",
      "Detaylı işlemler öncesi doğru hazırlık",
    ],
    process: [
      "Araç kabul ve kir seviyesi kontrolü",
      "Dış yüzey ve jant temizliği",
      "İç alan süpürme ve yüzey temizliği",
      "Son kontrol ve teslim hazırlığı",
    ],
    estimatedDurationNote: "Aracın boyutu ve kirlilik durumuna göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Temizlik hizmetidir; sonuç araç kullanımına ve mevcut yüzey durumuna göre değişebilir.",
    mediaNeeds: [
      "Yıkama alanı genel fotoğrafı",
      "Jant ve dış yüzey yakın planı",
      "Temiz kabin detay fotoğrafı",
    ],
    ctaContext: {
      label: "Yıkama için WhatsApp'tan bilgi al",
      intent: "appointment",
      messageHint: "İç dış yıkama için araç tipi ve uygun saat sorulacak.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "compact",
      visualRole: "wash",
      ...serviceVisuals.paint,
    },
    relatedServiceIds: ["paint-correction", "ceramic-coating"],
    status: "published",
    demo: realContent,
  },
  {
    id: "ceramic-coating",
    slug: "seramik-kaplama",
    categoryId: "protection",
    title: "Seramik Kaplama",
    summary: "Boya yüzeyi için parlaklık ve koruma odaklı uygulama.",
    description:
      "Araç durumuna göre hazırlık, yüzey temizliği ve koruma uygulaması planlanır.",
    benefits: ["Parlak görünüm", "Kolay temizlik", "Yüzey koruması"],
    process: [
      "Araç kontrolü",
      "Yüzey hazırlığı",
      "Uygulama",
      "Teslim kontrolü",
    ],
    estimatedDurationNote: "Aracın durumu ve uygulama kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Genel garanti vaadi yayınlanmaz; güncel bilgi WhatsApp'tan verilir.",
    mediaNeeds: [
      "Kaporta yansıması yakın planı",
      "Uygulama sırasında yüzey fotoğrafı",
      "Su iticilik veya parlaklık demo videosu",
    ],
    ctaContext: {
      label: "Seramik kaplama için teklif al",
      intent: "quote",
      messageHint:
        "Seramik kaplama için araç marka/modeli ve yüzey durumu istenecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "large",
      visualRole: "paint",
      ...serviceVisuals.paint,
    },
    relatedServiceIds: ["paint-correction", "ppf-coating", "vehicle-wrap"],
    status: "published",
    demo: realContent,
  },
  {
    id: "paint-correction",
    slug: "pasta-cila",
    categoryId: "detailing",
    title: "Pasta Cila",
    summary:
      "Boya yüzeyindeki matlık ve kılcal iz görünümünü azaltmaya odaklanır.",
    description:
      "Yüzey kontrolü yapılarak aracın boya durumuna uygun parlatma ve son kat bakım adımları planlanır.",
    benefits: [
      "Daha canlı boya görünümü",
      "Parlaklık artışı",
      "Koruma işlemlerine daha iyi hazırlık",
    ],
    process: [
      "Boya yüzeyi kontrolü",
      "Yıkama ve yüzey hazırlığı",
      "Pasta ve parlatma uygulaması",
      "Cila/koruma ve teslim kontrolü",
    ],
    estimatedDurationNote: "Boya durumu ve işlem seviyesine göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Kalıcı çizik giderme vaadi verilmez; sonuç boya kalınlığı ve yüzey durumuna bağlıdır.",
    mediaNeeds: [
      "Kaput before/after yakın planı",
      "Işık altında çizik kontrol görüntüsü",
      "Final parlaklık fotoğrafı",
    ],
    ctaContext: {
      label: "Pasta cila için araç durumunu gönder",
      intent: "project-review",
      messageHint:
        "Pasta cila değerlendirmesi için araç fotoğrafı ve boya durumu istenecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "medium",
      visualRole: "paint",
      ...serviceVisuals.paint,
    },
    relatedServiceIds: [
      "interior-exterior-wash",
      "ceramic-coating",
      "ppf-coating",
    ],
    status: "published",
    demo: realContent,
  },
  {
    id: "ppf-coating",
    slug: "ppf-kaplama",
    categoryId: "protection",
    title: "PPF Folyo Kaplama",
    summary: "Taş izi ve yüzey aşınmalarına karşı koruma uygulaması.",
    description:
      "Parça bazlı veya daha geniş kapsamlı koruma seçenekleri araç özelinde değerlendirilir.",
    benefits: ["Koruyucu film", "Parça bazlı seçenekler", "Temiz görünüm"],
    process: [
      "Alan seçimi",
      "Yüzey hazırlığı",
      "Folyo uygulaması",
      "Kenar kontrolü",
    ],
    estimatedDurationNote: "Aracın durumu ve uygulama kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Genel garanti vaadi yayınlanmaz; güncel bilgi WhatsApp'tan verilir.",
    mediaNeeds: [
      "Kaput veya tampon PPF uygulama fotoğrafı",
      "Film kenar detay yakın planı",
      "Teslim sonrası dış görünüm fotoğrafı",
    ],
    ctaContext: {
      label: "PPF kaplama için teklif al",
      intent: "quote",
      messageHint:
        "PPF için istenen parça/kapsam ve araç modeli WhatsApp'ta netleştirilecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "large",
      visualRole: "protection",
      ...serviceVisuals.protection,
    },
    relatedServiceIds: ["ceramic-coating", "paint-correction", "vehicle-wrap"],
    status: "published",
    demo: realContent,
  },
  {
    id: "window-film",
    slug: "cam-filmi",
    categoryId: "protection",
    title: "Cam Filmi",
    summary: "Araç camlarında görünüm, mahremiyet ve konfor odaklı uygulama.",
    description:
      "Cam filmi seçimi araç tipi, kullanım beklentisi ve yasal uygunluk çerçevesinde değerlendirilir.",
    benefits: [
      "Daha bütünlüklü dış görünüm",
      "Güneş etkisini azaltmaya yardımcı konfor",
      "Kabin mahremiyeti",
    ],
    process: [
      "Araç ve cam alanı kontrolü",
      "Film tonu/kapsam değerlendirmesi",
      "Cam hazırlığı",
      "Uygulama ve kenar kontrolü",
    ],
    estimatedDurationNote: "Cam sayısı ve araç tipine göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Ürün ve uygulama koşulları film seçimine ve kapsama göre WhatsApp'ta netleştirilir.",
    mediaNeeds: [
      "Öncesi/sonrası yan profil fotoğrafı",
      "Cam tonu yakın planı",
      "Dış mekanda araç genel görünümü",
    ],
    ctaContext: {
      label: "Cam filmi seçeneklerini sor",
      intent: "consultation",
      messageHint:
        "Cam filmi için araç modeli, istenen ton ve kapsam WhatsApp'ta konuşulacak.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "compact",
      visualRole: "protection",
      ...serviceVisuals.protection,
    },
    relatedServiceIds: ["vehicle-wrap", "ppf-coating"],
    status: "published",
    demo: realContent,
  },
  {
    id: "vehicle-wrap",
    slug: "arac-kaplama",
    categoryId: "protection",
    title: "Araç Kaplama",
    summary: "Aracın dış görünümünü renk, doku veya stil seçimiyle yeniler.",
    description:
      "Kaplama kapsamı, renk/doku tercihi ve mevcut boya durumu araç özelinde değerlendirilir.",
    benefits: [
      "Yeni karakter ve görünüm",
      "Parça bazlı veya geniş kapsamlı seçenek",
      "Marka/kişisel stil uyumu",
    ],
    process: [
      "Araç ve yüzey kontrolü",
      "Renk/doku seçimi",
      "Söküm/hazırlık planı",
      "Kaplama ve teslim kontrolü",
    ],
    estimatedDurationNote:
      "Kaplama alanı, araç boyutu ve detay seviyesine göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Ürün ve uygulama koşulları seçilen folyo/markaya göre ayrıca paylaşılır.",
    mediaNeeds: [
      "Renk/doku numune fotoğrafları",
      "Kaplama sırasında panel yakın planı",
      "Teslim sonrası 3 açı araç fotoğrafı",
    ],
    ctaContext: {
      label: "Araç kaplama fikrini WhatsApp'ta konuş",
      intent: "consultation",
      messageHint:
        "Araç kaplama için renk/doku fikri ve araç modeli WhatsApp'ta alınacak.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "large",
      visualRole: "performance",
      ...serviceVisuals.performance,
    },
    relatedServiceIds: ["ppf-coating", "window-film", "body-kit"],
    status: "published",
    demo: realContent,
  },
  {
    id: "car-audio-visual",
    slug: "oto-ses-ve-goruntu-sistemleri",
    categoryId: "sound-tech",
    title: "Oto Ses ve Görüntü Sistemleri",
    summary:
      "Araç içi ses, multimedya ve görüntü deneyimini güçlendiren uygulamalar.",
    description:
      "Hoparlör, amfi, subwoofer, multimedya ve görüntü ihtiyaçları aracın mevcut altyapısına göre planlanır.",
    benefits: [
      "Daha güçlü ses deneyimi",
      "Araç içi teknoloji hissi",
      "İhtiyaca göre parça/ürün seçimi",
    ],
    process: [
      "Mevcut sistem kontrolü",
      "İhtiyaç ve ürün seçimi",
      "Montaj planı",
      "Test, ayar ve teslim",
    ],
    estimatedDurationNote: "Sistem kapsamı ve ürün adedine göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Ürün ve uygulama koşulları seçilen ürüne göre değişir; net bilgi WhatsApp'ta verilir.",
    mediaNeeds: [
      "Doğrulanmış ürün yakın planları",
      "Montaj öncesi/sonrası bagaj veya konsol fotoğrafı",
      "Kısa sistem demo videosu",
    ],
    ctaContext: {
      label: "Ses sistemi için danış",
      intent: "product-info",
      messageHint:
        "Ses sistemi için beklenti, bütçe aralığı ve araç modeli WhatsApp'ta sorulacak.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "large",
      visualRole: "sound",
      ...serviceVisuals.sound,
    },
    relatedServiceIds: ["auto-accessories"],
    status: "published",
    demo: realContent,
  },
  {
    id: "auto-accessories",
    slug: "oto-aksesuar",
    categoryId: "sound-tech",
    title: "Oto Aksesuar",
    summary: "Araç kullanımını ve görünümünü tamamlayan aksesuar seçenekleri.",
    description:
      "Katalogdaki aksesuarlar araç uyumu, stok durumu ve kullanım ihtiyacına göre değerlendirilir.",
    benefits: [
      "Kişisel dokunuş",
      "Pratik kullanım parçaları",
      "Araç modeline göre ürün yönlendirmesi",
    ],
    process: [
      "İhtiyaç belirleme",
      "Ürün/uyum kontrolü",
      "Stok veya alternatif değerlendirmesi",
      "Montaj/teslim bilgisi",
    ],
    estimatedDurationNote:
      "Ürün tipine, stok durumuna ve montaj ihtiyacına göre değişir.",
    pricingNote: "Fiyat yayınlanmaz; güncel bilgi WhatsApp üzerinden verilir.",
    warrantyNote:
      "Ürün ve montaj koşulları tedarik durumuna göre WhatsApp'ta netleştirilir.",
    mediaNeeds: [
      "WhatsApp katalog ürün görselleri",
      "Ürün yakın plan fotoğrafları",
      "Araç üzerinde kullanım fotoğrafları",
    ],
    ctaContext: {
      label: "Aksesuar için WhatsApp'tan sor",
      intent: "product-info",
      messageHint:
        "Aksesuar için istenen ürün ve araç modeli WhatsApp'ta netleştirilecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "compact",
      visualRole: "sound",
      ...serviceVisuals.sound,
    },
    relatedServiceIds: ["car-audio-visual"],
    status: "published",
    demo: realContent,
  },
  {
    id: "headlight-design",
    slug: "far-tasarimi",
    categoryId: "design-performance",
    title: "Far Tasarımı",
    summary: "Aracın ön görünümünü ışık ve detay karakteriyle güçlendirir.",
    description:
      "Far tasarımı, mevcut far durumu, istenen görünüm ve uygulanabilirlik değerlendirmesiyle planlanır.",
    benefits: [
      "Daha agresif ön görünüm",
      "Kişisel tasarım dili",
      "Gece/gündüz vitrin etkisi",
    ],
    process: [
      "Far ve araç tasarım kontrolü",
      "İstenen görünümün belirlenmesi",
      "Uygulama planı",
      "Işık ve sızdırmazlık kontrolü",
    ],
    estimatedDurationNote:
      "Far tipi, tasarım kapsamı ve parça durumuna göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Uygulanabilirlik ve işlem koşulları kapsam netleştikten sonra paylaşılır.",
    mediaNeeds: [
      "Far açık/kapalı karşılaştırması",
      "Yakın plan ışık detayı",
      "Gece çekimi kısa video",
    ],
    ctaContext: {
      label: "Far tasarımı için fikir gönder",
      intent: "project-review",
      messageHint:
        "Far tasarımı için araç modeli ve örnek istenen görünüm WhatsApp'ta istenecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "medium",
      visualRole: "performance",
      ...serviceVisuals.performance,
    },
    relatedServiceIds: ["body-kit", "vehicle-wrap"],
    status: "published",
    demo: realContent,
  },
  {
    id: "body-kit",
    slug: "body-kit",
    categoryId: "design-performance",
    title: "Body Kit",
    summary:
      "Tampon, lip, marşpiyel ve ek parçalarla aracın duruşunu değiştirir.",
    description:
      "Body kit uygulaması parça uyumu, montaj ihtiyacı ve istenen tasarım çizgisine göre değerlendirilir.",
    benefits: [
      "Daha sportif duruş",
      "Model odaklı görünüm değişimi",
      "Kaplama ve far tasarımıyla bütünleşme",
    ],
    process: [
      "Araç/model uyumu kontrolü",
      "Parça ve kapsam belirleme",
      "Montaj/hazırlık planı",
      "Son hizalama ve teslim kontrolü",
    ],
    estimatedDurationNote:
      "Parça temini, boyama ve montaj kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Parça ve montaj koşulları ürün tipine göre ayrıca değerlendirilir.",
    mediaNeeds: [
      "Ön/yan/arka açı body kit fotoğrafları",
      "Montaj öncesi/sonrası karşılaştırma",
      "Detay parça yakın planı",
    ],
    ctaContext: {
      label: "Body kit uyumunu sor",
      intent: "consultation",
      messageHint:
        "Body kit için araç modeli, istenen parça ve örnek görsel WhatsApp'ta alınacak.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "medium",
      visualRole: "performance",
      ...serviceVisuals.performance,
    },
    relatedServiceIds: ["headlight-design", "vehicle-wrap", "varex-exhaust"],
    status: "published",
    demo: realContent,
  },
  {
    id: "varex-exhaust",
    slug: "varex-egzoz",
    categoryId: "design-performance",
    title: "Varex Egzoz",
    summary:
      "Araç karakterini ses ve performans görünümüyle tamamlayan egzoz uygulaması.",
    description:
      "Varex egzoz talebi araç altyapısı, kullanım beklentisi ve uygulanabilirlik durumuna göre değerlendirilir.",
    benefits: [
      "Kontrollü ses karakteri",
      "Performans odaklı görünüm",
      "Modifiye konseptini tamamlama",
    ],
    process: [
      "Araç altyapısı kontrolü",
      "Ses/görünüm beklentisinin alınması",
      "Uygulama kapsamının belirlenmesi",
      "Montaj ve teslim kontrolü",
    ],
    estimatedDurationNote:
      "Araç altyapısı, parça durumu ve işlem kapsamına göre değişir.",
    pricingNote: "Bilgi ve fiyat için WhatsApp üzerinden iletişime geçilir.",
    warrantyNote:
      "Ürün ve uygulama koşulları seçilen parça ve montaj kapsamına göre değişir.",
    mediaNeeds: [
      "Egzoz uç yakın planı",
      "Alt takım/montaj detay fotoğrafı",
      "Kısa ses demo videosu",
    ],
    ctaContext: {
      label: "Varex egzoz için danış",
      intent: "consultation",
      messageHint:
        "Varex egzoz için araç modeli ve beklenti WhatsApp'ta netleştirilecek.",
    },
    media: [pendingAiServiceMedia],
    visualTreatment: {
      priority: "compact",
      visualRole: "performance",
      ...serviceVisuals.performance,
    },
    relatedServiceIds: ["body-kit", "headlight-design"],
    status: "published",
    demo: realContent,
  },
] satisfies Service[];

export const projects: Project[] = [
  {
    id: "demo-protection-detailing-project",
    slug: "demo-koruma-detailing-projesi",
    title: "Demo Koruma ve Detailing Projesi",
    summary:
      "Seramik kaplama, PPF ve pasta cila akışını göstermek için hazırlanmış demo proje verisi.",
    vehicleLabel: "Demo coupe araç",
    serviceIds: ["paint-correction", "ceramic-coating", "ppf-coating"],
    cover: demoProjectMedia({
      id: "demo-protection-cover",
      kind: "image",
      usage: ["project-gallery", "service-card"],
      src: "/demo/projects/protection-cover.webp",
      alt: "Demo koruma projesi için koyu zeminde parlak araç kaporta görseli",
      width: 1600,
      height: 900,
      note: "Production öncesi gerçek koruma projesi kapak fotoğrafıyla değişecek.",
    }),
    gallery: [
      demoProjectMedia({
        id: "demo-protection-gallery-reflection",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/protection-reflection.webp",
        alt: "Demo koruma projesinde kaporta yansıması yakın planı",
        width: 1400,
        height: 933,
        note: "Kaporta yansıması için temsili demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-protection-gallery-ppf",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/protection-ppf-detail.webp",
        alt: "Demo PPF uygulama detayını temsil eden yakın plan",
        width: 1400,
        height: 933,
        note: "PPF uygulama detayını temsil eden demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-protection-video",
        kind: "video",
        usage: ["project-gallery"],
        src: "/demo/projects/protection-walkaround.webm",
        posterSrc: "/demo/projects/protection-cover.webp",
        alt: "Demo koruma projesi kısa araç çevresi videosu",
        width: 1080,
        height: 1920,
        note: "Gerçek dikey proje videosu gelene kadar yer tutucu video verisidir.",
      }),
    ],
    beforeAfter: [
      {
        id: "demo-protection-paint-before-after",
        label: "Boya parlaklığı demo karşılaştırması",
        before: demoProjectMedia({
          id: "demo-protection-before",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/protection-before.webp",
          alt: "Demo koruma projesi işlem öncesi yüzey görünümü",
          width: 1400,
          height: 933,
          note: "Gerçek before görseli üretim öncesi eklenecek.",
        }),
        after: demoProjectMedia({
          id: "demo-protection-after",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/protection-after.webp",
          alt: "Demo koruma projesi işlem sonrası parlak yüzey görünümü",
          width: 1400,
          height: 933,
          note: "Gerçek after görseli üretim öncesi eklenecek.",
        }),
      },
    ],
    privacyReviewed: false,
    publishPermissionConfirmed: false,
    contentReadiness: draftProjectReadiness({
      requiredRealMedia: [
        "Gerçek koruma/detailing proje kapak fotoğrafı",
        "Seramik kaplama veya pasta cila kaporta yansıması yakın planı",
        "PPF uygulama detay fotoğrafı",
        "Kısa dikey teslim veya walkaround videosu",
      ],
      beforeAfterRequirements: [
        "Aynı araç, aynı açı ve benzer ışıkta işlem öncesi fotoğraf",
        "Aynı kadrajda işlem sonrası parlaklık/koruma sonucu",
        "Before/after çiftinde plaka ve kişisel bilgi kontrolü",
      ],
    }),
    status: "archived",
    demo: demoContent(
      "Kaldırıldı: gerçek müşteri/proje medyası ve yayın izni olmadığı için public portfolyo rotasından çıkarıldı.",
    ),
  },
  {
    id: "demo-sound-tech-project",
    slug: "demo-ses-sistemi-projesi",
    title: "Demo Sound & Tech Projesi",
    summary:
      "Oto ses, görüntü ve aksesuar hizmetlerinin proje detayında nasıl bağlanacağını gösteren demo veri.",
    vehicleLabel: "Demo hatchback araç",
    serviceIds: ["car-audio-visual", "auto-accessories"],
    cover: demoProjectMedia({
      id: "demo-sound-cover",
      kind: "image",
      usage: ["project-gallery", "service-card"],
      src: "/demo/projects/sound-cover.webp",
      alt: "Demo ses sistemi projesi için bagaj içi ekipman yerleşimi",
      width: 1600,
      height: 900,
      note: "Production öncesi gerçek ses sistemi projesi kapak fotoğrafıyla değişecek.",
    }),
    gallery: [
      demoProjectMedia({
        id: "demo-sound-gallery-products",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/sound-products.webp",
        alt: "Demo ses sistemi ürünleri yakın planı",
        width: 1400,
        height: 933,
        note: "Gerçek marka/ürün görselleri gelene kadar demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-sound-gallery-install",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/sound-install.webp",
        alt: "Demo ses sistemi montaj alanı yakın planı",
        width: 1400,
        height: 933,
        note: "Montaj sürecini temsil eden demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-sound-video",
        kind: "video",
        usage: ["project-gallery"],
        src: "/demo/projects/sound-demo.webm",
        posterSrc: "/demo/projects/sound-cover.webp",
        alt: "Demo ses sistemi kısa ürün ve araç içi video verisi",
        width: 1080,
        height: 1920,
        note: "Gerçek sistem demo videosu gelene kadar yer tutucu video verisidir.",
      }),
    ],
    beforeAfter: [
      {
        id: "demo-sound-cabin-before-after",
        label: "Ses sistemi yerleşimi demo karşılaştırması",
        before: demoProjectMedia({
          id: "demo-sound-before",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/sound-before.webp",
          alt: "Demo ses sistemi projesi montaj öncesi araç içi görünüm",
          width: 1400,
          height: 933,
          note: "Gerçek montaj öncesi görsel üretim öncesi eklenecek.",
        }),
        after: demoProjectMedia({
          id: "demo-sound-after",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/sound-after.webp",
          alt: "Demo ses sistemi projesi montaj sonrası araç içi görünüm",
          width: 1400,
          height: 933,
          note: "Gerçek montaj sonrası görsel üretim öncesi eklenecek.",
        }),
      },
    ],
    privacyReviewed: false,
    publishPermissionConfirmed: false,
    contentReadiness: draftProjectReadiness({
      requiredRealMedia: [
        "Gerçek ses sistemi veya multimedya proje kapak fotoğrafı",
        "Ürün yakın planı ve marka/ürün kullanım izni kontrolü",
        "Montaj öncesi/sonrası bagaj veya konsol fotoğrafı",
        "Kullanıcı kontrollü kısa sistem demo videosu",
      ],
      beforeAfterRequirements: [
        "Montaj öncesi araç içi veya bagaj görünümü",
        "Montaj sonrası aynı bölgenin temiz ve düzenli görünümü",
        "Ürün/fiyat/stok iddiası oluşturmayan açıklama ve alt metin",
      ],
    }),
    status: "archived",
    demo: demoContent(
      "Kaldırıldı: gerçek müşteri/proje medyası ve yayın izni olmadığı için public portfolyo rotasından çıkarıldı.",
    ),
  },
  {
    id: "demo-design-performance-project",
    slug: "demo-design-performance-projesi",
    title: "Demo Design & Performance Projesi",
    summary:
      "Far tasarımı, body kit, araç kaplama ve varex egzoz gibi karakter odaklı işlemleri bağlayan demo proje.",
    vehicleLabel: "Demo sedan araç",
    serviceIds: [
      "vehicle-wrap",
      "headlight-design",
      "body-kit",
      "varex-exhaust",
    ],
    cover: demoProjectMedia({
      id: "demo-design-cover",
      kind: "image",
      usage: ["project-gallery", "service-card"],
      src: "/demo/projects/design-cover.webp",
      alt: "Demo design performance projesi için agresif araç ön görünümü",
      width: 1600,
      height: 900,
      note: "Production öncesi gerçek tasarım/performance projesi kapak fotoğrafıyla değişecek.",
    }),
    gallery: [
      demoProjectMedia({
        id: "demo-design-gallery-headlight",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/design-headlight.webp",
        alt: "Demo far tasarımı ışık detayı",
        width: 1400,
        height: 933,
        note: "Gerçek far tasarımı projesi gelene kadar demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-design-gallery-exhaust",
        kind: "image",
        usage: ["project-gallery"],
        src: "/demo/projects/design-exhaust.webp",
        alt: "Demo varex egzoz uç detayı",
        width: 1400,
        height: 933,
        note: "Gerçek egzoz uygulaması gelene kadar demo görseldir.",
      }),
      demoProjectMedia({
        id: "demo-design-video",
        kind: "video",
        usage: ["project-gallery"],
        src: "/demo/projects/design-reveal.webm",
        posterSrc: "/demo/projects/design-cover.webp",
        alt: "Demo design performance kısa reveal videosu",
        width: 1080,
        height: 1920,
        note: "Gerçek reveal videosu gelene kadar yer tutucu video verisidir.",
      }),
    ],
    beforeAfter: [
      {
        id: "demo-design-front-before-after",
        label: "Ön görünüm demo karşılaştırması",
        before: demoProjectMedia({
          id: "demo-design-before",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/design-before.webp",
          alt: "Demo design performance projesi işlem öncesi ön görünüm",
          width: 1400,
          height: 933,
          note: "Gerçek işlem öncesi ön görünüm üretim öncesi eklenecek.",
        }),
        after: demoProjectMedia({
          id: "demo-design-after",
          kind: "image",
          usage: ["before-after"],
          src: "/demo/projects/design-after.webp",
          alt: "Demo design performance projesi işlem sonrası ön görünüm",
          width: 1400,
          height: 933,
          note: "Gerçek işlem sonrası ön görünüm üretim öncesi eklenecek.",
        }),
      },
    ],
    privacyReviewed: false,
    publishPermissionConfirmed: false,
    contentReadiness: draftProjectReadiness({
      requiredRealMedia: [
        "Gerçek design/performance proje kapak fotoğrafı",
        "Far tasarımı açık/kapalı yakın planı",
        "Body kit veya araç kaplama dış görünüm fotoğrafı",
        "Egzoz veya reveal için kısa dikey video",
      ],
      beforeAfterRequirements: [
        "Ön görünüm için işlem öncesi ve sonrası aynı açı",
        "Far/body kit/kaplama değişimini net gösteren karşılaştırma",
        "Plaka, konum ve tanınabilir kişisel bilgi kontrolü",
      ],
    }),
    status: "archived",
    demo: demoContent(
      "Kaldırıldı: gerçek müşteri/proje medyası ve yayın izni olmadığı için public portfolyo rotasından çıkarıldı.",
    ),
  },
] satisfies Project[];

export const testimonials = [
  {
    id: "demo-testimonial",
    authorName: "Demo müşteri",
    source: "direct",
    quote: "Bu yorum yalnızca tasarım yerleşimini test etmek için kullanılır.",
    rating: 5,
    status: "archived",
    demo: demoContent(
      "Kaldırıldı: doğrulanmış müşteri yorumu kaynağı olmadığı için yayın veri setinden çıkarıldı.",
    ),
  },
] satisfies Testimonial[];

export const faqs = [
  {
    id: "duration-note",
    question: "Uygulama ne kadar sürer?",
    answer:
      "Süre aracın durumu, boyutu ve seçilen uygulama kapsamına göre değişir.",
    relatedServiceIds: ["ceramic-coating", "ppf-coating"],
    order: 1,
    status: "published",
    demo: realContent,
  },
] satisfies FAQ[];
