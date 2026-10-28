import { test } from "node:test";
import assert from "node:assert/strict";
import { escalonPara, rangoEscalon, validarEscalones, type Escalon } from "./escalones.ts";
import { escalonesMayoristas } from "../data/espejos-inteligentes-data.ts";

test("los escalones mayoristas de espejos son válidos", () => {
  assert.doesNotThrow(() => validarEscalones(escalonesMayoristas));
});

test("para cualquier cantidad de 1 a 100 hay exactamente un escalón", () => {
  for (let q = 1; q <= 100; q++) {
    const cubren = escalonesMayoristas.filter((_, i) => {
      const { desde, hasta } = rangoEscalon(escalonesMayoristas, i);
      return q >= desde && (hasta === null || q <= hasta);
    });
    assert.equal(cubren.length, 1, `cantidad ${q}`);
    assert.equal(escalonPara(escalonesMayoristas, q), cubren[0], `cantidad ${q}`);
  }
});

test("las cantidades que antes quedaban en huecos ahora tienen escalón", () => {
  assert.equal(escalonPara(escalonesMayoristas, 12).desde, 1);
  assert.equal(escalonPara(escalonesMayoristas, 22).desde, 15);
  assert.equal(escalonPara(escalonesMayoristas, 49).desde, 35);
  assert.equal(escalonPara(escalonesMayoristas, 50).desde, 50);
  assert.equal(escalonPara(escalonesMayoristas, 1000).desde, 50);
});

test("escalones inválidos se rechazan", () => {
  const base: Escalon = { desde: 1, descuentoPct: 0, label: "Lista" };
  assert.throws(() => validarEscalones([]));
  assert.throws(() => validarEscalones([{ ...base, desde: 0 }]));
  assert.throws(() => validarEscalones([base, { desde: 10, descuentoPct: 5, label: "a" }, { desde: 10, descuentoPct: 10, label: "b" }]));
  assert.throws(() => validarEscalones([base, { desde: 10.5, descuentoPct: 5, label: "a" }]));
});

test("cantidad no válida → error", () => {
  assert.throws(() => escalonPara(escalonesMayoristas, 0));
  assert.throws(() => escalonPara(escalonesMayoristas, 2.5));
});
