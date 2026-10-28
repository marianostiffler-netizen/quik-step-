import type { Metadata } from "next";
import { buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import HeaderListado from "@/components/catalogo/HeaderListado";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

const grupo = buscarGrupo("placas-y-melaminas")!;

export const metadata: Metadata = {
  alternates: { canonical: "/placas-y-melaminas" },
  title: "Placas y melaminas | Maderera Don Antonio",
  description: "Melaminas y revestimientos melamínicos Faplac: líneas Mesopotamia, Táctil y más. San Jorge, Santa Fe.",
};

export default function PlacasYMelaminasPage() {
  return (
    <>
      <HeaderListado
        titulo={grupo.nombre}
        bajada="Muestrario de melaminas y revestimientos melamínicos. Elegí el color o la textura y consultá disponibilidad por WhatsApp."
        conteo={`${resumenPorRuta()[grupo.href].cantidad} productos · ${grupo.categorias.length} categorías`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre }]}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Categorías</h2>
          <GrillaCategorias items={grupo.categorias} />
        </div>
      </section>
    </>
  );
}
