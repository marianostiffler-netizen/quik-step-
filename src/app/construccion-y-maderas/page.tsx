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
      { medida: '1/2"', largo: "2.00 m / 2.44 m", grosor: "12 mm", destaque: "Ideal para cielorrasos" },
      { medida: '1"', largo: "2.00 m / 2.44 m", grosor: "19 mm", destaque: "Ideal para entrepisos" },
    ],
  },
  {
    material: "Eucalipto",
    rows: [
      { medida: '1/2"', largo: "2.00 m / 2.44 m", grosor: "12 mm", destaque: "Ideal para cielorrasos" },
      { medida: '1"', largo: "2.00 m / 2.44 m", grosor: "19 mm", destaque: "Ideal para entrepisos" },
    ],
  },
];

const tiranteria = [
  {
    title: "Interior",
    items: ["Vigas laminadas", "Tirantes de pino", "Tirantes de eucalipto"],
  },
  {
    title: "Exterior",
    items: ["Vigas laminadas tratadas", "Tirantes de eucalipto", "Soluciones para pérgolas"],
  },
];

const aislantes = [
  {
    name: "Mexpol",
    detail: "Aislante térmico para mejorar el confort y acompañar la instalación de pisos y estructuras ligeras.",
  },
  {
    name: "Fibra de vidrio",
    detail: "Opción técnica para control térmico en distintos usos constructivos.",
  },
  {
    name: '3 mm sin aluminio',
    detail: "Recomendado especialmente para pisos flotantes.",
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
                1/2" destacado para cielorrasos
              </span>
              <span className="rounded-full bg-wood-100 px-3 py-1 font-semibold text-wood-700">
                1" recomendado para entrepisos
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
                <div key={block.title} className="rounded-2xl border border-wood-200 bg-white p-6">
                  <h3 className="text-xl font-bold text-da-dark mb-4">{block.title}</h3>
                  <ul className="space-y-3 text-da-gray">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <ShieldCheck size={18} className="mt-0.5 text-wood-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <div className="grid md:grid-cols-3 gap-6">
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
