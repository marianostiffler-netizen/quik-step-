import { ROTULO_SIN_IMPUESTOS, formatearPrecio, sinImpuestosParaMostrar } from "@/lib/precios";
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
  const sinImpuestos = sinImpuestosParaMostrar(precio);
  return (
    <div>
      <p className={`font-bold text-precio tabular-nums ${grande ? "text-3xl" : "text-xl"}`}>
        {formatearPrecio(precio.valor, precio.moneda)}
        <span className={`font-medium text-nogal-suave ${grande ? "text-base" : "text-xs"}`}>{unidad}</span>
      </p>
      {/* Solo si está cargado; letra más chica que el precio final (Res. SIyC 4/2025) */}
      {sinImpuestos !== null && (
        <p className={`text-nogal-suave tabular-nums ${grande ? "text-sm" : "text-xs"}`}>
          {ROTULO_SIN_IMPUESTOS}: {formatearPrecio(sinImpuestos, precio.moneda)}
          {unidad}
        </p>
      )}
      {nota && <p className="text-xs text-nogal-suave">{nota}</p>}
    </div>
  );
}
