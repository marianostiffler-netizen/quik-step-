// Productos de construcción y maderas. Textos y medidas tal cual los tenía la página.
// Sin precios cargados: se muestra "Consultar precio".
// TODO(cliente): unificar "Pino Eliotis"/"Elliotis" (hoy conviven las dos grafías)
// TODO(cliente): unidad de venta (unidad, pie, metro lineal, paquete...) y precios

export type Uso = "techos" | "decks" | "entrepisos" | "encofrado" | "interiores";

export type CategoriaObra =
  | "machimbre"
  | "tirante"
  | "tabla-encofrado"
  | "estructura"
  | "aislante"
  | "material-seco";

export type ProductoObra = {
  id: string;
  categoria: CategoriaObra;
  nombre: string;
  /** Interior / Exterior (solo tirantería). */
  ubicacion?: "Interior" | "Exterior";
  material?: string;
  /** Sección en pulgadas, ej. 1/2" x 4". */
  seccion?: string;
  /** Medida completa tal cual la mostraba la página. */
  medida?: string;
  /** Largo tal cual: "2.44 m", "De 3.05 m a 6.10 m", "Hasta 12 metros". */
  largo?: string;
  grosor?: string;
  /** Descripción corta (ej. "Tabla de 15cm"). */
  descripcion?: string;
  /** Destaque, uso o descripción de la página. */
  detalle?: string;
  destacado?: boolean;
  /** Solo según el texto de uso que ya decía la página; [] si no decía. */
  usos: Uso[];
  // TODO(cliente): unidad de venta (unidad, pie, metro lineal, paquete...)
  unidadVenta: string | null;
  /** null = sin precio cargado: "Consultar precio". */
  precio: { valor: number; moneda: "USD" | "ARS" } | null;
};

export const productosObra: ProductoObra[] = [
  {
    id: "machimbre-pino-eliotis-1-2-x-4",
    categoria: "machimbre",
    nombre: "Machimbre Pino Eliotis 1/2\" x 4\"",
    material: "Pino Eliotis",
    seccion: "1/2\" x 4\"",
    medida: "1/2\" x 4\"",
    largo: "2.44 m",
    grosor: "12 mm",
    detalle: "Ideal para cielorrasos",
    usos: ["techos","interiores"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "machimbre-pino-eliotis-3-4-x-5",
    categoria: "machimbre",
    nombre: "Machimbre Pino Eliotis 3/4\" x 5\"",
    material: "Pino Eliotis",
    seccion: "3/4\" x 5\"",
    medida: "3/4\" x 5\"",
    largo: "2.44 m",
    grosor: "18 mm",
    detalle: "Uso general",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "machimbre-pino-eliotis-1-x-6",
    categoria: "machimbre",
    nombre: "Machimbre Pino Eliotis 1\" x 6\"",
    material: "Pino Eliotis",
    seccion: "1\" x 6\"",
    medida: "1\" x 6\"",
    largo: "2.44 m",
    grosor: "25 mm",
    detalle: "Ideal para entrepisos/pisos",
    usos: ["entrepisos"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "machimbre-eucalipto-1-2-x-4",
    categoria: "machimbre",
    nombre: "Machimbre Eucalipto 1/2\" x 4\"",
    material: "Eucalipto",
    seccion: "1/2\" x 4\"",
    medida: "1/2\" x 4\"",
    largo: "2.44 m",
    grosor: "12 mm",
    detalle: "Ideal para cielorrasos",
    usos: ["techos","interiores"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "machimbre-eucalipto-3-4-x-5",
    categoria: "machimbre",
    nombre: "Machimbre Eucalipto 3/4\" x 5\"",
    material: "Eucalipto",
    seccion: "3/4\" x 5\"",
    medida: "3/4\" x 5\"",
    largo: "2.44 m",
    grosor: "18 mm",
    detalle: "Uso general",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "machimbre-eucalipto-1-x-6",
    categoria: "machimbre",
    nombre: "Machimbre Eucalipto 1\" x 6\"",
    material: "Eucalipto",
    seccion: "1\" x 6\"",
    medida: "1\" x 6\"",
    largo: "2.44 m",
    grosor: "25 mm",
    detalle: "Ideal para entrepisos/pisos",
    usos: ["entrepisos"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tirante-pino-elliotis-2-x-4",
    categoria: "tirante",
    nombre: "Tirante Pino Elliotis 2\" x 4\"",
    ubicacion: "Interior",
    material: "Pino Elliotis",
    seccion: "2\" x 4\"",
    medida: "2\" x 4\"",
    largo: "De 3.05 m a 6.10 m",
    detalle: "Estructuras de techos",
    usos: ["techos"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tirante-pino-elliotis-2-x-5",
    categoria: "tirante",
    nombre: "Tirante Pino Elliotis 2\" x 5\"",
    ubicacion: "Interior",
    material: "Pino Elliotis",
    seccion: "2\" x 5\"",
    medida: "2\" x 5\"",
    largo: "De 3.05 m a 6.10 m",
    detalle: "Estructuras de techos",
    usos: ["techos"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tirante-pino-elliotis-2-x-6",
    categoria: "tirante",
    nombre: "Tirante Pino Elliotis 2\" x 6\"",
    ubicacion: "Interior",
    material: "Pino Elliotis",
    seccion: "2\" x 6\"",
    medida: "2\" x 6\"",
    largo: "De 3.05 m a 6.10 m",
    detalle: "Entrepisos",
    usos: ["entrepisos"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tirante-eucalipto-grandis-3-x-8",
    categoria: "tirante",
    nombre: "Tirante Eucalipto Grandis 3\" x 8\"",
    ubicacion: "Exterior",
    material: "Eucalipto Grandis",
    seccion: "3\" x 8\"",
    medida: "3\" x 8\"",
    largo: "Hasta 12 metros",
    detalle: "Pérgolas",
    usos: ["decks"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tirante-eucalipto-grandis-4-x-10",
    categoria: "tirante",
    nombre: "Tirante Eucalipto Grandis 4\" x 10\"",
    ubicacion: "Exterior",
    material: "Eucalipto Grandis",
    seccion: "4\" x 10\"",
    medida: "4\" x 10\"",
    largo: "Hasta 12 metros",
    detalle: "Decks y muelles",
    usos: ["decks"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tabla-para-encofrado-eucalipto-1-x-6-x-4-0m",
    categoria: "tabla-encofrado",
    nombre: "Tabla para encofrado Eucalipto 1\" x 6\" x 4.0m",
    material: "Eucalipto",
    seccion: "1\" x 6\"",
    medida: "1\" x 6\" x 4.0m",
    largo: "4.0 m",
    descripcion: "Tabla de 15cm",
    detalle: "Ideal para encadenados",
    usos: ["encofrado"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tabla-para-encofrado-eucalipto-1-x-8-x-4-0m",
    categoria: "tabla-encofrado",
    nombre: "Tabla para encofrado Eucalipto 1\" x 8\" x 4.0m",
    material: "Eucalipto",
    seccion: "1\" x 8\"",
    medida: "1\" x 8\" x 4.0m",
    largo: "4.0 m",
    descripcion: "Tabla de 20cm",
    detalle: "Para encofrar",
    usos: ["encofrado"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "tabla-para-encofrado-pino-1-x-8-x-4-0m",
    categoria: "tabla-encofrado",
    nombre: "Tabla para encofrado Pino 1\" x 8\" x 4.0m",
    material: "Pino",
    seccion: "1\" x 8\"",
    medida: "1\" x 8\" x 4.0m",
    largo: "4.0 m",
    descripcion: "Tabla de 20cm",
    detalle: "Para encofrar",
    usos: ["encofrado"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "puntal-3-x-3-x-3-0m",
    categoria: "estructura",
    nombre: "Puntal 3\" x 3\" x 3.0m",
    seccion: "3\" x 3\"",
    medida: "3\" x 3\" x 3.0m",
    largo: "3.0 m",
    detalle: "Soporte estructural",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "bastidor-1-x-2-x-4m",
    categoria: "estructura",
    nombre: "Bastidor 1\" x 2\" x 4m",
    material: "Eucalipto",
    seccion: "1\" x 2\"",
    medida: "1\" x 2\" x 4m",
    largo: "4 m",
    detalle: "Eucalipto en bruto",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "bastidor-1-x-1-x-4-0m",
    categoria: "estructura",
    nombre: "Bastidor 1\" x 1\" x 4.0m",
    material: "Eucalipto",
    seccion: "1\" x 1\"",
    medida: "1\" x 1\" x 4.0m",
    largo: "4.0 m",
    detalle: "Eucalipto en bruto",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "fenolico-18mm-1-22-x-2-44m",
    categoria: "estructura",
    nombre: "Fenólico 18mm (1.22 x 2.44m)",
    material: "Pino",
    medida: "18mm (1.22 x 2.44m)",
    grosor: "18 mm",
    detalle: "Planchas de Pino",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "lana-de-vidrio",
    categoria: "aislante",
    nombre: "Lana de vidrio",
    detalle: "Disponible con y sin aluminio para aplicaciones térmicas y de confort interior.",
    usos: ["interiores"],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "membrana-hidrofuga",
    categoria: "aislante",
    nombre: "Membrana hidrófuga",
    detalle: "Estilo Tyvek, pensada para proteger la envolvente y mejorar el desempeño frente a la humedad.",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "espuma-de-polietileno",
    categoria: "aislante",
    nombre: "Espuma de polietileno",
    detalle: "Presentaciones de 10 mm y 20 mm para distintas necesidades de apoyo y aislación.",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "mexpol-3-mm-sin-aluminio",
    categoria: "aislante",
    nombre: "Mexpol 3 mm sin aluminio",
    detalle: "Aislante específico recomendado para pisos flotantes.",
    usos: [],
    unidadVenta: null,
    precio: null,
  },
  {
    id: "bolsas-de-yeso-yemaco",
    categoria: "material-seco",
    nombre: "Bolsas de Yeso Yemaco",
    detalle: "Producto destacado por su calidad para revestimientos y terminaciones interiores.",
    destacado: true,
    usos: ["interiores"],
    unidadVenta: null,
    precio: null,
  },
];
