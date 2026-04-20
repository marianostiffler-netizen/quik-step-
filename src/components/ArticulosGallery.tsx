"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";

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
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.40.jpeg",
    title: "Silla de madera",
    description: "Silla artesanal de madera resistente, ideal para comedor o escritorio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43 (1).jpeg",
    title: "Mueble de estantería",
    description: "Estantería de madera con múltiples niveles para organización.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43 (2).jpeg",
    title: "Mesa de comedor",
    description: "Mesa de comedor en madera sólida, acabado natural y resistente.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43.jpeg",
    title: "Banco de madera",
    description: "Banco artesanal de madera, versátil para distintos espacios.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44 (1).jpeg",
    title: "Silla plegable",
    description: "Silla plegable de madera, práctica y fácil de guardar.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44 (2).jpeg",
    title: "Mesita de noche",
    description: "Mesita de noche en madera, diseño compacto y funcional.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44.jpeg",
    title: "Rack de TV",
    description: "Rack de TV en madera con espacio para almacenamiento.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (1).jpeg",
    title: "Escritorio de madera",
    description: "Escritorio artesanal de madera resistente para trabajo o estudio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (2).jpeg",
    title: "Silla de oficina",
    description: "Silla de madera con diseño ergonómico para escritorio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (3).jpeg",
    title: "Mesa auxiliar",
    description: "Mesa auxiliar de madera, ideal para espacios pequeños.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45.jpeg",
    title: "Biblioteca de madera",
    description: "Biblioteca artesanal de madera para libros y decoración.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46 (1).jpeg",
    title: "Mesa de jardín",
    description: "Mesa de jardín en madera tratada para exterior.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46 (2).jpeg",
    title: "Silla de jardín",
    description: "Silla de jardín en madera resistente para exteriores.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46.jpeg",
    title: "Banco de jardín",
    description: "Banco de jardín en madera tratada para uso exterior.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.38.jpeg",
    title: "Armario de madera",
    description: "Armario artesanal de madera con amplio espacio de almacenamiento.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.39 (1).jpeg",
    title: "Cómoda de madera",
    description: "Cómoda de madera con cajones para organización de ropa.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.39 (2).jpeg",
    title: "Vitrina de madera",
    description: "Vitrina artesanal de madera para exhibir objetos.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.39.jpeg",
    title: "Mesa de centro",
    description: "Mesa de centro de madera con diseño moderno y funcional.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.40.jpeg",
    title: "Sillón de madera",
    description: "Sillón artesanal de madera con acabado natural.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.41 (1).jpeg",
    title: "Banco de entrada",
    description: "Banco de entrada de madera, ideal para recibir visitas.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.41 (2).jpeg",
    title: "Perchero de madera",
    description: "Perchero artesanal de madera para colgar abrigos y accesorios.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.41.jpeg",
    title: "Mesa de trabajo",
    description: "Mesa de trabajo de madera resistente para taller o garaje.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (1).jpeg",
    title: "Estante flotante",
    description: "Estante flotante de madera para decoración y libros.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (2).jpeg",
    title: "Mesa de café",
    description: "Mesa de café de madera con diseño compacto y elegante.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42.jpeg",
    title: "Mueble de TV",
    description: "Mueble de TV de madera con espacio para equipos y almacenamiento.",
  },
];

export default function ArticulosGallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <>
      {/* Gallery Grid */}
      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-2xl border border-wood-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-da-dark group-hover:text-wood-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
            >
              <X size={24} className="text-da-dark" />
            </button>
            <div className="relative aspect-video bg-gray-50">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-da-dark mb-4">
                {selectedItem.title}
              </h2>
              <p className="text-da-gray leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
