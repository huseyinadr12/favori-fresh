import Image from "next/image";
import Link from "next/link";
import { finale } from "@/content/home";
import { products } from "@/content/products";
import { accentRgb, cssVars } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";

/** Final sahnesi — kapanış mesajı + tüm ürün ailesi vitrin şeridi. */
export function Finale() {
  return (
    <section aria-label="Kapanış" className="container-fluid py-24 md:py-28">
      <Reveal>
        <div className="text-center">
          {/* Dolan bardağı çağrıştıran işaret */}
          <div className="mx-auto mb-7 h-16 w-11 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-brand-green/40">
            <div className="mt-6 h-full animate-[fade-up_1.2s_ease] bg-gradient-to-t from-accent-lemon via-accent-orange to-accent-pomegranate opacity-80" />
          </div>
          <h2 className="mx-auto max-w-2xl font-display text-fluid-h2">
            {finale.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink/70">{finale.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LiquidButton href={finale.primaryCta.href}>
              {finale.primaryCta.label}
            </LiquidButton>
            <LiquidButton href={finale.secondaryCta.href} variant="outline">
              {finale.secondaryCta.label}
            </LiquidButton>
          </div>
        </div>
      </Reveal>

      {/* Ürün ailesi vitrini */}
      <Reveal delay={0.1}>
        <ul className="mt-16 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {products.map((p) => (
            <li key={p.slug} style={cssVars({ "--c-accent": accentRgb[p.accent] })}>
              <Link
                href={`/urunler/${p.slug}`}
                className="group flex flex-col items-center"
              >
                <div
                  className="relative flex aspect-[3/4] w-full items-end justify-center overflow-hidden rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, rgb(var(--c-accent) / 0.16), rgb(var(--c-cream)) 72%)",
                  }}
                >
                  {p.bottleImage && (
                    <Image
                      src={p.bottleImage}
                      alt={p.name}
                      fill
                      sizes="(max-width: 1024px) 25vw, 13vw"
                      className="object-contain p-3 transition-transform duration-500 ease-fluid group-hover:scale-105"
                    />
                  )}
                </div>
                <span className="mt-2 text-center text-xs font-medium text-ink/70">
                  {p.name.replace("Favori Fresh ", "")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
