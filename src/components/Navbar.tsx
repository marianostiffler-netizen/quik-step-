"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { waLink } from "@/config/negocio";
import { proyectos } from "@/data/proyectos";
import type { Grupo } from "@/data/catalogo";
import { useDialogA11y } from "@/components/useDialogA11y";

const MENSAJE_WA = "Hola! Quisiera hacer una consulta.";
const SLUG_CONSTRUCCION = "maderas-y-construccion";

function Buscador({ className = "", idInput }: { className?: string; idInput: string }) {
  return (
    <form role="search" action="/buscar" method="get" className={`relative ${className}`}>
      <label htmlFor={idInput} className="sr-only">
        Buscar productos
      </label>
      <input
        id={idInput}
        name="q"
        type="search"
        placeholder="Buscar productos"
        autoComplete="off"
        className="min-h-11 w-full rounded-lg border border-veta bg-pino pl-4 pr-12 text-sm text-nogal placeholder:text-nogal-suave focus-visible:outline-2 focus-visible:outline-algarrobo"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-0 top-0 inline-flex min-h-11 min-w-11 items-center justify-center text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
  );
}

function ListaProyectos({ onNavigate, className = "" }: { onNavigate?: () => void; className?: string }) {
  return (
    <ul className={className}>
      {proyectos.map(({ titulo, href }) => (
        <li key={titulo}>
          <Link
            href={href}
            onClick={onNavigate}
            className="inline-flex min-h-11 items-center text-sm text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
          >
            {titulo}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Navbar({ grupos, conteos }: { grupos: Grupo[]; conteos: Record<string, number> }) {
  const pathname = usePathname();
  const idBase = useId();
  const [abierto, setAbierto] = useState<string | null>(null); // grupo con panel desktop abierto
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seccionMobile, setSeccionMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const botonesRef = useRef<Record<string, HTMLButtonElement | null>>({});

  // Cierra todo al cambiar de ruta (ajuste de estado durante el render)
  const [rutaPrevia, setRutaPrevia] = useState(pathname);
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(null);
    setMobileOpen(false);
  }

  const panelMobileRef = useDialogA11y(mobileOpen, () => setMobileOpen(false));

  // Desktop: Escape (devuelve el foco al botón) y clic afuera, solo mientras hay un panel abierto
  useEffect(() => {
    if (!abierto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        botonesRef.current[abierto]?.focus();
        setAbierto(null);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setAbierto(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [abierto]);

  const cerrarTodo = () => {
    setAbierto(null);
    setMobileOpen(false);
  };

  const enGrupo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const linkSecundario = (href: string) =>
    `inline-flex min-h-11 items-center text-xs font-medium transition-colors hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo ${
      pathname.startsWith(href) ? "text-algarrobo" : "text-nogal-suave"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-veta bg-superficie">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex min-h-11 shrink-0 items-center gap-2.5">
            <Image src="/logo-maderera.webp" alt="Maderera Don Antonio Logo" width={32} height={32} className="rounded" />
            <div className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-wide text-nogal">MADERERA</span>
              <span className="-mt-0.5 block font-display text-xs font-semibold tracking-widest text-algarrobo">DON ANTONIO</span>
            </div>
          </Link>

          {/* Buscador (desktop) */}
          <Buscador className="hidden max-w-md flex-1 lg:block" idInput={`${idBase}-buscar-desktop`} />

          <div className="flex items-center gap-2">
            <a
              href={waLink(MENSAJE_WA)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp hidden text-sm lg:inline-flex"
            >
              WhatsApp
            </a>
            {/* Hamburguesa (mobile) */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-nogal hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo lg:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
            >
              {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Menú desktop: grupos con desplegable + links secundarios */}
        <nav aria-label="Principal" className="hidden lg:block">
          <div ref={navRef} className="relative flex items-center justify-between">
            <ul className="flex items-center gap-1">
              {grupos.map((g) => {
                const open = abierto === g.slug;
                return (
                  <li key={g.slug}>
                    <button
                      type="button"
                      ref={(el) => {
                        botonesRef.current[g.slug] = el;
                      }}
                      aria-expanded={open}
                      aria-controls={`${idBase}-panel-${g.slug}`}
                      onClick={() => setAbierto(open ? null : g.slug)}
                      className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo ${
                        open || enGrupo(g.href) ? "text-algarrobo" : "text-nogal"
                      }`}
                    >
                      {g.nombre}
                      <ChevronDown size={14} aria-hidden="true" className={open ? "rotate-180" : ""} />
                    </button>
                  </li>
                );
              })}
            </ul>
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/servicios" className={linkSecundario("/servicios")}>
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className={linkSecundario("/contacto")}>
                  Contacto
                </Link>
              </li>
            </ul>

            {grupos.map((g) => (
              <div
                key={g.slug}
                id={`${idBase}-panel-${g.slug}`}
                hidden={abierto !== g.slug}
                className="absolute left-0 right-0 top-full z-10"
              >
                <div className="tarjeta mt-1 grid gap-8 p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                      {g.categorias.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="flex min-h-11 items-center justify-between gap-3 text-sm font-semibold text-nogal hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
                          >
                            {c.nombre}
                            <span className="text-xs font-medium text-nogal-suave tabular-nums">{conteos[c.href] ?? 0}</span>
                          </Link>
                          {c.subcategorias && (
                            <ul className="mb-2 ml-3 border-l border-veta pl-3">
                              {c.subcategorias.map((s) => (
                                <li key={s.href}>
                                  <Link
                                    href={s.href}
                                    className="flex min-h-11 items-center justify-between gap-3 text-sm text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
                                  >
                                    {s.nombre}
                                    <span className="text-xs tabular-nums">{conteos[s.href] ?? 0}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={g.href}
                      className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-algarrobo underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-algarrobo"
                    >
                      Ver todo {g.nombre}
                    </Link>
                  </div>
                  {g.slug === SLUG_CONSTRUCCION && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-nogal-suave">Por proyecto</p>
                      <ListaProyectos className="mt-2" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Panel mobile */}
      {mobileOpen && (
        <div
          id="menu-mobile"
          ref={panelMobileRef}
          role="dialog"
          aria-label="Menú"
          className="absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-veta bg-superficie px-4 py-4 shadow-lg lg:hidden"
        >
          <Buscador idInput={`${idBase}-buscar-mobile`} />
          <nav aria-label="Menú principal" className="mt-4">
            <ul>
              {grupos.map((g) => {
                const open = seccionMobile === g.slug;
                return (
                  <li key={g.slug} className="border-b border-veta">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`${idBase}-mobile-${g.slug}`}
                      onClick={() => setSeccionMobile(open ? null : g.slug)}
                      className="flex min-h-11 w-full items-center justify-between text-left text-sm font-semibold text-nogal focus-visible:outline-2 focus-visible:outline-algarrobo"
                    >
                      {g.nombre}
                      <ChevronDown size={16} aria-hidden="true" className={open ? "rotate-180" : ""} />
                    </button>
                    <ul id={`${idBase}-mobile-${g.slug}`} hidden={!open} className="pb-2 pl-3">
                      {g.categorias.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={cerrarTodo}
                            className="flex min-h-11 items-center justify-between text-sm text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
                          >
                            {c.nombre}
                            <span className="text-xs tabular-nums">{conteos[c.href] ?? 0}</span>
                          </Link>
                          {c.subcategorias && (
                            <ul className="ml-3 border-l border-veta pl-3">
                              {c.subcategorias.map((s) => (
                                <li key={s.href}>
                                  <Link
                                    href={s.href}
                                    onClick={cerrarTodo}
                                    className="flex min-h-11 items-center justify-between text-sm text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
                                  >
                                    {s.nombre}
                                    <span className="text-xs tabular-nums">{conteos[s.href] ?? 0}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      <li>
                        <Link
                          href={g.href}
                          onClick={cerrarTodo}
                          className="inline-flex min-h-11 items-center text-sm font-semibold text-algarrobo underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-algarrobo"
                        >
                          Ver todo {g.nombre}
                        </Link>
                      </li>
                    </ul>
                  </li>
                );
              })}
              <li className="border-b border-veta">
                <button
                  type="button"
                  aria-expanded={seccionMobile === "proyectos"}
                  aria-controls={`${idBase}-mobile-proyectos`}
                  onClick={() => setSeccionMobile(seccionMobile === "proyectos" ? null : "proyectos")}
                  className="flex min-h-11 w-full items-center justify-between text-left text-sm font-semibold text-nogal focus-visible:outline-2 focus-visible:outline-algarrobo"
                >
                  Por proyecto
                  <ChevronDown size={16} aria-hidden="true" className={seccionMobile === "proyectos" ? "rotate-180" : ""} />
                </button>
                <div id={`${idBase}-mobile-proyectos`} hidden={seccionMobile !== "proyectos"} className="pb-2 pl-3">
                  <ListaProyectos onNavigate={cerrarTodo} />
                </div>
              </li>
              <li>
                <Link href="/servicios" onClick={cerrarTodo} className="flex min-h-11 items-center text-sm font-medium text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" onClick={cerrarTodo} className="flex min-h-11 items-center text-sm font-medium text-nogal-suave hover:text-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
          <a
            href={waLink(MENSAJE_WA)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-4 w-full justify-center text-sm"
          >
            Escribinos por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
