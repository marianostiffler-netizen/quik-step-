import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { filtrosMelaminas, itemsMelaminas, lineasMelaminas, listaMelaminas } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

type Params = { categoria: string };

const GRUPO = "placas-y-melaminas";

export function generateStaticParams() {
  return buscarGrupo(GRUPO)!.categorias.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const cat = buscarCategoria(GRUPO, (await params).categoria);
  if (!cat) return {};
  return {
    title: `${cat.nombre} Faplac | Maderera Don Antonio`,
    description: `${cat.descripcion} San Jorge, Santa Fe.`,
  };
}

export default async function CategoriaPlacasPage({ params }: { params: Promise<Params> }) {
  const slug = (await params).categoria;
  const grupo = buscarGrupo(GRUPO)!;
  const cat = buscarCategoria(GRUPO, slug);
  if (!cat) notFound();

  const esRevestimiento = slug === "revestimientos-melaminicos";
  const total = listaMelaminas(esRevestimiento).length;
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada="Elegí el color o la textura y consultá disponibilidad por WhatsApp."
        conteo={`${total} colores · ${lineasMelaminas(esRevestimiento).length} líneas`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Muestrario de {cat.nombre.toLowerCase()}</h2>
          <CatalogoItems
            id={slug}
            items={itemsMelaminas(esRevestimiento)}
            grupos={filtrosMelaminas(esRevestimiento)}
            ordenes={["nombre-asc", "nombre-desc"]}
            unidades={["color", "colores"]}
            compacto
          />
        </div>
      </section>
    </>
  );
}
