"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inicializa Lenis para smooth scroll en toda la página.
 *
 * Lenis modifica la posición real de scroll del documento (no usa transforms),
 * por lo que framer-motion `useScroll` sigue funcionando sin configuración extra.
 *
 * Se desactiva cuando el usuario pidió `prefers-reduced-motion: reduce`.
 */
export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
}
