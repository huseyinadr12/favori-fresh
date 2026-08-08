import { clsx, type ClassValue } from "clsx";
import type { CSSProperties } from "react";
import type { AccentKey } from "@/lib/types";

/** Tailwind sınıflarını koşullu birleştirir. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Ürün vurgu anahtarını "R G B" üçlüsüne çevirir.
 * globals.css'teki --c-* değişkenleriyle senkron tutulmalıdır.
 */
export const accentRgb: Record<AccentKey, string> = {
  lemon: "224 188 44",
  mandarin: "232 133 45",
  orange: "236 116 28",
  pomegranate: "168 32 45",
  mulberry: "94 42 92",
  grapefruit: "226 96 104",
};

/** CSS custom property'lerini tip güvenli biçimde style objesine çevirir. */
export function cssVars(
  vars: Record<string, string | number>,
): CSSProperties {
  return vars as CSSProperties;
}

/** Aktif vurgu rengini CSS değişkenine yazan style objesi. */
export function accentStyle(accent: AccentKey): CSSProperties {
  return cssVars({ "--c-accent": accentRgb[accent] });
}
