import type { Metadata } from "next";
import { buscarCategoria, buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import HeaderListado from "@/components/catalogo/HeaderListado";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

const grupo = buscarGrupo("hogar-y-deco")!;
const cat = buscarCategoria("hogar-y-deco", "espejos")!;

export const metadata: Metadata = {
  alternates: { canonical: "/hogar-y-deco/espejos" },
  title: "Espejos | Hogar y deco | Maderera Don Antonio",
  description: "Espejos LED y espejos artesanales con iluminación LED integrada. San Jorge, Santa Fe.",
};

export default function EspejosPage() {
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada={cat.descripcion}
        conteo={`${resumenPorRuta()[cat.href].cantidad} modelos · ${cat.subcategorias!.length} categorías`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Tipos de espejos</h2>
          <GrillaCategorias items={cat.subcategorias!} />
        </div>
      </section>
    </>
  );
}
