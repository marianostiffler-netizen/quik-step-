import Image from "next/image";
import Link from "next/link";
import { Hammer } from "lucide-react";
import { formatearPrecio } from "@/lib/precios";
import { resumenPorRuta, type PrecioProducto, type Subcategoria } from "@/data/catalogo";

// Tarjeta de categoría o subcategoría: imagen si hay, nombre, conteo y precio "desde".
export default function TarjetaCategoria({
  href,
  nombre,
  descripcion,
  imagen,
  cantidad,
  desde,
}: {
  href: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  cantidad: number;
  desde: PrecioProducto | null;
}) {
  return (
    <Link href={href} className="tarjeta block overflow-hidden transition hover:border-algarrobo hover:shadow-md">
      {imagen ? (
        <Image
          src={imagen}
          alt=""
          width={800}
          height={600}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-veta text-algarrobo">
          <Hammer size={48} aria-hidden="true" />
        </div>
      )}
      <div className="p-4 md:p-5">
        <h3 className="font-display text-xl font-bold text-nogal">{nombre}</h3>
        {descripcion && <p className="mt-1 text-sm text-nogal-suave">{descripcion}</p>}
        <p className="mt-2 text-sm font-semibold text-nogal tabular-nums">
          {cantidad} {cantidad === 1 ? "producto" : "productos"}
        </p>
        {desde ? (
          <p className="mt-1 font-bold text-precio tabular-nums">
            <span className="text-sm font-medium text-nogal-suave">desde </span>
            {formatearPrecio(desde.valor, desde.moneda)}
            <span className="text-xs font-medium text-nogal-suave">
              {desde.unidad === "c/u" ? ` ${desde.unidad}` : `/${desde.unidad}`}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-nogal-suave">Consultar precio</p>
        )}
      </div>
    </Link>
  );
}

// Grilla de tarjetas para una lista de categorías o subcategorías (conteo y precio salen del índice).
export function GrillaCategorias({ items }: { items: Subcategoria[] }) {
  const resumen = resumenPorRuta();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {items.map((c) => (
        <TarjetaCategoria
          key={c.href}
          href={c.href}
          nombre={c.nombre}
          descripcion={c.descripcion}
          imagen={c.imagen}
          cantidad={resumen[c.href]?.cantidad ?? 0}
          desde={resumen[c.href]?.desde ?? null}
        />
      ))}
    </div>
  );
}
