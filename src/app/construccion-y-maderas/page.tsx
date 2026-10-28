import { Suspense } from "react";
import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { productosObra, type CategoriaObra, type Uso } from "@/data/construccion-data";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";
import CatalogoConstruccion from "@/components/catalogo/CatalogoConstruccion";
import type { GrupoFiltro, ItemCatalogo } from "@/components/catalogo/tipos";

export const metadata: Metadata = {
  title: "Construcción y Maderas | Maderera Don Antonio",
  description:
    "Machimbres, tirantería, vigas, aislantes y guía técnica experta para obras en madera.",
};

const TIPOS: { value: CategoriaObra; label: string; singular: string }[] = [
  { value: "machimbre", label: "Machimbres", singular: "Machimbre" },
  { value: "tirante", label: "Tirantería y vigas", singular: "Tirantería" },
  { value: "tabla-encofrado", label: "Tablas para encofrado", singular: "Tabla para encofrado" },
  { value: "estructura", label: "Estructura de obra", singular: "Estructura de obra" },
  { value: "aislante", label: "Aislantes", singular: "Aislante" },
  { value: "material-seco", label: "Materiales secos", singular: "Material seco" },
];

const USOS: { value: Uso; label: string }[] = [
  { value: "techos", label: "Techos" },
  { value: "decks", label: "Decks y pérgolas" },
  { value: "entrepisos", label: "Entrepisos" },
  { value: "encofrado", label: "Encofrado" },
  { value: "interiores", label: "Interiores" },
];

const x = (s: string) => s.replace(/ x /g, " × ");

const items: ItemCatalogo[] = productosObra.map((p) => {
  const tipo = TIPOS.find((t) => t.value === p.categoria)!;
  const chips = [
    ...(p.ubicacion ? [p.ubicacion] : []),
    ...(p.material ? [p.material] : []),
    ...(p.grosor ? [`Grosor ${p.grosor}`] : []),
    ...(p.destacado ? ["Destacado"] : []),
  ];
  return {
    id: p.id,
    nombre: p.nombre,
    eyebrow: tipo.singular,
    descripcion: [p.detalle].filter(Boolean).join(" "),
    chips,
    detalles: p.descripcion ? [p.descripcion] : undefined,
    bloque: p.seccion
      ? { grande: x(p.seccion), chico: p.largo }
      : p.grosor
        ? { grande: p.grosor, chico: p.medida }
        : { grande: tipo.singular },
    precio: null,
    valores: {
      tipo: [p.categoria],
      material: p.material ? [p.material] : [],
      uso: p.usos,
    },
  };
});

const materiales = [...new Set(productosObra.flatMap((p) => (p.material ? [p.material] : [])))].sort((a, b) =>
  a.localeCompare(b, "es")
);

const grupos: GrupoFiltro[] = [
  { key: "tipo", titulo: "Tipo", opciones: TIPOS.filter((t) => productosObra.some((p) => p.categoria === t.value)).map(({ value, label }) => ({ value, label })) },
  { key: "material", titulo: "Material", opciones: materiales.map((m) => ({ value: m, label: m })) },
  { key: "uso", titulo: "Uso", opciones: USOS.filter((u) => productosObra.some((p) => p.usos.includes(u.value))) },
].filter((g) => g.opciones.length > 1);

const propsCatalogo = {
  id: "construccion",
  items,
  grupos,
  ordenes: ["nombre-asc", "nombre-desc"] as ("nombre-asc" | "nombre-desc")[],
  unidades: ["producto", "productos"] as [string, string],
};

export default function ConstruccionYMaderasPage() {
  const tiposUsados = new Set(productosObra.map((p) => p.categoria)).size;
  return (
    <>
      <HeaderListado
        titulo="Construcción y maderas"
        bajada="Información técnica para obras en madera: machimbres, tirantería, vigas, aislantes y asesoramiento práctico para resolver cada proyecto con criterio profesional."
        conteo={`${items.length} productos · ${tiposUsados} tipos`}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Catálogo de construcción y maderas</h2>
          <Suspense fallback={<CatalogoItems {...propsCatalogo} />}>
            <CatalogoConstruccion {...propsCatalogo} />
          </Suspense>
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
