import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

/** İç sayfalar için tutarlı üst başlık — canlı animasyonlu arka plan üzerinde. */
export function PageHeader({
  overline,
  title,
  description,
}: {
  overline?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-brand-botanic text-cream">
      <AnimatedBackdrop variant="dark" />
      {/* Okunabilirlik için yumuşak koyulaştırma */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,rgb(var(--c-botanic)/0.35),rgb(var(--c-botanic)/0.8))]"
      />

      <div className="container-fluid relative z-10 pb-16 pt-32 md:pb-20 md:pt-40">
        {overline && (
          <p className="kicker text-cream/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-lemon" />
            {overline}
          </p>
        )}
        <h1 className="mt-3 max-w-[18ch] font-display text-fluid-h2 leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl text-fluid-lead text-cream/80">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
