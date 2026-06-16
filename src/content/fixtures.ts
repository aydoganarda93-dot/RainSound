import type {
  FAQ,
  MediaAsset,
  Project,
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

const demoHeroMedia = {
  id: "demo-hero-rain-sound",
  kind: "image",
  source: "demo",
  usage: ["hero", "service-card"],
  src: "/demo/hero-rain-sound.webp",
  alt: "RAIN SOUND için temsili koyu otomobil atmosferi",
  width: 1600,
  height: 900,
  hasUsagePermission: true,
  requiresPrivacyReview: false,
  demo: demoContent(
    "Production öncesi gerçek veya onaylı AI görselle değişecek.",
  ),
} satisfies MediaAsset;

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
    media: [demoHeroMedia],
    relatedServiceIds: ["paint-correction", "ceramic-coating"],
    status: "published",
    demo: demoContent(
      "Tanıtım metni gerçek hizmet fotoğraflarıyla production öncesi doğrulanacak.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: ["paint-correction", "ppf-coating", "vehicle-wrap"],
    status: "published",
    demo: demoContent(
      "Hizmet metni P2.3 aşamasında gerçek içerikle genişletilecek.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: [
      "interior-exterior-wash",
      "ceramic-coating",
      "ppf-coating",
    ],
    status: "published",
    demo: demoContent(
      "Demo açıklama üretildi; gerçek uygulama fotoğraflarıyla desteklenecek.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: ["ceramic-coating", "paint-correction", "vehicle-wrap"],
    status: "published",
    demo: demoContent(
      "Hizmet metni P2.3 aşamasında gerçek içerikle genişletilecek.",
    ),
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
      "Ürün/uygulama garantisi marka ve film seçimine göre WhatsApp'ta netleştirilir.",
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
    media: [demoHeroMedia],
    relatedServiceIds: ["vehicle-wrap", "ppf-coating"],
    status: "published",
    demo: demoContent(
      "Yasal uygunluk ve marka bilgileri production öncesi tekrar doğrulanacak.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: ["ppf-coating", "window-film", "body-kit"],
    status: "published",
    demo: demoContent(
      "Demo tanıtım metni; gerçek kaplama projeleri P7 aşamasında bağlanacak.",
    ),
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
      "Ürün garanti koşulları seçilen markaya göre değişir; net bilgi WhatsApp'ta verilir.",
    mediaNeeds: [
      "Pioneer/Forx/Cadence ürün yakın planları",
      "Montaj öncesi/sonrası bagaj veya konsol fotoğrafı",
      "Kısa sistem demo videosu",
    ],
    ctaContext: {
      label: "Ses sistemi için danış",
      intent: "product-info",
      messageHint:
        "Ses sistemi için beklenti, bütçe aralığı ve araç modeli WhatsApp'ta sorulacak.",
    },
    media: [demoHeroMedia],
    relatedServiceIds: ["auto-accessories"],
    status: "published",
    demo: demoContent(
      "Marka ve ürün detayları katalog/görseller geldikçe güncellenecek.",
    ),
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
    warrantyNote: "Ürün garantisi marka ve tedarik durumuna göre değişebilir.",
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
    media: [demoHeroMedia],
    relatedServiceIds: ["car-audio-visual"],
    status: "published",
    demo: demoContent(
      "WhatsApp Business kataloğu referanstır; fiyatlar otomatik yayınlanmaz.",
    ),
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
      "Uygulanabilirlik ve garanti koşulları işlem kapsamı netleştikten sonra paylaşılır.",
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
    media: [demoHeroMedia],
    relatedServiceIds: ["body-kit", "vehicle-wrap"],
    status: "published",
    demo: demoContent(
      "Demo metin; gerçek far projeleri eklendiğinde revize edilecek.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: ["headlight-design", "vehicle-wrap", "varex-exhaust"],
    status: "published",
    demo: demoContent(
      "Parça uyumu ve temin durumu gerçek taleple doğrulanacaktır.",
    ),
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
    media: [demoHeroMedia],
    relatedServiceIds: ["body-kit", "headlight-design"],
    status: "published",
    demo: demoContent(
      "Yasal/teknik uygunluk ve parça bilgisi talep bazında doğrulanacaktır.",
    ),
  },
] satisfies Service[];

export const projects = [
  {
    id: "demo-detailing-project",
    slug: "demo-detailing-projesi",
    title: "Demo Detailing ve Koruma Projesi",
    summary:
      "Gerçek proje gelene kadar tasarım ve veri modeli için kullanılır.",
    vehicleLabel: "Demo araç",
    serviceIds: ["ceramic-coating", "ppf-coating"],
    cover: demoHeroMedia,
    gallery: [demoHeroMedia],
    beforeAfter: [],
    privacyReviewed: false,
    publishPermissionConfirmed: false,
    status: "draft",
    demo: demoContent("P12 öncesi gerçek proje ile değiştirilecek."),
  },
] satisfies Project[];

export const testimonials = [
  {
    id: "demo-testimonial",
    authorName: "Demo müşteri",
    source: "direct",
    quote: "Bu yorum yalnızca tasarım yerleşimini test etmek için kullanılır.",
    rating: 5,
    status: "draft",
    demo: demoContent(
      "Production'da gerçek müşteri yorumu olmadan yayınlanmayacak.",
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
