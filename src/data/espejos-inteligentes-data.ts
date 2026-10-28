import type { Escalon } from "@/lib/escalones";

// Precios convertidos desde ARS a USD a tasa 1420 ARS/USD
// TODO(cliente): confirmar cotización; price_usd es una conversión a dólar fijo y no se muestra
// Fuente: CATALOGO ESPEJOS-2026.xlsx (importados depo lanus)

export interface Mirror {
  id: string;
  modelo: string;
  name: string;
  shape: "rectangular" | "square" | "oval" | "circular";
  dimensions: { width: number; height: number; unit: "cm" };
  price_usd: number;
  price_ars: number;
  fullFeatured: boolean;
}

export const mirrors: Mirror[] = [
  // ─── 90×70 cm ─── (horizontal rectangulares)
  { id: "F01", modelo: "F01", name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 140000, price_usd: 98.59, fullFeatured: true },
  { id: "F02", modelo: "F02", name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 140000, price_usd: 98.59, fullFeatured: true },
  { id: "F03", modelo: "F03", name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 140000, price_usd: 98.59, fullFeatured: true },
  { id: "F1",  modelo: "F1",  name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "F2",  modelo: "F2",  name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1048", modelo: "L1048", name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1025", modelo: "L1025", name: "Espejo LED 90×70 cm", shape: "rectangular", dimensions: { width: 90, height: 70, unit: "cm" }, price_ars: 160000, price_usd: 112.68, fullFeatured: true },
  // ─── 75×100 cm ─── (verticales)
  { id: "FS01", modelo: "FS01", name: "Espejo LED 75×100 cm", shape: "rectangular", dimensions: { width: 75, height: 100, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "FS02", modelo: "FS02", name: "Espejo LED 75×100 cm", shape: "rectangular", dimensions: { width: 75, height: 100, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "FS03", modelo: "FS03", name: "Espejo LED 75×100 cm", shape: "rectangular", dimensions: { width: 75, height: 100, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  // ─── 70×90 cm ─── (verticales)
  { id: "L1036", modelo: "L1036", name: "Espejo LED 70×90 cm", shape: "rectangular", dimensions: { width: 70, height: 90, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1040", modelo: "L1040", name: "Espejo LED 70×90 cm", shape: "rectangular", dimensions: { width: 70, height: 90, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1127", modelo: "L1127", name: "Espejo LED 70×90 cm", shape: "rectangular", dimensions: { width: 70, height: 90, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1051", modelo: "L1051", name: "Espejo LED 70×90 cm", shape: "rectangular", dimensions: { width: 70, height: 90, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  { id: "L1058", modelo: "L1058", name: "Espejo LED 70×90 cm", shape: "rectangular", dimensions: { width: 70, height: 90, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  // ─── 80×130 cm ─── (vertical grande)
  { id: "GY01", modelo: "GY01", name: "Espejo LED 80×130 cm", shape: "rectangular", dimensions: { width: 80, height: 130, unit: "cm" }, price_ars: 150000, price_usd: 105.63, fullFeatured: true },
  // ─── 65×170 cm ─── (cuerpo entero)
  { id: "CY01", modelo: "CY01", name: "Espejo LED 65×170 cm", shape: "rectangular", dimensions: { width: 65, height: 170, unit: "cm" }, price_ars: 160000, price_usd: 112.68, fullFeatured: true },
  { id: "CY03", modelo: "CY03", name: "Espejo LED 65×170 cm", shape: "rectangular", dimensions: { width: 65, height: 170, unit: "cm" }, price_ars: 160000, price_usd: 112.68, fullFeatured: true },
  // ─── Cuadrados ───
  { id: "Y01", modelo: "Y01", name: "Espejo LED 80×80 cm", shape: "square", dimensions: { width: 80, height: 80, unit: "cm" }, price_ars: 145000, price_usd: 102.11, fullFeatured: true },
  { id: "Y02", modelo: "Y02", name: "Espejo LED 80×80 cm", shape: "square", dimensions: { width: 80, height: 80, unit: "cm" }, price_ars: 145000, price_usd: 102.11, fullFeatured: true },
  { id: "Y03", modelo: "Y03", name: "Espejo LED 80×80 cm", shape: "square", dimensions: { width: 80, height: 80, unit: "cm" }, price_ars: 145000, price_usd: 102.11, fullFeatured: true },
  { id: "YK03", modelo: "YK03", name: "Espejo LED 70×70 cm", shape: "square", dimensions: { width: 70, height: 70, unit: "cm" }, price_ars: 115000, price_usd: 80.99, fullFeatured: false },
  // ─── Básicos (sin display LCD / desempañador) ───
  { id: "F02-60", modelo: "F02", name: "Espejo LED 60×80 cm", shape: "rectangular", dimensions: { width: 60, height: 80, unit: "cm" }, price_ars: 115000, price_usd: 80.99, fullFeatured: false },
  { id: "L1051-2", modelo: "L1051-2", name: "Espejo LED 60×80 cm", shape: "rectangular", dimensions: { width: 60, height: 80, unit: "cm" }, price_ars: 115000, price_usd: 80.99, fullFeatured: false },
  { id: "FS02-2", modelo: "FS02-2", name: "Espejo LED 60×80 cm", shape: "rectangular", dimensions: { width: 60, height: 80, unit: "cm" }, price_ars: 115000, price_usd: 80.99, fullFeatured: false },
];

// Descuentos mayoristas por cantidad mínima: cada escalón vale hasta el siguiente (sin huecos).
// TODO(cliente): confirmar los mínimos. Antes eran rangos con huecos (0–10, 15–20, 25–30, 35–45, 50+):
// ahora de 11 a 14 unidades queda precio de lista, de 21 a 24 el 5%, de 31 a 34 el 10% y de 46 a 49 el 15%.
export const escalonesMayoristas: Escalon[] = [
  { desde: 1, descuentoPct: 0, label: "Precio de lista" },
  { desde: 15, descuentoPct: 5, label: "5% OFF" },
  { desde: 25, descuentoPct: 10, label: "10% OFF" },
  { desde: 35, descuentoPct: 15, label: "15% OFF" },
  { desde: 50, descuentoPct: 20, label: "20% OFF" },
];

export const shapeLabels: Record<string, string> = {
  rectangular: "Rectangulares",
  square: "Cuadrados",
  oval: "Ovalados",
  circular: "Circulares",
};
