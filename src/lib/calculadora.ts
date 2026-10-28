// Calculadora de cajas para pisos.
// Todo el cálculo es con ENTEROS: superficies en centésimas de m² (x100) y dinero en centavos.
// Los floats solo aparecen al convertir los datos guardados (aCentesimas) y al mostrar.
// Sin imports con alias para que corra con `node --test`.

export const DESPERDICIO_DEFAULT = 10; // %

// Valor guardado con hasta 2 decimales (precio 12.9, cobertura 2.51) → centésimas enteras (1290, 251)
export function aCentesimas(valor: number): number {
  return Math.round(valor * 100);
}

// Texto del usuario ("12,5", "12.5", "12") → centésimas de m² (1250). Hasta 2 decimales; null si no es válido.
export function parsearM2(texto: string): number | null {
  const t = texto.trim().replace(",", ".");
  const m = /^(\d{1,6})(?:\.(\d{0,2}))?$/.exec(t);
  if (!m) return null;
  return Number(m[1]) * 100 + Number((m[2] ?? "").padEnd(2, "0"));
}

// División entera redondeando hacia arriba / al más cercano (a, b enteros >= 0, b > 0)
function divArriba(a: number, b: number): number {
  return Math.floor((a + b - 1) / b);
}
function divRedondeo(a: number, b: number): number {
  return Math.floor((2 * a + b) / (2 * b));
}

export type ResultadoCajas = {
  cajas: number;
  m2NecesariosX100: number; // superficie + desperdicio
  m2LlevaX100: number; // lo que suman las cajas enteras
  precioCajaCentavos: number | null;
  subtotalCentavos: number | null;
};

// Cajas necesarias para cubrir una superficie con un % de desperdicio.
// - Sin cobertura por caja cargada → null (no se muestra la calculadora).
// - El precio de la caja se redondea al centavo (precio m² × m² por caja) y el subtotal es
//   precio de caja × cajas, que es como se vende.
// - Sin precio cargado → cajas y m² igual, pero subtotal null.
export function calcularCajas(params: {
  m2X100: number;
  coberturaCajaX100: number | null | undefined;
  precioM2Centavos: number | null | undefined;
  desperdicioPct: number;
}): ResultadoCajas | null {
  const { m2X100, coberturaCajaX100, precioM2Centavos } = params;
  if (!coberturaCajaX100 || coberturaCajaX100 <= 0 || !Number.isInteger(coberturaCajaX100)) return null;
  if (!Number.isInteger(m2X100) || m2X100 < 0) throw new Error("m2X100 debe ser un entero >= 0");
  const desperdicio = Math.min(100, Math.max(0, Math.round(params.desperdicioPct)));

  const m2NecesariosX100 = divArriba(m2X100 * (100 + desperdicio), 100);
  const cajas = divArriba(m2NecesariosX100, coberturaCajaX100);
  const m2LlevaX100 = cajas * coberturaCajaX100;

  const conPrecio = typeof precioM2Centavos === "number" && Number.isInteger(precioM2Centavos) && precioM2Centavos > 0;
  const precioCajaCentavos = conPrecio ? divRedondeo(precioM2Centavos * coberturaCajaX100, 100) : null;
  const subtotalCentavos = precioCajaCentavos === null ? null : precioCajaCentavos * cajas;

  return { cajas, m2NecesariosX100, m2LlevaX100, precioCajaCentavos, subtotalCentavos };
}

// 1506 → "15,06"
export function formatearM2(x100: number): string {
  return new Intl.NumberFormat("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(x100 / 100);
}
