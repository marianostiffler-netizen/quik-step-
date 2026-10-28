import { test } from "node:test";
import assert from "node:assert/strict";
import { aCentesimas, parsearM2, calcularCajas, formatearM2 } from "./calculadora.ts";

// Smart: caja de 2,51 m² a US$ 12,90/m²
const smart = { coberturaCajaX100: 251, precioM2Centavos: 1290 };

test("0 m² → 0 cajas, 0 m² y subtotal 0", () => {
  const r = calcularCajas({ ...smart, m2X100: 0, desperdicioPct: 10 });
  assert.deepEqual(r, { cajas: 0, m2NecesariosX100: 0, m2LlevaX100: 0, precioCajaCentavos: 3238, subtotalCentavos: 0 });
});

test("m² múltiplo exacto de la caja, sin desperdicio → cajas justas", () => {
  const r = calcularCajas({ ...smart, m2X100: 2510, desperdicioPct: 0 });
  assert.equal(r?.cajas, 10);
  assert.equal(r?.m2LlevaX100, 2510);
  // 12,90 × 2,51 = 32,379 → 32,38 por caja; × 10
  assert.equal(r?.precioCajaCentavos, 3238);
  assert.equal(r?.subtotalCentavos, 32380);
});

test("m² múltiplo exacto con 10% de desperdicio → no agrega una caja de más por error de float", () => {
  // 25,10 × 1,10 = 27,61 = 11 × 2,51 exacto (en floats 27.61 / 2.51 da 11.000000000000002)
  const r = calcularCajas({ ...smart, m2X100: 2510, desperdicioPct: 10 });
  assert.equal(r?.m2NecesariosX100, 2761);
  assert.equal(r?.cajas, 11);
  assert.equal(r?.m2LlevaX100, 2761);
});

test("m² con decimales → redondea las cajas hacia arriba", () => {
  // 12,5 m² + 10% = 13,75 m² → 5,48 cajas → 6 cajas = 15,06 m²
  const r = calcularCajas({ ...smart, m2X100: parsearM2("12,5")!, desperdicioPct: 10 });
  assert.equal(r?.m2NecesariosX100, 1375);
  assert.equal(r?.cajas, 6);
  assert.equal(r?.m2LlevaX100, 1506);
  assert.equal(r?.subtotalCentavos, 19428);
  assert.equal(formatearM2(r!.m2LlevaX100), "15,06");
});

test("el desperdicio que deja centésimas sueltas se redondea hacia arriba", () => {
  // 1,01 × 1,10 = 1,111 → 1,12
  const r = calcularCajas({ ...smart, m2X100: 101, desperdicioPct: 10 });
  assert.equal(r?.m2NecesariosX100, 112);
  assert.equal(r?.cajas, 1);
});

test("sin coverage_m2 cargado → null (no se muestra la calculadora)", () => {
  assert.equal(calcularCajas({ m2X100: 1000, coberturaCajaX100: undefined, precioM2Centavos: 1290, desperdicioPct: 10 }), null);
  assert.equal(calcularCajas({ m2X100: 1000, coberturaCajaX100: 0, precioM2Centavos: 1290, desperdicioPct: 10 }), null);
});

test("sin precio cargado → calcula cajas pero no subtotal", () => {
  const r = calcularCajas({ m2X100: 1000, coberturaCajaX100: 251, precioM2Centavos: undefined, desperdicioPct: 10 });
  assert.equal(r?.cajas, 5);
  assert.equal(r?.subtotalCentavos, null);
});

test("desperdicio fuera de rango se acota a 0–100", () => {
  assert.equal(calcularCajas({ ...smart, m2X100: 2510, desperdicioPct: -5 })?.cajas, 10);
  assert.equal(calcularCajas({ ...smart, m2X100: 251, desperdicioPct: 500 })?.m2NecesariosX100, 502);
});

test("m² negativo o no entero → error", () => {
  assert.throws(() => calcularCajas({ ...smart, m2X100: -1, desperdicioPct: 10 }));
  assert.throws(() => calcularCajas({ ...smart, m2X100: 1.5, desperdicioPct: 10 }));
});

test("aCentesimas convierte los datos guardados sin arrastrar error de float", () => {
  assert.equal(aCentesimas(2.51), 251); // 2.51 * 100 = 250.99999999999997
  assert.equal(aCentesimas(24.65), 2465); // 24.65 * 100 = 2464.9999999999995
  assert.equal(aCentesimas(12.9), 1290);
  assert.equal(aCentesimas(20.42), 2042);
});

test("parsearM2 acepta coma o punto y hasta 2 decimales", () => {
  assert.equal(parsearM2("12,5"), 1250);
  assert.equal(parsearM2("12.05"), 1205);
  assert.equal(parsearM2(" 30 "), 3000);
  assert.equal(parsearM2("0"), 0);
  assert.equal(parsearM2(""), null);
  assert.equal(parsearM2("abc"), null);
  assert.equal(parsearM2("1,234"), null);
  assert.equal(parsearM2("-3"), null);
});
