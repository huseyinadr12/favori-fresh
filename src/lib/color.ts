/** Hex rengi [r,g,b] (0-255) olarak çözer. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** İki hex rengi t (0..1) oranında karıştırır → "r g b" (CSS değişkeni için). */
export function mixRgbString(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const m = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return `${m[0]} ${m[1]} ${m[2]}`;
}

/** İki hex rengi karıştırıp hex döndürür (3D materyaller için). */
export function mixHex(a: string, b: string, t: number): string {
  const rgb = mixRgbString(a, b, t)
    .split(" ")
    .map((v) => parseInt(v, 10));
  return `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));
