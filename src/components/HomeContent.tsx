"use client";

import { useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
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
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

// Canvas se carga solo en el cliente (no tiene sentido en SSR)
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

// Expo ease-out: la curva más premium para reveals de alto impacto
const EXPO = [0.16, 1, 0.3, 1] as const;

// Variant reutilizable para stagger padre→hijo
const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EXPO },
  }),
};

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

  const rm = useReducedMotion();

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — Dark Atelier. Fullscreen, 2 columnas.
          Fondo: #0D0A08 + partículas canvas aserrín
          Izquierda: contenido coreografiado
          Derecha: tablón de madera 3D CSS
      ═══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden text-white"
        style={{ background: "#0D0A08" }}
      >
        {/* ── Canvas partículas aserrín (client-only) ── */}
        <HeroCanvas />

        {/* ── Foto de fondo: muy atenuada, solo da textura ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/hero-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />

        {/* ── Vignette: oscurece los bordes para profundidad ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* ── Grain orgánico (simula madera, no pantalla plana) ── */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.038]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px",
          }}
        />

        {/* ══════════ CONTENIDO PRINCIPAL ══════════ */}
        <div className="relative w-full mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-screen lg:min-h-0 lg:py-32">

            {/* ─────────── COLUMNA IZQUIERDA (60%) ─────────── */}
            <div className="flex-1 lg:max-w-[58%] w-full">

              {/* Badge de ubicación */}
              <motion.div
                initial={rm ? {} : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15, ease: EXPO }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400 border border-amber-500/25 bg-amber-500/8">
                  <span className="text-amber-500">◇</span>
                  San Jorge · Santa Fe · Argentina
                  <span className="text-amber-500">◇</span>
                </span>
              </motion.div>

              {/* Headline — word-by-word wipe desde abajo */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: rm ? 0 : 0.09,
                      delayChildren: rm ? 0 : 0.28,
                    },
                  },
                }}
                className="mb-7"
              >
                <h1
                  className="font-serif leading-[0.92] tracking-tight"
                  style={{
                    fontSize: "clamp(3.4rem, 9vw, 7.5rem)",
                    textShadow: "0 4px 60px rgba(200,149,106,0.25)",
                  }}
                >
                  {/* Línea 1 */}
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block"
                      variants={{
                        hidden:  { y: "110%", opacity: 0 },
                        visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EXPO } },
                      }}
                    >
                      Maderera
                    </motion.span>
                  </span>
                  {/* Línea 2 — color ámbar para contraste */}
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block text-amber-400"
                      variants={{
                        hidden:  { y: "110%", opacity: 0 },
                        visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EXPO } },
                      }}
                    >
                      Don Antonio
                    </motion.span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                className="text-lg text-white/55 font-light max-w-md leading-relaxed mb-9"
                custom={0.78}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                Pisos flotantes, espejos LED, muebles artesanales y materiales de construcción.
              </motion.p>

              {/* Search bar */}
              <motion.div
                className="relative max-w-lg mb-6"
                custom={0.92}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10"
                />
                <input
                  type="text"
                  placeholder="Buscá un producto (piso, espejo, machimbre...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 rounded-xl text-da-dark placeholder-gray-500 text-sm shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow duration-300"
                  style={{ background: "rgba(255,255,255,0.96)" }}
                />
              </motion.div>

              {/* CTA WhatsApp */}
              <motion.div
                custom={1.06}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-9"
              >
                <motion.a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors duration-300"
                  whileHover={rm ? {} : { scale: 1.03 }}
                  whileTap={rm ? {} : { scale: 0.97 }}
                >
                  <motion.span
                    animate={rm ? {} : { scale: [1, 1.18, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  >
                    <MessageCircle size={18} />
                  </motion.span>
                  Consultá por WhatsApp
                </motion.a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap gap-2.5"
                custom={1.18}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                {[
                  { emoji: "🪵", label: "Pisos Premium" },
                  { emoji: "🪞", label: "Espejos LED" },
                  { emoji: "🏗️", label: "Materiales" },
                ].map(({ emoji, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white/60 border border-white/10 bg-white/5"
                  >
                    <span>{emoji}</span>
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* ─────────── COLUMNA DERECHA (40%) — Tablón 3D ─────────── */}
            <motion.div
              className="hidden lg:flex flex-1 items-center justify-center lg:max-w-[38%] w-full"
              initial={rm ? {} : { opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: EXPO }}
            >
              <div className="relative" style={{ perspective: "1200px" }}>
                {/* Tablón principal */}
                <motion.div
                  className="relative w-64 xl:w-72 rounded-[18px] overflow-hidden cursor-default"
                  style={{
                    height: "420px",
                    rotateY: -14,
                    rotateX: 3,
                    transformPerspective: 1200,
                    boxShadow:
                      "40px 40px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.09)",
                  }}
                  animate={rm ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={rm ? {} : { rotateY: -5, rotateX: 1, transition: { duration: 0.5, ease: "easeOut" } }}
                >
                  {/* Capa 1 — base madera oscura */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(168deg, #4A2810 0%, #6B3A1F 9%, #3D1F0A 20%, #7A4828 32%, #2D1508 44%, #5C3218 55%, #3A1D09 67%, #6B3A1F 78%, #4A2810 88%, #3D1F0A 100%)",
                    }}
                  />
                  {/* Capa 2 — vetas horizontales de fibra */}
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background:
                        "repeating-linear-gradient(175deg, transparent 0px, transparent 18px, rgba(255,180,80,0.04) 18px, rgba(255,180,80,0.04) 19px, transparent 19px, transparent 36px, rgba(0,0,0,0.08) 36px, rgba(0,0,0,0.08) 37px)",
                    }}
                  />
                  {/* Capa 3 — turbulencia SVG para grano orgánico */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-25"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                  >
                    <filter id="wg">
                      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="5" seed="8" />
                      <feColorMatrix type="saturate" values="0.3" />
                      <feBlend in="SourceGraphic" mode="multiply" result="blend" />
                      <feComposite in="blend" in2="SourceGraphic" operator="in" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#wg)" />
                  </svg>
                  {/* Capa 4 — destello satinado diagonal */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(125deg, transparent 28%, rgba(255,200,110,0.10) 42%, rgba(255,230,160,0.22) 48%, rgba(255,200,110,0.08) 54%, transparent 68%)",
                    }}
                  />
                  {/* Capa 5 — borde superior iluminado */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
                  {/* Capa 6 — sombra inferior interna */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-28"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
                  />

                  {/* Info card superpuesta */}
                  <div className="absolute bottom-5 left-4 right-4">
                    <div
                      className="rounded-xl p-4 border border-white/12"
                      style={{ background: "rgba(13,10,8,0.65)", backdropFilter: "blur(12px)" }}
                    >
                      <p className="text-white/45 text-[10px] uppercase tracking-[0.22em] mb-0.5 font-medium">
                        Línea Premium
                      </p>
                      <p className="text-white font-bold text-base leading-tight mb-1">
                        Quick-Step Vision
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-amber-400 font-extrabold text-sm">
                          USD 15.90<span className="text-amber-400/60 font-normal">/m²</span>
                        </p>
                        <span className="text-[10px] text-white/40 bg-white/8 px-2 py-0.5 rounded-full border border-white/10">
                          AC5 · 100hs
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Sombra proyectada en el piso */}
                <div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: "80%",
                    height: "24px",
                    background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none"
          initial={rm ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium">scroll</span>
          <motion.div
            className="w-px h-7 bg-gradient-to-b from-white/40 to-transparent"
            animate={rm ? {} : { scaleY: [1, 0.35, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
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
