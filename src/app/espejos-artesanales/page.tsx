import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import EspejosGallery from "@/components/EspejosGallery";

export const metadata: Metadata = {
  title: "Espejos Artesanales | Maderera Don Antonio",
  description:
    "Espejos con iluminación LED integrada, desempañador y tecnología inteligente para tu hogar.",
};

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

      <EspejosGallery />
    </main>
  );
}
