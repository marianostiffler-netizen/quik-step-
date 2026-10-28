import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buscarCategoria, buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import { TIPOS_OBRA, filtrosObra, itemsObra } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

type Params = { categoria: string };

const GRUPO = "maderas-y-construccion";

export function generateStaticParams() {
  return TIPOS_OBRA.map((t) => ({ categoria: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const cat = buscarCategoria(GRUPO, (await params).categoria);
  if (!cat) return {};
  return {
    title: `${cat.nombre} | Maderas y construcción | Maderera Don Antonio`,
    description: cat.descripcion,
    alternates: { canonical: cat.href },
  };
}

export default async function CategoriaObraPage({ params }: { params: Promise<Params> }) {
  const slug = (await params).categoria;
  const grupo = buscarGrupo(GRUPO)!;
  const cat = buscarCategoria(GRUPO, slug);
  const tipo = TIPOS_OBRA.find((t) => t.slug === slug);
  if (!cat || !tipo) notFound();

  const items = itemsObra(tipo.value);
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada={cat.descripcion}
        conteo={`${resumenPorRuta()[cat.href].cantidad} productos`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">{cat.nombre}</h2>
          <CatalogoItems
            id={`obra-${slug}`}
            items={items}
            grupos={filtrosObra(tipo.value)}
            ordenes={["nombre-asc", "nombre-desc"]}
            unidades={["producto", "productos"]}
          />
        </div>
      </section>
    </>
  );
}
