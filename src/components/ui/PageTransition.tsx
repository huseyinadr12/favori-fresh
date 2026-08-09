"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — "limonata fışkırması".
 * Rota değişince ekranı alttan yükselen dalgalı bir limonata katmanı kaplar
 * (fışkıran damlalarla), sonra süzülerek yeni sayfayı açar.
 * Hareket azaltma tercihinde devre dışıdır.
 */

// Fışkıran damlalar (deterministik konum/gecikme).
const DROPLETS = [
  { x: "12%", size: 14, delay: 0.05, rise: 190 },
  { x: "24%", size: 10, delay: 0.12, rise: 150 },
  { x: "38%", size: 18, delay: 0.02, rise: 230 },
  { x: "50%", size: 12, delay: 0.16, rise: 170 },
  { x: "62%", size: 16, delay: 0.08, rise: 210 },
  { x: "76%", size: 10, delay: 0.14, rise: 150 },
  { x: "88%", size: 14, delay: 0.04, rise: 200 },
];

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
    const t = setTimeout(() => setActive(false), 1000);
    return () => clearTimeout(t);
  }, [pathname, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-transition"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Yükselip süzülen limonata katmanı */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent-orange via-accent-lemon to-accent-lemon"
            initial={{ height: "0%" }}
            animate={{ height: ["0%", "130%", "130%", "0%"] }}
            transition={{
              duration: 0.95,
              times: [0, 0.42, 0.56, 1],
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {/* Dalga tepesi (sıvı yüzeyi) */}
            <div className="absolute -top-8 left-0 h-16 w-full rounded-[100%] bg-accent-lemon" />
          </motion.div>

          {/* Fışkıran damlalar */}
          {DROPLETS.map((d, i) => (
            <motion.span
              key={i}
              className="absolute bottom-[42%] rounded-full bg-accent-lemon shadow-[0_0_12px_rgba(224,188,44,0.6)]"
              style={{ left: d.x, width: d.size, height: d.size }}
              initial={{ y: 120, opacity: 0, scale: 0.6 }}
              animate={{
                y: [120, -d.rise, -d.rise + 60],
                opacity: [0, 1, 0],
                scale: [0.6, 1, 0.7],
              }}
              transition={{
                duration: 0.7,
                delay: 0.28 + d.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
