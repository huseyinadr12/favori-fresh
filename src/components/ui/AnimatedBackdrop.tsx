import { cn } from "@/lib/utils";

/**
 * Canlı arka plan (living wallpaper).
 * Yavaşça sürüklenen, blur'lu meyve rengi ışık lekeleri + hafif dönen aurora.
 * Saf CSS (transform/opacity) — performanslı; hareket azaltmada global kuralla donar.
 *
 * variant:
 *  - "dark"  : koyu botanik yüzeyler için (hero, üretim/hikâye başlıkları)
 *  - "light" : krem yüzeyler için (daha yumuşak, düşük opaklık)
 */
export function AnimatedBackdrop({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const dark = variant === "dark";
  const orbOpacity = dark ? "opacity-100" : "opacity-60";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Yavaş dönen aurora — çok düşük opaklık */}
      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          animation: "ff-aurora-spin 60s linear infinite",
          background: dark
            ? "conic-gradient(from 0deg, transparent, rgb(var(--c-brand-green) / 0.22), transparent 40%, rgb(var(--c-lemon) / 0.12), transparent 70%)"
            : "conic-gradient(from 0deg, transparent, rgb(var(--c-brand-green) / 0.08), transparent 55%, rgb(var(--c-lemon) / 0.06), transparent)",
          filter: "blur(40px)",
        }}
      />

      {/* Sürüklenen ışık lekeleri */}
      <div className={cn("absolute inset-0", orbOpacity)}>
        <span
          className="absolute -left-[10%] top-[4%] h-[46vmin] w-[46vmin] rounded-full blur-3xl will-change-transform"
          style={{
            animation: "ff-drift-a 26s ease-in-out infinite",
            background:
              "radial-gradient(circle, rgb(var(--c-lemon) / 0.5), transparent 70%)",
          }}
        />
        <span
          className="absolute right-[-8%] top-[28%] h-[42vmin] w-[42vmin] rounded-full blur-3xl will-change-transform"
          style={{
            animation: "ff-drift-b 32s ease-in-out infinite",
            background:
              "radial-gradient(circle, rgb(var(--c-orange) / 0.42), transparent 70%)",
          }}
        />
        <span
          className="absolute bottom-[-14%] left-[30%] h-[50vmin] w-[50vmin] rounded-full blur-3xl will-change-transform"
          style={{
            animation: "ff-drift-c 30s ease-in-out infinite",
            background:
              "radial-gradient(circle, rgb(var(--c-pomegranate) / 0.32), transparent 70%)",
          }}
        />
        <span
          className="absolute right-[18%] bottom-[6%] h-[36vmin] w-[36vmin] rounded-full blur-3xl will-change-transform"
          style={{
            animation: "ff-drift-a 34s ease-in-out infinite reverse",
            background:
              "radial-gradient(circle, rgb(var(--c-brand-green) / 0.5), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
