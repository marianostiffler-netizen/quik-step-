import type { Metadata } from "next";
import { Package, Ruler, DollarSign, Info } from "lucide-react";
import { accessories, mantaPrice, pricingInfo } from "@/data/site-data";

export const metadata: Metadata = {
  title: "Accesorios | Zócalos SantaLuzia y Manta Isolant | Quick-Step",
  description:
    "Zócalos EPS SantaLuzia y manta aislante Isolant. Complementos indispensables para la instalación de pisos laminados Quick-Step.",
};

export default function AccesoriosPage() {
  const zocalos = accessories.filter((a) => a.category === "zocalo");
  const mantas = accessories.filter((a) => a.category === "manta");

  return (
    <>
      {/* Header */}
      <section className="bg-qs-gray-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Accesorios
          </h1>
          <p className="mt-4 text-qs-gray text-lg max-w-2xl">
            Todo lo que necesitás para una instalación completa: zócalos EPS
            SantaLuzia y manta aislante Isolant.
          </p>
        </div>
      </section>

      {/* Pricing disclaimer */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-qs-gray">
            <span className="flex items-center gap-1">
              <Info size={14} />
              {pricingInfo.tax_note}
            </span>
            <span>|</span>
            <span>Lista: {pricingInfo.price_date}</span>
            <span>|</span>
            <span>{pricingInfo.bulk_discount}</span>
          </div>
        </div>
      </section>

      {/* Zócalos */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Zócalos EPS SantaLuzia
            </h2>
            <p className="mt-2 text-qs-gray">
              Zócalos de poliestireno expandido (EPS): livianos, resistentes a
              la humedad y fáciles de instalar. Precios por vara de 2,40 metros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {zocalos.map((item) => (
              <div
                key={item.sku}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-qs-blue/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <span className="text-xs text-qs-gray font-mono">
                      {item.sku}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-qs-blue">
                      USD {item.price_usd.toFixed(2)}
                    </span>
                    <span className="block text-xs text-qs-gray">
                      /{item.price_unit}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    <Ruler size={12} />
                    {item.dimensions}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    <Package size={12} />
                    {item.packaging}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manta */}
      <section className="py-16 bg-qs-gray-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Manta Aislante
            </h2>
            <p className="mt-2 text-qs-gray">
              Base aislante indispensable para la correcta instalación de pisos
              laminados.
            </p>
          </div>

          <div className="max-w-xl">
            {mantas.map((item) => (
              <div
                key={item.sku}
                className="bg-white rounded-2xl border border-gray-200 p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-bold text-qs-blue">
                    ${mantaPrice.price_ars_m2.toLocaleString("es-AR")}
                  </span>
                  <span className="text-qs-gray mb-1">/m²</span>
                </div>

                <p className="text-xs text-qs-gray">
                  {mantaPrice.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    <Ruler size={12} />
                    {item.dimensions}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    <Package size={12} />
                    {item.packaging}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="py-12 bg-qs-blue text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Formas de Pago
          </h3>
          <p className="text-blue-200">
            {pricingInfo.payment_methods}. {pricingInfo.tax_note}.
          </p>
          <p className="text-blue-200 mt-1">
            {pricingInfo.bulk_discount}.
          </p>
        </div>
      </section>
    </>
  );
}
