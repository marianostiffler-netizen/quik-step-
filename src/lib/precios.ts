// Formato de precios para mostrar en pantalla (es-AR).
// Solo visualización: los precios se siguen guardando como están en src/data,
// cada uno en su moneda original (USD o ARS). Acá no se convierte nada.

export type Moneda = "USD" | "ARS";

const conCentavos = {
  USD: new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ARS: new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

const sinCentavos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

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
