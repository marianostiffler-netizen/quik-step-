import { formatearPrecio } from "@/lib/precios";
import type { ItemCatalogo } from "./tipos";

// Precio de un ítem (valor + unidad, o "Consultar precio"). Lo comparten la tarjeta y la ficha.
export default function PrecioItem({
  precio,
  nota,
  grande = false,
}: {
  precio: ItemCatalogo["precio"];
  nota?: string;
  /** Tamaño de ficha. */
  grande?: boolean;
}) {
  if (!precio) {
    return <p className={grande ? "text-xl font-semibold text-nogal" : "text-sm font-semibold text-nogal-suave"}>Consultar precio</p>;
  }
  // "/m²" va pegado al valor; "c/u" va con espacio.
  const unidad = precio.unidad.startsWith("/") ? precio.unidad : ` ${precio.unidad}`;
  return (
    <div>
      <p className={`font-bold text-precio tabular-nums ${grande ? "text-3xl" : "text-xl"}`}>
        {formatearPrecio(precio.valor, precio.moneda)}
        <span className={`font-medium text-nogal-suave ${grande ? "text-base" : "text-xs"}`}>{unidad}</span>
      </p>
      {nota && <p className="text-xs text-nogal-suave">{nota}</p>}
    </div>
  );
}
