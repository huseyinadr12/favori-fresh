import { horeca } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";

/** HORECA çözümleri — ticari dönüşüm bloğu. */
export function HorecaBlock() {
  return (
    <section aria-label="HORECA çözümleri" className="container-fluid py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="kicker text-brand-green">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
            {horeca.overline}
          </p>
          <h2 className="mt-3 whitespace-pre-line font-display text-fluid-h2 leading-[1.06]">
            {horeca.title}
          </h2>
          <p className="mt-5 max-w-md text-ink/70">{horeca.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LiquidButton href={horeca.ctas[0].href}>
              {horeca.ctas[0].label}
            </LiquidButton>
            <LiquidButton href={horeca.ctas[1].href} variant="outline">
              {horeca.ctas[1].label}
            </LiquidButton>
            <LiquidButton href={horeca.ctas[2].href} variant="ghost">
              {horeca.ctas[2].label} →
            </LiquidButton>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {horeca.benefits.map((b, i) => (
            <Reveal as="article" key={b.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-ink/10 bg-cream p-6 transition-colors hover:border-brand-green/40">
                <div className="mb-4 h-9 w-9 rounded-xl bg-brand-green/12 [display:grid] [place-items:center]">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                </div>
                <h3 className="font-display text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
