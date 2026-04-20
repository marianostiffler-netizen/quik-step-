"use client";

import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";
import { useState } from "react";

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
  const [selectedEspajo, setSelectedEspajo] = useState<typeof espejos[0] | null>(null);

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
                onClick={() => setSelectedEspajo(espejo)}
                className="group relative overflow-hidden rounded-2xl border border-wood-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={espejo.image}
                    alt={`Espejo ${espejo.modelo}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-da-dark group-hover:text-wood-600 transition-colors">
                    {espejo.modelo}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-amber-600">
                    {espejo.medidas}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEspajo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedEspajo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEspajo(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X size={24} className="text-da-dark" />
            </button>
            <div className="relative aspect-video bg-gray-50">
              <Image
                src={selectedEspajo.image}
                alt={`Espejo ${selectedEspajo.modelo}`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-da-dark mb-4">
                {selectedEspajo.modelo}
              </h2>
              <div className="space-y-3 text-da-gray">
                <p>
                  <span className="font-semibold text-da-dark">Medidas:</span> {selectedEspajo.medidas}
                </p>
                <p>
                  <span className="font-semibold text-da-dark">Forma:</span> {selectedEspajo.forma}
                </p>
                <p className="pt-2 border-t border-wood-200">
                  <span className="font-semibold text-da-dark">Tecnología:</span> LED 3 tonos, sensor de movimiento, desempañador y display LCD.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
