"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — soldan sağa süpüren limonata dalgası.
 * Önde eğik bir limonata şişesi ekranı boydan boya geçerken dökülüp fışkırır;
 * dalga ekranı kaplar, sonra sağa doğru süzülüp yeni sayfayı açar.
 * Hareket azaltma tercihinde devre dışıdır.
 */

// Şişe ağzından fışkıran damlalar (öncü kenarda, ileri-yukarı savrulur).
const DROPLETS = [
  { top: "24%", size: 16, dx: 90, dy: -70, delay: 0.02 },
  { top: "30%", size: 11, dx: 130, dy: -30, delay: 0.08 },
  { top: "20%", size: 20, dx: 70, dy: -110, delay: 0 },
  { top: "38%", size: 13, dx: 120, dy: 20, delay: 0.06 },
  { top: "28%", size: 9, dx: 160, dy: -60, delay: 0.12 },
  { top: "34%", size: 15, dx: 100, dy: -20, delay: 0.04 },
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
    const t = setTimeout(() => setActive(false), 1050);
    return () => clearTimeout(t);
  }, [pathname, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="page-transition"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
        >
          {/* Soldan sağa süpüren katman */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-105%" }}
            animate={{ x: ["-105%", "0%", "0%", "105%"] }}
            transition={{
              duration: 1.0,
              times: [0, 0.44, 0.56, 1],
              ease: [0.7, 0, 0.3, 1],
            }}
          >
            {/* Limonata yüzeyi — kenarları hafif eğik (dinamik dalga) */}
            <div className="absolute -inset-x-24 inset-y-0 -skew-x-6 bg-gradient-to-r from-accent-orange via-accent-lemon to-[#f6e08c]" />

            {/* Öncü kenarda eğik limonata şişesi (dökülüyor) */}
            <div className="absolute right-[6vw] top-1/2 h-[46vh] max-h-[440px] w-[26vh] max-w-[250px] -translate-y-1/2 rotate-[40deg]">
              <Image
                src="/img/urun-limonata.webp"
                alt=""
                fill
                sizes="250px"
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
              />
            </div>

            {/* Şişe ağzından fışkıran damlalar */}
            {DROPLETS.map((d, i) => (
              <motion.span
                key={i}
                className="absolute right-[4vw] rounded-full bg-[#fff4c2] shadow-[0_0_14px_rgba(255,240,170,0.8)]"
                style={{ top: d.top, width: d.size, height: d.size }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{
                  x: [0, d.dx, d.dx + 40],
                  y: [0, d.dy, d.dy + 50],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.6],
                }}
                transition={{ duration: 0.7, delay: 0.3 + d.delay, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
