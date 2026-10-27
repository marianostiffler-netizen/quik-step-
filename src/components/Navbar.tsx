"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/site-data";
import { waLink } from "@/config/negocio";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cierra el menú mobile al cambiar de ruta (ajuste de estado durante el render)
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setMobileOpen(false);
  }

  // Escape cierra el menú y devuelve el foco al botón (listener solo mientras está abierto)
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-superficie border-b border-veta">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex min-h-11 items-center gap-2.5">
            <Image
              src="/logo-maderera.webp"
              alt="Maderera Don Antonio Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <div className="leading-tight">
              <span className="block font-display text-nogal font-bold text-sm tracking-wide">
                MADERERA
              </span>
              <span className="block font-display text-algarrobo text-xs font-semibold -mt-0.5 tracking-widest">
                DON ANTONIO
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`inline-flex min-h-11 items-center text-sm font-medium transition-colors hover:text-algarrobo ${
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-algarrobo"
                    : "text-nogal-suave"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waLink("Hola! Quisiera hacer una consulta.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center text-nogal hover:text-algarrobo"
            aria-label="Menú"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="menu-mobile" className="lg:hidden border-t border-veta bg-superficie">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-11 items-center px-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "bg-pino text-algarrobo"
                    : "text-nogal-suave hover:bg-pino"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
