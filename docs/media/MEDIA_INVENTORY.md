# Rain Sound Medya Envanteri

> **Amaç:** Gerçek, AI, demo ve işletme tarafından sağlanan medya dosyalarını
> hizmet/proje bazında sınıflandırmak.
> **Durum:** P6.1 başlangıç envanteri.
> **Son güncelleme:** 17 Haziran 2026.

Bu dosya gerçek görseller gelmeden önce arşiv disiplinini kurar. Bir dosya web
sitesinde kullanılmadan önce burada hangi hizmete/projeye ait olduğu, kaynağı,
izin durumu, gizlilik durumu ve kullanım yeri netleşmelidir.

## Mevcut Medya Durumu

17 Haziran 2026 itibarıyla elimizde gerçek işletme, gerçek araç, gerçek uygulama
veya gerçek proje çekimi bulunmuyor. Kullanılabilir tek mevcut görsel kaynak,
işletmenin WhatsApp Business katalog bağlantısındaki ürün fotoğraflarıdır:

```text
https://wa.me/c/140677425926183
```

Bu katalog görselleri `provided` kaynak türünde değerlendirilir ve
`public/media/provided/catalog/` altında sınıflandırılır. Katalog fotoğrafları
ürün/aksesuar/ses sistemi vitrini için kullanılabilir; detailing, koruma,
before/after veya gerçek proje sonucu kanıtı olarak kullanılmaz.

Katalog görselleri web sitesine alınmadan önce manuel olarak dışa aktarılmalı,
dosya adı standardına göre yeniden adlandırılmalı, kullanım izni işletme
tarafından doğrulanmalı ve ürün bilgisi güncel değilse fiyat/stok iddiası
yayınlanmamalıdır.

## Klasör Yapısı

```text
public/media/
  real/
    services/   Gerçek hizmet fotoğraf ve videoları
    projects/   Gerçek müşteri/proje fotoğraf ve videoları
    brand/      Dükkan, tabela, ekip, uygulama alanı
  ai/
    hero/       AI destekli hero ve sinematik atmosfer görselleri
    social/     Sosyal medya ve Open Graph türevleri
  demo/
    projects/   Tasarım/veri akışı testi için geçici proje medyası
  provided/
    logo/       İşletmenin sağladığı logo ve marka dosyaları
    catalog/    WhatsApp Business katalog/ürün/marka görselleri
```

## Kaynak Türleri

| Kaynak     | Anlam                                                    | Production Kullanımı                               |
| ---------- | -------------------------------------------------------- | -------------------------------------------------- |
| `real`     | Gerçek işletme, gerçek araç veya gerçek uygulama içeriği | Yayın izni ve gizlilik kontrolü zorunlu            |
| `ai`       | AI ile üretilmiş atmosfer, hero veya kampanya görseli    | Gerçek uygulama sonucu gibi sunulamaz              |
| `demo`     | Tasarım ve veri akışı testi için geçici içerik           | Production öncesi gerçek/izinli içerikle değişmeli |
| `provided` | İşletmenin verdiği logo, katalog veya marka görseli      | Kullanım izni işletme tarafından doğrulanmalı      |

## Dosya Adlandırma Kuralları

Dosya adları küçük harf, tire ayracı ve Türkçe karakter içermeyen slug yapısında
olmalıdır.

```text
{kaynak}-{baglam}-{icerik}-{kadraj}-{sira}.{uzanti}
```

Örnekler:

- `provided-catalog-pioneer-hoparlor-square-01.webp`
- `real-service-ceramic-coating-reflection-wide-01.webp`
- `real-project-protection-detailing-before-wide-01.webp`
- `real-project-sound-tech-install-vertical-01.mp4`
- `ai-hero-neon-car-smoke-wide-01.webp`

Kadraj etiketleri:

- `wide`: yatay web alanları, önerilen 16:9
- `vertical`: mobil/reels alanları, önerilen 9:16
- `square`: katalog, kart ve sosyal medya alanları, önerilen 1:1
- `macro`: ürün, yüzey, far, jant veya detay yakın planı

## Medya Envanter Şablonu

Yeni dosya geldiğinde aşağıdaki tabloya satır olarak eklenir.

| ID         | Dosya Yolu                        | Kaynak | Tür     | Kullanım       | Bağlı Hizmet/Proje | Alt Metin                                   | İzin       | Gizlilik   | Durum      | Not                                 |
| ---------- | --------------------------------- | ------ | ------- | -------------- | ------------------ | ------------------------------------------- | ---------- | ---------- | ---------- | ----------------------------------- |
| `ornek-id` | `/media/real/services/ornek.webp` | `real` | `image` | `service-card` | `seramik-kaplama`  | `Seramik kaplama sonrası kaporta yansıması` | Bekleniyor | Bekleniyor | Bekleniyor | Production öncesi optimize edilecek |

## Mevcut Katalog Görselleri İçin Envanter Kuyruğu

WhatsApp katalog görselleri henüz dosya olarak repoya alınmadı. Alındıklarında
aşağıdaki alanlara işleneceklerdir.

| ID                                   | Kaynak           | Beklenen Dosya Yolu                                  | Bağlı Hizmet                     | Kullanım                   | Durum                   | Not                                          |
| ------------------------------------ | ---------------- | ---------------------------------------------------- | -------------------------------- | -------------------------- | ----------------------- | -------------------------------------------- |
| `provided-catalog-auto-accessory-01` | WhatsApp katalog | `/media/provided/catalog/auto-accessory-01.webp`     | `auto-accessories`               | Ürün/katalog vitrini       | Dışa aktarım bekleniyor | Stok/fiyat bilgisi yayınlanmayacak           |
| `provided-catalog-sound-product-01`  | WhatsApp katalog | `/media/provided/catalog/sound-product-01.webp`      | `car-audio-visual`               | Sound & Tech ürün vitrini  | Dışa aktarım bekleniyor | Pioneer/Forx/Cadence ürünleri ayrıştırılacak |
| `provided-catalog-ceramic-ppf-01`    | WhatsApp katalog | `/media/provided/catalog/protection-product-01.webp` | `ceramic-coating`, `ppf-coating` | Ürün/hizmet destek görseli | Dışa aktarım bekleniyor | Gerçek uygulama sonucu gibi sunulmayacak     |

## Hizmet Bazlı Medya İhtiyaçları

| Hizmet ID                | Hizmet                        | Kategori             | Beklenen Medya                                                                                                        | Önerilen Klasör                                      | Öncelik | Durum      |
| ------------------------ | ----------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------- | ---------- |
| `interior-exterior-wash` | İç Dış Yıkama                 | Detailing            | Yıkama alanı genel fotoğrafı; jant ve dış yüzey yakın planı; temiz kabin detay fotoğrafı                              | `public/media/real/services/interior-exterior-wash/` | Orta    | Bekleniyor |
| `ceramic-coating`        | Seramik Kaplama               | Koruma               | Kaporta yansıması yakın planı; uygulama sırasında yüzey fotoğrafı; su iticilik veya parlaklık demo videosu            | `public/media/real/services/ceramic-coating/`        | Yüksek  | Bekleniyor |
| `paint-correction`       | Pasta Cila                    | Detailing            | Kaput before/after yakın planı; ışık altında çizik kontrol görüntüsü; final parlaklık fotoğrafı                       | `public/media/real/services/paint-correction/`       | Yüksek  | Bekleniyor |
| `ppf-coating`            | PPF Folyo Kaplama             | Koruma               | Kaput veya tampon PPF uygulama fotoğrafı; film kenar detay yakın planı; teslim sonrası dış görünüm fotoğrafı          | `public/media/real/services/ppf-coating/`            | Yüksek  | Bekleniyor |
| `window-film`            | Cam Filmi                     | Koruma               | Öncesi/sonrası yan profil fotoğrafı; cam tonu yakın planı; dış mekanda araç genel görünümü                            | `public/media/real/services/window-film/`            | Orta    | Bekleniyor |
| `vehicle-wrap`           | Araç Kaplama                  | Koruma               | Renk/doku numune fotoğrafları; kaplama sırasında panel yakın planı; teslim sonrası 3 açı araç fotoğrafı               | `public/media/real/services/vehicle-wrap/`           | Yüksek  | Bekleniyor |
| `car-audio-visual`       | Oto Ses ve Görüntü Sistemleri | Sound & Tech         | Pioneer/Forx/Cadence ürün yakın planları; montaj öncesi/sonrası bagaj veya konsol fotoğrafı; kısa sistem demo videosu | `public/media/real/services/car-audio-visual/`       | Yüksek  | Bekleniyor |
| `auto-accessories`       | Oto Aksesuar                  | Sound & Tech         | WhatsApp katalog ürün görselleri; ürün yakın plan fotoğrafları; araç üzerinde kullanım fotoğrafları                   | `public/media/provided/catalog/`                     | Orta    | Bekleniyor |
| `headlight-design`       | Far Tasarımı                  | Design & Performance | Far açık/kapalı karşılaştırması; yakın plan ışık detayı; gece çekimi kısa video                                       | `public/media/real/services/headlight-design/`       | Yüksek  | Bekleniyor |
| `body-kit`               | Body Kit                      | Design & Performance | Ön/yan/arka açı body kit fotoğrafları; montaj öncesi/sonrası karşılaştırma; detay parça yakın planı                   | `public/media/real/services/body-kit/`               | Orta    | Bekleniyor |
| `varex-exhaust`          | Varex Egzoz                   | Design & Performance | Egzoz uç yakın planı; alt takım/montaj detay fotoğrafı; kısa ses demo videosu                                         | `public/media/real/services/varex-exhaust/`          | Orta    | Bekleniyor |

## P6.2 Çekim Briefleri

Mevcut durumda gerçek çekim olmadığı için aşağıdaki briefler üretim planıdır.
Katalog görselleri yalnızca destek/vitrin olarak kullanılacaktır.

| Öncelik | Brief                          | Kapsam                                                       | Kadraj                        | Dosya Hedefi                                       | İzin/Gizlilik                             |
| ------- | ------------------------------ | ------------------------------------------------------------ | ----------------------------- | -------------------------------------------------- | ----------------------------------------- |
| A1      | İşletme dış cephe ve giriş     | Dükkan cephesi, tabela, giriş alanı                          | `wide`, `vertical`            | `public/media/real/brand/`                         | Plaka/yüz varsa bulanıklaştırma veya izin |
| A2      | Uygulama alanı                 | İç mekan, çalışma alanı, ekipman düzeni                      | `wide`, `vertical`            | `public/media/real/brand/`                         | Müşteri aracı görünüyorsa izin            |
| A3      | Koruma/detailing proje seti    | Pasta cila, seramik, PPF gerçek proje akışı                  | `wide`, `macro`, `vertical`   | `public/media/real/projects/protection-detailing/` | Araç sahibi yayın izni zorunlu            |
| A4      | Sound & Tech ürün/montaj seti  | Ürün yakın planı, bagaj/konsol montajı, kısa sistem videosu  | `square`, `macro`, `vertical` | `public/media/real/projects/sound-tech/`           | Marka/ürün görselleri doğrulanmalı        |
| A5      | Design & Performance seti      | Far, body kit, egzoz, araç kaplama detayları                 | `wide`, `macro`, `vertical`   | `public/media/real/projects/design-performance/`   | Plaka ve konum kontrolü                   |
| B1      | WhatsApp katalog dışa aktarımı | Katalogdaki ürün fotoğraflarını web envanterine hazırlama    | `square`                      | `public/media/provided/catalog/`                   | İşletme kullanım izni doğrulansın         |
| B2      | Mikro detay bankası            | Jant, koltuk, konsol, boya, folyo, far, egzoz yakın planları | `macro`, `vertical`           | İlgili hizmet klasörü                              | Kişisel veri içermemeli                   |

## Üretim Önceliği

1. WhatsApp katalog ürün görselleri dışa aktarılır ve `provided/catalog` altında
   ürün/hizmet vitrini için sınıflandırılır.
2. Dükkan cephesi, tabela ve uygulama alanı çekilir. Bu görseller güven ve konum
   anlatımı için katalog görsellerinden daha kritiktir.
3. Koruma/detailing gerçek proje seti çekilir. Seramik, PPF ve pasta cila için
   before/after ihtiyacı en yüksek önceliktedir.
4. Sound & Tech gerçek ürün/montaj seti çekilir. Mevcut katalog görselleriyle
   birlikte kullanılabilir.
5. Far, body kit, araç kaplama ve egzoz gibi karakter odaklı işler için detay ve
   reveal çekimleri yapılır.

## P6.3 AI Hero Görsel Planı

Gerçek çekimler henüz olmadığı için ana sayfa hero atmosferi AI destekli konsept
görselle planlanacaktır. Bu görsel marka enerjisini taşır; gerçek müşteri aracı,
gerçek uygulama sonucu, before/after kanıtı veya işletmenin fiili projesi gibi
sunulmaz.

### Yaratıcı Yön

- Siyah veya koyu metalik spor otomobil.
- Karanlık premium stüdyo/garaj atmosferi.
- Elektrik moru ışık çizgileri, logo renkleriyle uyumlu neon yansıma.
- Kontrollü drift hissi: yoğun aksiyon değil, arka lastik çevresinde kontrollü
  duman ve hareket enerjisi.
- Farlardan gelen keskin ışık, kaporta üzerinde mor/gümüş yansıma.
- Arka planda ses sistemi/equalizer hissini çağrıştıran çok hafif soyut ışık
  ritmi.
- Plaka, gerçek marka logosu, tanınabilir otomobil modeli, insan yüzü veya gerçek
  işletme/proje iddiası bulunmaz.

### Marka Renkleri

| Renk      | Kullanım                          |
| --------- | --------------------------------- |
| `#050505` | Ana koyu zemin                    |
| `#17171D` | Stüdyo/garaj derinliği            |
| `#8B3DFF` | Ana neon mor ışık                 |
| `#B06CFF` | Far/duman kenarı glow             |
| `#F5F4F7` | Metalik gümüş yansıma ve kontrast |

### Kadraj Varyantları

| ID                                   | Dosya Yolu                                               | Kaynak | Tür     | Kadraj          | Kullanım                                              | Alt Metin                                                                 | Durum             | Not                                            |
| ------------------------------------ | -------------------------------------------------------- | ------ | ------- | --------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- | ----------------- | ---------------------------------------------- |
| `ai-hero-neon-car-smoke-wide-01`     | `/media/ai/hero/ai-hero-neon-car-smoke-wide-01.webp`     | `ai`   | `image` | 16:9 `wide`     | Ana sayfa desktop hero, Open Graph türevi için kaynak | `Mor neon ışık ve kontrollü duman atmosferinde temsili koyu otomobil`     | Üretim bekleniyor | Gerçek uygulama sonucu gibi sunulmayacak       |
| `ai-hero-neon-car-smoke-vertical-01` | `/media/ai/hero/ai-hero-neon-car-smoke-vertical-01.webp` | `ai`   | `image` | 9:16 `vertical` | Mobil hero, dikey sosyal önizleme                     | `Mor neon ışık ve duman atmosferinde temsili otomobil dikey kompozisyonu` | Üretim bekleniyor | Araç ön/arka dengesi mobil CTA'yı kapatmayacak |
| `ai-hero-neon-car-smoke-square-01`   | `/media/ai/social/ai-hero-neon-car-smoke-square-01.webp` | `ai`   | `image` | 1:1 `square`    | Sosyal paylaşım, kart/thumbnail                       | `RAIN SOUND için temsili neon otomobil atmosferi`                         | Üretim bekleniyor | Logo/metin sonradan UI katmanında eklenebilir  |
| `ai-hero-neon-car-smoke-poster-01`   | `/media/ai/hero/ai-hero-neon-car-smoke-poster-01.webp`   | `ai`   | `image` | 16:9 poster     | Reduced-motion ve video yokken statik poster          | `Temsili neon otomobil hero posteri`                                      | Üretim bekleniyor | Performans öncelikli fallback                  |

### Kompozisyon Kuralları

- Desktop varyantta araç sağ/orta bölgede konumlanır; sol tarafta H1, açıklama
  ve WhatsApp CTA için koyu negatif alan bırakılır.
- Mobil varyantta araç üst/orta alanda kalır; metin ve CTA alt bölümde
  okunabilir koyu alan üzerinde yer alır.
- Duman, CTA ve metin okunurluğunu bozmayacak yoğunlukta olmalıdır.
- Far ışığı veya mor glow metin kontrastını düşürmemelidir.
- Görsel dosyaları WebP/AVIF türevlerine optimize edilecek; orijinal üretim
  dosyası gerekiyorsa `source` notuyla arşivlenecektir.

### Prompt Brief

```text
Dark premium automotive studio, black metallic sports coupe, no visible brand
logo, no license plate, controlled rear tire smoke, subtle drift energy, purple
neon light streaks, silver reflections on glossy car body, sharp headlights,
cinematic detailing garage atmosphere, abstract audio equalizer glow in the far
background, high contrast, realistic but clearly conceptual, empty negative space
for Turkish headline and WhatsApp CTA, no people, no readable text.
```

Negatif yönlendirme:

```text
no real brand logo, no license plate, no readable text, no people, no crash, no
street racing, no unsafe public road, no before-after claim, no workshop logo
painted on the car
```

### Kullanım Sınırı

AI hero yalnızca atmosfer ve marka enerjisi için kullanılabilir. Hizmet detayında
gerçek sonuç, proje kanıtı, müşteri aracı veya before/after alanı olarak
kullanılamaz. Gerçek çekimler geldiğinde güven ve proje bölümlerinde öncelik
gerçek medyaya geçer.

## P6.4 Hero Katman Planı

P6.4 katmanları P6.3 ana AI hero kompozisyonunun üstünde veya yanında çalışacak
destek varlıklarıdır. Amaç, P8 animasyon fazında far açılışı, kontrollü duman ve
kaporta ışık taraması gibi mikro hareketleri güvenli performans bütçesiyle
uygulamaktır. Bu katmanlar gerçek uygulama sonucu, gerçek araç çekimi veya
before/after kanıtı gibi sunulmaz.

### Katman Envanteri

| ID                                     | Dosya Yolu                                            | Kaynak | Tür     | Kadraj     | Kullanım Amacı                                 | Reduced-motion Karşılığı                          | Durum             | Not                                          |
| -------------------------------------- | ----------------------------------------------------- | ------ | ------- | ---------- | ---------------------------------------------- | ------------------------------------------------- | ----------------- | -------------------------------------------- |
| `ai-hero-base-wide-01`                 | `/media/ai/hero/ai-hero-base-wide-01.webp`            | `ai`   | `image` | `wide`     | Desktop ana araç/stüdyo zemin katmanı          | Poster içinde birleştirilmiş statik görünüm       | Üretim bekleniyor | Metin için sol negatif alan korunacak        |
| `ai-hero-base-vertical-01`             | `/media/ai/hero/ai-hero-base-vertical-01.webp`        | `ai`   | `image` | `vertical` | Mobil ana araç/stüdyo zemin katmanı            | Mobil poster içinde birleştirilmiş statik görünüm | Üretim bekleniyor | CTA alanı kapanmayacak                       |
| `ai-hero-headlights-off-wide-01`       | `/media/ai/hero/ai-hero-headlights-off-wide-01.webp`  | `ai`   | `image` | `wide`     | Far açılışı öncesi düşük ışıklı başlangıç      | Kullanılmaz; poster tek kare gösterilir           | Üretim bekleniyor | Base ile hizalı olmalı                       |
| `ai-hero-headlights-on-wide-01`        | `/media/ai/hero/ai-hero-headlights-on-wide-01.webp`   | `ai`   | `image` | `wide`     | Far açılışı sonrası parlak vurgu               | Poster içinde statik açık far görünümü            | Üretim bekleniyor | Metin kontrastını düşürmeyecek               |
| `ai-hero-smoke-alpha-wide-01.webp`     | `/media/ai/hero/ai-hero-smoke-alpha-wide-01.webp`     | `ai`   | `image` | `wide`     | Arka lastik çevresinde kontrollü duman maskesi | Statik poster içinde düşük yoğunluklu duman       | Üretim bekleniyor | Şeffaf/alpha destekli veya koyu zemine uygun |
| `ai-hero-smoke-alpha-vertical-01.webp` | `/media/ai/hero/ai-hero-smoke-alpha-vertical-01.webp` | `ai`   | `image` | `vertical` | Mobilde düşük yoğunluklu duman katmanı         | Mobil poster içinde düşük yoğunluklu duman        | Üretim bekleniyor | Başlık/CTA üstüne taşmayacak                 |
| `ai-hero-light-sweep-wide-01.webp`     | `/media/ai/hero/ai-hero-light-sweep-wide-01.webp`     | `ai`   | `image` | `wide`     | Kaporta üzerinde mor/gümüş ışık taraması       | Kullanılmaz; poster statik kalır                  | Üretim bekleniyor | Tekrar eden animasyonda yormayacak           |
| `ai-hero-poster-wide-01`               | `/media/ai/hero/ai-hero-poster-wide-01.webp`          | `ai`   | `image` | `wide`     | Desktop LCP/poster/fallback görseli            | Varsayılan reduced-motion görseli                 | Üretim bekleniyor | En kritik performans varlığı                 |
| `ai-hero-poster-vertical-01`           | `/media/ai/hero/ai-hero-poster-vertical-01.webp`      | `ai`   | `image` | `vertical` | Mobil LCP/poster/fallback görseli              | Mobil reduced-motion görseli                      | Üretim bekleniyor | Küçük ekranda metin okunurluğu korunacak     |

### Katman Kullanım Amacı

- `base`: Araç ve stüdyo atmosferini taşır; metin ve CTA okunurluğu için negatif
  alan bırakır.
- `headlights-off/on`: Far açılışı illüzyonu için iki eş hizalı kare sağlar.
- `smoke-alpha`: Duman hissini kontrollü verir; aracı, logo alanını veya metni
  kapatmaz.
- `light-sweep`: Kaporta üzerinde kısa süreli mor/gümüş tarama efekti için
  kullanılır.
- `poster`: Hareket kapalıyken, düşük bağlantıda veya katmanlar yüklenmeden önce
  tek kare güvenli fallback olarak kullanılır.

### Performans Sınırları

- İlk yüklemede poster dışında ağır katmanlar zorunlu olmamalıdır.
- Desktop poster hedefi: mümkünse 220 KB altı WebP/AVIF.
- Mobil poster hedefi: mümkünse 160 KB altı WebP/AVIF.
- Duman ve ışık katmanları ayrı görsel olarak kullanılacaksa her biri mümkünse
  120 KB altında tutulmalıdır.
- Video katmanı P8/P10 kararına kadar zorunlu değildir; kullanılırsa sessiz,
  kısa, döngüye uygun ve poster fallback'li olmalıdır.
- `prefers-reduced-motion` aktifse far açılışı, duman hareketi ve ışık taraması
  çalışmaz; yalnızca poster gösterilir.
- Düşük bağlantı/veri tasarrufu senaryosunda mobil poster dışındaki katmanlar
  yüklenmeyebilir.

### Gerçek Sonuç Gibi Sunmama Kuralları

- Bu katmanlar hizmet detayında before/after, müşteri projesi veya uygulama
  sonucu olarak gösterilmez.
- Alt metinlerde "temsili", "AI destekli" veya "atmosfer" bağlamı korunur.
- Proje kartlarında güven kanıtı yerine kullanılmaz.
- Gerçek çekimler geldiğinde işletme, hizmet ve proje güven alanlarında AI
  katmanları geri plana alınır.
- Katmanlarda gerçek marka logosu, plaka, tanınabilir model işareti ve okunabilir
  metin bulunmaz.

## P6.5 Fotoğraf ve Video Optimizasyon Hedefleri

Bu bölüm, medya dosyaları üretilmeden veya katalogdan dışa aktarılmadan önce
kabul edilecek web formatlarını, responsive boyutları, kalite oranlarını ve
maksimum dosya ağırlıklarını belirler. Şu anda optimize edilecek gerçek kaynak
dosya bulunmadığı için bu adım bir üretim sözleşmesidir; dosyalar geldikçe bu
kurallara göre dönüştürülecek ve envantere işlenecektir.

### Format Stratejisi

| Medya türü      | Birincil çıktı  | Yedek çıktı | Kullanım notu                                                                 |
| --------------- | --------------- | ----------- | ----------------------------------------------------------------------------- |
| Fotoğraf/görsel | AVIF            | WebP        | Hero, galeri, hizmet kartı, katalog ve OG görsellerinde AVIF öncelikli olacak |
| Şeffaf katman   | WebP            | PNG         | Duman/ışık gibi alpha katmanlarında kalite ve tarayıcı desteğine göre seçilir |
| Kısa video      | WebM            | MP4         | Sessiz, loop uyumlu, poster destekli ve kullanıcı kontrolüne uygun olacak     |
| Sosyal önizleme | WebP            | PNG         | Open Graph için güvenli uyumluluk gerektiğinde WebP/PNG tercih edilecek       |
| Kaynak/orijinal | Orijinal format | Yok         | Web klasörüne konmaz; arşiv veya dış kaynak notu olarak takip edilir          |

JPEG yalnızca işletmeden gelen kaynak dosya veya geçici arşiv formatı olarak
kabul edilir. Web yayınına giren türevlerde AVIF/WebP hedeflenir.

### Responsive Boyut Merdiveni

| Kullanım alanı      | Kaynak hedefi       | Web çıktıları             | Kadraj          |
| ------------------- | ------------------- | ------------------------- | --------------- |
| Desktop hero/poster | 3840x2160           | 1920w, 1440w, 1080w, 768w | 16:9 `wide`     |
| Mobil hero/poster   | 1440x2560           | 1080w, 828w, 640w         | 9:16 `vertical` |
| Hizmet/proje kartı  | 1600x1000 veya üstü | 960w, 720w, 480w          | 8:5 / 4:3       |
| Galeri yatay        | 2400x1600           | 1600w, 1200w, 900w, 600w  | 3:2 / 16:9      |
| Katalog/ürün kare   | 1200x1200           | 800w, 600w, 400w          | 1:1 `square`    |
| Makro detay         | 1800x1200           | 1200w, 900w, 600w         | 3:2 / `macro`   |
| Open Graph          | 1200x630            | 1200w                     | 1.91:1          |
| Dikey kısa video    | 1080x1920           | 1080p ve gerekirse 720p   | 9:16            |
| Yatay kısa video    | 1920x1080           | 1080p ve gerekirse 720p   | 16:9            |

Kırpımlar otomatik merkeze göre yapılmayacak; araç, far, ürün veya CTA alanı
kapanıyorsa manuel kadraj üretilecektir.

### Kalite Oranları

| Çıktı türü        | Hedef kalite aralığı                        | Not                                                           |
| ----------------- | ------------------------------------------- | ------------------------------------------------------------- |
| AVIF hero/poster  | `q 45-60`                                   | Koyu alanlarda banding oluşursa kalite artırılır              |
| AVIF galeri/kart  | `q 50-65`                                   | Kaporta yansıması ve ürün detayında daha yüksek değer seçilir |
| AVIF thumbnail    | `q 40-55`                                   | Katalog ve küçük kartlarda dosya ağırlığı önceliklidir        |
| WebP hero/galeri  | `q 72-82`                                   | AVIF yedeği olarak görsel kalite korunur                      |
| WebP thumbnail    | `q 65-78`                                   | Ürün yazısı okunuyorsa sıkıştırma azaltılır                   |
| WebP alpha katman | `q 75-85`                                   | Duman/ışık kenarında sert bloklaşma olmamalıdır               |
| WebM kısa video   | VP9/AV1, yaklaşık `crf 32-38` veya eşdeğeri | Düşük bitrate, sessiz, kısa loop hedeflenir                   |
| MP4 kısa video    | H.264, yaklaşık `crf 24-30` veya eşdeğeri   | Safari/uyumluluk yedeği olarak tutulur                        |

Kalite değerleri mutlak kural değil, başlangıç noktasıdır. Son karar görüntüde
bozulma, dosya ağırlığı ve kullanım alanına göre verilir.

### Maksimum Dosya Ağırlıkları

| Kullanım alanı            | Hedef maksimum |
| ------------------------- | -------------- |
| Desktop hero poster       | 220 KB         |
| Mobil hero poster         | 160 KB         |
| Hero duman/ışık katmanı   | 120 KB         |
| Hizmet/proje kart görseli | 120 KB         |
| Katalog/ürün görseli      | 100 KB         |
| Galeri görseli            | 220 KB         |
| Before/after tek görsel   | 180 KB         |
| Open Graph görseli        | 250 KB         |
| Dikey kısa video          | 900 KB         |
| Yatay kısa video          | 1.2 MB         |
| Video poster görseli      | 120 KB         |

Bu limitler ilk yayın hedefidir. Görsel kalite açıkça düşüyorsa istisna
`MEDIA_INVENTORY.md` not alanında gerekçesiyle kaydedilir.

### Video Poster Kuralları

- Her video için aynı bağlamı taşıyan ayrı bir poster görseli üretilecektir.
- Poster dosyası video adıyla ilişkili olacak şekilde adlandırılır:
  `real-project-sound-tech-install-vertical-01-poster.webp`.
- Poster ilk boş/siyah kareden değil, içeriği temsil eden net bir kareden seçilir.
- Videoda otomatik ses bulunmaz; ses gerekiyorsa kullanıcı kontrollü başlatılır.
- Poster WebP/AVIF olarak optimize edilir ve video yüklenmeden önce gösterilebilir.
- Reduced-motion modunda video yerine poster gösterilir.

### Kaynak Dosya Saklama

- Orijinal kaynak dosyalar `public/` altına konmaz ve web yayınına doğrudan
  açılmaz.
- Repoya yalnızca optimize edilmiş web türevleri alınır.
- Kaynak dosyanın nerede tutulduğu, kimden geldiği ve kullanım izni envanter
  satırının `Not` alanında belirtilir.
- İşletmeden gelen WhatsApp katalog görselleri önce kaynak olarak dışa aktarılır,
  sonra `provided-catalog-*` adlandırmasıyla optimize edilmiş WebP/AVIF
  türevlerine çevrilir.
- AI üretimlerinde prompt, kaynak türü ve gerçek sonuç gibi sunmama notu envanter
  kaydında korunur.

### Optimizasyon İş Akışı

1. Kaynak dosyanın izni, gizlilik durumu ve kaynak türü kontrol edilir.
2. Dosya adı ASCII slug kuralına göre belirlenir.
3. Gerekli `wide`, `vertical`, `square` veya `macro` kırpımlar manuel seçilir.
4. Fotoğraflar AVIF ve WebP; videolar WebM ve MP4 olarak dışa aktarılır.
5. Poster, thumbnail ve Open Graph türevleri ayrı dosya olarak üretilir.
6. Dosya ağırlığı hedef tabloya göre kontrol edilir.
7. Alt metin, kullanım alanı, kaynak türü ve demo/AI/gerçek ayrımı envantere
   yazılır.

## P6.6 Hero Poster, Open Graph ve Reduced-motion Planı

Gerçek medya henüz olmadığı için ana sayfa hero posterleri ve sosyal paylaşım
görselleri AI destekli atmosfer varlıklarından üretilecek şekilde planlanır. Bu
varlıklar marka enerjisi ve ilk izlenim içindir; gerçek uygulama sonucu, müşteri
projesi, before/after kanıtı veya işletmenin fiili çekimi gibi sunulmaz.

### Planlanan Varlıklar

| ID                                 | Dosya yolu                                             | Ölçü      | Format           | Kullanım alanı                                       | Yükleme stratejisi                              | Durum             |
| ---------------------------------- | ------------------------------------------------------ | --------- | ---------------- | ---------------------------------------------------- | ----------------------------------------------- | ----------------- |
| `ai-hero-poster-wide-01`           | `/media/ai/hero/ai-hero-poster-wide-01.avif`           | 1920x1080 | AVIF, WebP       | Desktop ana sayfa hero LCP görseli                   | İlk ekranda `preload`/priority aday varlık      | Üretim bekleniyor |
| `ai-hero-poster-wide-01-1440`      | `/media/ai/hero/ai-hero-poster-wide-01-1440.avif`      | 1440x810  | AVIF, WebP       | Orta masaüstü ve dizüstü hero                        | `srcset` içinde viewport'a göre seçilir         | Üretim bekleniyor |
| `ai-hero-poster-wide-01-1080`      | `/media/ai/hero/ai-hero-poster-wide-01-1080.avif`      | 1080x608  | AVIF, WebP       | Tablet yatay ve düşük bant genişliği fallback        | `srcset` içinde lazy olmayan hero alternatifi   | Üretim bekleniyor |
| `ai-hero-poster-vertical-01`       | `/media/ai/hero/ai-hero-poster-vertical-01.avif`       | 1080x1920 | AVIF, WebP       | Mobil hero LCP görseli                               | Mobilde ilk ekranda priority aday varlık        | Üretim bekleniyor |
| `ai-hero-poster-vertical-01-828`   | `/media/ai/hero/ai-hero-poster-vertical-01-828.avif`   | 828x1472  | AVIF, WebP       | Modern mobil ekranlar                                | `srcset` içinde viewport'a göre seçilir         | Üretim bekleniyor |
| `ai-hero-poster-vertical-01-640`   | `/media/ai/hero/ai-hero-poster-vertical-01-640.avif`   | 640x1138  | AVIF, WebP       | Küçük mobil ve veri tasarrufu                        | `srcset` içinde düşük ağırlıklı fallback        | Üretim bekleniyor |
| `ai-og-home-01`                    | `/media/ai/social/ai-og-home-01.webp`                  | 1200x630  | WebP, PNG yedeği | Ana sayfa Open Graph ve sosyal paylaşım önizlemesi   | Metadata üzerinden kullanılır                   | Üretim bekleniyor |
| `ai-og-services-01`                | `/media/ai/social/ai-og-services-01.webp`              | 1200x630  | WebP, PNG yedeği | Hizmetler genel sosyal paylaşım önizlemesi           | Metadata üzerinden kullanılır                   | Üretim bekleniyor |
| `ai-og-projects-01`                | `/media/ai/social/ai-og-projects-01.webp`              | 1200x630  | WebP, PNG yedeği | Dönüşümler/projeler genel sosyal paylaşım önizlemesi | Metadata üzerinden kullanılır                   | Üretim bekleniyor |
| `ai-hero-reduced-motion-wide-01`   | `/media/ai/hero/ai-hero-reduced-motion-wide-01.avif`   | 1920x1080 | AVIF, WebP       | Hareket azaltma aktif desktop statik hero            | Animasyon katmanları yerine doğrudan gösterilir | Üretim bekleniyor |
| `ai-hero-reduced-motion-mobile-01` | `/media/ai/hero/ai-hero-reduced-motion-mobile-01.avif` | 1080x1920 | AVIF, WebP       | Hareket azaltma aktif mobil statik hero              | Animasyon katmanları yerine doğrudan gösterilir | Üretim bekleniyor |

### Kompozisyon ve Kullanım Kuralları

- Desktop posterlerde sol tarafta H1, açıklama ve CTA için koyu negatif alan
  korunur.
- Mobil posterlerde araç üst/orta bölgede kalır; başlık ve WhatsApp CTA alt
  güvenli alanda okunur.
- Open Graph görsellerinde okunabilir küçük metin kullanılmaz; sosyal kartta
  metin gerekiyorsa büyük, az ve kontrastlı tutulur.
- OG görsellerinde gerçek müşteri aracı, plaka, gerçek marka logosu veya
  doğrulanmamış proje iddiası bulunmaz.
- Reduced-motion posterleri hero sahnesinin en sakin ve okunabilir halini taşır;
  far yanıp sönmesi, duman hareketi veya ışık taraması içermez.
- AI kaynaklı oldukları için alt metin ve envanter notlarında `temsili` veya
  `AI destekli atmosfer` bağlamı korunur.

### Preload, Lazy ve Performans Stratejisi

- Ana sayfa ilk ekranında yalnızca seçilen hero poster varyantı yüksek öncelikli
  yüklenir.
- Desktop ve mobil posterlerin ikisi aynı anda zorunlu olarak yüklenmez; viewport
  ve `sizes`/`media` koşullarıyla doğru türev seçilir.
- Hero dışındaki OG ve sosyal görseller sayfa içinde görünür medya olmadığı için
  lazy yükleme zincirine eklenmez; metadata varlığı olarak referanslanır.
- Duman, far ve ışık hareket katmanları P8 animasyon fazına kadar ilk yükleme
  zorunluluğu taşımaz.
- Reduced-motion aktifse hareket katmanları istenmez; yalnızca ilgili statik
  poster gösterilir.
- Düşük bağlantı/veri tasarrufu senaryosunda mobil posterin 640w/828w türevi
  yeterli kabul edilir.

### Erişilebilirlik Notları

- Hero poster dekoratif arka plan olarak kullanılırsa `alt=""` ile sessiz
  bırakılır ve gerçek mesaj H1/metin/CTA içinde sunulur.
- Görsel içerik anlam taşıyan `<Image>` olarak kullanılırsa alt metin şu bağlamı
  korur: `Rain Sound için mor neon ışıklı temsili otomobil atmosferi`.
- OG görselinin metin içeriği sayfadaki metadata başlığı ve açıklamasının yerine
  geçmez.
- Reduced-motion deneyimi görsel olarak eksik veya bozuk görünmemeli; animasyon
  kapalıyken de hero mesajı, CTA ve iletişim aksiyonları tam erişilebilir kalır.
- Poster üzerinde metin okunurluğunu bozan far parlaması, duman yoğunluğu veya
  mor glow kabul edilmez.

## P6.7 Medya Doğrulama ve Yayın Kabul Matrisi

Bu bölüm, her medya varlığının yayın öncesinde kaynak türü, kullanım izni,
alternatif metin, mobil kırpım ve gerçek/demo/AI/provided ayrımı açısından nasıl
kontrol edileceğini tanımlar. Medya dosyası var diye yayınlanabilir kabul
edilmez; aşağıdaki kapılardan geçmelidir.

### Kaynak Türüne Göre Yayın Kapıları

| Kaynak     | Yayınlanabilir kullanım                                             | Yasak kullanım                                                       | Gerekli kontrol                                         |
| ---------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------- |
| `real`     | Gerçek hizmet, gerçek proje, işletme, uygulama alanı, before/after  | İzin veya gizlilik kontrolü yoksa tüm yayın alanları                 | Yayın izni, plaka/yüz/konum kontrolü, alt metin         |
| `provided` | İşletmenin verdiği logo, WhatsApp katalog ürünü, marka/ürün vitrini | Gerçek uygulama sonucu, müşteri projesi, before/after kanıtı         | İşletme kullanım onayı, stok/fiyat iddiası yok          |
| `ai`       | Hero atmosferi, OG, kampanya görseli, reduced-motion poster         | Gerçek proje, gerçek müşteri aracı, uygulama sonucu, before/after    | Temsili/AI bağlamı, gerçek marka/plaka yok              |
| `demo`     | Tasarım ve veri akışı testi, staging/geliştirme görünümü            | Production güven kanıtı, final proje galerisi, gerçek sonuç anlatımı | Production öncesi kaldırma veya izinli içerikle değişim |

### Alternatif Metin Kuralları

| Kullanım alanı            | Alt metin yaklaşımı                                           | Örnek                                                        |
| ------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Dekoratif hero arka planı | Boş alt metin veya CSS background; mesaj metinden verilir     | `alt=""`                                                     |
| AI hero/OG anlamlı görsel | Temsili ve atmosfer olduğu açık yazılır                       | `Rain Sound için mor neon ışıklı temsili otomobil atmosferi` |
| Gerçek hizmet fotoğrafı   | Hizmet, uygulama ve görünen sonuç kısa anlatılır              | `Seramik kaplama sonrası kaporta yansıması`                  |
| Gerçek proje fotoğrafı    | Araç kimliği ifşa edilmeden işlem ve bağlam anlatılır         | `Pasta cila sonrası parlak kaput yüzeyi`                     |
| Katalog/ürün görseli      | Ürün grubu ve kullanım bağlamı anlatılır; fiyat/stok yazılmaz | `Oto ses sistemi için hoparlör ve aksesuar ürünü`            |
| Before/after görseli      | Önce/sonra durumu açık etiketlenir                            | `Far tasarımı uygulaması öncesi sol far görünümü`            |
| Logo                      | Marka adı yazılır; dekoratif tekrarda boş bırakılır           | `Rain Sound logosu`                                          |

Alt metinlerde plaka, müşteri adı, telefon, adres detayı veya doğrulanmamış
performans iddiası yazılmaz. "En iyi", "garantili kusursuz", "kesin sonuç" gibi
kanıtlanamayan ifadeler kullanılmaz.

### Mobil Kırpım Doğrulaması

Her ana medya için mobil kırpım ayrı kontrol edilir. Desktop görseli otomatik
merkez kırpımıyla mobilde kullanılamaz.

| Kontrol                 | Kabul kriteri                                                       |
| ----------------------- | ------------------------------------------------------------------- |
| Hero negatif alan       | Başlık, açıklama ve WhatsApp CTA için koyu ve okunabilir alan kalır |
| Araç/ürün ana özne      | Mobilde ana özne kesilmez veya anlamsız parça görüntüsüne düşmez    |
| Plaka/yüz/kişisel bilgi | Mobil kırpımda yeni görünür hale gelmez                             |
| Duman/glow yoğunluğu    | Başlık, CTA ve navigasyon kontrastını bozmaz                        |
| Before/after hizası     | Mobilde iki görsel aynı açı ve ölçek hissini korur                  |
| Katalog ürünü           | Ürün okunabilir kalır; fiyat/stok ekran görüntüsü gibi sunulmaz     |
| Reduced-motion poster   | Animasyon olmadan da kompozisyon tamamlanmış ve sakin görünür       |

### Eksik İzin ve Kırpım Riskleri

| Risk ID                | Risk                                                     | Etki                                       | Önlem                                                      | Durum           |
| ---------------------- | -------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------- | --------------- |
| `risk-real-permission` | Gerçek müşteri aracı için açık yayın izni bulunmaması    | Hukuki/gizlilik riski                      | Yayın izni olmadan real proje medyası production'a alınmaz | Açık            |
| `risk-plate-privacy`   | Plaka, yüz veya konum bilgisinin kadrajda kalması        | Kişisel veri/gizlilik riski                | Bulanıklaştırma, kırpma veya alternatif medya seçimi       | Açık            |
| `risk-ai-misleading`   | AI hero'nun gerçek uygulama sonucu gibi algılanması      | Güven kaybı ve yanlış temsil               | Alt metin/notlarda temsili AI atmosfer bağlamı korunur     | Kontrol altında |
| `risk-provided-claim`  | WhatsApp katalog ürünlerinin stok/fiyat vaadi sanılması  | Yanlış ticari bilgi riski                  | Fiyat/stok yayınlanmaz; bilgi ve fiyat için WhatsApp CTA   | Kontrol altında |
| `risk-demo-production` | Demo proje medyasının production'da güven kanıtı kalması | Yanlış portfolyo ve güven problemi         | Demo audit ve yayın öncesi blocker kontrolü                | Açık            |
| `risk-mobile-crop`     | Mobil kırpımda CTA/özne/kişisel bilgi sorunları oluşması | Dönüşüm, erişilebilirlik ve gizlilik riski | Her ana görsel için `wide` ve `vertical` manuel kontrol    | Açık            |

### Yayın Öncesi Medya Kontrol Listesi

- [ ] Her medya satırında kaynak türü `real`, `provided`, `ai` veya `demo` olarak
      işaretli.
- [ ] Gerçek müşteri/proje medyasında yayın izni doğrulanmış.
- [ ] Plaka, yüz, konum ve kişisel bilgi kontrolü tamamlanmış.
- [ ] AI görsellerde temsili atmosfer bağlamı korunmuş.
- [ ] Provided katalog görselleri gerçek uygulama sonucu gibi kullanılmıyor.
- [ ] Demo medya production öncesi kaldırılmış veya izinli gerçek içerikle
      değiştirilmiş.
- [ ] Her anlamlı görsel için Türkçe, kısa ve doğru alternatif metin yazılmış.
- [ ] Dekoratif görseller ekran okuyucuya gereksiz tekrar oluşturmuyor.
- [ ] Desktop ve mobil kırpımlar ayrı ayrı kontrol edilmiş.
- [ ] AVIF/WebP ve WebM/MP4 optimizasyon hedefleri karşılanmış.

## Proje Bazlı Demo Eşleşmeleri

| Proje ID                            | Demo Proje                        | Bağlı Hizmetler                                                 | Mevcut Demo Medya                                                                                                                                                                                           | Production Hedefi                                                                  | Durum           |
| ----------------------------------- | --------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------- |
| `demo-protection-detailing-project` | Demo Koruma ve Detailing Projesi  | `paint-correction`, `ceramic-coating`, `ppf-coating`            | `/demo/projects/protection-cover.webp`, `/demo/projects/protection-reflection.webp`, `/demo/projects/protection-ppf-detail.webp`, `/demo/projects/protection-walkaround.webm`, before/after demo görselleri | Gerçek koruma/detailing projesi kapak, galeri, dikey video ve before/after seti    | Demo, değişecek |
| `demo-sound-tech-project`           | Demo Sound & Tech Projesi         | `car-audio-visual`, `auto-accessories`                          | `/demo/projects/sound-cover.webp`, `/demo/projects/sound-products.webp`, `/demo/projects/sound-install.webp`, `/demo/projects/sound-demo.webm`, before/after demo görselleri                                | Gerçek ses sistemi montajı, ürün yakın planları ve kısa sistem demo videosu        | Demo, değişecek |
| `demo-design-performance-project`   | Demo Design & Performance Projesi | `vehicle-wrap`, `headlight-design`, `body-kit`, `varex-exhaust` | `/demo/projects/design-cover.webp`, `/demo/projects/design-headlight.webp`, `/demo/projects/design-exhaust.webp`, `/demo/projects/design-reveal.webm`, before/after demo görselleri                         | Gerçek tasarım/performance projesi, far/egzoz/body kit detayları ve reveal videosu | Demo, değişecek |

## P7.1 Taslak Proje Normalizasyonu

Gerçek proje içeriği henüz olmadığı için mevcut üç proje kaydı production adayı
değil, tasarım ve veri akışı için kullanılan taslak demo kayıtlarıdır. Kod
tarafında bu durum `contentReadiness.productionCandidate: false`,
`contentReadiness.realProjectRequired: true`, `status: "draft"`,
`privacyReviewed: false` ve `publishPermissionConfirmed: false` alanlarıyla
taşınır.

| Proje ID                            | Production adayı | İzin durumu | Gerçek medya ihtiyacı                                                                                                             | Before/after ihtiyacı                                                                   | Medya kabul kapısı                                                                  |
| ----------------------------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `demo-protection-detailing-project` | Hayır            | Başlamadı   | Gerçek koruma/detailing kapak fotoğrafı, kaporta yansıması, PPF detay fotoğrafı, kısa dikey teslim/walkaround videosu             | Aynı araç/açı/ışıkta işlem öncesi ve sonrası boya/parlaklık veya koruma karşılaştırması | Yayın izni, plaka/yüz/konum kontrolü, demo medya değişimi, mobil kırpım doğrulaması |
| `demo-sound-tech-project`           | Hayır            | Başlamadı   | Gerçek ses sistemi/multimedya kapak fotoğrafı, ürün yakın planı, montaj öncesi/sonrası bagaj veya konsol görseli, kısa demo video | Montaj öncesi ve sonrası aynı bölgeyi gösteren araç içi veya bagaj karşılaştırması      | Ürün/marka izin kontrolü, fiyat/stok iddiası olmaması, demo medya değişimi          |
| `demo-design-performance-project`   | Hayır            | Başlamadı   | Gerçek design/performance kapak fotoğrafı, far açık/kapalı detay, body kit/kaplama dış görünüm, egzoz veya reveal videosu         | Ön görünüm, far, body kit veya kaplama değişimini aynı açıyla gösteren karşılaştırma    | Yayın izni, plaka/konum kontrolü, demo medya değişimi, mobil kırpım doğrulaması     |

### P7.1 Kabul Kararı

- Demo projeler gerçek müşteri projesi, gerçek uygulama sonucu veya portfolyo
  kanıtı olarak sunulmaz.
- Gerçek proje geldiğinde `contentReadiness.productionCandidate` ancak yayın
  izni, gizlilik kontrolü, gerçek medya, alt metin, before/after ve mobil kırpım
  kapıları tamamlanınca `true` yapılabilir.
- Demo medya `demo` kaynak türünü korur ve production öncesi gerçek/izinli medya
  ile değişmeden güven kanıtı olarak kullanılamaz.
- WhatsApp katalog veya provided ürün görselleri bir projeyi gerçek proje haline
  getirmez; yalnızca ürün/vitrin desteği olabilir.

## P7.2 Responsive Proje Galerisi ve Görüntüleyici

Proje detay sayfasındaki medya alanı, gerçek dosyalar gelmeden önce demo medya
envanterini okunabilir şekilde gösterecek responsive bir galeri kabuğuna
taşındı. Bu aşama gerçek görsel görüntüleme modali değil; kaynak, izin, demo ve
dosya bilgilerini koruyan erişilebilir proje medya görüntüleyici temelidir.

### Galeri Davranışı

- Kapak medyası galeride öne çıkan kart olarak tam genişlikte gösterilir.
- Desktop genişliğinde öne çıkan medya kartı preview ve metadata bölümlerine
  ayrılır.
- Mobilde tüm medya kartları tek kolon, dokunma hedefleri ve okunabilir metin
  aralıklarıyla gösterilir.
- Video varlıklarında poster yolu ayrıca görünür.
- Görsel/video ölçüsü biliniyorsa kart üzerinde gösterilir; bilinmiyorsa ölçü
  bekleniyor mesajı kullanılır.
- Kartlar gerçek dosya varmış gibi iddia kurmaz; demo ve production öncesi
  değişim notları görünür kalır.

### Korunan Kabul Bilgileri

- Kaynak türü: `real`, `provided`, `ai` veya `demo`.
- Kullanım izni ve gizlilik durumu.
- Production öncesi değişim gereksinimi.
- Dosya yolu ve varsa poster yolu.
- Alternatif metin bağlamı.
- Demo notu ve gerçek medya gereksinimi.

### Sonraki Adım Notu

P7.3 aşamasında before/after alanı, bu galeri kabuğundan ayrılarak klavye,
pointer ve dokunma uyumlu karşılaştırma deneyimine dönüştürülecektir.

## P7.3 Before/After Karşılaştırma Bileşeni

Proje detay sayfasındaki before/after alanı, demo medya verisini kullanan
erişilebilir bir karşılaştırma bileşenine taşındı. Bu bileşen gerçek uygulama
sonucu iddiası kurmaz; mevcut demo kayıtların kaynak, izin, gizlilik, dosya,
ölçü ve production öncesi değişim bilgilerini korur.

### Etkileşim Kararı

- Karşılaştırma çizgisi `input type="range"` ile kontrol edilir.
- Klavye kullanıcıları ok tuşları, Home/End ve tarayıcı varsayılan range
  davranışlarıyla kontrolü kullanabilir.
- Pointer ve dokunmatik cihazlarda sürükleme davranışı range kontrolü üzerinden
  sağlanır.
- Görsel sahne içinde dekoratif bir ayırıcı çizgi bulunur; erişilebilir kontrol
  range input üzerindedir.
- `aria-valuetext` ile sonrası görselinin yüzde kaç açıldığı okunabilir hale
  getirilir.

### Korunan Medya Bilgileri

- Öncesi ve sonrası medya için kaynak türü görünür.
- Kullanım izni ve gizlilik durumu ayrı tutulur.
- Demo medya production öncesi değişecek uyarısını taşır.
- Dosya yolu, ölçü ve alternatif metin bağlamı korunur.
- Gerçek medya geldiğinde aynı bileşen real kaynak, izin ve mobil kırpım
  kapılarıyla kullanılabilir.

### Responsive Davranış

- Mobilde karşılaştırma tek kolon ve yüksek dokunma hedefiyle gösterilir.
- Desktopta before/after metadata kartları iki kolona ayrılır.
- Sahne yüksekliği viewport'a göre ölçeklenir; başlık ve CTA alanlarını
  kapatmaz.
- Before/after çiftleri gerçek medya geldiğinde aynı açı, aynı ölçek ve mobil
  kırpım kontrolü tamamlanmadan production'a alınmaz.

## P7.4 Kullanıcı Kontrollü Video Modalı

Proje detay sayfasındaki demo video varlıkları, otomatik ses veya otomatik oynatma
başlatmayan kullanıcı kontrollü video modalına bağlandı. Video kartları poster,
kaynak, izin, demo ve production öncesi değişim bilgisini korur.

### Etkileşim ve Erişilebilirlik Kararı

- Video hiçbir durumda otomatik başlamaz; `autoplay` kullanılmaz.
- Video yalnızca kullanıcı `Videoyu Aç` düğmesine bastığında modal içinde
  yüklenir.
- Video elementi `controls`, `playsInline` ve `preload="metadata"` kullanır.
- Kullanıcı ses başlatmadıkça otomatik ses oynatılmaz.
- Modal açıldığında odak görünür `Kapat` düğmesine taşınır.
- Escape tuşu modalı kapatır ve odak açan elemana geri döner.
- Tab ve Shift+Tab modal içindeki odaklanabilir öğeler arasında döner.
- Modal açıkken sayfa arka planı kaydırılmaz.
- Backdrop tıklaması modalı kapatır; backdrop Tab sırasına alınmaz.

### Korunan Video Bilgileri

- Video dosya yolu.
- Poster dosya yolu.
- Kaynak türü.
- Kullanım/gizlilik durumu.
- Demo ve production öncesi değişim uyarısı.
- Görsel/video ölçüsü.

### Production Notu

Gerçek proje videoları geldiğinde aynı modal kullanılabilir; ancak video dosyası,
poster, yayın izni, gizlilik kontrolü, otomatik ses başlamama kuralı ve mobil
performans bütçesi tamamlanmadan production'a alınmaz.

## P7.5 Proje, Hizmet ve WhatsApp Bağlamı

Proje detay sayfası, `serviceIds` üzerinden bağlı hizmetleri ve proje bağlamlı
WhatsApp mesajını daha açık gösterecek şekilde güçlendirildi. Amaç, ziyaretçinin
demo proje akışından ilgili hizmet detayına veya doğru WhatsApp mesajına net
geçebilmesidir.

### Bağlantı Kuralları

- Projeler bağlı hizmetlerini `project.serviceIds` üzerinden alır.
- Proje WhatsApp mesajı proje adını, bağlı hizmetleri ve hizmetlerin
  `ctaContext.messageHint` içeriklerini taşır.
- Her bağlı hizmet kartında hizmet detay linki ve hizmete özel WhatsApp CTA'sı
  birlikte gösterilir.
- Benzer hizmet önerileri, bağlı hizmetlerin `relatedServiceIds` alanlarından
  türetilir.
- Demo proje olduğu için CTA dili "benzer uygulama" bağlamında kalır; gerçek
  proje sonucu iddiası kurulmaz.

### Production Notu

Gerçek proje geldiğinde hizmet ilişkileri yeniden kontrol edilir. Yanlış bağlı
hizmet veya eksik WhatsApp bağlamı, yayın öncesi içerik kabul kapısında blocker
sayılır.

## P7.6 Proje Gizlilik, İzin ve Performans Kapıları

P7.6 ile proje kayıtları production öncesi gizlilik, izin ve performans
kontrollerini veri seviyesinde taşır. Mevcut demo projeler production adayı
değildir; her biri gerçek proje medyası, yayın izni, plaka/kişisel bilgi kontrolü
ve performans doğrulaması gelene kadar blocker durumundadır.

### Veri Seviyesi Kontroller

`Project.contentReadiness` içine şu alanlar eklendi:

- `productionBlockers`
- `privacyChecklist`
- `permissionChecklist`
- `performanceChecklist`

Bu alanlar proje detayında görünür; ayrıca demo audit raporunda
`project-readiness` blocker kayıtları olarak production öncesi yakalanır.

### Production Blocker Kuralları

- Gerçek proje medyası yoksa proje production adayı olamaz.
- Araç sahibi yayın izni doğrulanmadan gerçek müşteri aracı yayınlanamaz.
- Plaka, yüz, konum veya kişisel bilgi kontrolü tamamlanmadan medya yayına
  alınamaz.
- Demo medya gerçek portfolyo kanıtı olarak kullanılamaz.
- Görsel/video performans bütçesi gerçek dosyalarla doğrulanmadan proje yayına
  alınamaz.

### Gerçek Proje Geldiğinde Kontrol

1. Medya kaynağı `real` olarak envantere işlenir.
2. Yayın izni ve gizlilik kontrolü tamamlanır.
3. Plaka/yüz/konum varsa bulanıklaştırma, kırpma veya açık izin uygulanır.
4. Kapak, galeri, video ve before/after dosyaları P6.5 dosya ağırlığı hedefleriyle
   optimize edilir.
5. Mobil kırpım ve alternatif metin kontrol edilir.
6. Demo medya kaldırılır veya gerçek/izinli medya ile değiştirilir.
7. `productionCandidate` ancak tüm kapılar geçildikten sonra `true` yapılır.

## Kabul Kuralları

- Gerçek müşteri aracı görselinde plaka, yüz, konum veya kişisel bilgi varsa
  gizlilik kontrolü yapılmadan yayınlanmaz.
- AI görseller gerçek uygulama sonucu, before/after kanıtı veya müşteri projesi
  gibi sunulmaz.
- Demo medya production öncesi ya kaldırılır ya da gerçek/izinli medya ile
  değiştirilir.
- Web kullanımı için fotoğraflar AVIF/WebP, videolar WebM/MP4 olarak optimize
  edilir.
- Her medya kaydında anlamlı alternatif metin bulunur.
