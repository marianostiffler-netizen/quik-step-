import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Layers,
  Scissors,
  Armchair,
  Droplets,
  Hammer,
  Ruler,
  Sparkles,
} from "lucide-react";
import { heroSection } from "@/data/site-data";

const sections = [
  {
    id: "pisos-flotantes",
    title: "Pisos Flotantes",
    description:
      "Líneas Quick-Step con tecnología europea: resistentes al agua, fácil instalación y diseños que imitan la madera natural.",
    href: "/pisos-flotantes",
    icon: Layers,
    color: "bg-amber-500",
  },
  {
    id: "construccion-maderas",
    title: "Construcción y Maderas",
    description:
      "Machimbres, tirantería, vigas, aislantes y la guía técnica para resolver cada obra con criterio profesional.",
    href: "/construccion-y-maderas",
    icon: Hammer,
    color: "bg-wood-600",
  },
  {
    id: "cielorrasos",
    title: "Cielorrasos",
    description:
      "Placas para cielorrasos en distintos tonos y terminaciones. Renová tus ambientes desde arriba.",
    href: "/cielorrasos",
    icon: Sparkles,
    color: "bg-wood-500",
  },
  {
    id: "servicios",
    title: "Servicios de Maderera",
    description:
      "Cepillado, cortes a medida y lijado profesional. Trabajo artesanal con maquinaria de primera.",
    href: "/servicios",
    icon: Hammer,
    color: "bg-forest-600",
  },
  {
    id: "articulos-hogar",
    title: "Artículos del Hogar",
    description:
      "Muebles, sillas y mesas de madera. Próximamente con catálogo completo.",
    href: "/articulos-hogar",
    icon: Armchair,
    color: "bg-wood-400",
  },
];

const highlights = [
  {
    icon: Droplets,
    title: "Pisos resistentes al agua",
    text: "Hasta 100 hs de protección con tecnología Hydroseal.",
  },
  {
    icon: Scissors,
    title: "Cortes a medida",
    text: "Cortamos cualquier pieza según tu proyecto.",
  },
  {
    icon: Ruler,
    title: "Asesoramiento",
    text: "Te ayudamos a calcular materiales y elegir lo mejor.",
  },
  {
    icon: Hammer,
    title: "Tradición",
    text: "Años de experiencia trabajando con madera de calidad.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/15 to-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Image
                src="/logo-maderera.png"
                alt="Maderera Don Antonio Logo"
                width={64}
                height={64}
                className="rounded"
              />
              <h1
                className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
                style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
              >
                Maderera Don Antonio
              </h1>
            </div>
            <p
              className="mt-6 text-lg md:text-xl text-white leading-relaxed"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
            >
              {heroSection.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={heroSection.cta_primary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 text-wood-800 font-bold rounded-xl hover:bg-amber-400 transition-colors"
              >
                {heroSection.cta_primary.label}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={heroSection.cta_secondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-amber-400/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                {heroSection.cta_secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Sections Grid */}
      <section className="py-20 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-da-dark">
              Todo para tu hogar, en un solo lugar
            </h2>
            <p className="mt-4 text-da-gray text-lg max-w-2xl mx-auto">
              Pisos, techos, servicios artesanales y artículos en madera.
              Encontrá lo que necesitás.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={s.href}
                  className="group relative bg-white rounded-2xl border border-wood-200 p-8 hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 ${s.color} rounded-xl flex items-center justify-center mb-5`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-da-dark group-hover:text-wood-600 transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-da-gray text-sm leading-relaxed">
                    {s.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-amber-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver más <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="py-16 bg-wood-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="text-center">
                  <div className="mx-auto w-12 h-12 bg-wood-600 rounded-full flex items-center justify-center mb-3">
                    <Icon size={22} className="text-amber-500" />
                  </div>
                  <h3 className="font-bold text-sm text-da-dark">{h.title}</h3>
                  <p className="mt-1 text-xs text-da-gray leading-relaxed">
                    {h.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-wood-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            ¿Necesitás asesoramiento?
          </h2>
          <p className="mt-4 text-wood-300 text-lg max-w-xl mx-auto">
            Contactanos y te ayudamos a elegir los mejores materiales para tu
            proyecto. Presupuestos sin compromiso.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pisos-flotantes"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 text-wood-800 font-bold rounded-xl hover:bg-amber-400 transition-colors"
            >
              Ver Pisos Flotantes
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-wood-500 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
