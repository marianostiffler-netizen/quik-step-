export interface Mirror {
  id: string;
  name: string;
  shape: "rectangular" | "square" | "oval" | "circular";
  dimensions: {
    width: number;
    height: number;
    unit: "cm";
  };
  features: {
    lightType: "warm" | "cold" | "yellow";
    frameIncluded: boolean;
  };
  pricing: {
    touch: number; // Base - solo Touch
    full: number; // Full - Touch + Desempañador + Hora
  };
}

export const mirrors: Mirror[] = [
  // Rectangulares
  {
    id: "rect-60x80",
    name: "Espejo Rectangular 60x80cm",
    shape: "rectangular",
    dimensions: { width: 60, height: 80, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 107.53, full: 129.28 },
  },
  {
    id: "rect-60x70",
    name: "Espejo Rectangular 60x70cm",
    shape: "rectangular",
    dimensions: { width: 60, height: 70, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 99.92, full: 127.39 },
  },
  {
    id: "rect-70x80",
    name: "Espejo Rectangular 70x80cm",
    shape: "rectangular",
    dimensions: { width: 70, height: 80, unit: "cm" },
    features: { lightType: "cold", frameIncluded: true },
    pricing: { touch: 119.99, full: 141.57 },
  },
  {
    id: "rect-50x70",
    name: "Espejo Rectangular 50x70cm",
    shape: "rectangular",
    dimensions: { width: 50, height: 70, unit: "cm" },
    features: { lightType: "yellow", frameIncluded: true },
    pricing: { touch: 94.49, full: 116.99 },
  },
  {
    id: "rect-90x70",
    name: "Espejo Rectangular 90x70cm",
    shape: "rectangular",
    dimensions: { width: 90, height: 70, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 122.66, full: 149.14 },
  },
  {
    id: "rect-60x90",
    name: "Espejo Rectangular 60x90cm",
    shape: "rectangular",
    dimensions: { width: 60, height: 90, unit: "cm" },
    features: { lightType: "cold", frameIncluded: true },
    pricing: { touch: 114.15, full: 138.74 },
  },
  {
    id: "rect-100x80",
    name: "Espejo Rectangular 100x80cm",
    shape: "rectangular",
    dimensions: { width: 100, height: 80, unit: "cm" },
    features: { lightType: "yellow", frameIncluded: true },
    pricing: { touch: 148.19, full: 173.72 },
  },
  // Cuadrados
  {
    id: "sq-80x80",
    name: "Espejo Cuadrado 80x80cm",
    shape: "square",
    dimensions: { width: 80, height: 80, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 126.44, full: 143.46 },
  },
  {
    id: "sq-70x70",
    name: "Espejo Cuadrado 70x70cm",
    shape: "square",
    dimensions: { width: 70, height: 70, unit: "cm" },
    features: { lightType: "cold", frameIncluded: true },
    pricing: { touch: 110.37, full: 132.12 },
  },
  {
    id: "sq-60x60",
    name: "Espejo Cuadrado 60x60cm",
    shape: "square",
    dimensions: { width: 60, height: 60, unit: "cm" },
    features: { lightType: "yellow", frameIncluded: true },
    pricing: { touch: 92.59, full: 117.93 },
  },
  // Ovalados
  {
    id: "oval-60x80",
    name: "Espejo Ovalado 60x80cm",
    shape: "oval",
    dimensions: { width: 60, height: 80, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 106.59, full: 134.01 },
  },
  // Circulares
  {
    id: "circ-60",
    name: "Espejo Circular 60cm",
    shape: "circular",
    dimensions: { width: 60, height: 60, unit: "cm" },
    features: { lightType: "warm", frameIncluded: true },
    pricing: { touch: 91.46, full: 111.32 },
  },
  {
    id: "circ-70",
    name: "Espejo Circular 70cm",
    shape: "circular",
    dimensions: { width: 70, height: 70, unit: "cm" },
    features: { lightType: "cold", frameIncluded: true },
    pricing: { touch: 104.70, full: 136.44 },
  },
  {
    id: "circ-80",
    name: "Espejo Circular 80cm",
    shape: "circular",
    dimensions: { width: 80, height: 80, unit: "cm" },
    features: { lightType: "yellow", frameIncluded: true },
    pricing: { touch: 119.83, full: 143.46 },
  },
];

export const discountTiers = [
  { min: 0, max: 10, discount: 0, label: "Precio de lista" },
  { min: 15, max: 20, discount: 5, label: "5% OFF" },
  { min: 25, max: 30, discount: 10, label: "10% OFF" },
  { min: 35, max: 45, discount: 15, label: "15% OFF" },
  { min: 50, max: Infinity, discount: 20, label: "20% OFF" },
];

export const lightTypeLabels: Record<string, string> = {
  warm: "Luz cálida",
  cold: "Luz fría",
  yellow: "Luz amarilla",
};

export const shapeLabels: Record<string, string> = {
  rectangular: "Rectangulares",
  square: "Cuadrados",
  oval: "Ovalados",
  circular: "Circulares",
};
