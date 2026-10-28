import { test } from "node:test";
import assert from "node:assert/strict";
import { conteoPorCategoria, grupos, productosIndexados } from "./catalogo.ts";
import { tambienNecesitas } from "./relaciones.ts";

test("hay 249 productos con ids únicos", () => {
  const lista = productosIndexados();
  assert.equal(lista.length, 249);
  assert.equal(new Set(lista.map((p) => p.id)).size, 249);
});

test("cada producto está en exactamente una categoría (o subcategoría) del árbol", () => {
  const hojas = grupos.flatMap((g) =>
    g.categorias.flatMap((c) =>
      c.subcategorias ? c.subcategorias.map((s) => `${g.slug}/${c.slug}/${s.slug}`) : [`${g.slug}/${c.slug}`]
    )
  );
  const cuenta = new Map<string, number>();
  for (const p of productosIndexados()) {
    const clave = [p.grupo, p.categoria, p.subcategoria].filter(Boolean).join("/");
    assert.ok(hojas.includes(clave), `${p.id}: ${clave} no existe en el árbol`);
    cuenta.set(clave, (cuenta.get(clave) ?? 0) + 1);
  }
  assert.equal([...cuenta.values()].reduce((a, b) => a + b, 0), 249);
  for (const hoja of hojas) assert.ok((cuenta.get(hoja) ?? 0) > 0, `${hoja} está vacía`);
});

test("cantidades por grupo", () => {
  const conteo = conteoPorCategoria();
  assert.equal(conteo["/maderas-y-construccion"], 23);
  assert.equal(conteo["/pisos-y-revestimientos"], 38);
  assert.equal(conteo["/placas-y-melaminas"], 129);
  assert.equal(conteo["/hogar-y-deco"], 59);
});

test("cantidades por categoría", () => {
  const c = conteoPorCategoria();
  assert.equal(c["/pisos-y-revestimientos/pisos-flotantes"], 28);
  assert.equal(c["/pisos-y-revestimientos/zocalos-y-mantas"], 10);
  assert.equal(c["/placas-y-melaminas/melaminas"], 72);
  assert.equal(c["/placas-y-melaminas/revestimientos-melaminicos"], 57);
  assert.equal(c["/hogar-y-deco/articulos-del-hogar"], 29);
  assert.equal(c["/hogar-y-deco/espejos"], 30);
  assert.equal(c["/hogar-y-deco/espejos/led"], 25);
  assert.equal(c["/hogar-y-deco/espejos/artesanales"], 5);
});

test("las hrefs de las fichas de pisos son rutas propias y el resto lleva ancla", () => {
  for (const p of productosIndexados()) {
    if (p.categoria === "pisos-flotantes") assert.ok(!p.href.includes("#"), p.id);
    else assert.ok(p.href.endsWith(`#${p.id}`), p.id);
  }
});

test("todo id y categoría de tambienNecesitas existen en el catálogo", () => {
  const ids = new Set(productosIndexados().map((p) => p.id));
  const hrefs = new Set(
    grupos.flatMap((g) => g.categorias.flatMap((c) => [c.href, ...(c.subcategorias ?? []).map((s) => s.href)]))
  );
  for (const [clave, rel] of Object.entries(tambienNecesitas)) {
    assert.ok(hrefs.has(clave), `clave ${clave} no es una categoría`);
    for (const id of rel.productos) assert.ok(ids.has(id), `${clave}: producto ${id} no existe`);
    for (const h of rel.categorias) assert.ok(hrefs.has(h), `${clave}: categoría ${h} no existe`);
  }
});
