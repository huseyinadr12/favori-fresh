"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { timeline, type TimelineNode } from "@/content/story";

/**
 * Marka zaman çizelgesi — scroll'a bağlı katmanlı (3B hissi veren) geçişler.
 * Her adımda görsel ve metin farklı hızlarda (parallax) hareket eder; kart
 * hafifçe derinlik/rotasyon kazanır. Böylece aşağı inerken katmanlar arası
 * akıcı bir derinlik oluşur.
 */
export function StoryTimeline() {
  return (
    <div className="[perspective:1400px]">
      <ol className="relative mx-auto max-w-4xl">
        {/* Merkez çizgi */}
        <span
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2"
        />
        {timeline.map((node, i) => (
          <TimelineItem key={node.year} node={node} index={i} />
        ))}
      </ol>
    </div>
  );
}

function TimelineItem({ node, index }: { node: TimelineNode; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const right = index % 2 === 1;

  // Katmanlı parallax: görsel ve metin farklı hız/derinlikte.
  const imgY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const imgRotate = useTransform(scrollYProgress, [0, 0.5, 1], [right ? 6 : -6, 0, right ? -6 : 6]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.02, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0, 1, 1, 0.15]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      className="relative mb-16 pl-12 last:mb-0 md:mb-24 md:pl-0"
    >
      {/* Düğüm */}
      <span
        aria-hidden
        className="absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-cream bg-brand-green md:left-1/2"
      />
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-12">
        {/* Görsel katmanı */}
        {node.image && (
          <motion.div
            style={{ y: imgY, rotateX: imgRotate, scale: imgScale }}
            className={`[transform-style:preserve-3d] ${right ? "md:order-2 md:pl-8" : "md:pr-8"}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]">
              <Image
                src={node.image}
                alt={node.imageAlt ?? node.title}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        )}
        {/* Metin katmanı */}
        <motion.div
          style={{ y: textY }}
          className={`mt-5 md:mt-0 ${right ? "md:order-1 md:pr-8 md:text-right" : "md:pl-8"}`}
        >
          <span className="whitespace-nowrap font-display text-4xl text-brand-green/80">
            {node.year}
          </span>
          <h3 className="mt-2 font-display text-2xl">{node.title}</h3>
          <p className="mt-3 text-ink/70">{node.text}</p>
        </motion.div>
      </div>
    </motion.li>
  );
}
