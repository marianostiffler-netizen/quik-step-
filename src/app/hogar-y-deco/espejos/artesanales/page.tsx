import type { Metadata } from "next";
import { Clock, Sparkles, Thermometer, Wind, Zap } from "lucide-react";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { itemsEspejosArtesanales } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

const grupo = buscarGrupo("hogar-y-deco")!;
const espejos = buscarCategoria("hogar-y-deco", "espejos")!;

export const metadata: Metadata = {
  alternates: { canonical: "/hogar-y-deco/espejos/artesanales" },
  title: "Espejos artesanales | Hogar y deco | Maderera Don Antonio",
  description:
    "Espejos con iluminación LED integrada, desempañador y tecnología inteligente para tu hogar.",
};

const caracteristicasGenerales = [
  { icon: Zap, label: "LED 3 tonos (Fría, Neutra, Cálida)" },
  { icon: Sparkles, label: "Regulador de intensidad" },
  { icon: Wind, label: "Desempañador integrado" },
  { icon: Thermometer, label: "Display LCD · Hora · Temperatura" },
  { icon: Clock, label: "Sensor de movimiento" },
];

const items = itemsEspejosArtesanales();

export default function EspejosArtesanalesPage() {
  return (
    <>
      <HeaderListado
        titulo="Espejos artesanales"
        bajada="Espejos con iluminación LED integrada, desempañador y tecnología inteligente para tu hogar."
        conteo={`${items.length} modelos`}
        migas={[
          { label: "Inicio", href: "/" },
          { label: grupo.nombre, href: grupo.href },
          { label: espejos.nombre, href: espejos.href },
          { label: "Espejos artesanales" },
        ]}
      />

      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-nogal">Características generales (todos los modelos)</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {caracteristicasGenerales.map(({ icon: Icon, label }) => (
              <li key={label} className="tarjeta flex items-center gap-2 px-4 py-3 text-sm text-nogal">
                <Icon size={16} className="shrink-0 text-algarrobo" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Modelos</h2>
          <CatalogoItems id="artesanales" items={items} ordenes={["nombre-asc", "nombre-desc"]} unidades={["modelo", "modelos"]} ampliable />
        </div>
      </section>
    </>
  );
}
