"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { useDialogA11y } from "./useDialogA11y";

const galleryItems = [
  {
    image: "/products/hogar/585346193_1369242518229953_6634413815702805960_n.webp",
    title: "Mueble de sala en madera",
    description: "Mueble artesanal en madera de calidad ideal para sala de estar.",
  },
  {
    image: "/products/hogar/646197206_1452442863243251_6173634275258237884_n.webp",
    title: "Comedor de madera",
    description: "Comedor robusto en madera tratada para uso diario prolongado.",
  },
  {
    image: "/products/hogar/KxgNg.webp",
    title: "Estantería modular",
    description: "Estantería artesanal de Pino cepillado para organización y decoración.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-08 at 21.17.59 (2).webp",
    title: "Juego de sillas",
    description: "Sillas de madera con acabado natural para comedor o escritorio.",
  },
  {
    image: "/products/hogar/banco blanco.webp",
    title: "Banco blanco",
    description: "Banco de madera con acabado blanco, versátil para distintos ambientes.",
  },
  {
    image: "/products/hogar/t03xp.webp",
    title: "Mesa de centro",
    description: "Mesa de centro en madera resistente, diseño minimalista y funcional.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.40.webp",
    title: "Silla de madera",
    description: "Silla artesanal de madera resistente, ideal para comedor o escritorio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43 (1).webp",
    title: "Mueble de estantería",
    description: "Estantería de madera con múltiples niveles para organización.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43 (2).webp",
    title: "Mesa de comedor",
    description: "Mesa de comedor en madera sólida, acabado natural y resistente.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.43.webp",
    title: "Banco de madera",
    description: "Banco artesanal de madera, versátil para distintos espacios.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44 (1).webp",
    title: "Silla plegable",
    description: "Silla plegable de madera, práctica y fácil de guardar.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44 (2).webp",
    title: "Mesita de noche",
    description: "Mesita de noche en madera, diseño compacto y funcional.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.44.webp",
    title: "Rack de TV",
    description: "Rack de TV en madera con espacio para almacenamiento.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (1).webp",
    title: "Escritorio de madera",
    description: "Escritorio artesanal de madera resistente para trabajo o estudio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (2).webp",
    title: "Silla de oficina",
    description: "Silla de madera con diseño ergonómico para escritorio.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45 (3).webp",
    title: "Mesa auxiliar",
    description: "Mesa auxiliar de madera, ideal para espacios pequeños.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.45.webp",
    title: "Biblioteca de madera",
    description: "Biblioteca artesanal de madera para libros y decoración.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46 (1).webp",
    title: "Mesa de jardín",
    description: "Mesa de jardín en madera tratada para exterior.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46 (2).webp",
    title: "Silla de jardín",
    description: "Silla de jardín en madera resistente para exteriores.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.13.46.webp",
    title: "Banco de jardín",
    description: "Banco de jardín en madera tratada para uso exterior.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.38.webp",
    title: "Armario de madera",
    description: "Armario artesanal de madera con amplio espacio de almacenamiento.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.39 (1).webp",
    title: "Cómoda de madera",
    description: "Cómoda de madera con cajones para organización de ropa.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.39 (2).webp",
    title: "Vitrina de madera",
    description: "Vitrina artesanal de madera para exhibir objetos.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.40.webp",
    title: "Vanitory de Pino",
    description: "Mueble de apoyo artesanal de Pino, ideal para baño o como vanity.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.41 (1).webp",
    title: "Banco de entrada",
    description: "Banco de entrada de madera, ideal para recibir visitas.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.41 (2).webp",
    title: "Perchero de madera",
    description: "Perchero artesanal de madera para colgar abrigos y accesorios.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (1).webp",
    title: "Mesa Ratona Minimalista - Madera Clara",
    description: "Mesa ratona minimalista en madera clara, diseño compacto y elegante.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42 (2).webp",
    title: "Mesa Ratona Minimalista - Gris",
    description: "Mesa ratona minimalista en tono gris, diseño compacto y elegante.",
  },
  {
    image: "/products/hogar/WhatsApp Image 2026-04-17 at 14.35.42.webp",
    title: "Mesa Ratona Minimalista - Negra",
    description: "Mesa ratona minimalista en tono negro, diseño compacto y elegante.",
  },
];

export default function ArticulosGallery() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const dialogRef = useDialogA11y(!!selectedItem, () => setSelectedItem(null));

  return (
    <>
      {/* Gallery Grid */}
      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-2xl border border-wood-200 bg-white shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 cursor-pointer flex flex-col w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                <span className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </span>
                <span className="block p-5">
                  <span className="block font-bold text-lg text-da-dark group-hover:text-wood-600 transition-colors">
                    {item.title}
                  </span>
                </span>
              </button>
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <X size={24} className="text-da-dark" />
            </button>
            <div className="relative aspect-video bg-gray-50">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain"
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
