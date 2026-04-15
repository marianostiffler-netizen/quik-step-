import type { Metadata } from "next";
import { AlertTriangle, Hammer, ShieldCheck, Trees, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Construcción y Maderas | Maderera Don Antonio",
  description:
    "Machimbres, tirantería, vigas, aislantes y guía técnica experta para obras en madera.",
};

const machimbres = [
  {
    material: "Pino Eliotis",
    rows: [
      { medida: '1/2" x 4"', largo: "2.44 m", grosor: "12 mm", destaque: "Ideal para cielorrasos" },
      { medida: '3/4" x 5"', largo: "2.44 m", grosor: "18 mm", destaque: "Uso general" },
      { medida: '1" x 6"', largo: "2.44 m", grosor: "25 mm", destaque: "Ideal para entrepisos/pisos" },
    ],
  },
  {
    material: "Eucalipto",
    rows: [
      { medida: '1/2" x 4"', largo: "2.44 m", grosor: "12 mm", destaque: "Ideal para cielorrasos" },
      { medida: '3/4" x 5"', largo: "2.44 m", grosor: "18 mm", destaque: "Uso general" },
      { medida: '1" x 6"', largo: "2.44 m", grosor: "25 mm", destaque: "Ideal para entrepisos/pisos" },
    ],
  },
];

const tiranteria = [
  {
    title: "Interior",
    material: "Pino Elliotis",
    rows: [
      { medida: '2" x 4"', largos: "De 3.05 m a 6.10 m", uso: "Estructuras de techos" },
      { medida: '2" x 5"', largos: "De 3.05 m a 6.10 m", uso: "Estructuras de techos" },
      { medida: '2" x 6"', largos: "De 3.05 m a 6.10 m", uso: "Entrepisos" },
    ],
  },
  {
    title: "Exterior",
    material: "Eucalipto Grandis",
    rows: [
      { medida: '3" x 8"', largos: "Hasta 12 metros", uso: "Pérgolas" },
      { medida: '4" x 10"', largos: "Hasta 12 metros", uso: "Decks y muelles" },
    ],
  },
];

const aislantes = [
  {
    name: "Lana de vidrio",
    detail: "Disponible con y sin aluminio para aplicaciones térmicas y de confort interior.",
  },
  {
    name: "Membrana hidrófuga",
    detail: "Estilo Tyvek, pensada para proteger la envolvente y mejorar el desempeño frente a la humedad.",
  },
  {
    name: "Espuma de polietileno",
    detail: "Presentaciones de 10 mm y 20 mm para distintas necesidades de apoyo y aislación.",
  },
  {
    name: "Mexpol 3 mm sin aluminio",
    detail: "Aislante específico recomendado para pisos flotantes.",
  },
];

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
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Hammer className="text-wood-600" size={24} />
              <h2 className="text-2xl font-bold text-da-dark">Machimbres</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-wood-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-wood-100 text-wood-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Material</th>
                    <th className="px-4 py-3 text-left font-semibold">Medida</th>
                    <th className="px-4 py-3 text-left font-semibold">Largos</th>
                    <th className="px-4 py-3 text-left font-semibold">Grosor</th>
                    <th className="px-4 py-3 text-left font-semibold">Uso recomendado</th>
                  </tr>
                </thead>
                <tbody>
                  {machimbres.map((group) =>
                    group.rows.map((row, index) => (
                      <tr key={`${group.material}-${row.medida}`} className="border-t border-wood-100">
                        <td className="px-4 py-3 font-semibold text-da-dark">
                          {group.material}
                        </td>
                        <td className="px-4 py-3 text-da-dark">{row.medida}</td>
                        <td className="px-4 py-3 text-da-gray">{row.largo}</td>
                        <td className="px-4 py-3 text-da-gray">{row.grosor}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              index === 0
                                ? "bg-amber-100 text-amber-800"
                                : "bg-wood-700 text-white"
                            }`}
                          >
                            {row.destaque}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800">
                Más vendido · 1/2" x 4" para cielorrasos
              </span>
              <span className="rounded-full bg-wood-100 px-3 py-1 font-semibold text-wood-700">
                1" x 6" recomendado para entrepisos
              </span>
            </div>
          </div>

          <div>
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
                  <table className="min-w-full text-sm">
                    <thead className="bg-wood-100 text-wood-700">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Material</th>
                        <th className="px-4 py-3 text-left font-semibold">Medida</th>
                        <th className="px-4 py-3 text-left font-semibold">Largos</th>
                        <th className="px-4 py-3 text-left font-semibold">Grosor/Uso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row) => (
                        <tr key={`${block.title}-${row.medida}`} className="border-t border-wood-100">
                          <td className="px-4 py-3 font-semibold text-da-dark">{block.material}</td>
                          <td className="px-4 py-3 text-da-dark">{row.medida}</td>
                          <td className="px-4 py-3 text-da-gray">{row.largos}</td>
                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                              {row.uso}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

          <div>
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
        </div>
      </section>
    </main>
  );
}
