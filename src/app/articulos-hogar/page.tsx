import type { Metadata } from "next";
import { articulosHogar } from "@/data/hogar-data";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";
import type { ItemCatalogo } from "@/components/catalogo/tipos";

export const metadata: Metadata = {
  title: "Artículos del Hogar | Maderera Don Antonio",
  description:
    "Muebles, sillas y mesas de madera de alta calidad para tu hogar.",
};

const items: ItemCatalogo[] = articulosHogar.map((a) => ({
  id: a.id,
  nombre: a.title,
  descripcion: a.description,
  imagen: { src: a.image, alt: a.title },
  precio: null,
}));

export default function ArticulosHogarPage() {
  return (
    <>
      <HeaderListado
        titulo="Artículos del hogar"
        bajada="Muebles, sillas y mesas de madera de alta calidad para tu hogar."
        conteo={`${items.length} artículos`}
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
