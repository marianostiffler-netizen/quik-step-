import type { Metadata } from "next";
import { Layers } from "lucide-react";
import MelaminasGallery from "@/components/MelaminasGallery";

export const metadata: Metadata = {
  title: "Melaminas Faplac | Maderera Don Antonio",
  description:
    "Muestrario completo de melaminas Faplac: Línea Mesopotamia, Línea Táctil y Revestimientos. San Jorge, Santa Fe, Argentina.",
};

export default function MelaminasPage() {
  return (
    <main>
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <Layers size={34} className="text-amber-500" />
            <div className="h-px flex-1 max-w-24 bg-amber-500/40" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">Melaminas Faplac</h1>
          <p className="mt-4 text-wood-100 max-w-3xl text-lg leading-relaxed">
            Muestrario completo de melaminas: Línea Mesopotamia, Línea Táctil y
            Revestimientos. Hacé clic en cualquier color para ver la textura en
            detalle y consultar disponibilidad por WhatsApp.
          </p>
        </div>
      </section>

      <MelaminasGallery />
    </main>
  );
}
