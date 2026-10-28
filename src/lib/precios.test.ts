import { test } from "node:test";
import assert from "node:assert/strict";
import { ROTULO_SIN_IMPUESTOS, sinImpuestosParaMostrar, type Precio } from "./precios.ts";

const base: Precio = { valor: 12.9, moneda: "USD", unidad: "/m²" };

test("sin impuestos: no se muestra si no está cargado", () => {
  assert.equal(sinImpuestosParaMostrar(null), null);
  assert.equal(sinImpuestosParaMostrar(base), null);
  assert.equal(sinImpuestosParaMostrar({ ...base, sinImpuestosNacionales: null }), null);
  assert.equal(sinImpuestosParaMostrar({ ...base, sinImpuestosNacionales: 0 }), null);
  assert.equal(sinImpuestosParaMostrar({ ...base, sinImpuestosNacionales: -1 }), null);
  assert.equal(sinImpuestosParaMostrar({ ...base, sinImpuestosNacionales: Number.NaN }), null);
});

test("sin impuestos: se muestra tal cual está cargado, sin calcular nada", () => {
  assert.equal(sinImpuestosParaMostrar({ ...base, sinImpuestosNacionales: 10.66 }), 10.66);
});

test("rótulo exacto de la Res. SIyC 4/2025", () => {
  assert.equal(ROTULO_SIN_IMPUESTOS, "PRECIO SIN IMPUESTOS NACIONALES");
});
