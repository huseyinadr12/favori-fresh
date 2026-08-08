import { cn } from "@/lib/utils";

/**
 * İki bölüm rengi arasında çapraz (diagonal) geçiş.
 * Normal akışta duran, içeriğe müdahale etmeyen ince bir bant; üst renk
 * clip-path ile eğik kesilerek alttaki renge çapraz bir geçiş oluşturur.
 * `flip` ile eğim yönü değişir (bölümler boyunca ritim için).
 */
export function AngledDivider({
  topClass,
  bottomClass,
  flip = false,
}: {
  topClass: string;
  bottomClass: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative -my-px h-[6vw] max-h-24 min-h-[44px] w-full", bottomClass)}
    >
      <div
        className={cn("absolute inset-0", topClass)}
        style={{
          clipPath: flip
            ? "polygon(0 0, 100% 0, 100% 100%)"
            : "polygon(0 0, 100% 0, 0 100%)",
        }}
      />
    </div>
  );
}
