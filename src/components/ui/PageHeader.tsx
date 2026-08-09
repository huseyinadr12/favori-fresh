"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useMotion } from "@/components/providers/MotionProvider";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * İç sayfalar için tutarlı, katmanlı ve animasyonlu üst başlık.
 * İçerik değişmeden; renk perdeleri, görsel ve metin katmanları sırayla açılır.
 */
export function PageHeader({
  overline,
  title,
  description,
  image = "/img/bahce-limon.webp",
}: {
  overline?: string;
  title: string;
  description?: string;
  image?: string;
}) {
  const { prefersReducedMotion } = useMotion();
  const initial = <T,>(value: T): T | false =>
    prefersReducedMotion ? false : value;

  return (
    <header className="relative overflow-hidden bg-brand-botanic text-cream">
      {/* Sağdaki görsel kendi katmanında yumuşakça açılır. */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden w-[58%] md:block"
        initial={initial({
          opacity: 0,
          scale: 1.08,
          clipPath: "inset(0 0 0 100%)",
        })}
        animate={{
          opacity: 1,
          scale: 1,
          clipPath: "inset(0 0 0 0%)",
        }}
        transition={{ duration: 1.15, delay: 0.22, ease: EASE }}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="58vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--c-botanic))_0%,rgb(var(--c-botanic)/0.86)_30%,rgb(var(--c-botanic)/0.32)_100%)]" />
      </motion.div>

      {/* İki renk perdesi soldan sağa sırayla çekilerek başlığı açar. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 origin-right bg-accent-orange"
        initial={initial({ scaleX: 1 })}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.82, delay: 0.16, ease: EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[21] origin-right bg-accent-lemon"
        initial={initial({ scaleX: 1 })}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.72, delay: 0.04, ease: EASE }}
      />

      <div className="container-fluid relative z-10 pb-16 pt-32 md:pb-20 md:pt-40">
        {overline && (
          <motion.p
            className="kicker text-cream/70"
            initial={initial({ opacity: 0, x: -20 })}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.34, ease: EASE }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {overline}
          </motion.p>
        )}

        <div className="overflow-hidden py-1">
          <motion.h1
            className="mt-2 max-w-[18ch] font-display text-fluid-h2 leading-[1.05]"
            initial={initial({ opacity: 0, y: "105%", rotate: 1.5 })}
            animate={{ opacity: 1, y: "0%", rotate: 0 }}
            transition={{ duration: 0.82, delay: 0.4, ease: EASE }}
          >
            {title}
          </motion.h1>
        </div>

        {description && (
          <motion.p
            className="mt-3 max-w-xl text-fluid-lead text-cream/80"
            initial={initial({ opacity: 0, y: 18 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.54, ease: EASE }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </header>
  );
}
