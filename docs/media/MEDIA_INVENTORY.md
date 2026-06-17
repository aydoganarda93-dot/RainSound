# Rain Sound Medya Envanteri

> **Amaç:** Gerçek, AI, demo ve işletme tarafından sağlanan medya dosyalarını
> hizmet/proje bazında sınıflandırmak.
> **Durum:** P6.1 başlangıç envanteri.
> **Son güncelleme:** 17 Haziran 2026.

Bu dosya gerçek görseller gelmeden önce arşiv disiplinini kurar. Bir dosya web
sitesinde kullanılmadan önce burada hangi hizmete/projeye ait olduğu, kaynağı,
izin durumu, gizlilik durumu ve kullanım yeri netleşmelidir.

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

## Medya Envanter Şablonu

Yeni dosya geldiğinde aşağıdaki tabloya satır olarak eklenir.

| ID         | Dosya Yolu                        | Kaynak | Tür     | Kullanım       | Bağlı Hizmet/Proje | Alt Metin                                   | İzin       | Gizlilik   | Durum      | Not                                 |
| ---------- | --------------------------------- | ------ | ------- | -------------- | ------------------ | ------------------------------------------- | ---------- | ---------- | ---------- | ----------------------------------- |
| `ornek-id` | `/media/real/services/ornek.webp` | `real` | `image` | `service-card` | `seramik-kaplama`  | `Seramik kaplama sonrası kaporta yansıması` | Bekleniyor | Bekleniyor | Bekleniyor | Production öncesi optimize edilecek |

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

## Proje Bazlı Demo Eşleşmeleri

| Proje ID                            | Demo Proje                        | Bağlı Hizmetler                                                 | Mevcut Demo Medya                                                                                                                                                                                           | Production Hedefi                                                                  | Durum           |
| ----------------------------------- | --------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------- |
| `demo-protection-detailing-project` | Demo Koruma ve Detailing Projesi  | `paint-correction`, `ceramic-coating`, `ppf-coating`            | `/demo/projects/protection-cover.webp`, `/demo/projects/protection-reflection.webp`, `/demo/projects/protection-ppf-detail.webp`, `/demo/projects/protection-walkaround.webm`, before/after demo görselleri | Gerçek koruma/detailing projesi kapak, galeri, dikey video ve before/after seti    | Demo, değişecek |
| `demo-sound-tech-project`           | Demo Sound & Tech Projesi         | `car-audio-visual`, `auto-accessories`                          | `/demo/projects/sound-cover.webp`, `/demo/projects/sound-products.webp`, `/demo/projects/sound-install.webp`, `/demo/projects/sound-demo.webm`, before/after demo görselleri                                | Gerçek ses sistemi montajı, ürün yakın planları ve kısa sistem demo videosu        | Demo, değişecek |
| `demo-design-performance-project`   | Demo Design & Performance Projesi | `vehicle-wrap`, `headlight-design`, `body-kit`, `varex-exhaust` | `/demo/projects/design-cover.webp`, `/demo/projects/design-headlight.webp`, `/demo/projects/design-exhaust.webp`, `/demo/projects/design-reveal.webm`, before/after demo görselleri                         | Gerçek tasarım/performance projesi, far/egzoz/body kit detayları ve reveal videosu | Demo, değişecek |

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
