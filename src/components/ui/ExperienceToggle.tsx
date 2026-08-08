"use client";

import { useMotion } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

/**
 * Kullanıcının 3D/sinematik deneyimi kapatabilmesini sağlar.
 * WebGL yoksa gizlenir (zaten fallback devrede).
 */
export function ExperienceToggle({ className }: { className?: string }) {
  const { experienceEnabled, setExperienceEnabled, webglSupported } =
    useMotion();

  if (!webglSupported) return null;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={experienceEnabled}
      onClick={() => setExperienceEnabled(!experienceEnabled)}
      className={cn(
        "inline-flex items-center gap-3 text-sm text-current/80 transition-colors hover:text-current",
        className,
      )}
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full border transition-colors",
          experienceEnabled
            ? "border-brand-green bg-brand-green/20"
            : "border-current/30 bg-current/5",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-current transition-all duration-300 ease-fluid",
            experienceEnabled ? "left-[22px] bg-brand-green" : "left-0.5",
          )}
        />
      </span>
      3D deneyim {experienceEnabled ? "açık" : "kapalı"}
    </button>
  );
}
