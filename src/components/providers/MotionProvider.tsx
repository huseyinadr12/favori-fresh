"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { detectWebGL } from "@/lib/webgl";

interface MotionState {
  /** İşletim sistemi düzeyinde hareket azaltma tercihi. */
  prefersReducedMotion: boolean;
  /** Cihaz WebGL destekliyor mu. */
  webglSupported: boolean;
  /** Kullanıcının açık tercihiyle 3D deneyim aktif mi. */
  experienceEnabled: boolean;
  /** 3D deneyimi aç/kapat. */
  setExperienceEnabled: (v: boolean) => void;
  /**
   * Ağır 3D sahneler render edilmeli mi?
   * WebGL var + reduced-motion yok + kullanıcı kapatmamış.
   */
  shouldRender3D: boolean;
}

const MotionContext = createContext<MotionState | null>(null);

const STORAGE_KEY = "ff-experience-enabled";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);
  const [experienceEnabled, setExperienceEnabledState] = useState(true);

  useEffect(() => {
    // Hareket azaltma tercihini dinle.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);

    // WebGL desteği.
    setWebglSupported(detectWebGL());

    // Kullanıcının kayıtlı tercihi (varsa reduced-motion'ı bile ezebilir/kapatabilir).
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setExperienceEnabledState(stored === "true");
    else if (mq.matches) setExperienceEnabledState(false); // reduced-motion → varsayılan kapalı

    return () => mq.removeEventListener("change", update);
  }, []);

  const setExperienceEnabled = useCallback((v: boolean) => {
    setExperienceEnabledState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(v));
    } catch {
      /* storage engellenmişse sessizce geç */
    }
  }, []);

  const shouldRender3D = useMemo(
    () => webglSupported && experienceEnabled && !prefersReducedMotion,
    [webglSupported, experienceEnabled, prefersReducedMotion],
  );

  const value = useMemo<MotionState>(
    () => ({
      prefersReducedMotion,
      webglSupported,
      experienceEnabled,
      setExperienceEnabled,
      shouldRender3D,
    }),
    [
      prefersReducedMotion,
      webglSupported,
      experienceEnabled,
      setExperienceEnabled,
      shouldRender3D,
    ],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion(): MotionState {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion, MotionProvider içinde kullanılmalıdır.");
  return ctx;
}
