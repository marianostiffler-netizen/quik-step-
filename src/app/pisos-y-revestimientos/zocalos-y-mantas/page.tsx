import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { accessories, mantaPrice, pricingInfo } from "@/data/site-data";
import { buscarCategoria, buscarGrupo } from "@/data/catalogo";
import { formatearPrecio } from "@/lib/precios";
import { waLink } from "@/config/negocio";
import HeaderListado from "@/components/catalogo/HeaderListado";

const grupo = buscarGrupo("pisos-y-revestimientos")!;
const cat = buscarCategoria("pisos-y-revestimientos", "zocalos-y-mantas")!;

export const metadata: Metadata = {
  title: "Zócalos y mantas | Pisos y revestimientos | Maderera Don Antonio",
  description: "Zócalos EPS Santa Luzia y manta aislante Isolant para la instalación de pisos flotantes. San Jorge, Santa Fe.",
};

export default function ZocalosYMantasPage() {
  const zocalos = accessories.filter((a) => a.category === "zocalo");
  const mantas = accessories.filter((a) => a.category === "manta");
  return (
    <>
      <HeaderListado
        titulo={cat.nombre}
        bajada={cat.descripcion}
        conteo={`${zocalos.length + mantas.length} productos`}
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: cat.nombre }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Complementos para la instalación</h2>
          <p className="mt-3 text-nogal-suave">Zócalos EPS Santa Luzia y manta aislante.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zocalos.map((z) => (
              <div key={z.sku} id={z.sku} className="tarjeta scroll-mt-24 p-5">
                <h3 className="font-display text-base font-bold text-nogal">{z.name}</h3>
                <p className="mt-1 text-sm text-nogal-suave">{z.dimensions}</p>
                <p className="text-xs text-nogal-suave">{z.packaging}</p>
                <p className="mt-3 font-bold text-precio tabular-nums">
                  {formatearPrecio(z.price_usd, "USD")}
                  <span className="text-xs font-medium text-nogal-suave">/{z.price_unit}</span>
                </p>
              </div>
            ))}
            {mantas.map((m) => (
              <div key={m.sku} id={m.sku} className="tarjeta scroll-mt-24 p-5">
                <h3 className="font-display text-base font-bold text-nogal">{m.name}</h3>
                <p className="mt-1 text-sm text-nogal-suave">{m.dimensions}</p>
                <p className="text-xs text-nogal-suave">{m.packaging}</p>
                <p className="mt-3 font-bold text-precio tabular-nums">
                  {formatearPrecio(mantaPrice.price_ars_m2, "ARS")}
                  <span className="text-xs font-medium text-nogal-suave">/m²</span>
                </p>
                <p className="text-xs text-nogal-suave">Precio en pesos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-nogal-suave">{pricingInfo.tax_note}. Precios de zócalos en dólares.</p>
            <a
              href={waLink("Hola! Quisiera consultar por zócalos y manta para pisos flotantes.")}
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
