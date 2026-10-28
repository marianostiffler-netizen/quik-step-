import type { Metadata } from "next";
import { buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import HeaderListado from "@/components/catalogo/HeaderListado";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

const grupo = buscarGrupo("pisos-y-revestimientos")!;

export const metadata: Metadata = {
  title: "Pisos y revestimientos | Maderera Don Antonio",
  description: "Pisos flotantes Quick-Step, zócalos EPS Santa Luzia y manta aislante. San Jorge, Santa Fe.",
};

export default function PisosYRevestimientosPage() {
  return (
    <>
      <HeaderListado
        titulo={grupo.nombre}
        bajada={grupo.descripcion}
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
