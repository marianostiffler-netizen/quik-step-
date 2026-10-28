import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AlertTriangle, Hammer, ShieldCheck, Trees, Wrench, Building2 } from "lucide-react";
import { productosObra, type CategoriaObra } from "@/data/construccion-data";

export const metadata: Metadata = {
  title: "Construcción y Maderas | Maderera Don Antonio",
  description:
    "Machimbres, tirantería, vigas, aislantes y guía técnica experta para obras en madera.",
};

// Agrupa por una clave manteniendo el orden de los datos
function agrupar<T>(lista: T[], clave: (t: T) => string): { clave: string; items: T[] }[] {
  const grupos: { clave: string; items: T[] }[] = [];
  for (const it of lista) {
    const g = grupos.find((x) => x.clave === clave(it));
    if (g) g.items.push(it);
    else grupos.push({ clave: clave(it), items: [it] });
  }
  return grupos;
}

const deCategoria = (c: CategoriaObra) => productosObra.filter((p) => p.categoria === c);

const machimbres = agrupar(deCategoria("machimbre"), (p) => p.material ?? "").map((g) => ({
  material: g.clave,
  rows: g.items.map((p) => ({ medida: p.medida ?? "", largo: p.largo ?? "", grosor: p.grosor ?? "", destaque: p.detalle ?? "" })),
}));

const tiranteria = agrupar(deCategoria("tirante"), (p) => p.ubicacion ?? "").map((g) => ({
  title: g.clave,
  material: g.items[0].material ?? "",
  rows: g.items.map((p) => ({ medida: p.medida ?? "", largos: p.largo ?? "", uso: p.detalle ?? "" })),
}));

const aislantes = deCategoria("aislante").map((p) => ({ name: p.nombre, detail: p.detalle ?? "" }));

const tablasEncofrado = agrupar(deCategoria("tabla-encofrado"), (p) => p.material ?? "").map((g) => ({
  material: g.clave,
  rows: g.items.map((p) => ({ medida: p.medida ?? "", descripcion: p.descripcion ?? "", uso: p.detalle ?? "" })),
}));

const estructuraObra = deCategoria("estructura").map((p) => ({
  producto: p.nombre.startsWith("Bastidor") ? "Bastidores" : p.nombre.startsWith("Puntal") ? "Puntales" : "Fenólicos",
  medida: p.medida ?? "",
  detalle: p.detalle ?? "",
}));

const materialesSecos = deCategoria("material-seco").map((p) => ({
  name: p.nombre,
  detail: p.detalle ?? "",
  destacado: p.destacado === true,
}));

type Columna = { label: string; cellClass?: string };

// Tabla desde md; en mobile cada fila se muestra como tarjeta con pares etiqueta/valor
function TablaResponsive({
  columnas,
  filas,
  enmarcada = false,
}: {
  columnas: Columna[];
  filas: { key: string; celdas: ReactNode[] }[];
  enmarcada?: boolean;
}) {
  return (
    <>
      <div
        className={`hidden md:block ${
          enmarcada ? "overflow-x-auto rounded-2xl border border-wood-200 bg-white shadow-sm" : ""
        }`}
      >
        <table className="min-w-full text-sm">
          <thead className="bg-wood-100 text-wood-700">
            <tr>
              {columnas.map((col) => (
                <th key={col.label} className="px-4 py-3 text-left font-semibold">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.key} className="border-t border-wood-100">
                {fila.celdas.map((celda, i) => (
                  <td key={columnas[i].label} className={`px-4 py-3 ${columnas[i].cellClass ?? ""}`}>
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {filas.map((fila) => (
          <dl key={fila.key} className="rounded-xl border border-wood-200 bg-white p-4 text-sm space-y-2">
            {fila.celdas.map((celda, i) => (
              <div key={columnas[i].label} className="flex flex-col gap-0.5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-wood-700">{columnas[i].label}</dt>
                <dd className={columnas[i].cellClass ?? ""}>{celda}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </>
  );
}

export default function ConstruccionYMaderasPage() {
  return (
    <main>
      <section className="bg-wood-700 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <Trees size={34} className="text-amber-500" />
            <div className="h-px flex-1 max-w-24 bg-amber-500/40" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">Construcción y Maderas</h1>
          <p className="mt-4 text-wood-100 max-w-3xl text-lg leading-relaxed">
            Información técnica para obras en madera: machimbres, tirantería, vigas, aislantes y asesoramiento práctico para resolver cada proyecto con criterio profesional.
          </p>
        </div>
      </section>

      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          <div id="machimbres" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <Hammer className="text-wood-600" size={24} />
              <h2 className="text-2xl font-bold text-da-dark">Machimbres</h2>
            </div>
            <TablaResponsive
              enmarcada
              columnas={[
                { label: "Material", cellClass: "font-semibold text-da-dark" },
                { label: "Medida", cellClass: "text-da-dark" },
                { label: "Largos", cellClass: "text-da-gray" },
                { label: "Grosor", cellClass: "text-da-gray" },
                { label: "Uso recomendado" },
              ]}
              filas={machimbres.flatMap((group) =>
                group.rows.map((row, index) => ({
                  key: `${group.material}-${row.medida}`,
                  celdas: [
                    group.material,
                    row.medida,
                    row.largo,
                    row.grosor,
                    <span
                      key="destaque"
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        index === 0 ? "bg-amber-100 text-amber-800" : "bg-wood-700 text-white"
                      }`}
                    >
                      {row.destaque}
                    </span>,
                  ],
                }))
              )}
            />
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800">
                Más vendido · 1/2&quot; x 4&quot; para cielorrasos
              </span>
              <span className="rounded-full bg-wood-100 px-3 py-1 font-semibold text-wood-700">
                1&quot; x 6&quot; recomendado para entrepisos
              </span>
            </div>
          </div>

          <div id="tiranteria" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-wood-600" size={24} />
              <h2 className="text-2xl font-bold text-da-dark">Tirantería y Vigas</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {tiranteria.map((block) => (
                <div key={block.title} className="rounded-2xl border border-wood-200 bg-white p-6 overflow-x-auto">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-da-dark">{block.title}</h3>
                    <p className="text-sm text-da-gray mt-1">{block.material}</p>
                  </div>
                  <TablaResponsive
                    columnas={[
                      { label: "Material", cellClass: "font-semibold text-da-dark" },
                      { label: "Medida", cellClass: "text-da-dark" },
                      { label: "Largos", cellClass: "text-da-gray" },
                      { label: "Grosor/Uso" },
                    ]}
                    filas={block.rows.map((row) => ({
                      key: `${block.title}-${row.medida}`,
                      celdas: [
                        block.material,
                        row.medida,
                        row.largos,
                        <span key="uso" className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                          {row.uso}
                        </span>,
                      ],
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 text-amber-700" size={28} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Guía del Experto</p>
                <h2 className="mt-2 text-2xl font-bold text-da-dark">Cómo armar una pérgola correctamente</h2>
                <p className="mt-4 text-da-gray leading-relaxed max-w-4xl">
                  Para una pérgola duradera, la columna no debe enterrarse directamente en el suelo.
                  Lo correcto es apoyarla sobre pilotes o bases de ladrillo, elevándola del nivel de humedad.
                  De esta manera se reduce el contacto directo con la tierra, se mejora la ventilación y se prolonga la vida útil de la estructura.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4 border border-amber-200">
                    <p className="font-semibold text-da-dark">Paso clave</p>
                    <p className="text-sm text-da-gray mt-1">Usar base elevada con pilotes de ladrillo o soporte técnico equivalente.</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 border border-amber-200">
                    <p className="font-semibold text-da-dark">Evitar</p>
                    <p className="text-sm text-da-gray mt-1">Enterrar la columna directamente, porque acelera el deterioro por humedad.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="aislantes" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-wood-600" size={24} />
              <h2 className="text-2xl font-bold text-da-dark">Aislantes</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {aislantes.map((item) => (
                <article key={item.name} className="rounded-2xl border border-wood-200 bg-white p-6">
                  <h3 className="text-lg font-bold text-da-dark">{item.name}</h3>
                  <p className="mt-3 text-sm text-da-gray leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div id="encofrado" className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-wood-600" size={24} />
              <h2 className="text-2xl font-bold text-da-dark">Materiales de Obra y Encofrado</h2>
            </div>

            {/* Tablas para Encofrado */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-da-dark mb-4">Tablas para Encofrado</h3>
              <p className="text-sm text-da-gray mb-4 italic">
                Maderas en bruto (sin cepillar) ya que no requieren terminación estética para este uso.
              </p>
              <TablaResponsive
                enmarcada
                columnas={[
                  { label: "Material", cellClass: "font-semibold text-da-dark" },
                  { label: "Medida", cellClass: "text-da-dark" },
                  { label: "Descripción", cellClass: "text-da-gray" },
                  { label: "Uso recomendado" },
                ]}
                filas={tablasEncofrado.flatMap((group) =>
                  group.rows.map((row) => ({
                    key: `${group.material}-${row.medida}`,
                    celdas: [
                      group.material,
                      row.medida,
                      row.descripcion,
                      <span key="uso" className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        {row.uso}
                      </span>,
                    ],
                  }))
                )}
              />
            </div>

            {/* Estructura de Obra */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-da-dark mb-4">Estructura de Obra</h3>
              <TablaResponsive
                enmarcada
                columnas={[
                  { label: "Producto", cellClass: "font-semibold text-da-dark" },
                  { label: "Medida", cellClass: "text-da-dark" },
                  { label: "Detalle", cellClass: "text-da-gray" },
                ]}
                filas={estructuraObra.map((item) => ({
                  key: `${item.producto}-${item.medida}`,
                  celdas: [item.producto, item.medida, item.detalle],
                }))}
              />
            </div>

            {/* Materiales Secos */}
            <div>
              <h3 className="text-xl font-bold text-da-dark mb-4">Materiales Secos</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {materialesSecos.map((item) => (
                  <article
                    key={item.name}
                    className={`rounded-2xl border p-6 ${
                      item.destacado
                        ? "border-amber-400 bg-amber-50"
                        : "border-wood-200 bg-white"
                    }`}
                  >
                    {item.destacado && (
                      <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-amber-700">
                        Destacado
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-da-dark">{item.name}</h3>
                    <p className="mt-3 text-sm text-da-gray leading-relaxed">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
