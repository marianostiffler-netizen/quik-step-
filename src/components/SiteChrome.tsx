"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Chrome global del sitio (Navbar + Footer).
 *
 * Se oculta en las rutas que traen su propia navegación (ej: la landing
 * premium en /landing, que define su propio navbar fijo). El resto del
 * sitio se comporta exactamente igual que antes.
 */
const FULLSCREEN_ROUTES = ["/landing"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = FULLSCREEN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isFullscreen) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
