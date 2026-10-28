"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// Chrome global del sitio: header y footer llegan como slots (server components)
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </MotionConfig>
  );
}
