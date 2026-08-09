"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Ana sayfa açılış görsel alanı — otomatik değişen slideshow.
 * Görseller ~15 saniyede bir, akıcı çapraz geçiş (crossfade) + hafif Ken Burns
 * yakınlaşmasıyla değişir. Hareket azaltmada tek kare sabit kalır.
 */
const slides = [
  { src: "/img/bahce-genis.webp", alt: "Mavi gökyüzü altında geniş narenciye bahçesi" },
  { src: "/img/bahce-limon.webp", alt: "Dalında olgunlaşmış Lamas limonları" },
  { src: "/img/bahce-portakal-hd.webp", alt: "Güneş altında portakal ağaçları" },
  { src: "/img/bahce-mandalina.webp", alt: "Muğla Bodrum mandalina bahçesi" },
  { src: "/img/lamas-limon.webp", alt: "Yakın planda taze limonlar" },
  { src: "/img/bahce-limon-2.webp", alt: "Limon bahçesi" },
];

const INTERVAL = 22000; // ~22 sn — sakin geçiş

export function HeroSlideshow() {
  const { prefersReducedMotion } = useMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[2600ms] ease-fluid"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{
              // Aktif kare çok hafifçe yakınlaşır (sakin Ken Burns).
              transform: i === index && !prefersReducedMotion ? "scale(1.05)" : "scale(1)",
              transition: prefersReducedMotion
                ? undefined
                : "transform 24s ease-out",
            }}
          />
        </div>
      ))}

      {/* Okunabilirlik için örtü — metin merkezde olduğundan hafif merkezi
          vinyet; yeşil örtü ölçülü tutuldu ki görseller görünür kalsın. */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_120%_at_50%_44%,rgb(var(--c-botanic)/0.4),rgb(var(--c-botanic)/0.74))]" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-botanic/55 via-transparent to-brand-botanic/25" />
    </div>
  );
}
