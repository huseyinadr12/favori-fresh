/**
 * Merkezi içerik tipleri.
 * CMS'e taşındığında bu tipler sözleşme (contract) olarak korunur.
 */

/** Ürün vurgu renk anahtarı — Tailwind accent.* ve --c-accent ile eşleşir. */
export type AccentKey =
  | "lemon"
  | "mandarin"
  | "orange"
  | "pomegranate"
  | "mulberry"
  | "grapefruit";

/** Ürün kategorisi. */
export type ProductCategory = "oz" | "meyve-suyu" | "profesyonel";

/** Ürün bazlı 3D geçiş senaryosu (asset gelince genişletilir). */
export interface ProductScene {
  /** Kısa senaryo açıklaması (yönetilebilir). */
  transition: string;
  /** Şişe GLB yolu — henüz yoksa null; procedural placeholder kullanılır. */
  bottleModel: string | null;
  /** Arka plan makro görsel/poster yolu — placeholder olabilir. */
  poster: string | null;
  /** 3D sahne için sıvı rengi (hex). */
  liquidColor: string;
  /** Cam/etiket vurgusu için ikincil renk (hex). */
  accentColor: string;
}

export interface ProductNutrientNote {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Ürün kategorisi (özler / meyve suları / profesyonel). */
  category: ProductCategory;
  /** Kısa üst başlık / meyve teması. */
  tagline: string;
  /** Duyusal, somut ürün hikâyesi (kısa). */
  story: string;
  /** Meyvenin kaynağı. */
  fruitSource: string;
  accent: AccentKey;
  /** Servis / kullanım biçimi. */
  serving: string;
  /** Sulandırma / hazırlama oranı (varsa). */
  dilution: string | null;
  /** Saklama koşulu. */
  storage: string;
  /** Ambalaj / hacim seçenekleri. */
  packaging: string[];
  /** HORECA kullanım avantajı. */
  horecaBenefit: string;
  /** Kullanım alanları / eşleşmeler. */
  uses: string[];
  /** İçindekiler notları (doğrulanmış). */
  notes: ProductNutrientNote[];
  scene: ProductScene;
  /** Gerçek ürün/ambalaj fotoğrafı (varsa) — yoksa procedural 3D kullanılır. */
  bottleImage: string | null;
  /** Meyvenin bahçe/kaynak görseli (varsa) — arka plan ve detay için. */
  orchardImage: string | null;
  /** İşaretli placeholder olduğunu belirtir (gerçek görsel gelince false). */
  isPlaceholder: boolean;
}
