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
  MessageCircle,
  ArrowRight,
  LayoutGrid,
  Scissors,
  Palette,
  MapPin,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Expo ease-out: arranca rápido, asienta perfecto. Sensación de lujo.
const EXPO = [0.16, 1, 0.3, 1] as const;

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

  const prefersReducedMotion = useReducedMotion();

  // Cuando el usuario prefiere sin movimiento, todos los elementos aparecen directo.
  const instant = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: {} }
    : {};

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — Secuencia coreografiada en 5 actos
          Acto 1 (0–600ms):   Fondo + overlay
          Acto 2 (300ms):     Badge de ubicación
          Acto 3 (450–700ms): Headline word-by-word
          Acto 4 (800ms):     Divider + subtítulo
          Acto 5 (1000–1200ms): Search + CTA
      ══════════════════════════════════════ */}
      <section className="relative text-white overflow-hidden min-h-[92vh] flex items-center">

        {/* Acto 1a — Fondo: Ken Burns suave (scale 1.06 → 1.00) */}
        <motion.div
          className="absolute inset-0"
          initial={prefersReducedMotion ? {} : { scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            backgroundImage: "url('/hero-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Acto 1b — Overlay degradado: más profundidad que un flat black */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/62 to-black/85"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {/* Grain texture — añade materialidad orgánica al fondo */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />

        {/* Contenido centrado */}
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center w-full">

          {/* Acto 2 — Badge de ubicación: slide desde la izquierda */}
          <motion.div
            className="inline-flex items-center gap-2 mb-7"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EXPO }}
          >
            <motion.span
              className="flex items-center gap-1.5 text-amber-400/90 font-semibold text-[11px] uppercase tracking-[0.28em]"
            >
              <MapPin size={11} className="text-amber-400" />
              San Jorge · Santa Fe · Argentina
            </motion.span>
            {/* Línea decorativa derecha */}
            <motion.span
              className="block h-px bg-amber-400/40 w-12"
              initial={prefersReducedMotion ? {} : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: EXPO }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Acto 3 — Headline: word-by-word wipe desde abajo */}
          <motion.div
            className="mb-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.085,
                  delayChildren: prefersReducedMotion ? 0 : 0.42,
                },
              },
            }}
          >
            <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
              {["Maderera", "Don", "Antonio"].map((word) => (
                <span key={word} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden:  { y: "108%", opacity: 0 },
                      visible: {
                        y: "0%",
                        opacity: 1,
                        transition: { duration: 0.62, ease: EXPO },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                  {/* Espacio entre palabras */}
                  <span className="inline-block w-[0.22em]" aria-hidden />
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Acto 4a — Divider: scale desde el centro */}
          <motion.div
            className="mx-auto mb-6 h-px max-w-[220px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(251,191,36,0.6), transparent)",
              transformOrigin: "center",
            }}
            initial={prefersReducedMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.82, ease: EXPO }}
          />

          {/* Acto 4b — Subtítulo */}
          <motion.p
            className="text-base md:text-lg text-white/75 mb-10 max-w-md mx-auto leading-relaxed"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 11 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: EXPO }}
          >
            Pisos flotantes, espejos LED, muebles artesanales y materiales de construcción.
          </motion.p>

          {/* Acto 5a — Barra de búsqueda */}
          <motion.div
            className="relative max-w-xl mx-auto mb-5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.02, ease: EXPO }}
          >
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Buscá un producto (piso, espejo, machimbre...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/96 text-da-dark placeholder-gray-400 text-sm shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow duration-300"
            />
          </motion.div>

          {/* Acto 5b — CTA: scale + fade, último en aparecer */}
          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-colors duration-300"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 1.18, ease: EXPO }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={18} />
            Consultá por WhatsApp
          </motion.a>

          {/* Scroll indicator — aparece al final de la secuencia */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">scroll</span>
            <motion.div
              className="w-px h-6 bg-gradient-to-b from-white/50 to-transparent"
              animate={prefersReducedMotion ? {} : { scaleY: [1, 0.4, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-10 bg-da-cream"
      >
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
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden:  { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
                    }}
                    whileHover={{ y: -8, boxShadow: "0 20px 30px -6px rgba(0,0,0,0.12)" }}
                    className="group bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-md hover:border-amber-400/50 overflow-hidden flex flex-col"
                  >
                    {/* Image or gradient */}
                    <Link href={product.href} className="block shrink-0 overflow-hidden">
                      <div className="relative aspect-[4/3]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain bg-gray-50 transition-transform duration-500 ease-in-out group-hover:scale-105"
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
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-500 ease-in-out hover:shadow-md"
                      >
                        <MessageCircle size={15} />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          )}

          {/* Ver catálogos completos */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center border-t border-wood-200 pt-8">
            <Link href="/espejos-artesanales" className="inline-flex items-center gap-1 text-sm text-wood-600 hover:text-amber-600 font-medium transition-colors duration-500 ease-in-out">
              Ver todos los espejos <ArrowRight size={14} />
            </Link>
            <Link href="/articulos-hogar" className="inline-flex items-center gap-1 text-sm text-wood-600 hover:text-amber-600 font-medium transition-colors duration-500 ease-in-out">
              Ver todos los muebles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── TAMBIÉN OFRECEMOS ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-12 bg-white border-t border-wood-200"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-da-dark mb-6">También ofrecemos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otrosServicios.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-xl border border-wood-200 bg-da-cream hover:border-amber-400 hover:shadow-md transition-all duration-500 ease-in-out hover:-translate-y-0.5"
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
      </motion.section>

      {/* ── CTA FINAL ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-14 bg-wood-800 text-white text-center"
      >
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
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          <MessageCircle size={20} />
          Consultá por WhatsApp
        </a>
      </motion.section>
    </>
  );
}
