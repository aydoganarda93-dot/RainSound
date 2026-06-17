# Rain Sound Motion System

> **Durum:** P8.1 altyapı notu
> **Amaç:** Sinematik hero ve mikro etkileşimler eklenmeden önce güvenli motion
> kurallarını tek yerde toplamak.

## Temel İlkeler

- Animasyonlar içerik erişimini, kaydırmayı, CTA görünürlüğünü veya klavye
  kullanımını engellememelidir.
- Otomatik ses başlatılmayacaktır.
- `prefers-reduced-motion`, veri tasarrufu ve çok yavaş bağlantı sinyalleri
  zengin hareketi kapatmak için yeterli sebeptir.
- Hero dumanı, far açılışı ve ışık taraması gibi büyük sahneler GSAP ile
  yönetilecektir.
- Kart, modal ve küçük arayüz geçişleri gerektiğinde `motion` paketiyle
  yapılacaktır.

## P8.1 Altyapı Kararı

- `src/lib/motion.ts` ortak motion sabitlerini ve GSAP cleanup yardımcılarını
  taşır.
- `src/hooks/use-gsap.ts` `@gsap/react` eklentisini istemci tarafında kaydeder ve
  `useGSAP` kullanımını merkezi hale getirir.
- `src/hooks/use-motion-preferences.ts` güvenli mount, reduced-motion, Save-Data
  ve düşük bağlantı durumlarını tek hook ile raporlar.
- Bu adımda görsel animasyon, timeline veya scroll sahnesi eklenmemiştir.

## P8.2 Hero Media Kabuğu

- `src/content/hero-media.ts` hero sahnesini veri seviyesinde tanımlar.
- `HeroMediaShell` gerçek görsel dosyası istemeden araç, far, duman ve ışık
  katmanlarını kırılmayan CSS placeholder ile gösterir.
- Far kapalı ve far açık katmanları aynı sahne içinde üst üste tutulur; P8.3/P8.4
  aşamalarında opacity/timeline kararları bu katmanlar üzerinden verilecektir.
- Reduced-motion veya düşük bağlantı durumunda bu kabuk statik poster/placeholder
  deneyimi olarak kalır.
- AI/demo/placeholder varlıkları gerçek müşteri aracı veya gerçek uygulama sonucu
  gibi sunulmaz.

## P8.3 Kontrollü GSAP Hareketi

- İlk hareket yalnızca duman ve kaporta ışık taraması katmanlarına uygulanır.
- `HeroMediaShell` içindeki `useGSAP` çağrısı shell ref'i ile scope edilir.
- `useMotionPreferences().canUseRichMotion` false ise timeline kurulmaz.
- Timeline dependency değişiminde ve unmount sırasında `killGsapInstances` ile
  temizlenir.
- Fallback modunda GSAP inline transform/will-change değerleri temizlenir ve CSS
  statik sahne korunur.
- Animasyon stage'i `aria-hidden` kalır; CTA ve metin akışı animasyon tarafından
  engellenmez.

## P8.4 Hero Intro Zaman Çizelgesi

- `HeroIntro` hero başlığı, destek metni ve CTA grubunu client tarafında yönetir.
- İçerik ve bağlantılar HTML çıktısında normal akışta kalır; animasyon sadece mount
  sonrası görsel giriş hissidir.
- `useMotionPreferences().canUseRichMotion` false ise intro timeline kurulmaz.
- CTA grubunun `href`, focus davranışı, klavye sırası ve tıklanabilirliği
  değiştirilmez.
- Timeline tek seferliktir; loop veya scroll tetikleyici kullanılmaz.
- Tamamlanınca `transform` ve `willChange` temizlenir.

## P8.5 Ana Sayfa Mikro Hareketleri

- `HomeMotionShell` ana sayfanın bölüm reveal, kart reveal ve equalizer hareketini
  tek scope içinde yönetir.
- `[data-home-reveal]` ve `[data-home-card]` hedefleri IntersectionObserver ile
  görünür alana girdiklerinde kısa `autoAlpha`/`y` hareketi alır.
- Rain Sound equalizer dekoratiftir, `aria-hidden` kalır ve otomatik ses
  başlatmaz.
- Reduced-motion, Save-Data veya düşük bağlantıda observer/timeline kurulmaz;
  tüm içerik statik ve görünür kalır.
- Kartların ve CTA'ların `href`, focus, pointer ve klavye davranışları
  değiştirilmez.
- Cleanup sırasında observer kapatılır, tween/timeline instance'ları
  `killGsapInstances` ile sonlandırılır.

## P8.6 Statik Fallback Doğrulaması

- `useMotionPreferences` `motionMode` ve `motionModeLabel` döndürür.
- Statik mod nedenleri `not-mounted`, `reduced-motion`, `save-data` ve
  `slow-connection` olarak ayrıştırılır.
- Fallback temizliği `opacity`, `visibility`, `transform` ve `willChange`
  değerlerini kapsamalıdır.
- `HeroIntro`, `HeroMediaShell` ve `HomeMotionShell` `data-motion-mode` taşır.
- Ekran okuyucu tarafında hareket modu yardımcı metinle anlaşılır, görsel arayüz
  kalabalıklaştırılmaz.
- Statik modda tüm CTA bağlantıları, hizmet/proje kartları, iletişim alanları ve
  SSS içeriği normal akışta görünür kalır.

## P8.7 Mobil ve Düşük Donanım Modu

- `useMotionPreferences` küçük ekran, coarse pointer, düşük bellek ve düşük CPU
  sinyallerini okur.
- Bu sinyallerden biri aktifse `motionMode` değeri `low-power` olur.
- Low-power mod, reduced-motion değildir; ancak sürekli timeline ve reveal
  animasyonlarını kurmadan düşük maliyetli poster/statik deneyim sunar.
- `canUseRichMotion` low-power modda false olur.
- `canUseLowCostMotion` low-power modda true olur ve bileşenler
  `data-low-cost-motion` attribute'u taşır.
- Hero medya sahnesi low-power modda duman/ışık timeline'ı kurmaz; daha sakin CSS
  poster görünümüyle kalır.
- Hero intro, section reveal ve equalizer animasyonları low-power modda kurulmaz.
- CTA, kart, focus, pointer ve klavye davranışları korunur.

## Kullanım Şablonu

```tsx
"use client";

import { useRef } from "react";

import { useGSAP } from "@/hooks/use-gsap";
import { useMotionPreferences } from "@/hooks/use-motion-preferences";

export function ExampleMotionBlock() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const { canUseRichMotion } = useMotionPreferences();

  useGSAP(
    () => {
      if (!canUseRichMotion) {
        return;
      }

      // GSAP timeline burada kurulacak.
    },
    { dependencies: [canUseRichMotion], scope: scopeRef },
  );

  return <div ref={scopeRef} />;
}
```

## Reduced-motion ve Düşük Bağlantı Davranışı

- `prefers-reduced-motion: reduce` aktifse zengin hero hareketi yerine statik
  poster gösterilir.
- `navigator.connection.saveData` aktifse video veya ağır katmanlar istenmez.
- `effectiveType` değeri `slow-2g` veya `2g` ise hero hareketleri düşük maliyetli
  statik deneyime düşer.
- Bu fallback deneyiminde ana mesaj, hizmet özeti ve WhatsApp CTA aynı şekilde
  erişilebilir kalmalıdır.

## Cleanup Kuralları

- GSAP sahneleri `useGSAP` scope'u veya `createGsapCleanup` ile kurulmalıdır.
- Manuel timeline/tween referansları unmount sırasında `killGsapInstances` ile
  temizlenmelidir.
- Scroll, resize, pointer veya media query listener'ları eklenirse aynı effect
  içinde kaldırılmalıdır.
- Animasyonlar DOM mount edilmeden çalıştırılmamalıdır.

## Sonraki Adımlar

- P8.2: Hero medya kabuğu ve far açık/kapalı katmanlarının animasyonsuz
  birleştirilmesi. Tamamlandı.
- P8.3: Duman ve ışık taraması timeline'larının kontrollü şekilde eklenmesi.
  Tamamlandı.
- P8.4: Hero başlığı, destek metni ve CTA zaman çizelgesinin erişilebilir biçimde
  eklenmesi. Tamamlandı.
- P8.5: Hizmet kartları, bölüm reveal hareketleri ve Rain Sound equalizer
  hissinin kontrollü mikro animasyonlarla eklenmesi. Tamamlandı.
- P8.6: Reduced-motion statik deneyiminin ekran üstünde doğrulanması. Tamamlandı.
- P8.7: Mobil ve düşük donanım için poster/düşük maliyetli motion sürümünün
  uygulanması. Tamamlandı.
