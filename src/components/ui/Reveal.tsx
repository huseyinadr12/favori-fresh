"use client";

import { motion, type HTMLMotionProps } from "motion/react";

/**
 * Görünür alana girince yumuşak fade-up.
 * Hareket azaltmada Framer Motion otomatik olarak animasyonu sadeleştirir.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
