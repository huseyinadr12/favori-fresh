/**
 * Özel next/image yükleyici (statik export + GitHub Pages basePath için).
 *
 * Sorun: `images.unoptimized` ile next/image, görsel src'sine basePath'i
 * (ör. /favori-fresh) EKLEMEZ; bu yüzden alt yolda barındırılan sitede
 * görseller 404 verir. Bu yükleyici basePath'i elle ekler ve optimizasyon
 * sunucusu gerektirmez (aynı dosyayı döndürür).
 */
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // Tam URL (http/https) veya data: ise dokunma.
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
  // Zaten basePath ile başlıyorsa tekrar ekleme.
  if (base && src.startsWith(base + "/")) return src;
  return `${base}${src}`;
}
