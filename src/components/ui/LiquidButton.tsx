"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: React.ReactNode;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 ease-fluid focus-visible:outline-offset-4 overflow-hidden";

const variants: Record<Variant, string> = {
  // Dolgu: hover'da vurgu rengi yumuşakça yayılır (sıvı yüzey hissi).
  solid:
    "bg-brand-green text-cream hover:shadow-[0_10px_40px_-12px_rgb(var(--c-accent)/0.7)]",
  // Outline & ghost: metin/kenarlık currentColor'ı miras alır → koyu ve açık
  // yüzeylerde otomatik kontrast (cream üstünde açık, krem üstünde koyu).
  outline: "border border-current/40 hover:border-current bg-transparent",
  ghost: "opacity-80 hover:opacity-100",
};

/** Vurgu renginin yayıldığı hover katmanı. */
function LiquidLayer({ variant }: { variant: Variant }) {
  if (variant === "ghost") return null;
  return (
    <span
      aria-hidden
      className="absolute inset-0 -z-0 origin-bottom scale-y-0 rounded-full bg-accentnow opacity-0 transition-all duration-500 ease-fluid group-hover:scale-y-100 group-hover:opacity-[0.14]"
    />
  );
}

export function LiquidButton({
  children,
  href,
  variant = "solid",
  className,
  icon,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      <LiquidLayer variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </Link>
  );
}

export function LiquidAction({
  children,
  variant = "solid",
  className,
  icon,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <LiquidLayer variant={variant} />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon}
      </span>
    </button>
  );
}
