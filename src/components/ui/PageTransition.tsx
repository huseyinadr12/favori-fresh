"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — soldan sağa limonata açılış sekansı:
 * 1) Sarı limonata katmanı soldan sağa süpürüp ekranı kaplar,
 * 2) ortaya limonata şişesi gelir, 3) kapağı açılıp fırlar (damlalar fışkırır),
 * 4) "FAVORİ FRESH" soldan sağa yazılır, 5) katman sağa süzülüp yeni sayfayı açar.
 * Hareket azaltma tercihinde devre dışıdır.
 */

const DROPLETS = [
  { size: 13, dx: -45, dy: -150, delay: 0.0 },
  { size: 17, dx: 12, dy: -195, delay: 0.05 },
  { size: 10, dx: 60, dy: -140, delay: 0.02 },
  { size: 15, dx: -75, dy: -165, delay: 0.08 },
  { size: 9, dx: 85, dy: -120, delay: 0.11 },
  { size: 12, dx: 35, dy: -175, delay: 0.07 },
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
            {/* 1) Sarı limonata katmanı */}
            <div className="absolute -inset-x-20 inset-y-0 -skew-x-6 bg-gradient-to-r from-accent-orange via-accent-lemon to-[#f6e08c]" />

            {/* 2) Şişe + 3) kapak + fışkırma */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[46vh] max-h-[400px] w-[24vh] max-w-[220px] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: [0, 0, 1, 1, 0], y: [30, 30, 0, 0, -12] }}
              transition={{ duration: DUR, times: [0, 0.2, 0.34, 0.52, 0.64], ease: "easeOut" }}
            >
              <Image
                src="/img/urun-limonata.webp"
                alt=""
                fill
                sizes="220px"
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.3)]"
              />

              {/* Kapak açılıp fırlar */}
              <motion.div
                className="absolute left-1/2 top-[3%] h-5 w-9 -translate-x-1/2 rounded-md bg-accent-lemon shadow-md"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 1, 1, 0],
                  y: [0, 0, 0, -90, -175],
                  x: [0, 0, 0, 42, 98],
                  rotate: [0, 0, 0, 150, 310],
                }}
                transition={{ duration: DUR, times: [0, 0.36, 0.4, 0.52, 0.62], ease: "easeOut" }}
              />

              {/* Fışkıran damlalar (şişe ağzından) */}
              {DROPLETS.map((d, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-[5%] rounded-full bg-[#fff4c2] shadow-[0_0_14px_rgba(255,240,170,0.85)]"
                  style={{ width: d.size, height: d.size }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{
                    x: [0, d.dx, d.dx * 1.3],
                    y: [0, d.dy, d.dy + 90],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.6],
                  }}
                  transition={{ duration: 0.8, delay: 0.72 + d.delay, ease: "easeOut" }}
                />
              ))}
            </motion.div>

            {/* 4) "FAVORİ FRESH" soldan sağa yazılır */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
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
                times: [0, 0.56, 0.76],
                ease: [0.65, 0, 0.35, 1],
              }}
            >
              <div className="relative h-[9vh] max-h-[70px] w-[64vw] max-w-[430px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
                <Image
                  src="/img/logo-favori.webp"
                  alt=""
                  fill
                  sizes="430px"
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
