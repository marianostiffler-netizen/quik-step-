import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Espejos Artesanales | Maderera Don Antonio",
  description:
    "Espejos con iluminación LED integrada, desempañador y tecnología inteligente para tu hogar.",
};

const espejos = [
  {
    id: "chubut",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).jpeg",
    modelo: "Chubut",
    forma: "Rectangular horizontal con borde lateral curvo",
    medidas: "80 x 130 cm",
  },
  {
    id: "formosa",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (2).jpeg",
    modelo: "Formosa",
    forma: "Rectangular vertical",
    medidas: "70 x 90 cm",
  },
  {
    id: "jujuy",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38.jpeg",
    modelo: "Jujuy",
    forma: "Circular",
    medidas: "80 x 80 cm",
  },
  {
    id: "santa-fe",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39 (1).jpeg",
    modelo: "Santa Fe",
    forma: "Rectangular horizontal",
    medidas: "90 x 70 cm",
  },
  {
    id: "fuego",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39.jpeg",
    modelo: "Fuego",
    forma: "Rectangular vertical",
    medidas: "70 x 90 cm",
  },
];

const caracteristicasGenerales = [
  "Iluminación LED tres tonos (Fría, Neutra, Cálida)",
  "Regulador de intensidad de luz",
  "Sistema desempañador integrado",
  "Sensor de movimiento",
  "Display LCD con hora y temperatura",
];

export default function EspejosArtesanalesPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={32} className="text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Espejos Artesanales
          </h1>
          <p className="mt-4 text-xl text-wood-200 max-w-2xl">
            Espejos con iluminación LED integrada, desempañador y tecnología
            inteligente para tu hogar.
          </p>
        </div>
      </section>

      {/* Características Generales */}
      <section className="py-12 bg-wood-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-da-dark mb-6">
            Características Generales (Todos los Modelos)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {caracteristicasGenerales.map((caracteristica, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-da-dark bg-white px-4 py-3 rounded-xl border border-wood-200"
              >
                <Sparkles size={16} className="text-amber-500 shrink-0" />
                <span>{caracteristica}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {espejos.map((espejo) => (
              <div
                key={espejo.id}
                className="group relative overflow-hidden rounded-2xl border border-wood-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={espejo.image}
                    alt={`Espejo ${espejo.modelo}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-da-dark group-hover:text-wood-600 transition-colors">
                    {espejo.modelo}
                  </h3>
                  <p className="mt-2 text-sm text-da-gray">{espejo.forma}</p>
                  <p className="mt-1 text-sm font-semibold text-amber-600">
                    {espejo.medidas}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
