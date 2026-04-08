export interface Product {
  sku: string;
  category_id: string;
  name: string;
  slug: string;
  image: string;
  dimensions: { length: number; width: number; thickness: number; unit: string };
  rating: string;
  features: string[];
  water_resistance_hours: number | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  specs_summary: {
    dimensions: string;
    thickness: string;
    rating: string;
    use: string;
    water_resistance?: string;
  };
  highlights: string[];
  sort_order: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
}

export const site = {
  brand: "Quick-Step",
  tagline: "Pisos laminados con tecnología europea",
  description:
    "Descubrí la colección de pisos laminados Quick-Step: diseño natural, resistencia al agua y fácil instalación para todos los ambientes de tu hogar.",
};

export const navigation = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "productos", label: "Productos", href: "/productos" },
  { id: "tecnologia", label: "Tecnología", href: "/tecnologia" },
  { id: "contacto", label: "Contacto", href: "/contacto" },
];

export const heroSection = {
  title: "Pisos que transforman tu hogar",
  subtitle:
    "Tecnología europea, diseño natural y máxima resistencia para cada ambiente.",
  cta_primary: { label: "Ver Colección", href: "/productos" },
  cta_secondary: { label: "Encontrá tu piso ideal", href: "/productos" },
};

export const features: Feature[] = [
  {
    id: "apariencia-natural",
    icon: "wood-grain",
    title: "Apariencia Natural",
    description:
      "Tecnología laminada que reproduce fielmente la textura y el veteado de la madera real.",
    badge: "Laminado",
  },
  {
    id: "resistencia-agua",
    icon: "water-drop",
    title: "Resistencia al Agua",
    description:
      "Tecnología Hydroseal que protege las juntas y la superficie contra derrames y humedad.",
    badge: "Hydroseal",
  },
  {
    id: "resistencia-rayaduras",
    icon: "shield",
    title: "Resistente a Rayaduras y Manchas",
    description:
      "Superficie tratada que soporta el uso diario, mascotas y muebles sin perder su aspecto.",
    badge: "Protección",
  },
  {
    id: "facil-instalacion",
    icon: "click",
    title: "Fácil Instalación",
    description:
      "Sistema de encastre Uniclic: instalación sin pegamento, rápida y sin necesidad de herramientas especiales.",
    badge: "Uniclic",
  },
];

export const categories: Category[] = [
  {
    id: "smart",
    name: "Smart",
    slug: "smart",
    tagline: "Tu primer piso laminado",
    description:
      "La línea Smart es la puerta de entrada al mundo Quick-Step. Ofrece todas las tecnologías esenciales — Hydroseal, Uniclic y protección contra rayaduras — en un formato compacto y accesible.",
    specs_summary: {
      dimensions: "1200 x 190 mm",
      thickness: "7 mm",
      rating: "AC4 Aqua",
      use: "Residencial intenso",
    },
    highlights: [
      "Formato clásico, fácil de manejar",
      "6 diseños disponibles",
      "Ideal para dormitorios, livings y espacios de uso diario",
    ],
    sort_order: 1,
  },
  {
    id: "catedral",
    name: "Catedral",
    slug: "catedral",
    tagline: "Elegancia accesible",
    description:
      "La línea Catedral combina la misma practicidad de la línea Smart con diseños que evocan maderas clásicas europeas. Formato compacto con terminaciones cuidadas.",
    specs_summary: {
      dimensions: "1200 x 190 mm",
      thickness: "7 mm",
      rating: "AC4 Aqua",
      use: "Residencial intenso",
    },
    highlights: [
      "Diseños inspirados en robles europeos",
      "3 tonalidades disponibles",
      "Mismo formato y espesor que la línea Smart",
    ],
    sort_order: 2,
  },
  {
    id: "premiere-plus",
    name: "Premiere Plus",
    slug: "premiere-plus",
    tagline: "Protección superior contra el agua",
    description:
      "La línea Premiere Plus lleva la resistencia al agua al siguiente nivel: hasta 6 horas de protección contra derrames. Tabla más ancha (215 mm) para un aspecto más moderno y espacioso.",
    specs_summary: {
      dimensions: "1200 x 215 mm",
      thickness: "7 mm",
      rating: "AC4 Aqua",
      use: "Residencial intenso",
      water_resistance: "6 horas",
    },
    highlights: [
      "6 horas de resistencia al agua en superficie",
      "Tabla ancha de 215 mm",
      "4 diseños disponibles",
      "Ideal para cocinas, comedores y espacios propensos a derrames",
    ],
    sort_order: 3,
  },
  {
    id: "nesto",
    name: "Nesto",
    slug: "nesto",
    tagline: "Más espesor, más confort",
    description:
      "Con 8 mm de espesor y una tabla de 192 mm, la línea Nesto ofrece mayor estabilidad y mejor aislación acústica. Una opción intermedia con excelente relación calidad-precio.",
    specs_summary: {
      dimensions: "1261 x 192 mm",
      thickness: "8 mm",
      rating: "AC4 Aqua",
      use: "Residencial intenso",
    },
    highlights: [
      "8 mm de espesor para mayor confort al caminar",
      "Tabla ligeramente más larga (1261 mm)",
      "3 diseños disponibles",
      "Mejor aislación acústica que las líneas de 7 mm",
    ],
    sort_order: 4,
  },
  {
    id: "eligna-wide",
    name: "Eligna Wide",
    slug: "eligna-wide",
    tagline: "Tabla ancha, diseño amplio",
    description:
      "Eligna Wide ofrece tablas extra largas de 1355 mm con 8 mm de espesor. El formato wide genera menos juntas visibles y un aspecto más natural y contemporáneo.",
    specs_summary: {
      dimensions: "1355 x 190 mm",
      thickness: "8 mm",
      rating: "AC4 Aqua",
      use: "Residencial intenso",
    },
    highlights: [
      "Tabla extra larga de 1355 mm",
      "7 diseños disponibles — la colección más amplia",
      "Menos juntas visibles para un look más limpio",
      "Ideal para ambientes grandes y espacios abiertos",
    ],
    sort_order: 5,
  },
  {
    id: "impressive",
    name: "Impressive",
    slug: "impressive",
    tagline: "Resistencia profesional",
    description:
      "La línea Impressive sube la vara con clasificación AC5, apta para uso comercial moderado. Con 8 mm de espesor y una tabla de 1380 mm, es la opción para quienes necesitan máxima durabilidad.",
    specs_summary: {
      dimensions: "1380 x 190 mm",
      thickness: "8 mm",
      rating: "AC5 Aqua",
      use: "Comercial moderado",
    },
    highlights: [
      "AC5: apto para comercios y oficinas",
      "Tabla larga de 1380 mm",
      "Máxima resistencia a la abrasión",
      "Ideal para locales, consultorios y espacios de alto tránsito",
    ],
    sort_order: 6,
  },
  {
    id: "vision",
    name: "Vision",
    slug: "vision",
    tagline: "Gran formato premium",
    description:
      "La línea tope de gama. Con tablas de 1800 x 215 mm, clasificación AC5 y 8 mm de espesor, Vision ofrece el aspecto más realista y elegante de toda la colección Quick-Step.",
    specs_summary: {
      dimensions: "1800 x 215 mm",
      thickness: "8 mm",
      rating: "AC5 Aqua",
      use: "Comercial moderado",
    },
    highlights: [
      "Tabla de gran formato: 1800 x 215 mm",
      "AC5: uso comercial moderado",
      "4 diseños disponibles",
      "El aspecto más cercano a la madera real",
      "Ideal para proyectos de diseño y ambientes amplios",
    ],
    sort_order: 7,
  },
];

export const products: Product[] = [
  { sku: "QSCT701", category_id: "catedral", name: "Catedral QSCT701", slug: "catedral-qsct701", image: "Catedral-701-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSCT702", category_id: "catedral", name: "Catedral QSCT702", slug: "catedral-qsct702", image: "Catedral-702-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSCT703", category_id: "catedral", name: "Catedral QSCT703", slug: "catedral-qsct703", image: "Catedral-703-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3676", category_id: "eligna-wide", name: "Eligna Wide QSEW3676", slug: "eligna-wide-qsew3676", image: "Eligna-3676-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3677", category_id: "eligna-wide", name: "Eligna Wide QSEW3677", slug: "eligna-wide-qsew3677", image: "Eligna-3677-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3678", category_id: "eligna-wide", name: "Eligna Wide QSEW3678", slug: "eligna-wide-qsew3678", image: "Eligna-3678-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3680", category_id: "eligna-wide", name: "Eligna Wide QSEW3680", slug: "eligna-wide-qsew3680", image: "Eligna-3680-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3784", category_id: "eligna-wide", name: "Eligna Wide QSEW3784", slug: "eligna-wide-qsew3784", image: "Eligna-3784-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3785", category_id: "eligna-wide", name: "Eligna Wide QSEW3785", slug: "eligna-wide-qsew3785", image: "Eligna-3785-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSEW3786", category_id: "eligna-wide", name: "Eligna Wide QSEW3786", slug: "eligna-wide-qsew3786", image: "Eligna-3786-01.png", dimensions: { length: 1355, width: 190, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "IM1856", category_id: "impressive", name: "Impressive IM1856", slug: "impressive-im1856", image: "Impressive-1856-01.png", dimensions: { length: 1380, width: 190, thickness: 8, unit: "mm" }, rating: "AC5 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "NES897", category_id: "nesto", name: "Nesto NES897", slug: "nesto-nes897", image: "Nesto-897-01.png", dimensions: { length: 1261, width: 192, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "NES900", category_id: "nesto", name: "Nesto NES900", slug: "nesto-nes900", image: "Nesto-900-01.png", dimensions: { length: 1261, width: 192, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "NES937", category_id: "nesto", name: "Nesto NES937", slug: "nesto-nes937", image: "Nesto-937-01.png", dimensions: { length: 1261, width: 192, thickness: 8, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QPRH0316", category_id: "premiere-plus", name: "Premiere Plus QPRH0316", slug: "premiere-plus-qprh0316", image: "PremierePlus-0316-01.png", dimensions: { length: 1200, width: 215, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: 6 },
  { sku: "QPRH034", category_id: "premiere-plus", name: "Premiere Plus QPRH034", slug: "premiere-plus-qprh034", image: "PremierePlus-034-01.png", dimensions: { length: 1200, width: 215, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: 6 },
  { sku: "QPRH1067", category_id: "premiere-plus", name: "Premiere Plus QPRH1067", slug: "premiere-plus-qprh1067", image: "PremierePlus-1067-01.png", dimensions: { length: 1200, width: 215, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: 6 },
  { sku: "QPRH1577", category_id: "premiere-plus", name: "Premiere Plus QPRH1577", slug: "premiere-plus-qprh1577", image: "PremierePlus-1577-01.png", dimensions: { length: 1200, width: 215, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: 6 },
  { sku: "QSSM0314", category_id: "smart", name: "Smart QSSM0314", slug: "smart-qssm0314", image: "Smart-0314-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSSM1292", category_id: "smart", name: "Smart QSSM1292", slug: "smart-qssm1292", image: "Smart-1292-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSSM1487", category_id: "smart", name: "Smart QSSM1487", slug: "smart-qssm1487", image: "Smart-1487-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSSM1656", category_id: "smart", name: "Smart QSSM1656", slug: "smart-qssm1656", image: "Smart-1656-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSSM5001", category_id: "smart", name: "Smart QSSM5001", slug: "smart-qssm5001", image: "Smart-5001-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSSM5795", category_id: "smart", name: "Smart QSSM5795", slug: "smart-qssm5795", image: "Smart-5795-01.png", dimensions: { length: 1200, width: 190, thickness: 7, unit: "mm" }, rating: "AC4 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSV1462", category_id: "vision", name: "Vision QSV1462", slug: "vision-qsv1462", image: "Vision-1462-01.png", dimensions: { length: 1800, width: 215, thickness: 8, unit: "mm" }, rating: "AC5 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSV1464", category_id: "vision", name: "Vision QSV1464", slug: "vision-qsv1464", image: "Vision-1464-01.png", dimensions: { length: 1800, width: 215, thickness: 8, unit: "mm" }, rating: "AC5 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSV866", category_id: "vision", name: "Vision QSV866", slug: "vision-qsv866", image: "Vision-866-01.png", dimensions: { length: 1800, width: 215, thickness: 8, unit: "mm" }, rating: "AC5 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
  { sku: "QSV877", category_id: "vision", name: "Vision QSV877", slug: "vision-qsv877", image: "Vision-877-01.png", dimensions: { length: 1800, width: 215, thickness: 8, unit: "mm" }, rating: "AC5 Aqua", features: ["apariencia-natural", "resistencia-agua", "resistencia-rayaduras", "facil-instalacion"], water_resistance_hours: null },
];

export const technologySection = {
  title: "Tecnología Quick-Step",
  subtitle: "Innovación en cada capa de nuestros pisos.",
  features: [
    {
      id: "hydroseal",
      title: "Hydroseal",
      description:
        "Barrera protectora aplicada en las juntas que impide la filtración de agua. Todos nuestros pisos cuentan con esta tecnología.",
      detail:
        "Protección continua contra derrames accidentales y limpieza húmeda.",
    },
    {
      id: "uniclic",
      title: "Uniclic",
      description:
        "Sistema patentado de encastre que permite instalar el piso sin pegamento ni herramientas especiales.",
      detail:
        "Las tablas se conectan con un click. Podés instalar una habitación estándar en pocas horas.",
    },
    {
      id: "clasificacion-ac",
      title: "Clasificación AC",
      description:
        "Indicador de resistencia a la abrasión según norma europea.",
      levels: [
        {
          level: "AC4",
          label: "Uso Residencial Intenso",
          description:
            "Ideal para hogares con tránsito alto, mascotas y niños.",
        },
        {
          level: "AC5",
          label: "Uso Comercial Moderado",
          description:
            "Apto para comercios, oficinas y espacios con alto tránsito.",
        },
      ],
    },
  ],
};

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category_id === categoryId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
