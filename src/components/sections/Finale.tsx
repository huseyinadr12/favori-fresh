import { finale } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";

/** Final sahnesi — bardağa ulaşan ürün hissi + kapanış CTA'ları. */
export function Finale() {
  return (
    <section aria-label="Kapanış" className="container-fluid py-28 text-center md:py-36">
      <Reveal>
        {/* Dolan bardağı çağrıştıran işaret */}
        <div className="mx-auto mb-8 h-16 w-11 overflow-hidden rounded-b-2xl rounded-t-md border-2 border-brand-green/40">
          <div className="mt-6 h-full animate-[fade-up_1.2s_ease] bg-gradient-to-t from-accent-lemon via-accent-orange to-accent-pomegranate opacity-80" />
        </div>
        <h2 className="mx-auto max-w-2xl font-display text-fluid-h2">
          {finale.title}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink/70">{finale.body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <LiquidButton href={finale.primaryCta.href}>
            {finale.primaryCta.label}
          </LiquidButton>
          <LiquidButton href={finale.secondaryCta.href} variant="outline">
            {finale.secondaryCta.label}
          </LiquidButton>
        </div>
      </Reveal>
    </section>
  );
}
