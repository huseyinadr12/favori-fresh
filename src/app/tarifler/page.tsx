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
                {/* Görsel — ürün (koyu sahne) + varsa bahçe */}
                <Reveal className={right ? "md:order-2" : ""}>
                  <div className="grid grid-cols-3 gap-3">
                    <div
                      className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-3xl"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 40%, rgb(var(--c-accent) / 0.24), rgba(7,9,8,1) 72%)",
                      }}
                    >
                      {p.bottleImage && (
                        <Image
                          src={p.bottleImage}
                          alt={`${p.name} ürün görseli`}
                          fill
                          sizes="(max-width: 768px) 60vw, 30vw"
                          className="object-contain p-5"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <div
                        className="relative aspect-square overflow-hidden rounded-2xl"
                        style={{
                          background:
                            "radial-gradient(circle at 40% 30%, rgb(var(--c-accent) / 0.3), rgb(var(--c-accent) / 0.08))",
                        }}
                      >
                        {p.orchardImage ? (
                          <Image
                            src={p.orchardImage}
                            alt={p.fruitSource}
                            fill
                            sizes="(max-width: 768px) 30vw, 15vw"
                            className="object-cover"
                          />
                        ) : (
                          <span
                            aria-hidden
                            className="absolute inset-0 m-auto h-1/2 w-1/2 rounded-full"
                            style={{
                              background:
                                "radial-gradient(circle at 35% 30%, rgb(var(--c-accent)), rgb(var(--c-accent) / 0.5))",
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 rounded-2xl border border-ink/10 p-3 text-center">
                        <p className="font-display text-2xl text-accentnow">
                          {p.dilution ? "1/4" : "Hazır"}
                        </p>
                        <p className="text-[11px] text-ink/55">
                          {p.dilution ? "sulandırma" : "içime hazır"}
                        </p>
                      </div>
                    </div>
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
