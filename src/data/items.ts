// Conversión de los datos del catálogo a ItemCatalogo (tarjetas y filtros).
// Imports relativos con extensión para que `node --test` pueda cargar el módulo.
import { productosObra, type CategoriaObra, type Uso } from "./construccion-data.ts";
import { melaminas, type Melamina } from "./melaminas-data.ts";
import { articulosHogar } from "./hogar-data.ts";
import { mirrors, type Mirror } from "./espejos-inteligentes-data.ts";
import { espejosArtesanales } from "./espejos-artesanales-data.ts";
import type { GrupoFiltro, ItemCatalogo, Silueta } from "@/components/catalogo/tipos";

// ─── Maderas y construcción ───

export const TIPOS_OBRA: { value: CategoriaObra; slug: string; label: string; singular: string }[] = [
  { value: "machimbre", slug: "machimbres", label: "Machimbres", singular: "Machimbre" },
  { value: "tirante", slug: "tirantes-y-vigas", label: "Tirantes y vigas", singular: "Tirante" },
  { value: "tabla-encofrado", slug: "tablas-para-encofrado", label: "Tablas para encofrado", singular: "Tabla para encofrado" },
  { value: "estructura", slug: "estructura-de-obra", label: "Estructura de obra", singular: "Estructura de obra" },
  { value: "aislante", slug: "aislantes", label: "Aislantes", singular: "Aislante" },
  { value: "material-seco", slug: "materiales-secos", label: "Materiales secos", singular: "Material seco" },
];

export const USOS_OBRA: { value: Uso; label: string }[] = [
  { value: "techos", label: "Techos" },
  { value: "cielorrasos", label: "Cielorrasos" },
  { value: "decks", label: "Decks y pérgolas" },
  { value: "entrepisos", label: "Entrepisos" },
  { value: "encofrado", label: "Encofrado" },
  { value: "interiores", label: "Interiores" },
];

const x = (s: string) => s.replace(/ x /g, " × ");

/** Items de obra; con `categoria` se limita a esa categoría. */
export function itemsObra(categoria?: CategoriaObra): ItemCatalogo[] {
  return productosObra
    .filter((p) => !categoria || p.categoria === categoria)
    .map((p) => {
      const tipo = TIPOS_OBRA.find((t) => t.value === p.categoria)!;
      const chips = [
        ...(p.ubicacion ? [p.ubicacion] : []),
        ...(p.material ? [p.material] : []),
        ...(p.grosor ? [`Grosor ${p.grosor}`] : []),
        ...(p.destacado ? ["Destacado"] : []),
      ];
      return {
        id: p.id,
        nombre: p.nombre,
        eyebrow: tipo.singular,
        descripcion: [p.detalle].filter(Boolean).join(" "),
        chips,
        detalles: p.descripcion ? [p.descripcion] : undefined,
        bloque: p.seccion
          ? { grande: x(p.seccion), chico: p.largo }
          : p.grosor
            ? { grande: p.grosor, chico: p.medida }
            : { grande: tipo.singular },
        precio: null,
        valores: {
          tipo: [p.categoria],
          material: p.material ? [p.material] : [],
          uso: p.usos,
        },
      };
    });
}

/** Filtros Tipo (solo en el listado completo), Material y Uso; se omiten los de una sola opción. */
export function filtrosObra(categoria?: CategoriaObra): GrupoFiltro[] {
  const lista = productosObra.filter((p) => !categoria || p.categoria === categoria);
  const materiales = [...new Set(lista.flatMap((p) => (p.material ? [p.material] : [])))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
  const filtros: GrupoFiltro[] = [
    ...(categoria
      ? []
      : [
          {
            key: "tipo",
            titulo: "Tipo",
            opciones: TIPOS_OBRA.filter((t) => lista.some((p) => p.categoria === t.value)).map(({ value, label }) => ({ value, label })),
          },
        ]),
    { key: "material", titulo: "Material", opciones: materiales.map((m) => ({ value: m, label: m })) },
    { key: "uso", titulo: "Uso", opciones: USOS_OBRA.filter((u) => lista.some((p) => p.usos.includes(u.value))) },
  ];
  return filtros.filter((g) => g.opciones.length > 1);
}

// ─── Placas y melaminas ───

const sinPrefijo = (linea: string) => linea.replace(/^Línea /, "");

/** Melaminas (esRevestimiento: false) o revestimientos melamínicos (true). */
export function listaMelaminas(esRevestimiento: boolean): Melamina[] {
  return melaminas.filter((m) => m.esRevestimiento === esRevestimiento);
}

export function itemsMelaminas(esRevestimiento: boolean): ItemCatalogo[] {
  return listaMelaminas(esRevestimiento).map((m) => ({
    id: m.id,
    nombre: m.nombre,
    claveNombre: `${m.nombre} ${m.esRevestimiento ? "1" : "0"}`,
    eyebrow: m.linea,
    chips: m.esRevestimiento ? ["Revestimiento"] : undefined,
    detalles: [`Medidas: ${m.medidas}`],
    imagen: { src: m.imagen, alt: `Textura ${m.nombre}, ${m.linea}` },
    aspecto: "cuadrado",
    precio: null,
    valores: {
      linea: [m.linea],
      medidas: [m.medidas],
    },
  }));
}

export function lineasMelaminas(esRevestimiento: boolean): string[] {
  return [...new Set(listaMelaminas(esRevestimiento).map((m) => m.linea))].sort((a, b) => a.localeCompare(b, "es"));
}

/** Filtros Línea y Medidas; se omiten los de una sola opción. */
export function filtrosMelaminas(esRevestimiento: boolean): GrupoFiltro[] {
  const lista = listaMelaminas(esRevestimiento);
  const medidas = [...new Set(lista.map((m) => m.medidas))].sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
  return [
    { key: "linea", titulo: "Línea", opciones: lineasMelaminas(esRevestimiento).map((l) => ({ value: l, label: sinPrefijo(l) })) },
    { key: "medidas", titulo: "Medidas", opciones: medidas.map((v) => ({ value: v, label: v })) },
  ].filter((g) => g.opciones.length > 1);
}

// ─── Hogar y deco ───

export function itemsHogar(): ItemCatalogo[] {
  return articulosHogar.map((a) => ({
    id: a.id,
    nombre: a.title,
    descripcion: a.description,
    imagen: { src: a.image, alt: a.title },
    precio: null,
  }));
}

export const FORMAS_ESPEJO: { value: Mirror["shape"]; label: string }[] = [
  { value: "rectangular", label: "Rectangular" },
  { value: "square", label: "Cuadrado" },
  { value: "oval", label: "Ovalado" },
  { value: "circular", label: "Circular" },
];

export const medidaEspejo = (m: Mirror) => `${m.dimensions.width} × ${m.dimensions.height} cm`;

function silueta(m: Mirror): Silueta {
  if (m.shape === "square") return "cuadrado";
  if (m.shape === "oval") return "ovalado";
  if (m.shape === "circular") return "circular";
  return m.dimensions.height > m.dimensions.width ? "vertical" : "horizontal";
}

const FUNCIONES_COMPLETAS = ["Touch 3 tonos", "Desempañador", "Display LCD", "Temperatura", "Sensor mov."];
const FUNCIONES_BASICAS = ["Touch 3 tonos", "LED regulable"];

export function itemsEspejosLed(): ItemCatalogo[] {
  return mirrors.map((m) => ({
    id: m.id,
    nombre: m.name,
    nombreConsulta: `${m.name} (modelo ${m.modelo})`,
    claveNombre: `${m.name} ${m.modelo}`,
    eyebrow: `Modelo ${m.modelo}`,
    chips: m.fullFeatured ? FUNCIONES_COMPLETAS : FUNCIONES_BASICAS,
    bloque: { grande: medidaEspejo(m), chico: FORMAS_ESPEJO.find((f) => f.value === m.shape)?.label, silueta: silueta(m) },
    // Solo price_ars: es la moneda en que está cargado. price_usd es una conversión y no se muestra.
    precio: { valor: m.price_ars, moneda: "ARS", unidad: "c/u" },
    valores: {
      forma: [m.shape],
      medida: [medidaEspejo(m)],
      completas: m.fullFeatured ? ["si"] : [],
    },
  }));
}

export function filtrosEspejosLed(): GrupoFiltro[] {
  return [
    {
      key: "forma",
      titulo: "Forma",
      opciones: FORMAS_ESPEJO.filter((f) => mirrors.some((m) => m.shape === f.value)).map((f) => ({ value: f.value, label: f.label })),
    },
    {
      key: "medida",
      titulo: "Medida",
      opciones: [...new Map(mirrors.map((m) => [medidaEspejo(m), m.dimensions.width * m.dimensions.height])).entries()]
        .sort((a, b) => a[1] - b[1])
        .map(([v]) => ({ value: v, label: v })),
    },
    ...(new Set(mirrors.map((m) => m.fullFeatured)).size > 1
      ? [{ key: "completas", titulo: "Funciones", opciones: [{ value: "si", label: "Funciones completas" }] }]
      : []),
  ].filter((g) => g.opciones.length > 0);
}

export function itemsEspejosArtesanales(): ItemCatalogo[] {
  return espejosArtesanales.map((e) => ({
    id: e.id,
    nombre: e.modelo,
    descripcion: e.forma,
    detalles: [e.medidas],
    imagen: { src: e.image, alt: `Espejo ${e.modelo}` },
    precio: null,
  }));
}
