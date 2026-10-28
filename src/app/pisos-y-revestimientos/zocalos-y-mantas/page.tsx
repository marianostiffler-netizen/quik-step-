import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { pricingInfo } from "@/data/site-data";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { waLink } from "@/config/negocio";
import HeaderListado from "@/components/catalogo/HeaderListado";
import ItemCard from "@/components/catalogo/ItemCard";
import { itemsComplementos } from "@/data/items";

const grupo = buscarGrupo("pisos-y-revestimientos")!;
const cat = buscarCategoria("pisos-y-revestimientos", "zocalos-y-mantas")!;

export const metadata: Metadata = {
  alternates: { canonical: "/pisos-y-revestimientos/zocalos-y-mantas" },
  title: "Zócalos y mantas | Pisos y revestimientos | Maderera Don Antonio",
  description: "Zócalos EPS Santa Luzia y manta aislante Isolant para la instalación de pisos flotantes. San Jorge, Santa Fe.",
};

export default function ZocalosYMantasPage() {
  const cantidad = itemsComplementos().length;
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada={cat.descripcion}
        conteo={`${cantidad} productos`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Complementos para la instalación</h2>
          <p className="mt-3 text-nogal-suave">Zócalos EPS Santa Luzia y manta aislante.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {itemsComplementos().map((it) => (
              <ItemCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-nogal-suave">{pricingInfo.tax_note}. Precios de zócalos en dólares.</p>
            <a
              href={waLink("Hola! Quisiera consultar por zócalos y manta para pisos flotantes.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shrink-0"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
