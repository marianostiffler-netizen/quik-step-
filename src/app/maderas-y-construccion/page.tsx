import { Suspense } from "react";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { buscarGrupo, resumenPorRuta } from "@/data/catalogo";
import { filtrosObra, itemsObra } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";
import CatalogoConstruccion from "@/components/catalogo/CatalogoConstruccion";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

const grupo = buscarGrupo("maderas-y-construccion")!;

export const metadata: Metadata = {
  title: "Maderas y construcción | Maderera Don Antonio",
  description: "Machimbres, tirantes y vigas, tablas para encofrado, estructura de obra, aislantes y materiales secos. San Jorge, Santa Fe.",
};

const items = itemsObra();
const propsCatalogo = {
  id: "construccion",
  items,
  grupos: filtrosObra(),
  ordenes: ["nombre-asc", "nombre-desc"] as ("nombre-asc" | "nombre-desc")[],
  unidades: ["producto", "productos"] as [string, string],
};

export default function MaderasYConstruccionPage() {
  return (
    <>
      <HeaderListado
        titulo={grupo.nombre}
        bajada="Información técnica para obras en madera: machimbres, tirantes, vigas, aislantes y asesoramiento práctico para resolver cada proyecto con criterio profesional."
        conteo={`${resumenPorRuta()[grupo.href].cantidad} productos · ${grupo.categorias.length} categorías`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Categorías</h2>
          <div className="mt-8">
            <GrillaCategorias items={grupo.categorias} />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Todos los productos</h2>
          <div className="mt-8">
            <Suspense fallback={<CatalogoItems {...propsCatalogo} />}>
              <CatalogoConstruccion {...propsCatalogo} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Datos útiles</h2>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-superficie border border-veta px-3 py-2 font-semibold text-algarrobo">
              Más vendido · 1/2&quot; x 4&quot; para cielorrasos
            </span>
            <span className="rounded-full bg-superficie border border-veta px-3 py-2 font-semibold text-nogal">
              1&quot; x 6&quot; recomendado para entrepisos
            </span>
          </div>
          <p className="mt-4 text-sm italic text-nogal-suave">
            Maderas en bruto (sin cepillar) ya que no requieren terminación estética para este uso.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta border-algarrobo p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 shrink-0 text-algarrobo" size={28} aria-hidden="true" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-algarrobo">Guía del Experto</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-nogal">Cómo armar una pérgola correctamente</h2>
                <p className="mt-4 max-w-4xl leading-relaxed text-nogal-suave">
                  Para una pérgola duradera, la columna no debe enterrarse directamente en el suelo.
                  Lo correcto es apoyarla sobre pilotes o bases de ladrillo, elevándola del nivel de humedad.
                  De esta manera se reduce el contacto directo con la tierra, se mejora la ventilación y se prolonga la vida útil de la estructura.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-card border border-veta bg-pino p-4">
                    <p className="font-semibold text-nogal">Paso clave</p>
                    <p className="mt-1 text-sm text-nogal-suave">Usar base elevada con pilotes de ladrillo o soporte técnico equivalente.</p>
                  </div>
                  <div className="rounded-card border border-veta bg-pino p-4">
                    <p className="font-semibold text-nogal">Evitar</p>
                    <p className="mt-1 text-sm text-nogal-suave">Enterrar la columna directamente, porque acelera el deterioro por humedad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
