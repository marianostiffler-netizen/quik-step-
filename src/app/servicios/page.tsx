import type { Metadata } from "next";
import Link from "next/link";
import { Hammer, FileText, CheckCircle2 } from "lucide-react";
import HeaderListado from "@/components/catalogo/HeaderListado";

export const metadata: Metadata = {
  alternates: { canonical: "/servicios" },
  title: "Servicios | Cepillado y lijado | Maderera Don Antonio",
  description:
    "Servicios de Maderera Don Antonio: cepillado y lijado de madera.",
};

const services = [
  {
    id: "cepillado",
    icon: Hammer,
    title: "Cepillado de madera",
    description:
      "Cepillamos tus tablas y vigas para obtener superficies lisas y uniformes.",
    features: [
      "Superficies lisas y uniformes",
      "Grosor exacto según tu requerimiento",
      "Ideal para construcción y mobiliario",
      "Trabajo en diferentes tipos de madera",
    ],
  },
  // TODO(cliente): confirmar si hacen cortes a medida antes de volver a mencionarlo
  {
    id: "lijado",
    icon: FileText,
    title: "Lijado",
    description:
      "Lijado de superficies para obtener acabados suaves y listos para barnizar o pintar.",
    features: [
      "Diferentes grados de lijado",
      "Superficies listas para acabado",
      "Trabajo en vigas y tablas",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <>
      <HeaderListado
        titulo="Servicios"
        bajada="Cepillado y lijado de madera."
        conteo={`${services.length} servicios`}
        migas={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="tarjeta p-6 md:p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-card bg-pino text-algarrobo">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-nogal">{service.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-nogal-suave">{service.description}</p>
                  <ul className="mt-5 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-nogal">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-eucalipto" aria-hidden="true" />
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

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-nogal">¿Necesitás un presupuesto?</h2>
              <p className="mt-2 text-nogal-suave">Contactanos y te respondemos por WhatsApp.</p>
            </div>
            <Link href="/contacto" className="btn-primario shrink-0">
              Consultar por servicios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
