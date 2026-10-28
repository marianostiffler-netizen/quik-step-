import type { Metadata } from "next";
import { melaminas } from "@/data/melaminas-data";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";
import type { GrupoFiltro, ItemCatalogo } from "@/components/catalogo/tipos";

export const metadata: Metadata = {
  title: "Melaminas Faplac | Maderera Don Antonio",
  description:
    "Muestrario completo de melaminas Faplac: Línea Mesopotamia, Línea Táctil y Revestimientos. San Jorge, Santa Fe, Argentina.",
};

const sinPrefijo = (linea: string) => linea.replace(/^Línea /, "");
const tipoDe = (esRevestimiento: boolean) => (esRevestimiento ? "revestimiento" : "melamina");

const items: ItemCatalogo[] = melaminas.map((m) => ({
  id: m.id,
  nombre: m.nombre,
  claveNombre: `${m.nombre} ${m.esRevestimiento ? "1" : "0"}`,
  eyebrow: m.linea,
  chips: m.esRevestimiento ? ["Revestimiento"] : undefined,
  detalles: [`Medidas: ${m.medidas}`],
  imagen: { src: m.imagen, alt: `Textura ${m.nombre}, ${m.linea}` },
  aspecto: "cuadrado",
  precio: null,
  valores: {
    linea: [m.linea],
    tipo: [tipoDe(m.esRevestimiento)],
    medidas: [m.medidas],
  },
}));

const lineas = [...new Set(melaminas.map((m) => m.linea))].sort((a, b) => a.localeCompare(b, "es"));
const medidas = [...new Set(melaminas.map((m) => m.medidas))].sort((a, b) => a.localeCompare(b, "es", { numeric: true }));

const grupos: GrupoFiltro[] = [
  { key: "linea", titulo: "Línea", opciones: lineas.map((l) => ({ value: l, label: sinPrefijo(l) })) },
  {
    key: "tipo",
    titulo: "Tipo",
    opciones: [
      { value: "melamina", label: "Melamina" },
      { value: "revestimiento", label: "Revestimiento" },
    ].filter((o) => melaminas.some((m) => tipoDe(m.esRevestimiento) === o.value)),
  },
  ...(medidas.length > 1 ? [{ key: "medidas", titulo: "Medidas", opciones: medidas.map((v) => ({ value: v, label: v })) }] : []),
].filter((g) => g.opciones.length > 1);

export default function MelaminasPage() {
  return (
    <>
      <HeaderListado
        titulo="Melaminas Faplac"
        bajada="Muestrario completo de melaminas y revestimientos. Elegí el color o la textura y consultá disponibilidad por WhatsApp."
        conteo={`${melaminas.length} colores · ${lineas.length} líneas`}
      />
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Muestrario de melaminas</h2>
          <CatalogoItems
            id="melaminas"
            items={items}
            grupos={grupos}
            ordenes={["nombre-asc", "nombre-desc"]}
            unidades={["color", "colores"]}
            compacto
          />
        </div>
      </section>
    </>
  );
}
