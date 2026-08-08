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
  { src: "/img/bahce-limon.jpg", alt: "Dalında olgunlaşmış Lamas limonları" },
  { src: "/img/bahce-portakal.jpg", alt: "Güneş altında portakal bahçesi" },
  { src: "/img/lamas-limon.jpg", alt: "Yakın planda taze limonlar" },
  { src: "/img/bahce-limon-2.jpg", alt: "Limon bahçesi" },
  { src: "/img/bahce.png", alt: "Meyve bahçesi" },
];

const INTERVAL = 15000; // 15 sn

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
          className="absolute inset-0 transition-opacity duration-[2000ms] ease-fluid"
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
              // Aktif kare yavaşça yakınlaşır (Ken Burns).
              transform: i === index && !prefersReducedMotion ? "scale(1.08)" : "scale(1)",
              transition: prefersReducedMotion
                ? undefined
                : "transform 16s ease-out",
            }}
          />
        </div>
      ))}

      {/* Okunabilirlik için koyu degrade örtü */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-botanic/90 via-brand-botanic/70 to-brand-botanic/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-botanic/80 via-transparent to-brand-botanic/40" />
    </div>
  );
}
