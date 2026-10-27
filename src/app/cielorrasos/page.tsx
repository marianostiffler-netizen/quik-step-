import type { Metadata } from "next";
import { Sparkles, MessageCircle } from "lucide-react";
import { waLink } from "@/config/negocio";

export const metadata: Metadata = {
  title: "Cielorrasos | Maderera Don Antonio",
  description:
    "Sección de cielorrasos en preparación. Consultanos por WhatsApp.",
  // Sección en "próximamente": no se indexa hasta que tenga contenido
  robots: { index: false, follow: true },
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
            Próximamente
          </p>
        </div>
      </section>

      {/* Próximamente */}
      <section className="py-24 bg-da-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-da-gray text-lg leading-relaxed">
            Estamos preparando esta sección. Mientras tanto, consultanos por
            WhatsApp.
          </p>
          <a
            href={waLink("Hola! Quisiera consultar sobre cielorrasos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 px-6 py-3 bg-amber-500 text-wood-800 font-bold rounded-lg hover:bg-amber-400 transition-colors"
          >
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
