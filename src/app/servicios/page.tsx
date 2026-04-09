import type { Metadata } from "next";
import { Hammer, Scissors, FileText, TreePine, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de Maderera | Cepillado, Cortes, Lijado",
  description:
    "Servicios artesanales de Maderera Don Antonio: cepillado de madera, cortes a medida y lijado profesional.",
};

const services = [
  {
    id: "cepillado",
    icon: Hammer,
    title: "Cepillado de Madera",
    description:
      "Cepillamos tus tablas y vigas para obtener superficies perfectamente lisas y uniformes. Trabajo artesanal con maquinaria de primera.",
    features: [
      "Superficies lisas y uniformes",
      "Grosor exacto según tu requerimiento",
      "Ideal para construcción y mobiliario",
      "Trabajo en diferentes tipos de madera",
    ],
  },
  {
    id: "cortes",
    icon: Scissors,
    title: "Cortes a Medida",
    description:
      "Cortamos cualquier pieza de madera según las dimensiones exactas que necesitás para tu proyecto.",
    features: [
      "Cortes precisos a medida",
      "Ajuste de largo y ancho",
      "Cortes en ángulo especiales",
      "Para todo tipo de proyectos",
    ],
  },
  {
    id: "lijado",
    icon: FileText,
    title: "Lijado Profesional",
    description:
      "Lijado de superficies para obtener acabados suaves y listos para barnizar o pintar. Diferentes grados de lijado.",
    features: [
      "Diferentes grados de lijado",
      "Superficies listas para acabado",
      "Trabajo en vigas y tablas",
      "Acabado profesional",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <TreePine size={32} className="text-amber-500" />
            <div className="h-px flex-1 bg-amber-500/30 max-w-[120px]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">
            Servicios de Maderera
          </h1>
          <p className="mt-4 text-xl text-wood-200 max-w-2xl">
            Trabajo artesanal con maquinaria de primera: cepillado, cortes a
            medida y lijado profesional.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-wood-200 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-forest-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-da-dark mb-3">
                    {service.title}
                  </h2>
                  <p className="text-da-gray text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-da-dark"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-forest-600 shrink-0 mt-0.5"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-wood-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-da-dark mb-4">
            ¿Necesitás un presupuesto?
          </h2>
          <p className="text-da-gray text-lg mb-8">
            Contactanos y te asesoramos sobre el servicio que necesitás. Trabajo
            de calidad con atención personalizada.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-wood-800 font-bold rounded-xl hover:bg-amber-400 transition-colors"
          >
            Consultar por Servicios
          </a>
        </div>
      </section>
    </>
  );
}
