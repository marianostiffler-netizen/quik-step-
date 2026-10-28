import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { mirrors, escalonesMayoristas } from "@/data/espejos-inteligentes-data";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { filtrosEspejosLed, itemsEspejosLed, medidaEspejo } from "@/data/items";
import { waLink } from "@/config/negocio";
import HeaderListado from "@/components/catalogo/HeaderListado";
import CatalogoItems from "@/components/catalogo/CatalogoItems";

const grupo = buscarGrupo("hogar-y-deco")!;
const espejos = buscarCategoria("hogar-y-deco", "espejos")!;

export const metadata: Metadata = {
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
                {escalonesMayoristas.map((tier) => (
                  <tr key={tier.desde} className="border-t border-veta">
                    <td className="px-4 py-3 text-nogal">
                      Desde {tier.desde} {tier.desde === 1 ? "espejo" : "espejos"}
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
