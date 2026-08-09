import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, categoryMeta } from "@/content/products";
import { accentRgb, cssVars } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";

export const metadata: Metadata = {
  title: "Tarifler & Servis Önerileri",
  description:
    "Favori Fresh ürünleriyle servis önerileri, hazırlama oranları ve imza içecek fikirleri.",
  alternates: { canonical: "/tarifler" },
};

export default function RecipesPage() {
  return (
    <>
      <PageHeader
        overline="Tarifler & Servis"
        title="Basit dokunuşlarla imza servisler"
        description="Her ürün için pratik hazırlama ve sunum önerileri; bar ve mutfak ekipleri için ilham."
      />

      <div className="divide-y divide-ink/10">
        {products.map((p, i) => {
          const right = i % 2 === 1;
          const cat = categoryMeta[p.category];
          return (
            <section
              key={p.slug}
              className={i % 2 === 1 ? "bg-cream" : ""}
              style={cssVars({ "--c-accent": accentRgb[p.accent] })}
            >
              <div className="container-fluid grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20">
                {/* Görsel — yalnızca ürün */}
                <Reveal className={right ? "md:order-2" : ""}>
                  <div
                    className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 32%, rgb(var(--c-accent) / 0.16), rgb(var(--c-cream)) 72%)",
                    }}
                  >
                    {p.bottleImage && (
                      <Image
                        src={p.bottleImage}
                        alt={`${p.name} ürün görseli`}
                        fill
                        sizes="(max-width: 768px) 80vw, 40vw"
                        className="object-contain p-8 drop-shadow-[0_22px_40px_rgba(0,0,0,0.2)]"
                      />
                    )}
                  </div>
                </Reveal>

                {/* Metin — servis önerisi */}
                <Reveal delay={0.05} className={right ? "md:order-1" : ""}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-accentnow/40 px-3 py-1 text-xs font-semibold text-accentnow">
                    {cat.label}
                  </span>
                  <h2 className="mt-3 font-display text-fluid-h3">
                    {p.name.replace("Favori Fresh ", "")}
                  </h2>
                  <p className="mt-1 text-ink/60">{p.tagline}</p>

                  <div className="mt-5 space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-ink">Servis önerisi</p>
                      <p className="text-ink/70">{p.serving}</p>
                    </div>
                    {p.dilution && (
                      <div>
                        <p className="font-semibold text-ink">Hazırlama</p>
                        <p className="text-ink/70">{p.dilution}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-sm text-ink/50">Eşleşmeler:</span>
                    {p.uses.map((u) => (
                      <span
                        key={u}
                        className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/75"
                      >
                        {u}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7">
                    <LiquidButton href={`/urunler/${p.slug}`} variant="outline">
                      Ürünü İncele
                    </LiquidButton>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Kapanış */}
      <section className="container-fluid py-16 text-center">
        <p className="mx-auto max-w-xl text-ink/60">
          Detaylı tarif kartları ve videolu servis önerileri bu bölüme
          eklenmeye devam edecek.
        </p>
        <div className="mt-6 flex justify-center">
          <LiquidButton href="/horeca#numune">Numune Talep Et</LiquidButton>
        </div>
      </section>
    </>
  );
}
