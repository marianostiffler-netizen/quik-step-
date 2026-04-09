import type { Metadata } from "next";
import { Sparkles, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Cielorrasos | Maderera Don Antonio",
  description:
    "Placas para cielorrasos en distintos tonos y terminaciones. Renová tus ambientes desde arriba.",
};

export default function CielorrasosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={32} className="text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">Cielorrasos</h1>
          <p className="mt-4 text-xl text-wood-200 max-w-2xl">
            Placas para cielorrasos en distintos tonos y terminaciones
          </p>
        </div>
      </section>

      {/* Coming soon placeholder */}
      <section className="py-24 bg-da-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto w-20 h-20 bg-wood-100 rounded-full flex items-center justify-center mb-6">
            <Wrench size={36} className="text-wood-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-da-dark mb-4">
            Catálogo en construcción
          </h2>
          <p className="text-da-gray text-lg leading-relaxed">
            Estamos preparando el catálogo completo de cielorrasos con
            distintos tonos y terminaciones. Próximamente podrás ver todas las
            opciones disponibles.
          </p>
          <div className="mt-8 p-6 bg-white rounded-2xl border border-wood-200">
            <p className="text-sm text-da-gray">
              Si necesitás información sobre cielorrasos ya, contactanos y te
              asesoramos con lo que tenemos disponible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
