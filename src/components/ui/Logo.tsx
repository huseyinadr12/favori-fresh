import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Marka logosu: solda markanın orijinal yaprak ikonu (rounded tile) + wordmark.
 * Yaprak ikonu her zaman açık zeminli tile içinde durur; koyu ve açık
 * yüzeylerde tutarlı görünür. Wordmark tonu yüzeye göre değişir.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <Image
          src="/img/logo-mark.webp"
          alt="Favori Fresh yaprak logosu"
          width={36}
          height={36}
          className="h-7 w-7 object-contain"
          priority
        />
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold leading-none tracking-tightest",
          tone === "dark" ? "text-brand-green" : "text-cream",
        )}
      >
        FAVORİ<span className="ml-1 font-medium opacity-70">FRESH</span>
      </span>
    </span>
  );
}
