import { contact } from "@/content/site";

/**
 * Konum haritası — adresi gerçek harita üzerinde (OpenStreetMap) gösterir.
 * API anahtarı gerektirmez. Kullanıcı uzaklaştırarak Türkiye genelini görebilir.
 * "Yol tarifi al" bağlantısı Google Haritalar'da konumu açar.
 */
export function LocationMap() {
  const { lat, lng } = contact.coords;

  // Mersin/Erdemli kıyı bölgesini gösteren görüş penceresi + işaretçi.
  const d = 0.14;
  const bbox = `${lng - d * 1.6},${lat - d},${lng + d * 1.6},${lat + d}`;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=12/${lat}/${lng}`;

  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10">
      <div className="relative aspect-video">
        <iframe
          title="Favori Fresh konumu — Tömük, Erdemli / Mersin"
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="flex flex-col gap-2 bg-cream p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="text-ink/70">
          <span className="font-medium text-ink">Mersin, Erdemli / Tömük</span>
          <span className="mx-2 text-ink/30">·</span>
          Türkiye
        </span>
        <span className="flex gap-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-green hover:underline"
          >
            Yol tarifi al →
          </a>
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/60 hover:text-ink"
          >
            Haritada aç
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
