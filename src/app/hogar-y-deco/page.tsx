import type { Metadata } from "next";
import { buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import HeaderListado from "@/components/catalogo/HeaderListado";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

const grupo = buscarGrupo("hogar-y-deco")!;

export const metadata: Metadata = {
  alternates: { canonical: "/hogar-y-deco" },
  title: "Hogar y deco | Maderera Don Antonio",
  description: "Artículos del hogar en madera y espejos LED y artesanales. San Jorge, Santa Fe.",
};

export default function HogarYDecoPage() {
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
