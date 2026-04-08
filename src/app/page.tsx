import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { heroSection, features, categories } from "@/data/site-data";
import { FeatureBadge } from "@/components/FeatureBadge";
import { CategoryCard } from "@/components/CategoryCard";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-qs-blue via-blue-900 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              {heroSection.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-200 leading-relaxed">
              {heroSection.subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={heroSection.cta_primary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-qs-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                {heroSection.cta_primary.label}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={heroSection.cta_secondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                {heroSection.cta_secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-qs-gray-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ¿Por qué elegir Quick-Step?
            </h2>
            <p className="mt-4 text-qs-gray text-lg max-w-2xl mx-auto">
              Cada piso combina estética, durabilidad y facilidad de
              instalación.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FeatureBadge key={f.id} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explorá Nuestras Líneas
            </h2>
            <p className="mt-4 text-qs-gray text-lg max-w-2xl mx-auto">
              Desde opciones accesibles hasta pisos premium de gran formato.
              Encontrá el que mejor se adapte a tu proyecto.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-qs-blue">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            ¿Listo para renovar tus pisos?
          </h2>
          <p className="mt-4 text-blue-200 text-lg max-w-xl mx-auto">
            Contactanos para recibir asesoramiento personalizado y encontrar el
            piso ideal para tu espacio.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-qs-blue font-semibold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Ver Catálogo Completo
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
