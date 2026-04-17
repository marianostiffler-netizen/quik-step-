import type { Metadata } from "next";
import Image from "next/image";
import { Armchair } from "lucide-react";

export const metadata: Metadata = {
  title: "Artículos del Hogar | Maderera Don Antonio",
  description:
    "Muebles, sillas y mesas de madera de alta calidad para tu hogar.",
};

const galleryItems = [
  {
    image: "/products/hogar/585346193_1369242518229953_6634413815702805960_n.jpg",
    title: "Mueble de sala en madera",
    description: "Mueble artesanal en madera de calidad ideal para sala de estar.",
  },
  {
    image: "/products/hogar/646197206_1452442863243251_6173634275258237884_n.jpg",
    title: "Comedor de madera",
    description: "Comedor robusto en madera tratada para uso diario prolongado.",
  },
  {
    image: "/products/hogar/KxgNg.jpg",
    title: "Estantería modular",
    description: "Estantería artesanal de Pino cepillado para organización y decoración.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-08 at 21.17.59 (2).jpeg",
    title: "Juego de sillas",
    description: "Sillas de madera con acabado natural para comedor o escritorio.",
  },
  {
    image: "/products/hogar/banco blanco.png",
    title: "Banco blanco",
    description: "Banco de madera con acabado blanco, versátil para distintos ambientes.",
  },
  {
    image: "/products/hogar/t03xp.jpg",
    title: "Mesa de centro",
    description: "Mesa de centro en madera resistente, diseño minimalista y funcional.",
  },
];

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
            Muebles, sillas y mesas de madera de alta calidad para tu hogar.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-wood-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-da-dark group-hover:text-wood-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-da-gray leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
