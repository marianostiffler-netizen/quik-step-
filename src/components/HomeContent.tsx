"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Layers,
  Hammer,
  Sparkles,
  Armchair,
  Wrench,
  MessageCircle,
  ArrowRight,
  LayoutGrid,
  Scissors,
  Palette,
} from "lucide-react";

const WA_NUMBER = "5493000000000"; // TODO: Reemplazá con el número real de WhatsApp

const waLink = (productName?: string) => {
  const text = productName
    ? `Hola! Me interesa consultar sobre: ${productName}`
    : "Hola! Quisiera hacer una consulta sobre sus productos.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
};

type IconProps = { size?: number; className?: string };

const categoryFilters: Array<{
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
}> = [
  { id: "todo", label: "Todo", icon: LayoutGrid },
  { id: "espejos", label: "Espejos LED", icon: Sparkles },
  { id: "hogar", label: "Artículos del Hogar", icon: Armchair },
];

const otrosServicios: Array<{
  label: string;
  description: string;
  href: string;
  icon: ComponentType<IconProps>;
  color: string;
}> = [
  { label: "Pisos Flotantes", description: "Quick-Step AC4/AC5. Hydroseal y Uniclic.", href: "/pisos-flotantes", icon: Layers, color: "bg-amber-500" },
  { label: "Construcción y Maderas", description: "Machimbres, tirantería y materiales de obra.", href: "/construccion-y-maderas", icon: Hammer, color: "bg-wood-600" },
  { label: "Cielorrasos", description: "Placas en distintos tonos y terminaciones.", href: "/cielorrasos", icon: Layers, color: "bg-wood-500" },
  { label: "Servicios", description: "Cepillado, cortes y lijado profesional.", href: "/servicios", icon: Scissors, color: "bg-forest-600" },
  { label: "Melaminas Faplac", description: "Muestrario completo: Mesopotamia y Táctil.", href: "/melaminas", icon: Palette, color: "bg-purple-600" },
];

type ProductItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryLabel: string;
  categoryBadge: string;
  href: string;
  image: string;
};

const featuredProducts: ProductItem[] = [
  {
    id: "espejo-1",
    name: "Espejo LED N°1",
    description: "Rectangular horizontal con borde curvo, 80×130 cm. Desempañador y sensor de movimiento.",
    category: "espejos",
    categoryLabel: "Espejos LED",
    categoryBadge: "bg-violet-100 text-violet-700",
    href: "/espejos-artesanales",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).jpeg",
  },
  {
    id: "espejo-2",
    name: "Espejo LED N°2",
    description: "Rectangular vertical, 70×90 cm. LED 3 tonos y regulador de intensidad.",
    category: "espejos",
    categoryLabel: "Espejos LED",
    categoryBadge: "bg-violet-100 text-violet-700",
    href: "/espejos-artesanales",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (2).jpeg",
  },
  {
    id: "espejo-3",
    name: "Espejo LED N°3 Circular",
    description: "Diseño circular 80×80 cm. LED 3 tonos, desempañador y display LCD con hora.",
    category: "espejos",
    categoryLabel: "Espejos LED",
    categoryBadge: "bg-violet-100 text-violet-700",
    href: "/espejos-artesanales",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38.jpeg",
  },
  {
    id: "espejo-4",
    name: "Espejo LED N°4",
    description: "Rectangular horizontal, 90×70 cm. Sensor de movimiento y desempañador integrado.",
    category: "espejos",
    categoryLabel: "Espejos LED",
    categoryBadge: "bg-violet-100 text-violet-700",
    href: "/espejos-artesanales",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39 (1).jpeg",
  },
  {
    id: "mesa-ratona-clara",
    name: "Mesa Ratona Minimalista - Madera Clara",
    description: "Mesa baja de diseño moderno en madera clara.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (1).jpeg",
  },
  {
    id: "mesa-ratona-gris",
    name: "Mesa Ratona Minimalista - Gris",
    description: "Mesa baja de diseño moderno en tono gris.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (2).jpeg",
  },
  {
    id: "mesa-ratona-negra",
    name: "Mesa Ratona Minimalista - Negra",
    description: "Mesa baja de diseño moderno en tono negro.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42.jpeg",
  },
  {
    id: "banco-blanco",
    name: "Banco Blanco",
    description: "Banco de madera con acabado blanco, versátil para distintos ambientes del hogar.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/banco blanco.png",
  },
  {
    id: "estanteria-pino",
    name: "Estantería de Pino",
    description: "Estantería artesanal de Pino cepillado para organización y decoración del hogar.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/KxgNg.jpg",
  },
  {
    id: "vanitory-pino",
    name: "Vanitory de Pino",
    description: "Mueble de apoyo artesanal de Pino. Ideal para baño o como tocador.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.40.jpeg",
  },
  {
    id: "mueble-sala",
    name: "Mueble de Sala",
    description: "Mueble artesanal en madera de calidad, ideal para living o sala de estar.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/585346193_1369242518229953_6634413815702805960_n.jpg",
  },
  {
    id: "comedor-madera",
    name: "Comedor de Madera",
    description: "Comedor robusto en madera tratada, ideal para uso diario y reuniones familiares.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/646197206_1452442863243251_6173634275258237884_n.jpg",
  },
  {
    id: "rack-tv",
    name: "Rack de TV",
    description: "Rack en madera natural con espacio para equipo y almacenamiento.",
    category: "hogar",
    categoryLabel: "Artículos del Hogar",
    categoryBadge: "bg-green-100 text-green-700",
    href: "/articulos-hogar",
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44.jpeg",
  },
];

export default function HomeContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todo");

  const filtered = featuredProducts.filter((p) => {
    const matchCat = activeCategory === "todo" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-amber-400 font-semibold text-xs uppercase tracking-widest mb-3">
            San Jorge, Santa Fe, Argentina
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-3">
            Maderera Don Antonio
          </h1>
          <p className="text-base text-white/75 mb-8 max-w-xl mx-auto">
            Pisos flotantes, espejos LED, muebles artesanales y materiales de construcción.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Buscá un producto (piso, espejo, machimbre...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-white text-da-dark placeholder-gray-400 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* WhatsApp CTA */}
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors shadow-lg"
          >
            <MessageCircle size={18} />
            Consultá por WhatsApp
          </a>
        </div>
      </section>

      {/* ── CATEGORY PILLS ── */}
      <section className="bg-white border-b border-wood-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {categoryFilters.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-white text-wood-700 border-wood-200 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="py-10 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-da-gray">
              <Search size={48} className="mx-auto mb-4 opacity-25" />
              <p className="text-lg font-medium">Sin resultados para &ldquo;{search}&rdquo;</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("todo"); }}
                className="mt-4 text-amber-600 hover:underline text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-wood-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-amber-400/50 transition-all duration-300 flex flex-col"
                  >
                    {/* Image or gradient */}
                    <Link href={product.href} className="block shrink-0">
                      <div className="relative aspect-[4/3]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain bg-gray-50"
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                      </div>
                    </Link>

                    {/* Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <span
                        className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${product.categoryBadge}`}
                      >
                        {product.categoryLabel}
                      </span>
                      <h3 className="font-bold text-da-dark text-base leading-snug mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-da-gray leading-relaxed mb-4 flex-1">
                        {product.description}
                      </p>
                      <a
                        href={waLink(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-xl transition-colors"
                      >
                        <MessageCircle size={15} />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </div>
              ))}
            </div>
          )}

          {/* Ver catálogos completos */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center border-t border-wood-200 pt-8">
            <Link href="/espejos-artesanales" className="inline-flex items-center gap-1 text-sm text-wood-600 hover:text-amber-600 font-medium transition-colors">
              Ver todos los espejos <ArrowRight size={14} />
            </Link>
            <Link href="/articulos-hogar" className="inline-flex items-center gap-1 text-sm text-wood-600 hover:text-amber-600 font-medium transition-colors">
              Ver todos los muebles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TAMBIÉN OFRECEMOS ── */}
      <section className="py-12 bg-white border-t border-wood-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-da-dark mb-6">También ofrecemos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otrosServicios.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-wood-200 bg-da-cream hover:border-amber-400 hover:shadow-sm transition-all"
                >
                  <div className={`shrink-0 w-9 h-9 ${item.color} rounded-lg flex items-center justify-center`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-da-dark group-hover:text-wood-600 leading-snug">{item.label}</p>
                    <p className="text-xs text-da-gray mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-14 bg-wood-800 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          ¿No encontrás lo que buscás?
        </h2>
        <p className="text-wood-300 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
          Escribinos por WhatsApp y te asesoramos con tu proyecto. Presupuestos sin compromiso.
        </p>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors shadow-lg"
        >
          <MessageCircle size={20} />
          Consultá por WhatsApp
        </a>
      </section>
    </>
  );
}
