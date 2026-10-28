import type { Metadata } from "next";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { itemsHogar } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

const grupo = buscarGrupo("hogar-y-deco")!;
const cat = buscarCategoria("hogar-y-deco", "articulos-del-hogar")!;

export const metadata: Metadata = {
  title: "Artículos del hogar | Hogar y deco | Maderera Don Antonio",
  description: cat.descripcion,
};

const items = itemsHogar();

export default function ArticulosHogarPage() {
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada={cat.descripcion}
        conteo={`${items.length} artículos`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Listado de artículos</h2>
          <CatalogoItems id="hogar" items={items} ordenes={["nombre-asc", "nombre-desc"]} unidades={["artículo", "artículos"]} ampliable />
        </div>
      </section>
    </>
  );
}
