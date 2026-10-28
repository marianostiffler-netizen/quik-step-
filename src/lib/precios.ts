// Formato de precios para mostrar en pantalla (es-AR).
// Solo visualización: los precios se siguen guardando como están en src/data,
// cada uno en su moneda original (USD o ARS). Acá no se convierte nada.

export type Moneda = "USD" | "ARS";

/** Precio mostrado: valor final en su moneda, por unidad de venta. */
export type Precio = {
  valor: number;
  moneda: Moneda;
  unidad: string;
  /**
   * Precio sin impuestos nacionales (Res. SIyC 4/2025), en la misma moneda y unidad.
   * Solo se muestra si está cargado: nunca se calcula a partir de `valor`, porque depende
   * de la condición fiscal del vendedor.
   * TODO(cliente): cargarlo con el contador.
   */
  sinImpuestosNacionales?: number | null;
};

// Rótulo exigido por la Res. SIyC 4/2025 art. 2.c (verificar con el contador del cliente).
export const ROTULO_SIN_IMPUESTOS = "PRECIO SIN IMPUESTOS NACIONALES";

// Valor sin impuestos para mostrar, o null si no está cargado (ausente, null o <= 0).
export function sinImpuestosParaMostrar(precio: Precio | null | undefined): number | null {
  const v = precio?.sinImpuestosNacionales;
  return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null;
}

const conCentavos = {
  USD: new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ARS: new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

const sinCentavos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

// Montos calculados en centavos enteros (ver src/lib/calculadora.ts); se divide solo para mostrar
export function formatearCentavos(centavos: number, moneda: Moneda): string {
  return formatearPrecio(centavos / 100, moneda);
}

// Menor precio de una lista, para mostrar "desde". Ignora ausentes y valores <= 0
// (ej. la manta tiene price_usd: 0 porque no tiene precio cargado). Null si no hay ninguno.
export function precioDesde(valores: Array<number | null | undefined>): number | null {
  const validos = valores.filter((v): v is number => typeof v === "number" && v > 0);
  return validos.length ? Math.min(...validos) : null;
}

// USD siempre con 2 decimales ("US$ 15,90"); ARS sin decimales si es entero ("$ 140.000")
export function formatearPrecio(valor: number, moneda: Moneda): string {
  if (moneda === "ARS" && Number.isInteger(valor)) return sinCentavos.format(valor);
  return conCentavos[moneda].format(valor);
}
