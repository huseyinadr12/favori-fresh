import { cn } from "@/lib/utils";

/**
 * Marka logosu — SVG wordmark lockup (düz yazı değil, ölçeklenebilir grafik).
 * Yaprak işareti + "FAVØRi FRESH". tone'a göre yeşil (açık zemin) ya da
 * krem (koyu zemin) renklenir. Font, başlık ailesinden (Sora) alınır.
 *
 * NOT: Markanın resmî vektör logosu (SVG/PNG) sağlanırsa bu bileşen tek
 * noktadan onunla değiştirilebilir.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "rgb(var(--c-brand-green))" : "rgb(var(--c-cream))";
  const sub = tone === "dark" ? "rgb(var(--c-brand-green))" : "rgb(var(--c-cream))";

  return (
    <span className={cn("inline-flex items-center")} aria-label="Favori Fresh">
      <svg
        viewBox="0 0 208 46"
        width="150"
        height="33"
        role="img"
        aria-hidden
        className="h-8 w-auto"
      >
        {/* Yaprak işareti */}
        <g transform="translate(0,3)">
          <path
            d="M20 0C9 6 3 11 3 22a17 17 0 0 0 34 0C37 11 31 6 20 0Z"
            fill={main}
          />
          <path
            d="M20 6c-6 4-9 9-9 15"
            stroke={tone === "dark" ? "rgb(var(--c-cream))" : "rgb(var(--c-botanic))"}
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* FAVØRi */}
        <text
          x="50"
          y="24"
          fill={main}
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          fontSize="25"
          letterSpacing="-0.5"
        >
          FAV&#216;Ri
        </text>
        {/* FRESH */}
        <text
          x="51"
          y="40"
          fill={sub}
          opacity={0.72}
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          fontSize="11"
          letterSpacing="5.5"
        >
          FRESH
        </text>
      </svg>
    </span>
  );
}
