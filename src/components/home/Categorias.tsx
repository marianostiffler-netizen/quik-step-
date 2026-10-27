import Image from "next/image";
import Link from "next/link";
import { Hammer } from "lucide-react";
import { categories } from "@/data/site-data";
import { melaminas } from "@/data/melaminas-data";
import { mirrors } from "@/data/espejos-inteligentes-data";
import { formatearPrecio, precioDesde } from "@/lib/precios";

type Item = {
  nombre: string;
  href: string;
  imagen?: string;
  detalle?: string;
  precio: string | null;
};

const pisosDesde = precioDesde(categories.map((c) => c.specs_summary.price_usd_m2));
const espejosDesde = precioDesde(mirrors.map((m) => m.price_ars));

const items: Item[] = [
  {
    nombre: "Pisos flotantes",
    href: "/pisos-flotantes",
    imagen: "/products/ambientes/Smart-0314-01.webp",
    precio: pisosDesde !== null ? `desde ${formatearPrecio(pisosDesde, "USD")}/m²` : null,
  },
  {
    nombre: "Construcción y maderas",
    href: "/construccion-y-maderas",
    imagen: "/hero-background.webp",
    detalle: "Machimbres, tirantes y tablas",
    precio: null,
  },
  { nombre: "Melaminas", href: "/melaminas", imagen: melaminas[0]?.imagen, precio: null },
  {
    nombre: "Espejos LED",
    href: "/espejos-inteligentes",
    imagen: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).webp",
    precio: espejosDesde !== null ? `desde ${formatearPrecio(espejosDesde, "ARS")} c/u` : null,
  },
  {
    nombre: "Artículos del hogar",
    href: "/articulos-hogar",
    imagen: "/products/hogar/KxgNg.webp",
    precio: null,
  },
  { nombre: "Servicios", href: "/servicios", detalle: "Cepillado y lijado", precio: null },
];

export default function Categorias() {
  return (
    <section id="categorias" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Comprá por categoría</h2>
        <p className="mt-3 text-nogal-suave">Elegí el rubro y consultá medidas, precios y disponibilidad.</p>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="tarjeta overflow-hidden block transition hover:border-algarrobo hover:shadow-md"
            >
              {it.imagen ? (
                <Image
                  src={it.imagen}
                  alt=""
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="w-full aspect-[4/3] object-cover"
                />
              ) : (
                <div className="aspect-[4/3] bg-veta flex items-center justify-center text-algarrobo">
                  <Hammer size={56} aria-hidden="true" />
                </div>
              )}
              <div className="p-4 md:p-5">
                <h3 className="font-display text-lg md:text-xl font-bold text-nogal">{it.nombre}</h3>
                {it.detalle && <p className="mt-1 text-sm text-nogal-suave">{it.detalle}</p>}
                {it.precio ? (
                  <p className="mt-1 font-semibold text-precio tabular-nums">{it.precio}</p>
                ) : (
                  <p className="mt-1 text-sm text-nogal-suave">Consultá precio</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
