import type { Metadata } from "next";
import { Armchair, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Artículos del Hogar | Maderera Don Antonio",
  description:
    "Muebles, sillas y mesas de madera. Próximamente catálogo completo.",
};

export default function ArticulosHogarPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Armchair size={32} className="text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Artículos del Hogar
          </h1>
          <p className="mt-4 text-xl text-wood-200 max-w-2xl">
            Muebles, sillas y mesas de madera
          </p>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="py-24 bg-da-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto w-20 h-20 bg-wood-100 rounded-full flex items-center justify-center mb-6">
            <Clock size={36} className="text-wood-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-da-dark mb-4">
            Próximamente
          </h2>
          <p className="text-da-gray text-lg leading-relaxed">
            Estamos preparando el catálogo completo de artículos del hogar:
            muebles, sillas, mesas y más. Todo en madera de calidad.
          </p>
          <div className="mt-8 p-6 bg-white rounded-2xl border border-wood-200">
            <p className="text-sm text-da-gray">
              Mientras tanto, podés ver nuestros pisos flotantes y servicios
              de maderera.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
