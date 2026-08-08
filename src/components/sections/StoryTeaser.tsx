import Image from "next/image";
import { storyIntro, timeline, storySlogan } from "@/content/story";
import { Reveal } from "@/components/ui/Reveal";
import { LiquidButton } from "@/components/ui/LiquidButton";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

/** Marka hikâyesi teaser — gerçek görsel + zaman çizelgesi özeti. Tamamı /hikayemiz'de. */
export function StoryTeaser() {
  const teaser = timeline.slice(0, 4);
  return (
    <section
      aria-label="Hikâyemiz"
      className="relative overflow-hidden bg-brand-botanic text-cream"
    >
      <AnimatedBackdrop variant="dark" />
      <div className="container-fluid relative z-10 grid gap-12 py-24 md:grid-cols-2 md:items-center md:py-32">
        <Reveal>
          <p className="kicker text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {storyIntro.overline}
          </p>
          <h2 className="mt-3 font-display text-fluid-h2 leading-[1.08]">
            {storyIntro.title}
          </h2>
          <p className="mt-5 max-w-md text-cream/80">{storyIntro.body}</p>

          {/* Zaman çizelgesi özeti */}
          <ol className="mt-8 space-y-3">
            {teaser.map((node) => (
              <li key={node.year} className="flex gap-4">
                <span className="w-20 shrink-0 font-display text-accent-lemon">
                  {node.year}
                </span>
                <span className="text-sm text-cream/80">{node.title}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <LiquidButton href="/hikayemiz" variant="outline">
              Hikâyenin tamamı
            </LiquidButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/img/marka-kasa.webp"
                alt="Favori Fresh markalı kasada limonlar — Doğallık herkesin hakkı"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 font-display text-lg text-cream/90">
              {storySlogan.tag}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
