import Image from "next/image";
import Link from "next/link";
import { categories, products, pricingInfo } from "@/data/site-data";
import { formatearPrecio } from "@/lib/precios";

const slugs = ["smart", "catedral", "premiere-plus", "vision"];

export default function Destacados() {
  const lineas = slugs
    .map((s) => categories.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => !!c && typeof c.specs_summary.price_usd_m2 === "number");

  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Destacados</h2>
        <p className="mt-3 text-nogal-suave">Pisos flotantes Quick-Step, con precio por m².</p>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {lineas.map((c) => {
            const p = products.find((x) => x.category_id === c.id);
            const etiqueta = ["Piso flotante", c.specs_summary.thickness, c.specs_summary.rating]
              .filter(Boolean)
              .join(" · ");
            return (
              <Link
                key={c.id}
                href={`/pisos-flotantes/${c.slug}`}
                className="tarjeta overflow-hidden block transition hover:border-algarrobo hover:shadow-md"
              >
                <div className="relative">
                  {p && (
                    <Image
                      src={`/products/ambientes/${p.image}`}
                      alt={`Piso flotante ${c.name}`}
                      width={1517}
                      height={950}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="w-full aspect-[4/3] object-cover"
                    />
                  )}
                  {c.specs_summary.promo && (
                    <span className="absolute left-3 top-3 rounded-full bg-eucalipto px-3 py-1 text-xs font-semibold text-white">
                      {c.specs_summary.promo}
                    </span>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-xs text-nogal-suave">{etiqueta}</p>
                  <h3 className="mt-1 font-display text-lg md:text-xl font-bold text-nogal">{c.name}</h3>
                  <p className="mt-2 text-xl font-bold text-precio tabular-nums">
                    {formatearPrecio(c.specs_summary.price_usd_m2 as number, "USD")}
                    <span className="ml-0.5 text-sm font-semibold">/m²</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-nogal-suave">{pricingInfo.tax_note}. Precios en dólares.</p>
        <Link href="/pisos-flotantes" className="btn-secundario mt-6 inline-flex justify-center">
          Ver todos los pisos
        </Link>
      </div>
    </section>
  );
}
