/**
 * Hafif analitik köprüsü. GTM/GA eklendiğinde window.dataLayer'a event yazar;
 * yoksa sessizce geçer. Kurulum gerektirmeden çağrılabilir.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}
