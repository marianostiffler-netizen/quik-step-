// Formato de precios para mostrar en pantalla (es-AR).
// Solo visualización: los precios se siguen guardando como están en src/data,
// cada uno en su moneda original (USD o ARS). Acá no se convierte nada.

export type Moneda = "USD" | "ARS";

const conCentavos = {
  USD: new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  ARS: new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
};

const sinCentavos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

// USD siempre con 2 decimales ("US$ 15,90"); ARS sin decimales si es entero ("$ 140.000")
export function formatearPrecio(valor: number, moneda: Moneda): string {
  if (moneda === "ARS" && Number.isInteger(valor)) return sinCentavos.format(valor);
  return conCentavos[moneda].format(valor);
}
