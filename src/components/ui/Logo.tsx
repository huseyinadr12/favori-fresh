import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Marka logosu — markanın resmî yeşil "FAVORi FRESH" görseli (şeffaf webp).
 * Koyu yüzeylerde (tone="light") okunabilirlik için krem/beyaza çevrilir.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Image
      src="/img/logo-favori.webp"
      alt="Favori Fresh"
      width={152}
      height={47}
      priority
      className={cn(
        "h-8 w-auto md:h-9",
        // Koyu zeminde yeşil logo düşük kontrast; beyaza çevir.
        tone === "light" && "brightness-0 invert",
      )}
    />
  );
}
