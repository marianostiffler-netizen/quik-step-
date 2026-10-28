import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { mirrors, discountTiers, type Mirror } from "@/data/espejos-inteligentes-data";
import { waLink } from "@/config/negocio";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";
import type { GrupoFiltro, ItemCatalogo, Silueta } from "@/components/catalogo/tipos";

export const metadata: Metadata = {
  title: "Espejos Inteligentes | Maderera Don Antonio",
  description: "Espejos inteligentes con tecnología Touch, desempañador y reloj. Rectangulares, cuadrados, ovalados y circulares.",
};

const FORMAS: { value: Mirror["shape"]; label: string }[] = [
  { value: "rectangular", label: "Rectangular" },
  { value: "square", label: "Cuadrado" },
  { value: "oval", label: "Ovalado" },
  { value: "circular", label: "Circular" },
];

const medida = (m: Mirror) => `${m.dimensions.width} × ${m.dimensions.height} cm`;

function silueta(m: Mirror): Silueta {
  if (m.shape === "square") return "cuadrado";
  if (m.shape === "oval") return "ovalado";
  if (m.shape === "circular") return "circular";
  return m.dimensions.height > m.dimensions.width ? "vertical" : "horizontal";
}

const FUNCIONES_COMPLETAS = ["Touch 3 tonos", "Desempañador", "Display LCD", "Temperatura", "Sensor mov."];
const FUNCIONES_BASICAS = ["Touch 3 tonos", "LED regulable"];

const items: ItemCatalogo[] = mirrors.map((m) => ({
  id: m.id,
  nombre: m.name,
  nombreConsulta: `${m.name} (modelo ${m.modelo})`,
  claveNombre: `${m.name} ${m.modelo}`,
  eyebrow: `Modelo ${m.modelo}`,
  chips: m.fullFeatured ? FUNCIONES_COMPLETAS : FUNCIONES_BASICAS,
  bloque: { grande: medida(m), chico: FORMAS.find((f) => f.value === m.shape)?.label, silueta: silueta(m) },
  // Solo price_ars: es la moneda en que está cargado. price_usd es una conversión y no se muestra.
  precio: { valor: m.price_ars, moneda: "ARS", unidad: "c/u" },
  valores: {
    forma: [m.shape],
    medida: [medida(m)],
    completas: m.fullFeatured ? ["si"] : [],
  },
}));

const grupos: GrupoFiltro[] = [
  {
    key: "forma",
    titulo: "Forma",
    opciones: FORMAS.filter((f) => mirrors.some((m) => m.shape === f.value)).map((f) => ({ value: f.value, label: f.label })),
  },
  {
    key: "medida",
    titulo: "Medida",
    opciones: [...new Map(mirrors.map((m) => [medida(m), m.dimensions.width * m.dimensions.height])).entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([v]) => ({ value: v, label: v })),
  },
  ...(new Set(mirrors.map((m) => m.fullFeatured)).size > 1
    ? [{ key: "completas", titulo: "Funciones", opciones: [{ value: "si", label: "Funciones completas" }] }]
    : []),
].filter((g) => g.opciones.length > 0);

export default function EspejosInteligentesPage() {
  const medidas = new Set(mirrors.map(medida)).size;
  return (
    <>
      <HeaderListado
        titulo="Espejos inteligentes"
        bajada="Tecnología Touch, desempañador y reloj en un solo producto."
        conteo={`${mirrors.length} modelos · ${medidas} medidas`}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Catálogo de espejos</h2>
          <CatalogoItems
            id="inteligentes"
            items={items}
            grupos={grupos}
            ordenes={["precio-asc", "precio-desc", "nombre-asc", "nombre-desc"]}
            unidades={["modelo", "modelos"]}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Descuentos mayoristas</h2>
          <div className="tarjeta mt-6 overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Descuento según cantidad de espejos</caption>
              <thead className="bg-pino text-nogal">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Cantidad</th>
                  <th scope="col" className="px-4 py-3 text-left font-semibold">Descuento</th>
                </tr>
              </thead>
              <tbody>
                {discountTiers.map((tier) => (
                  <tr key={tier.label} className="border-t border-veta">
                    <td className="px-4 py-3 text-nogal">
                      {tier.max === Infinity
                        ? `Más de ${tier.min} espejos`
                        : tier.min === 0
                          ? tier.label
                          : `${tier.min} a ${tier.max} espejos`}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-pino px-3 py-1 font-bold text-algarrobo">{tier.label}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <p className="font-medium text-nogal">¿Eres mayorista? Contáctanos para cotizaciones especiales</p>
            <a
              href={waLink("Hola! Quisiera consultar por espejos inteligentes (compra mayorista).")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shrink-0"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
