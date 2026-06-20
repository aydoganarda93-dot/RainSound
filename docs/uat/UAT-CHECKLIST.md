# Rain Sound UAT Checklist

> Durum: Kontrol Bekliyor - isletme onayi gerekli
> Hazirlayan: Codex
> Tarih: 20 Haziran 2026

## Test Ortami

| Alan              | Deger                                                       |
| ----------------- | ----------------------------------------------------------- |
| Teknik URL        | https://rain-sound.vercel.app                               |
| Custom domain     | Bekleniyor                                                  |
| Vercel proje      | `rain-sound`                                                |
| Production branch | `main`                                                      |
| Preview erisimi   | Pull request preview ortamlari Vercel SSO korumali olabilir |
| Kalite kapisi     | `corepack pnpm quality`                                     |

## Teknik URL Kontrolu - 20 Haziran 2026

| URL                                                                    | Beklenen                           | Sonuc    | Karar            |
| ---------------------------------------------------------------------- | ---------------------------------- | -------- | ---------------- |
| `https://rain-sound.vercel.app/`                                       | Ana sayfa acilir                   | `200 OK` | Onaylandi        |
| `https://rain-sound.vercel.app/iletisim`                               | Iletisim sayfasi acilir            | `200 OK` | Onaylandi        |
| `https://rain-sound.vercel.app/projeler/demo-koruma-detailing-projesi` | Archived demo slug public olmamali | `200 OK` | Duzeltme gerekli |

Not: Teknik URL erisilebilir, ancak mevcut Vercel deploy'u repo durumundan eski
gorunuyor. P12.1 karari geregi archived demo proje slug'i 404 olmalidir. Isletme
UAT'sine gecmeden once guncel commit/deploy preview uzerinden tekrar kontrol
gereklidir.

## Durum Secenekleri

- `Onaylandi`
- `Duzeltme gerekli`
- `Bekleniyor`

## Genel Kabul Kurallari

| Kontrol       | Beklenen                                                                               | Nasil test edilir                                  | Durum      | Not                                                |
| ------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------- | -------------------------------------------------- |
| Site aciliyor | Ana sayfa teknik URL uzerinden yuklenir                                                | URL'yi tarayicida ac                               | Bekleniyor | Isletme sahibi kontrol edecek                      |
| Mobil gorunum | Metinler tasmaz, CTA'lar tiklanabilir                                                  | Telefon veya dar tarayici ile bak                  | Bekleniyor | P12.4 detayli gorsel QA'da tekrar kontrol edilecek |
| Navigasyon    | Ana sayfa, hizmetler, galeri, hakkimizda, iletisim, gizlilik ve cerez sayfalari acilir | Header/footer linklerini tikla                     | Bekleniyor |                                                    |
| WhatsApp CTA  | WhatsApp uygulamasi veya web mesaji acilir                                             | Ana sayfa ve header CTA'larini tikla               | Bekleniyor | Numara: +90 553 930 45 75                          |
| Telefon linki | Telefon arama linki acilir                                                             | Mobil veya destekleyen cihazda `Ara` linkini tikla | Bekleniyor | Numara: 0553 930 45 75                             |
| Yol tarifi    | Google Maps isletme kaydi acilir                                                       | Yol Tarifi linkini tikla                           | Bekleniyor |                                                    |
| Instagram     | `@rainsound2634` profili acilir                                                        | Iletisim sayfasindaki Instagram kartini tikla      | Bekleniyor |                                                    |

## Sayfa Kontrolleri

| Sayfa                                      | Beklenen                                                                         | Nasil test edilir                                                  | Durum      | Not                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------- | -------------------------------------------- |
| `/` Ana sayfa                              | RAIN SOUND adi, dogrulanmis konum, hizmet dunyalari ve WhatsApp CTA gorunur      | Ana sayfayi ac, hero ve CTA'lari kontrol et                        | Bekleniyor | Ana tasarim korunacak                        |
| `/hizmetler`                               | 4 hizmet alani ve 11 hizmet listelenir                                           | Hizmetler sayfasini ac, kategori sayisini ve hizmetleri kontrol et | Bekleniyor | Fiyat listesi olmamali                       |
| `/hizmetler/ic-dis-yikama`                 | Sure/fiyat/kosul dili arac ve kapsama bagli kalir                                | Hizmet detayini ac                                                 | Bekleniyor | Kesin sure verilmez                          |
| `/hizmetler/seramik-kaplama`               | Genel garanti vaadi yoktur, bilgi WhatsApp'a yonlenir                            | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/pasta-cila`                    | Kalici cizik giderme vaadi yoktur                                                | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/ppf-kaplama`                   | PPF kapsami arac/parca bazli anlatilir                                           | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/cam-filmi`                     | Yasal uygunluk kesin vaadi kurulmaz                                              | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/arac-kaplama`                  | Urun/kosul dili WhatsApp'ta netlesir                                             | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/oto-ses-ve-goruntu-sistemleri` | Marka/bayilik iddiasi yoktur                                                     | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/oto-aksesuar`                  | Stok/fiyat iddiasi yoktur                                                        | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/far-tasarimi`                  | Uygulanabilirlik kapsam netlesince paylasilir                                    | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/body-kit`                      | Parca/montaj kosullari urun tipine bagli anlatilir                               | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/hizmetler/varex-egzoz`                   | Yasal/teknik kesin uygunluk vaadi yoktur                                         | Hizmet detayini ac                                                 | Bekleniyor |                                              |
| `/projeler`                                | Gercek proje gelene kadar kategori vitrini gorunur; demo portfolyo kaniti yoktur | Galeri sayfasini ac                                                | Bekleniyor | Demo projeler archived                       |
| `/projeler/demo-koruma-detailing-projesi`  | Public detay sayfasi acilmaz, 404 gorunur                                        | Eski demo slug'i ac                                                | Bekleniyor | P12.1/P12.2 karari                           |
| `/hakkimizda`                              | Fiyat, kapsam ve guven dili dogrulanmis sinirlarda kalir                         | Sayfayi ac                                                         | Bekleniyor |                                              |
| `/iletisim`                                | Adres, saatler, telefon, WhatsApp, Maps ve Instagram tutarli                     | Iletisim sayfasini ac                                              | Bekleniyor | Ozel gun saatleri degisebilir notu gorunmeli |
| `/gizlilik`                                | Medya, demo/AI ayrimi ve analitik bilgisi yaniltici degil                        | Gizlilik sayfasini ac                                              | Bekleniyor | P12.5'te hukuki kontrol tekrar yapilacak     |
| `/cerezler`                                | Vercel Analytics ve Speed Insights bilgisi guncel                                | Cerez sayfasini ac                                                 | Bekleniyor |                                              |
| Footer                                     | Adres, telefon, yol tarifi, gizlilik/cerez linkleri calisir                      | Footer linklerini tikla                                            | Bekleniyor |                                              |

## Iletisim Dogrulama

| Alan        | Beklenen                                                          | Durum      | Not                                           |
| ----------- | ----------------------------------------------------------------- | ---------- | --------------------------------------------- |
| Isletme adi | RAIN SOUND                                                        | Bekleniyor | P0 dogrulandi; isletme son kez kontrol edecek |
| Telefon     | 0553 930 45 75                                                    | Bekleniyor |                                               |
| WhatsApp    | +90 553 930 45 75                                                 | Bekleniyor |                                               |
| Adres       | Ihlamurkent, Yasar Kemal Cd. No:8 D:C, 26050 Odunpazari/Eskisehir | Bekleniyor |                                               |
| Saatler     | Pazartesi-Cumartesi 09:00-20:00; Pazar kapali                     | Bekleniyor | Ozel gunler degisebilir                       |
| Instagram   | @rainsound2634                                                    | Bekleniyor |                                               |
| Google Maps | RAIN SOUND isletme kaydi                                          | Bekleniyor |                                               |

## Icerik Kabul Kontrolleri

| Kontrol              | Beklenen                                  | Durum      | Not                                          |
| -------------------- | ----------------------------------------- | ---------- | -------------------------------------------- |
| Fiyat                | Sitede fiyat listesi veya kampanya yok    | Bekleniyor | WhatsApp'a yonlenir                          |
| Sure                 | Kesin sure vaadi yok                      | Bekleniyor | Arac, urun ve kapsama gore degisir           |
| Garanti              | Genel veya hizmet bazli garanti vaadi yok | Bekleniyor | Kosullar WhatsApp'ta netlesir                |
| Marka                | Bayilik/marka logo iddiasi yok            | Bekleniyor | Dogrulanmis proje gelirse yeniden ele alinir |
| Demo proje           | Public portfolyo kaniti olarak gorunmez   | Bekleniyor | Archived demo slug 404                       |
| AI/placeholder medya | Gercek musteri isi gibi sunulmaz          | Bekleniyor | Gercek cekimler Bekleniyor                   |

## Bekleniyor Listesi

| Alan                         | Durum      | Not                                                           |
| ---------------------------- | ---------- | ------------------------------------------------------------- |
| Custom domain                | Bekleniyor | Simdilik Vercel teknik URL kullanilir                         |
| E-posta                      | Bekleniyor | Paylasilirsa siteye eklenebilir                               |
| Vergisel/resmi bilgiler      | Bekleniyor | Yasal metin gereksinimine gore degerlendirilecek              |
| Gercek proje fotograflari    | Bekleniyor | Yayin izni ve gizlilik kontrolu gerekli                       |
| Musteri yorumlari            | Bekleniyor | Kaynak ve izin gerekli                                        |
| Ekip bilgisi                 | Bekleniyor | Isim/rol gosterilip gosterilmeyecegi karari gerekli           |
| Gercek hero/hizmet fotografi | Bekleniyor | P10 performans stratejisi korunarak eklenecek                 |
| Isletme UAT onayi            | Bekleniyor | Bu dosyadaki maddeler isletme sahibi tarafindan isaretlenecek |

## Onay Alani

| Yetkili    | Tarih      | Genel karar | Not                       |
| ---------- | ---------- | ----------- | ------------------------- |
| Bekleniyor | Bekleniyor | Bekleniyor  | Isletme sahibi dolduracak |
