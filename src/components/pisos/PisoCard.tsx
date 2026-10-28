import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/site-data";
import { formatearPrecio } from "@/lib/precios";

const nf = new Intl.NumberFormat("es-AR");

export default function PisoCard({ product, lineName }: { product: Product; lineName?: string }) {
  const codigo = product.name.split(" - ")[0];
  const precio = product.price_usd_m2 && product.price_usd_m2 > 0 ? product.price_usd_m2 : null;
  const { length, width, thickness } = product.dimensions;

  return (
    <Link
      id={product.sku}
      href={`/pisos-flotantes/${product.category_id}/${product.slug}`}
      className="tarjeta overflow-hidden flex flex-col scroll-mt-24 transition hover:border-algarrobo hover:shadow-md"
    >
      <Image
        src={`/products/ambientes/${product.image}`}
        alt={`Piso ${lineName ?? ""} ${codigo}`.replace("  ", " ")}
        width={800}
        height={600}
        sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="w-full aspect-[4/3] object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        {lineName && (
          <p className="text-xs font-semibold uppercase tracking-wide text-algarrobo">{lineName}</p>
        )}
        <h3 className="mt-0.5 font-display text-lg font-bold text-nogal">{codigo}</h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">{thickness} mm</span>
          <span className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">{product.rating}</span>
          {product.water_resistance_hours ? (
            <span className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">
              {product.water_resistance_hours} h al agua
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-xs text-nogal-suave tabular-nums">
          {length} × {width} mm
        </p>
        <div className="mt-auto pt-3">
          {precio !== null ? (
            <p className="text-xl font-bold text-precio tabular-nums">
              {formatearPrecio(precio, "USD")}
              <span className="text-xs font-medium text-nogal-suave">/m²</span>
            </p>
          ) : (
            <p className="text-sm text-nogal-suave">Consultá precio</p>
          )}
          {product.coverage_m2 ? (
            <p className="text-xs text-nogal-suave tabular-nums">Caja: {nf.format(product.coverage_m2)} m²</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
