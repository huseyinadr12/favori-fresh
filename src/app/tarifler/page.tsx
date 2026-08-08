import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/content/products";
import { accentRgb, cssVars } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tarifler & Servis Önerileri",
  description:
    "Favori Fresh ürünleriyle servis önerileri ve imza içecek fikirleri.",
  alternates: { canonical: "/tarifler" },
};

export default function RecipesPage() {
  return (
    <>
      <PageHeader
        overline="Tarifler & Servis"
        title="Basit dokunuşlarla imza servisler"
        description="Her ürün için pratik servis önerileri; bar ve mutfak ekipleri için ilham."
      />

      <section className="container-fluid grid gap-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal as="article" key={p.slug} delay={i * 0.05}>
            <div
              className="flex h-full flex-col rounded-3xl border border-ink/10 p-6"
              style={cssVars({ "--c-accent": accentRgb[p.accent] })}
            >
              <span
                aria-hidden
                className="mb-5 h-14 w-14 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgb(var(--c-accent)), rgb(var(--c-accent) / 0.55))",
                }}
              />
              <h2 className="font-display text-lg">
                {p.name.replace("Favori Fresh ", "")}
              </h2>
              <p className="mt-2 text-sm text-ink/60">Servis önerisi</p>
              <p className="mt-2 flex-1 text-sm text-ink/75">{p.serving}</p>
              <p className="mt-4 text-sm text-ink/60">
                Eşleşmeler: {p.uses.join(", ")}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-fluid pb-20">
        <p className="rounded-2xl border border-ink/10 bg-cream px-6 py-5 text-sm text-ink/60">
          Detaylı tarif kartları ve videolu servis önerileri bu bölüme
          eklenecektir.
        </p>
      </section>
    </>
  );
}
