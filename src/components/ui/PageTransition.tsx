"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — soldan sağa limonata açılış sekansı:
 * 1) Sarı limonata katmanı soldan sağa süpürüp ekranı kaplar,
 * 2) SOLDA limonata şişesi belirir, 3) kapağı açılıp fırlar,
 * 4) limonata damlar, 5) "FAVORİ FRESH" soldan sağa yazılır,
 * 6) katman sağa süzülüp yeni sayfayı açar.
 * Hareket azaltma tercihinde devre dışıdır.
 */

// Şişe ağzından süzülen (damlayan) damlalar.
const DRIPS = [
  { size: 12, dx: -10, dy: 150, delay: 0.0 },
  { size: 16, dx: 8, dy: 190, delay: 0.06 },
  { size: 9, dx: 22, dy: 130, delay: 0.03 },
  { size: 13, dx: -20, dy: 170, delay: 0.1 },
  { size: 10, dx: 15, dy: 210, delay: 0.14 },
];

const DUR = 1.7;

export function PageTransition() {
  const pathname = usePathname();
  const { prefersReducedMotion } = useMotion();
  const [active, setActive] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion) return;
    setActive(true);
    const t = setTimeout(() => setActive(false), DUR * 1000 + 120);
    return () => clearTimeout(t);
  }, [pathname, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-transition"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          {/* Soldan sağa süpürüp sağa süzülen taşıyıcı */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-105%" }}
            animate={{ x: ["-105%", "0%", "0%", "105%"] }}
            transition={{
              duration: DUR,
              times: [0, 0.18, 0.82, 1],
              ease: [0.7, 0, 0.3, 1],
            }}
          >
            {/* 1) Sarı limonata katmanı (tam ekran) */}
            <div className="absolute -inset-x-20 inset-y-0 -skew-x-6 bg-gradient-to-r from-accent-orange via-accent-lemon to-[#f6e08c]" />

            {/* 2) SOLDA limonata şişesi + 3) kapak + 4) damlama */}
            <motion.div
              className="absolute left-[7%] top-1/2 h-[44vh] max-h-[380px] w-[22vh] max-w-[195px] -translate-y-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: [0, 0, 1, 1, 0], x: [-30, -30, 0, 0, 0] }}
              transition={{ duration: DUR, times: [0, 0.2, 0.33, 0.55, 0.66], ease: "easeOut" }}
            >
              <Image
                src="/img/urun-limonata.webp"
                alt=""
                fill
                sizes="195px"
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.3)]"
              />

              {/* Kapak açılıp fırlar */}
              <motion.div
                className="absolute left-1/2 top-[3%] h-5 w-9 -translate-x-1/2 rounded-md bg-accent-lemon shadow-md"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                  y: [0, 0, 0, -85, -160],
                  x: [0, 0, 0, 40, 92],
                  rotate: [0, 0, 0, 150, 300],
                }}
                transition={{ duration: DUR, times: [0, 0.34, 0.38, 0.5, 0.6], ease: "easeOut" }}
              />

              {/* Damlayan limonata (şişe ağzından süzülür) */}
              {DRIPS.map((d, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-[6%] rounded-full bg-[#fff4c2] shadow-[0_0_12px_rgba(255,240,170,0.8)]"
                  style={{ width: d.size, height: d.size }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: [0, d.dx, d.dx],
                    y: [0, d.dy * 0.5, d.dy],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.7],
                  }}
                  transition={{ duration: 0.8, delay: 0.7 + d.delay, ease: "easeIn" }}
                />
              ))}
            </motion.div>

            {/* 5) "FAVORİ FRESH" soldan sağa yazılır (merkez-sağ) */}
            <motion.div
              className="absolute inset-y-0 right-[6%] left-[38%] flex items-center justify-center"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{
                clipPath: [
                  "inset(0 100% 0 0)",
                  "inset(0 100% 0 0)",
                  "inset(0 0% 0 0)",
                ],
                opacity: [0, 0, 1],
              }}
              transition={{
                duration: DUR,
                times: [0, 0.58, 0.78],
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <div className="relative h-[9vh] max-h-[68px] w-full max-w-[420px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
                <Image
                  src="/img/logo-favori.webp"
                  alt=""
                  fill
                  sizes="420px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
