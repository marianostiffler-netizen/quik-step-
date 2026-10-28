import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { categories, products, pricingInfo, getPrecioDesdeLinea } from "@/data/site-data";
import { buscarGrupo, hrefLineaPiso } from "@/data/catalogo";
import { formatearPrecio, precioDesde } from "@/lib/precios";
import { waLink } from "@/config/negocio";
import CatalogoPisos from "@/components/pisos/CatalogoPisos";
import HeaderListado from "@/components/catalogo/HeaderListado";

const grupo = buscarGrupo("pisos-y-revestimientos")!;

export const metadata: Metadata = {
  alternates: { canonical: "/pisos-y-revestimientos/pisos-flotantes" },
  title: "Pisos flotantes Quick-Step | Pisos y revestimientos | Maderera Don Antonio",
  description:
    "Pisos laminados Quick-Step con tecnología europea. Líneas Smart, Catedral, Premiere Plus, Eligna Wide y Vision.",
};

export default function ProductosPage() {
  const ordenadas = [...categories].sort((a, b) => a.sort_order - b.sort_order);
  const desde = precioDesde(products.map((p) => p.price_usd_m2));

  return (
    <>
      <HeaderListado
        titulo="Pisos flotantes"
        bajada="Pisos laminados Quick-Step: resistentes al agua, fácil instalación y diseños que imitan la madera natural."
        conteo={
          <>
            {products.length} diseños · {categories.length} líneas
            {desde !== null && <> · desde {formatearPrecio(desde, "USD")}/m²</>}
          </>
        }
        migas={[{ label: "Inicio", href: "/" }, { label: grupo.nombre, href: grupo.href }, { label: "Pisos flotantes" }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="sr-only">Catálogo de pisos</h2>
          <CatalogoPisos products={products} categories={categories} />
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-nogal">Las líneas</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {ordenadas.map((cat) => {
              const prods = products.filter((p) => p.category_id === cat.id);
              const d = getPrecioDesdeLinea(cat.id);
              return (
                <Link
                  key={cat.id}
                  href={hrefLineaPiso(cat.slug)}
                  className="tarjeta overflow-hidden block transition hover:border-algarrobo hover:shadow-md"
                >
                  <div className="relative">
                    {prods[0] && (
                      <Image
                        src={`/products/ambientes/${prods[0].image}`}
                        alt=""
                        width={800}
                        height={600}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="w-full aspect-[16/10] object-cover"
                      />
                    )}
                    {cat.specs_summary.promo && (
                      <span className="absolute left-3 top-3 rounded-full bg-eucalipto px-3 py-1 text-xs font-semibold text-white">
                        {cat.specs_summary.promo}
                      </span>
                    )}
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-display text-xl font-bold text-nogal">{cat.name}</h3>
                    <p className="mt-1 text-sm text-nogal-suave">{cat.tagline}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">
                        {cat.specs_summary.thickness}
                      </span>
                      <span className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">
                        {cat.specs_summary.rating}
                      </span>
                    </div>
                    {d !== null ? (
                      <p className="mt-3 font-bold text-precio tabular-nums">
                        desde {formatearPrecio(d, "USD")}
                        <span className="text-xs font-medium text-nogal-suave">/m²</span>
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-nogal-suave">Consultá precio</p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-nogal">Complementos para la instalación</h2>
              <p className="mt-2 text-nogal-suave">Zócalos EPS Santa Luzia y manta aislante.</p>
            </div>
            <Link href={`${grupo.href}/zocalos-y-mantas`} className="btn-secundario shrink-0">
              Ver zócalos y mantas
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="tarjeta flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-nogal-suave">{pricingInfo.tax_note}. Precios de pisos y zócalos en dólares.</p>
            <a
              href={waLink("Hola! Quisiera consultar por pisos flotantes.")}
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
