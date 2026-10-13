"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: 0 | 100 | 200 | 300 | 500;
  className?: string;
  /** Si true, anima en cuanto monta (sin esperar scroll). Útil para hero. */
  immediate?: boolean;
  as?: "div" | "section" | "article";
};

/**
 * Wrapper liviano (sin librerías) que aplica fade-in-up cuando el elemento
 * entra al viewport. Usa IntersectionObserver y se desuscribe luego de animar.
 */
export function FadeInOnScroll({
  children,
  delay = 0,
  className = "",
  immediate = false,
  as: Tag = "div",
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(immediate);
  const supportsObserver = useSyncExternalStore(
    () => () => {},
    () => typeof IntersectionObserver !== "undefined",
    () => true
  );
  const shown = visible || !supportsObserver;

  useEffect(() => {
    // Si IntersectionObserver no existe (raro), se muestra sin animar (ver `shown`).
    if (immediate || !supportsObserver) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, supportsObserver]);

  const delayClass = delay ? ` delay-${delay}` : "";
  const classes = `fade-in-up${delayClass}${shown ? " is-visible" : ""} ${className}`.trim();

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={classes}>
      {children}
    </Tag>
  );
}
