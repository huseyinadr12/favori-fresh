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
            {/* Tertemiz sarı limonata katmanı — hiçbir beyaz/parlak öğe yok. */}
            <div className="absolute -inset-x-24 inset-y-0 bg-gradient-to-r from-accent-lemon via-[#f4d64a] to-[#f8df72]">
              {/* Aynı tonda çok hafif derinlik (sarı üstü sarı). */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(115deg, rgba(240,180,30,0.18) 0%, transparent 45%, rgba(255,240,170,0.22) 100%)",
                }}
              />
            </div>
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
