"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — limonata açılış sekansı:
 * 1) Limonata şişesi düşer, 2) kapağı fırlar, 3) limonata yukarı fışkırıp
 * ekranı doldurur, 4) üzerine "FAVORİ FRESH" soldan sağa yazılır, 5) süzülüp
 * yeni sayfayı açar. Hareket azaltma tercihinde devre dışıdır.
 */

// Şişe ağzından yukarı fışkıran damlalar.
const DROPLETS = [
  { size: 13, dx: -40, dy: -150, delay: 0.0 },
  { size: 17, dx: 12, dy: -195, delay: 0.05 },
  { size: 10, dx: 55, dy: -140, delay: 0.02 },
  { size: 15, dx: -70, dy: -170, delay: 0.08 },
  { size: 9, dx: 80, dy: -120, delay: 0.11 },
  { size: 12, dx: -95, dy: -125, delay: 0.06 },
  { size: 11, dx: 35, dy: -175, delay: 0.09 },
];

const DUR = 1.5;

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
    const t = setTimeout(() => setActive(false), DUR * 1000 + 250);
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
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Limonata dolgusu — alttan yükselip ekranı kaplar */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent-orange via-accent-lemon to-[#f6e08c]"
            initial={{ height: "0%" }}
            animate={{ height: ["0%", "0%", "128%", "128%"] }}
            transition={{
              duration: DUR,
              times: [0, 0.26, 0.62, 1],
              ease: [0.6, 0, 0.35, 1],
            }}
          >
            <div className="absolute -top-6 left-0 h-12 w-full rounded-[100%] bg-[#f6e08c]" />
          </motion.div>

          {/* Şişe + kapak + fışkırma */}
          <div className="absolute left-1/2 top-[20%] -translate-x-1/2">
            {/* Şişe düşer */}
            <motion.div
              className="relative h-[38vh] max-h-[340px] w-[20vh] max-w-[190px]"
              initial={{ y: -70, opacity: 0 }}
              animate={{ y: [-70, 0, 0], opacity: [0, 1, 1] }}
              transition={{ duration: 0.55, times: [0, 0.65, 1], ease: "easeOut" }}
            >
              <Image
                src="/img/urun-limonata.webp"
                alt=""
                fill
                sizes="190px"
                className="object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.3)]"
              />
            </motion.div>

            {/* Kapak fırlar */}
            <motion.div
              className="absolute left-1/2 top-[2%] h-5 w-9 -translate-x-1/2 rounded-md bg-accent-lemon shadow-md"
              initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
              animate={{
                y: [0, 0, -80, -170],
                x: [0, 0, 40, 95],
                rotate: [0, 0, 140, 300],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 0.85, times: [0, 0.34, 0.6, 1], ease: "easeOut" }}
            />

            {/* Yukarı fışkıran damlalar (şişe ağzından) */}
            {DROPLETS.map((d, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-[4%] rounded-full bg-[#fff4c2] shadow-[0_0_14px_rgba(255,240,170,0.85)]"
                style={{ width: d.size, height: d.size }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{
                  x: [0, d.dx, d.dx * 1.3],
                  y: [0, d.dy, d.dy + 90],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.6],
                }}
                transition={{ duration: 0.85, delay: 0.36 + d.delay, ease: "easeOut" }}
              />
            ))}
          </div>

          {/* "FAVORİ FRESH" logosu — soldan sağa yazılır */}
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
              times: [0, 0.64, 0.94],
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            <div className="relative h-[8vh] max-h-[64px] w-[62vw] max-w-[420px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
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
      )}
    </AnimatePresence>
  );
}
