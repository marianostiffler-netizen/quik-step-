import type { Metadata } from "next";
import { Armchair } from "lucide-react";
import ArticulosGallery from "@/components/ArticulosGallery";

export const metadata: Metadata = {
  title: "Artículos del Hogar | Maderera Don Antonio",
  description:
    "Muebles, sillas y mesas de madera de alta calidad para tu hogar.",
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
            Muebles, sillas y mesas de madera de alta calidad para tu hogar.
          </p>
        </div>
      </section>

      <ArticulosGallery />
    </>
  );
}
