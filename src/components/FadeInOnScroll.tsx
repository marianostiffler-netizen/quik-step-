"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInOnScrollProps = {
  children: ReactNode;
  delay?: 0 | 200 | 300 | 500;
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

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;

    // Si IntersectionObserver no existe (raro), mostramos sin animar.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

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
  }, [immediate]);

  const delayClass = delay ? ` delay-${delay}` : "";
  const classes = `fade-in-up${delayClass}${visible ? " is-visible" : ""} ${className}`.trim();

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={classes}>
      {children}
    </Tag>
  );
}
