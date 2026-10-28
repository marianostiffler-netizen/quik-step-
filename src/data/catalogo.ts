// Árbol del catálogo: grupos → categorías → subcategorías, y asignación de cada producto.
// Fuente única para menú, sitemap, home, footer y migas. Los productos siguen viviendo en sus *-data.ts.
// Imports relativos con extensión para que `node --test` pueda cargar el módulo.
import { accessories, categories, mantaPrice, products } from "./site-data.ts";
import { productosObra } from "./construccion-data.ts";
import { melaminas } from "./melaminas-data.ts";
import { articulosHogar } from "./hogar-data.ts";
import { mirrors } from "./espejos-inteligentes-data.ts";
import { espejosArtesanales } from "./espejos-artesanales-data.ts";
import { TIPOS_OBRA, itemsEspejosLed } from "./items.ts";
import type { Moneda } from "../lib/precios.ts";
import { RUTA_PISOS, hrefLineaPiso, hrefFichaPiso } from "./rutas.ts";

export type Subcategoria = {
  slug: string;
  nombre: string;
  /** Descripción corta y factual, para tarjetas y metadata. */
  descripcion: string;
  imagen?: string;
  href: string;
};

export type Categoria = Subcategoria & { subcategorias?: Subcategoria[] };

export type Grupo = Subcategoria & { categorias: Categoria[] };

export type PrecioProducto = { valor: number; moneda: Moneda; unidad: string };

export type ProductoIndexado = {
  id: string;
  nombre: string;
  grupo: string;
  categoria: string;
  subcategoria?: string;
  /** Ficha (pisos) o `ruta-de-categoría#id` (el resto). */
  href: string;
  precio?: PrecioProducto;
};

export type ResumenRuta = { cantidad: number; desde: PrecioProducto | null };

// ─── Rutas ───

export { RUTA_PISOS, hrefLineaPiso, hrefFichaPiso };

// ─── Árbol ───

const G_MADERAS = "/maderas-y-construccion";
const G_PISOS = "/pisos-y-revestimientos";
const G_PLACAS = "/placas-y-melaminas";
const G_HOGAR = "/hogar-y-deco";

const DESCRIPCION_OBRA: Record<string, string> = {
  machimbres: "Machimbres de pino y eucalipto en distintas medidas.",
  "tirantes-y-vigas": "Tirantes y vigas de pino y eucalipto, para interior y exterior.",
  "tablas-para-encofrado": "Tablas de eucalipto y pino de 4 m para encofrado.",
  "estructura-de-obra": "Puntales, bastidores y fenólico.",
  aislantes: "Lana de vidrio, membrana hidrófuga, espuma de polietileno y Mexpol.",
  "materiales-secos": "Bolsas de yeso.",
};

export const grupos: Grupo[] = [
  {
    slug: "maderas-y-construccion",
    nombre: "Maderas y construcción",
    descripcion: "Machimbres, tirantes, vigas, tablas para encofrado, aislantes y materiales secos para obra.",
    imagen: "/hero-background.webp",
    href: G_MADERAS,
    categorias: TIPOS_OBRA.map((t) => ({
      slug: t.slug,
      nombre: t.label,
      descripcion: DESCRIPCION_OBRA[t.slug],
      href: `${G_MADERAS}/${t.slug}`,
    })),
  },
  {
    slug: "pisos-y-revestimientos",
    nombre: "Pisos y revestimientos",
    descripcion: "Pisos flotantes Quick-Step, zócalos y manta aislante.",
    imagen: "/products/ambientes/Smart-0314-01.webp",
    href: G_PISOS,
    categorias: [
      {
        slug: "pisos-flotantes",
        nombre: "Pisos flotantes",
        descripcion: "Pisos laminados Quick-Step: resistentes al agua, fácil instalación y diseños que imitan la madera natural.",
        imagen: "/products/ambientes/Smart-0314-01.webp",
        href: RUTA_PISOS,
      },
      {
        slug: "zocalos-y-mantas",
        nombre: "Zócalos y mantas",
        descripcion: "Zócalos EPS Santa Luzia y manta aislante.",
        href: `${G_PISOS}/zocalos-y-mantas`,
      },
    ],
  },
  {
    slug: "placas-y-melaminas",
    nombre: "Placas y melaminas",
    descripcion: "Melaminas y revestimientos melamínicos Faplac.",
    imagen: melaminas[0]?.imagen,
    href: G_PLACAS,
    categorias: [
      {
        slug: "melaminas",
        nombre: "Melaminas",
        descripcion: "Muestrario de melaminas Faplac.",
        imagen: melaminas.find((m) => !m.esRevestimiento)?.imagen,
        href: `${G_PLACAS}/melaminas`,
      },
      {
        slug: "revestimientos-melaminicos",
        nombre: "Revestimientos melamínicos",
        descripcion: "Muestrario de revestimientos melamínicos Faplac.",
        imagen: melaminas.find((m) => m.esRevestimiento)?.imagen,
        href: `${G_PLACAS}/revestimientos-melaminicos`,
      },
    ],
  },
  {
    slug: "hogar-y-deco",
    nombre: "Hogar y deco",
    descripcion: "Artículos del hogar en madera y espejos.",
    imagen: articulosHogar[0]?.image,
    href: G_HOGAR,
    categorias: [
      {
        slug: "articulos-del-hogar",
        nombre: "Artículos del hogar",
        descripcion: "Muebles, sillas y mesas de madera para tu hogar.",
        imagen: articulosHogar[0]?.image,
        href: `${G_HOGAR}/articulos-del-hogar`,
      },
      {
        slug: "espejos",
        nombre: "Espejos",
        descripcion: "Espejos LED y espejos artesanales.",
        imagen: espejosArtesanales[0]?.image,
        href: `${G_HOGAR}/espejos`,
        subcategorias: [
          {
            slug: "led",
            nombre: "Espejos LED",
            descripcion: "Espejos LED con Touch de 3 tonos, en distintas formas y medidas.",
            href: `${G_HOGAR}/espejos/led`,
          },
          {
            slug: "artesanales",
            nombre: "Espejos artesanales",
            descripcion: "Espejos con iluminación LED integrada.",
            imagen: espejosArtesanales[0]?.image,
            href: `${G_HOGAR}/espejos/artesanales`,
          },
        ],
      },
    ],
  },
];

export function buscarGrupo(slug: string): Grupo | undefined {
  return grupos.find((g) => g.slug === slug);
}

export function buscarCategoria(grupo: string, slug: string): Categoria | undefined {
  return buscarGrupo(grupo)?.categorias.find((c) => c.slug === slug);
}

export function buscarSubcategoria(grupo: string, categoria: string, slug: string): Subcategoria | undefined {
  return buscarCategoria(grupo, categoria)?.subcategorias?.find((s) => s.slug === slug);
}

// ─── Índice plano de productos ───

let cache: ProductoIndexado[] | null = null;

/** Los 249 productos con su ubicación en el árbol. */
export function productosIndexados(): ProductoIndexado[] {
  if (cache) return cache;
  const lista: ProductoIndexado[] = [];
  const ruta = (grupo: string, categoria: string, subcategoria?: string) =>
    [`/${grupo}`, categoria, subcategoria].filter(Boolean).join("/");

  // Maderas y construcción
  for (const p of productosObra) {
    const slug = TIPOS_OBRA.find((t) => t.value === p.categoria)!.slug;
    lista.push({
      id: p.id,
      nombre: p.nombre,
      grupo: "maderas-y-construccion",
      categoria: slug,
      href: `${ruta("maderas-y-construccion", slug)}#${p.id}`,
      ...(p.precio ? { precio: { valor: p.precio.valor, moneda: p.precio.moneda, unidad: p.unidadVenta ?? "" } } : {}),
    });
  }

  // Pisos flotantes: la ficha es la página del producto
  for (const p of products) {
    const linea = categories.find((c) => c.id === p.category_id)!;
    lista.push({
      id: p.sku,
      nombre: p.name,
      grupo: "pisos-y-revestimientos",
      categoria: "pisos-flotantes",
      href: hrefFichaPiso(linea.slug, p.slug),
      ...(p.price_usd_m2 && p.price_usd_m2 > 0 ? { precio: { valor: p.price_usd_m2, moneda: "USD" as const, unidad: "m²" } } : {}),
    });
  }

  // Zócalos y manta (la manta está cargada en ARS por m², en mantaPrice)
  for (const a of accessories) {
    const precio: PrecioProducto | undefined =
      a.category === "manta"
        ? { valor: mantaPrice.price_ars_m2, moneda: "ARS", unidad: "m²" }
        : a.price_usd > 0
          ? { valor: a.price_usd, moneda: "USD", unidad: a.price_unit }
          : undefined;
    lista.push({
      id: a.sku,
      nombre: a.name,
      grupo: "pisos-y-revestimientos",
      categoria: "zocalos-y-mantas",
      href: `${ruta("pisos-y-revestimientos", "zocalos-y-mantas")}#${a.sku}`,
      ...(precio ? { precio } : {}),
    });
  }

  // Placas y melaminas
  for (const m of melaminas) {
    const slug = m.esRevestimiento ? "revestimientos-melaminicos" : "melaminas";
    lista.push({
      id: m.id,
      nombre: m.nombre,
      grupo: "placas-y-melaminas",
      categoria: slug,
      href: `${ruta("placas-y-melaminas", slug)}#${m.id}`,
    });
  }

  // Hogar y deco
  for (const a of articulosHogar) {
    lista.push({
      id: a.id,
      nombre: a.title,
      grupo: "hogar-y-deco",
      categoria: "articulos-del-hogar",
      href: `${ruta("hogar-y-deco", "articulos-del-hogar")}#${a.id}`,
    });
  }
  // Los LED salen de itemsEspejosLed: nombre con modelo y precio ya resueltos
  const led = new Map(itemsEspejosLed().map((i) => [i.id, i]));
  for (const m of mirrors) {
    const it = led.get(m.id)!;
    lista.push({
      id: m.id,
      nombre: it.nombreConsulta ?? it.nombre,
      grupo: "hogar-y-deco",
      categoria: "espejos",
      subcategoria: "led",
      href: `${ruta("hogar-y-deco", "espejos", "led")}#${m.id}`,
      ...(it.precio ? { precio: it.precio } : {}),
    });
  }
  for (const e of espejosArtesanales) {
    lista.push({
      id: e.id,
      nombre: e.modelo,
      grupo: "hogar-y-deco",
      categoria: "espejos",
      subcategoria: "artesanales",
      href: `${ruta("hogar-y-deco", "espejos", "artesanales")}#${e.id}`,
    });
  }

  cache = lista;
  return lista;
}

// ─── Conteos y precios "desde" ───

// Menor precio entre los productos que comparten moneda y unidad (la más frecuente), para no mezclar
// USD/vara con ARS/m². Null si ninguno tiene precio cargado.
function precioDesdeDe(lista: ProductoIndexado[]): PrecioProducto | null {
  const porClave = new Map<string, PrecioProducto[]>();
  for (const p of lista) {
    if (!p.precio) continue;
    const clave = `${p.precio.moneda}|${p.precio.unidad}`;
    porClave.set(clave, [...(porClave.get(clave) ?? []), p.precio]);
  }
  let mayor: PrecioProducto[] = [];
  for (const precios of porClave.values()) if (precios.length > mayor.length) mayor = precios;
  if (mayor.length === 0) return null;
  return mayor.reduce((min, p) => (p.valor < min.valor ? p : min));
}

/** Cantidad y precio "desde" por ruta (grupo, categoría y subcategoría), indexado por href sin ancla. */
export function resumenPorRuta(): Record<string, ResumenRuta> {
  const porRuta = new Map<string, ProductoIndexado[]>();
  const agregar = (clave: string, p: ProductoIndexado) => porRuta.set(clave, [...(porRuta.get(clave) ?? []), p]);
  for (const p of productosIndexados()) {
    agregar(`/${p.grupo}`, p);
    agregar(`/${p.grupo}/${p.categoria}`, p);
    if (p.subcategoria) agregar(`/${p.grupo}/${p.categoria}/${p.subcategoria}`, p);
  }
  return Object.fromEntries([...porRuta].map(([ruta, lista]) => [ruta, { cantidad: lista.length, desde: precioDesdeDe(lista) }]));
}

/** Cantidad de productos por ruta de grupo, categoría y subcategoría. */
export function conteoPorCategoria(): Record<string, number> {
  return Object.fromEntries(Object.entries(resumenPorRuta()).map(([ruta, r]) => [ruta, r.cantidad]));
}
