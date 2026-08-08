# Favori Fresh — Doğal İçecek Portföyü

Sinematik, 3D destekli kurumsal ürün web sitesi. "Meyvenin içinden tazeliğe yolculuk"
konsepti; scroll ile dönen procedural ürün şişesi, meyveye morph olan arka plan ve
ilk gün tazeliği odaklı marka anlatımı.

## Teknoloji

- **Next.js 14** (App Router) · **React 18** · **TypeScript**
- **Tailwind CSS** (CSS değişkeni tabanlı tasarım token'ları)
- **React Three Fiber + drei** (procedural 3D — ağ bağımlılığı yok)
- **GSAP**, **Lenis** (kontrollü smooth scroll), **Motion** (UI mikro animasyon)

## Komutlar

```bash
npm install
npm run dev        # geliştirme
npm run build      # production build
npm run start      # production sunucu
npm run typecheck  # tsc --noEmit
```

## Mimari

```
src/
  app/                 # rotalar (App Router) + api/lead + robots + sitemap
  components/
    layout/            # header (mega menü, mobil), footer
    sections/          # ana sayfa sahneleri (Hero, ProductUniverse, ...)
    three/             # R3F: Bottle (procedural), ProductScene, showcase
    forms/             # LeadForm (numune/teklif/bayi/iletişim) + Field
    ui/                # LiquidButton, Reveal, Logo, CursorTrail, ...
    providers/         # MotionProvider (reduced-motion + 3D toggle), SmoothScroll
  content/             # MERKEZİ İÇERİK — products, site, home, story
  lib/                 # tipler, renk/utils, scroll hook, analytics, webgl
public/img/            # gerçek marka görselleri
```

## İçerik yönetimi (kod değişikliği gerektirmez)

- **Ürünler:** `src/content/products.ts` — yeni ürün = diziye kayıt ekle.
- **Marka/iletişim/nav:** `src/content/site.ts`
- **Ana sayfa metinleri:** `src/content/home.ts`
- **Hikâye / zaman çizelgesi:** `src/content/story.ts`

## Gerçek asset'leri bağlama

- **Ürün fotoğrafı:** ürünün `bottleImage` alanına `/img/...` yolu ver. Boşsa
  procedural 3D şişe kullanılır.
- **Bahçe görseli:** `orchardImage` alanı (detay/fallback arka planı).
- **3D model (GLB):** `scene.bottleModel` alanına yol ver ve `three/Bottle.tsx`
  içindeki procedural gövdeyi `<primitive object={gltf.scene} />` ile değiştir
  (Draco + KTX2 önerilir).
- **Üretim görselleri:** `src/app/uretim/page.tsx` galeri dizisi.
- **PDF ürün föyü:** `public/foy/<slug>.pdf` olarak koy (detay sayfasında bağlı).

## Form backend (genişletilebilir stub)

`src/app/api/lead/route.ts` — sunucu doğrulaması + honeypot spam koruması mevcut.
Gönderim şu an loglanır. CRM/e-posta bağlamak için `deliverLead()` fonksiyonunu
değiştir (UI ve sözleşme aynı kalır).

## Erişilebilirlik & performans

- `prefers-reduced-motion` desteği; footer'dan **3D deneyimi kapatma** anahtarı.
- WebGL yoksa/kapalıysa aynı içerik statik, erişilebilir biçimde sunulur.
- Three.js yalnızca gerektiğinde (dynamic import, `ssr:false`) yüklenir.
- Fontlar self-host (next/font, latin-ext alt kümesi — tam Türkçe).

## Notlar

- Doğrulanmamış "Türkiye'de tek" / sağlık / sertifika iddiaları KULLANILMAZ;
  sertifika alanı yalnızca marka onaylı logolar için hazır bırakılmıştır.
- Ürünler "donuk" (-40°C şoklama) teknolojisiyle üretilir; içerik buna göre yazılmıştır.
