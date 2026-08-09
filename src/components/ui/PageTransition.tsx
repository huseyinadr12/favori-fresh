"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

/**
 * Sayfa geçiş animasyonu — sade limonata geçişi:
 * 1) Sarı limonata katmanı soldan sağa süpürüp ekranı kaplar,
 * 2) limonata şişesi soldan sağa doğru ekranı boydan boya geçer,
 * 3) katman sağa süzülüp yeni sayfayı açar.
 * Yaklaşık 1.6 sn sürer; hareket azaltma tercihinde devre dışıdır.
 */

// Limonata katmanına sıvı hissi veren kabarcıklar.
const BUBBLES = [
  { left: "13%", top: "20%", size: 18, delay: 0.02 },
  { left: "29%", top: "70%", size: 11, delay: 0.08 },
  { left: "46%", top: "26%", size: 15, delay: 0.04 },
  { left: "61%", top: "66%", size: 22, delay: 0.1 },
  { left: "77%", top: "18%", size: 10, delay: 0.06 },
  { left: "88%", top: "74%", size: 16, delay: 0.12 },
];

const DUR = 1.6;

export function PageTransition() {
  const pathname = usePathname();
  const { prefersReducedMotion } = useMotion();
  const [active, setActive] = useState(false);
  // Her geçiş için artan kimlik: yeni mount ile animasyon hep baştan oynar.
  const [runId, setRunId] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion) return;

    setRunId((n) => n + 1);
    setActive(true);

    // Garantili sonlanma: zamanlayıcı, sekme arka planda olsa bile tetiklenir.
    const t = setTimeout(() => setActive(false), DUR * 1000 + 200);

    // Sekme gizlenirse (rAF donar) geçişi hemen sonlandır; asılı katman kalmasın.
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        clearTimeout(t);
        setActive(false);
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      clearTimeout(t);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [pathname, prefersReducedMotion]);

  // AnimatePresence/exit yok: active=false olunca anında unmount → katman asla asılı kalmaz.
  if (!active) return null;

  return (
    <motion.div
      key={runId}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[95] overflow-hidden"
    >
          {/* Soldan sağa süpürüp sağa süzülen sarı limonata katmanı */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            initial={{ x: "-110%" }}
            animate={{ x: ["-110%", "0%", "0%", "110%"] }}
            transition={{
              duration: DUR,
              times: [0, 0.2, 0.6, 1],
              ease: [0.7, 0, 0.3, 1],
            }}
          >
            <div className="absolute -inset-x-24 inset-y-0 -skew-x-6 overflow-hidden bg-gradient-to-r from-accent-lemon via-[#f6d94b] to-[#f8df72]">
              <div
                className="absolute inset-0 opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 18% 28%, rgba(255,255,255,.55) 0 2px, transparent 3px), radial-gradient(circle at 64% 72%, rgba(255,255,255,.35) 0 3px, transparent 4px), linear-gradient(115deg, transparent 18%, rgba(255,255,255,.18) 40%, transparent 62%)",
                  backgroundSize: "70px 70px, 110px 110px, 100% 100%",
                }}
              />

              {BUBBLES.map((bubble, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full border border-white/55 bg-white/15 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.08)]"
                  style={{
                    left: bubble.left,
                    top: bubble.top,
                    width: bubble.size,
                    height: bubble.size,
                  }}
                  animate={{ y: [12, -18, 12], scale: [0.8, 1.08, 0.8] }}
                  transition={{
                    duration: 1.15,
                    delay: bubble.delay,
                    repeat: 1,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Akış yönünü belirginleştiren sıvı parlaması */}
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-white/35 blur-xl" />
            </div>

            {/* Sağdaki organik dalga kenarı, sıvının soldan sağa aktığını gösterir. */}
            <motion.div
              className="absolute -right-16 -top-[8%] h-[116%] w-28 rounded-[48%] bg-[#f8df72]/95 blur-[1px]"
              animate={{ scaleY: [1.04, 0.96, 1.04], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 0.7, repeat: 2, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Limonata şişesi — soldan sağa ekranı boydan boya geçer */}
          <motion.div
            className="absolute top-1/2 h-[46vh] max-h-[400px] w-[24vh] max-w-[210px]"
            style={{ translateX: "-50%", translateY: "-50%" }}
            initial={{ left: "-15%", opacity: 0, rotate: -4 }}
            animate={{
              left: ["-15%", "115%"],
              opacity: [0, 1, 1, 0],
              rotate: [-4, 3],
            }}
            transition={{
              duration: DUR,
              left: { duration: DUR, ease: [0.45, 0, 0.55, 1] },
              rotate: { duration: DUR, ease: "linear" },
              opacity: { duration: DUR, times: [0, 0.16, 0.82, 1] },
            }}
          >
            <Image
              src="/img/urun-limonata.webp"
              alt=""
              fill
              sizes="210px"
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
    </motion.div>
  );
}
