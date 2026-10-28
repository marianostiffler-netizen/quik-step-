"use client";

import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Chrome global del sitio (Navbar + Footer)
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </MotionConfig>
  );
}
