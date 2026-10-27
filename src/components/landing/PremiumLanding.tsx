"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Droplets,
  Ruler,
  ShieldCheck,
  MousePointerClick,
  Sun,
  Thermometer,
  Sparkles,
  Clock,
} from "lucide-react";
import { waLink } from "@/config/negocio";
import { useLenis } from "./useLenis";

// Expo ease-out — la curva premium del sitio
const EXPO = [0.16, 1, 0.3, 1] as const;

// WhatsApp: el número vive en src/config/negocio.ts
const waConsulta = (msg?: string) =>
  waLink(msg ?? "Hola! Quisiera hacer una consulta sobre sus productos.");

// ─── Datos reales (línea Vision, tope de gama) ───
const visionSpecs = [
  { icon: Ruler, label: "Formato", value: "1800 × 215 mm", side: "left" as const },
  { icon: Droplets, label: "Resistencia al agua", value: "100 horas", side: "left" as const },
  { icon: ShieldCheck, label: "Clasificación", value: "AC5 Aqua", side: "right" as const },
  { icon: MousePointerClick, label: "Instalación", value: "Sistema Uniclic", side: "right" as const },
];

// Una tabla representativa por línea — imágenes reales del catálogo
const planks = [
  { src: "/products/Smart-5795-01.png", name: "Smart" },
  { src: "/products/Catedral-701-01.png", name: "Catedral" },
  { src: "/products/PremierePlus-1067-01.png", name: "Premiere Plus" },
  { src: "/products/Nesto-900-01.png", name: "Nesto" },
  { src: "/products/Eligna-3676-01.png", name: "Eligna Wide" },
  { src: "/products/Impressive-1856-01.png", name: "Impressive" },
  { src: "/products/Vision-866-01.png", name: "Vision" },
];

// Características reales del espejo LED inteligente
const mirrorFeatures = [
  { icon: Sun, label: "LED 3 tonos regulable" },
  { icon: Thermometer, label: "Desempañador integrado" },
  { icon: Sparkles, label: "Sensor de movimiento" },
  { icon: Clock, label: "Display LCD con hora" },
];

const navLinks = [
  { label: "Pisos", href: "#pisos" },
  { label: "Colección", href: "#coleccion" },
  { label: "Espejos LED", href: "#espejos" },
  { label: "Contacto", href: "#contacto" },
];

export default function PremiumLanding() {
  const rm = useReducedMotion();
  useLenis(!rm);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full overflow-x-clip bg-[#0D0A08] text-white antialiased">
        <PremiumNav />
        <Hero />
        <RevealSpecs />
        <DespieceGallery />
        <MirrorFeature />
        <FinalCTA />
        <MiniFooter />
      </div>
    </MotionConfig>
  );
}

/* ════════════════════════════════════════════
   NAVBAR FIJO — fondo aparece al scrollear
════════════════════════════════════════════ */
function PremiumNav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(13,10,8,0)", "rgba(13,10,8,0.82)"]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.header
      style={{ background: bg }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute bottom-0 inset-x-0 h-px bg-white/10"
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2.5">
            <Image src="/logo-maderera.png" alt="Maderera Don Antonio" width={30} height={30} className="rounded" />
            <div className="leading-tight">
              <span className="block text-white font-bold text-sm tracking-wide">MADERERA</span>
              <span className="block text-amber-400 text-[11px] font-semibold -mt-0.5 tracking-[0.2em]">
                DON ANTONIO
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/65 hover:text-amber-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={waConsulta()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ════════════════════════════════════════════
   1 · HERO — el producto estrella entra desde
   abajo y se centra al scrollear
════════════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // El tablón sube hacia el centro y crece a medida que entrás
  const plankY = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);
  const plankScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.12]);
  const plankRotate = useTransform(scrollYProgress, [0, 1], [8, -2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -60]);

  return (
    <section ref={ref} id="pisos" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <WoodAmbience />

      {/* Producto estrella */}
      <motion.div
        style={{ y: plankY, scale: plankScale, rotate: plankRotate }}
        initial={{ opacity: 0, y: 180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EXPO, delay: 0.3 }}
        className="absolute z-10 w-[58%] max-w-[340px] sm:max-w-[400px] aspect-[3/5] pointer-events-none"
      >
        <div
          className="absolute -inset-10 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(212,134,10,0.28), transparent 70%)" }}
        />
        <Image
          src="/products/Vision-877-01.png"
          alt="Piso flotante Quick-Step Vision"
          fill
          priority
          className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
          sizes="(max-width: 640px) 60vw, 400px"
        />
      </motion.div>

      {/* Texto del hero */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-20 text-center px-6 pointer-events-none"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EXPO }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400 border border-amber-500/25 bg-amber-500/10"
        >
          <span>◇</span> San Jorge · Santa Fe <span>◇</span>
        </motion.span>

        <h1 className="font-serif leading-[0.92] tracking-tight" style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}>
          <WipeLine delay={0.3}>La madera que</WipeLine>
          <WipeLine delay={0.42} className="text-amber-400">tu hogar merece</WipeLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EXPO }}
          className="mt-7 text-base sm:text-lg text-white/55 font-light max-w-xl mx-auto leading-relaxed"
        >
          Pisos flotantes Quick-Step, espejos LED inteligentes y muebles artesanales.
          Más de una generación trabajando con madera.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-medium">scroll</span>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-white/40 to-transparent"
          animate={rmSafe()}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
   2 · REVEAL — el tablón rota/se acerca mientras
   bajás; las specs reales aparecen a los costados
════════════════════════════════════════════ */
function RevealSpecs() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const plankScale = useTransform(p, [0, 0.5, 1], [0.7, 1, 0.92]);
  const plankRotateY = useTransform(p, [0, 1], [38, -18]);
  const plankRotateZ = useTransform(p, [0, 1], [6, -4]);
  const glow = useTransform(p, [0, 0.5, 1], [0.15, 0.5, 0.3]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A08] via-[#15100B] to-[#0D0A08]" />

        {/* Encabezado */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center px-6 z-20 w-full max-w-2xl">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Línea Vision · Tope de gama</p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight">
            El piso más resistente <span className="text-amber-400">de Argentina</span>
          </h2>
        </div>

        {/* Tablón central con rotación 3D */}
        <div style={{ perspective: 1400 }} className="relative z-10">
          <motion.div
            style={{ scale: plankScale, rotateY: plankRotateY, rotateZ: plankRotateZ }}
            className="relative w-[200px] sm:w-[230px] aspect-[3/5]"
          >
            <motion.div
              style={{ opacity: glow }}
              className="absolute -inset-12 rounded-full blur-3xl"
            >
              <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, rgba(212,134,10,0.5), transparent 70%)" }} />
            </motion.div>
            <Image
              src="/products/Vision-866-01.png"
              alt="Tabla Quick-Step Vision"
              fill
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              sizes="230px"
            />
          </motion.div>
        </div>

        {/* Specs a los costados */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="mx-auto max-w-5xl h-full relative px-6">
            {visionSpecs.map((spec, i) => (
              <SpecCard key={spec.label} spec={spec} progress={p} index={i} />
            ))}
          </div>
        </div>

        {/* Precio destacado */}
        <PriceBadge progress={p} />
      </div>
    </section>
  );
}

function SpecCard({
  spec,
  progress,
  index,
}: {
  spec: (typeof visionSpecs)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const Icon = spec.icon;
  const isLeft = spec.side === "left";
  // Aparecen escalonadas entre 0.15 y 0.7 del progreso
  const start = 0.15 + index * 0.1;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const x = useTransform(progress, [start, start + 0.15], [isLeft ? -60 : 60, 0]);

  // Posición vertical: dos a cada lado, escalonadas
  const topClass = isLeft
    ? index === 0 ? "top-[34%]" : "top-[56%]"
    : index === 2 ? "top-[34%]" : "top-[56%]";
  const sideClass = isLeft ? "left-2 sm:left-4 lg:left-12" : "right-2 sm:right-4 lg:right-12";

  return (
    <motion.div
      style={{ opacity, x }}
      className={`absolute ${topClass} ${sideClass} w-[40%] sm:w-44 max-w-[180px]`}
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4">
        <Icon className="text-amber-400 mb-2" size={20} />
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-0.5">{spec.label}</p>
        <p className="font-bold text-white text-sm sm:text-base leading-tight">{spec.value}</p>
      </div>
    </motion.div>
  );
}

function PriceBadge({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.6, 0.8], [0, 1]);
  const y = useTransform(progress, [0.6, 0.8], [30, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-[12%] left-1/2 -translate-x-1/2 z-20 text-center"
    >
      <p className="text-white/45 text-[11px] uppercase tracking-[0.22em] mb-1">Desde</p>
      <p className="font-serif text-4xl sm:text-5xl text-amber-400">
        USD 15.90<span className="text-amber-400/50 text-2xl font-sans">/m²</span>
      </p>
      <p className="text-white/40 text-xs mt-1">Caja de 2,71 m² · 5 diseños disponibles</p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   3 · DESPIECE / GALERÍA — las tablas flotan y
   se acomodan en abanico con el scroll
════════════════════════════════════════════ */
function DespieceGallery() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <section ref={ref} id="coleccion" className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[#0D0A08]" />
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EXPO }}
        >
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">La colección completa</p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight mb-4">
            Siete líneas. <span className="text-amber-400">Un mismo estándar.</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Desde la accesible línea Smart hasta el gran formato Vision — todas con tecnología
            Hydroseal, encastre Uniclic y clasificación AC4/AC5.
          </p>
        </motion.div>

        {/* Abanico de tablas */}
        <div className="mt-16 sm:mt-24 flex items-end justify-center gap-1.5 sm:gap-3 h-[340px] sm:h-[440px]">
          {planks.map((plank, i) => (
            <FloatingPlank key={plank.name} plank={plank} progress={p} index={i} total={planks.length} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <Link
            href="/pisos-flotantes"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-semibold transition-colors"
          >
            Ver catálogo de pisos <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingPlank({
  plank,
  progress,
  index,
  total,
}: {
  plank: (typeof planks)[number];
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  // Centradas en el medio, se despliegan en abanico hacia los costados
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const startX = offset * -40; // arrancan apiladas en el centro
  const startRotate = offset * -10;
  const startY = 120 + Math.abs(offset) * 20;

  const x = useTransform(progress, [0.1, 0.55], [startX, 0]);
  const y = useTransform(progress, [0.1, 0.55], [startY, Math.abs(offset) * 14]);
  const rotate = useTransform(progress, [0.1, 0.55], [startRotate, offset * 3]);
  const opacity = useTransform(progress, [0.05, 0.3], [0, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className="group relative w-10 sm:w-16 h-[300px] sm:h-[400px] shrink-0"
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
        <Image
          src={plank.src}
          alt={`Piso ${plank.name}`}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-white/40 whitespace-nowrap">
        {plank.name}
      </span>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   4 · FEATURE — espejo LED inteligente con glow
   que se enciende al entrar en viewport
════════════════════════════════════════════ */
function MirrorFeature() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.3, 1], [0.6, 1]);

  return (
    <section ref={ref} id="espejos" className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A08] via-[#100C18] to-[#0D0A08]" />

      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Visual del espejo con glow */}
        <div className="relative flex justify-center order-1 lg:order-none">
          <motion.div
            style={{ opacity: glowOpacity, scale: glowScale }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[80%] h-[80%] rounded-full blur-[60px]"
              style={{ background: "radial-gradient(circle, rgba(125,180,255,0.55), rgba(180,140,255,0.25) 45%, transparent 70%)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="relative w-[260px] sm:w-[320px] aspect-[3/4] rounded-[28px] overflow-hidden ring-1 ring-white/15 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
          >
            <Image
              src="/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).jpeg"
              alt="Espejo LED inteligente"
              fill
              className="object-cover"
              sizes="320px"
            />
            {/* Halo del marco LED */}
            <motion.div
              style={{ opacity: glowOpacity }}
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              aria-hidden
            >
              <div className="absolute inset-0 rounded-[28px] ring-2 ring-sky-300/50 shadow-[inset_0_0_40px_rgba(125,180,255,0.45)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Texto + features reales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EXPO }}
        >
          <p className="text-sky-300 text-xs font-semibold uppercase tracking-[0.3em] mb-3">Espejos LED inteligentes</p>
          <h2 className="font-serif text-3xl sm:text-5xl leading-tight mb-5">
            Luz que se enciende <span className="text-sky-300">con vos</span>
          </h2>
          <p className="text-white/55 leading-relaxed mb-8 max-w-md">
            Espejos retroiluminados con tecnología táctil. Iluminación regulable en tres tonos,
            desempañador para después de la ducha y sensor de movimiento que los activa al acercarte.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-9">
            {mirrorFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Icon className="text-sky-300 shrink-0" size={18} />
                  <span className="text-sm text-white/75 leading-tight">{f.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/espejos-inteligentes"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0D0A08] hover:bg-white/90 font-semibold transition-colors"
            >
              Ver espejos LED <ArrowRight size={16} />
            </Link>
            <p className="text-white/50 text-sm">
              Desde <span className="text-white font-bold text-base">USD 80</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   5 · CTA FINAL — contacto / WhatsApp / catálogo
════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section id="contacto" className="relative py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #3e2723 0%, #1c1410 60%, #0D0A08 100%)" }} />
      <WoodGrain />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EXPO }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-serif text-4xl sm:text-6xl leading-[0.95] mb-5">
          Tu proyecto <span className="text-amber-400">empieza acá</span>
        </h2>
        <p className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          Escribinos por WhatsApp y te asesoramos con tu proyecto. Presupuestos sin compromiso,
          atención personalizada en San Jorge, Santa Fe.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href={waConsulta()}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition-colors"
          >
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <MessageCircle size={19} />
            </motion.span>
            Consultá por WhatsApp
          </motion.a>

          <Link
            href="/pisos-flotantes"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/5 font-semibold transition-colors"
          >
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
   Footer minimal de la landing
════════════════════════════════════════════ */
function MiniFooter() {
  return (
    <footer className="relative bg-[#0D0A08] border-t border-white/10 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <Image src="/logo-maderera.png" alt="Maderera Don Antonio" width={26} height={26} className="rounded" />
          <span className="text-white/60 text-sm">© {new Date().getFullYear()} Maderera Don Antonio · San Jorge, Santa Fe</span>
        </div>
        <Link href="/" className="text-white/40 hover:text-amber-400 text-sm transition-colors">
          ← Volver al sitio actual
        </Link>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   Helpers visuales
════════════════════════════════════════════ */

// Wipe word/line desde abajo (reutiliza la técnica del hero original)
function WipeLine({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.8, ease: EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Animación segura para el scroll-hint (se desactiva con reduced-motion)
function rmSafe() {
  return { scaleY: [1, 0.35, 1], opacity: [0.35, 0.7, 0.35] };
}

// Ambiente del hero: vignette + grain + foto atenuada
function WoodAmbience() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.07,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 38%, rgba(0,0,0,0.78) 100%)" }}
      />
      <WoodGrain />
    </>
  );
}

function WoodGrain() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23g)'/%3E%3C/svg%3E\")",
        backgroundSize: "180px",
      }}
    />
  );
}
