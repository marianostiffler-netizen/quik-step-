import type { Metadata } from "next";
import { mirrors } from "@/data/espejos-inteligentes-data";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { filtrosEspejosLed, itemsEspejosLed, medidaEspejo } from "@/data/items";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

const grupo = buscarGrupo("hogar-y-deco")!;
const espejos = buscarCategoria("hogar-y-deco", "espejos")!;

export const metadata: Metadata = {
  alternates: { canonical: "/hogar-y-deco/espejos/led" },
  title: "Espejos LED | Hogar y deco | Maderera Don Antonio",
  description: "Espejos LED con tecnología Touch, desempañador y reloj. Rectangulares, cuadrados, ovalados y circulares.",
};

const items = itemsEspejosLed();
const grupos = filtrosEspejosLed();

export default function EspejosInteligentesPage() {
  const medidas = new Set(mirrors.map(medidaEspejo)).size;
  return (
    <>
      <HeaderListado
        titulo="Espejos LED"
        bajada="Tecnología Touch, desempañador y reloj en un solo producto."
        conteo={`${mirrors.length} modelos · ${medidas} medidas`}
        migas={[
          { label: "Inicio", href: "/" },
          { label: grupo.nombre, href: grupo.href },
          { label: espejos.nombre, href: espejos.href },
          { label: "Espejos LED" },
        ]}
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

      {/* TODO(cliente): volver a mostrar la tabla cuando confirme los mínimos de cada escalón */}
    </>
  );
}
