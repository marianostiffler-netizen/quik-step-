import Link from "next/link";
import { categories, products, pricingInfo, getPrecioDesdeLinea } from "@/data/site-data";
import TarjetaCategoria from "@/components/catalogo/TarjetaCategoria";
import { RUTA_PISOS, hrefLineaPiso } from "@/data/rutas";

const slugs = ["smart", "catedral", "premiere-plus", "vision"];

export default function Destacados() {
  const lineas = slugs
    .map((s) => categories.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => !!c)
    .map((c) => ({ ...c, desde: getPrecioDesdeLinea(c.id) }))
    .filter((c): c is typeof c & { desde: number } => c.desde !== null);

  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Destacados</h2>
        <p className="mt-3 text-nogal-suave">Pisos flotantes Quick-Step, con precio por m².</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {lineas.map((c) => {
            const prods = products.filter((x) => x.category_id === c.id);
            return (
              <TarjetaCategoria
                key={c.id}
                href={hrefLineaPiso(c.slug)}
                nombre={c.name}
                descripcion={c.tagline}
                imagen={prods[0] ? `/products/ambientes/${prods[0].image}` : undefined}
                cantidad={prods.length}
                desde={{ valor: c.desde, moneda: "USD", unidad: "m²" }}
              />
            );
          })}
        </div>
        <p className="mt-6 text-sm text-nogal-suave">{pricingInfo.tax_note}. Precios en dólares.</p>
        <Link href={RUTA_PISOS} className="btn-secundario mt-6 inline-flex justify-center">
          Ver todos los pisos
        </Link>
      </div>
    </section>
  );
}
