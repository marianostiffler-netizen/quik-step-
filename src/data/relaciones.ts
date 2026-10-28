// "También vas a necesitar": complementos por categoría. Clave = href de la categoría del producto.
// productos = ids del catálogo; categorias = hrefs de categorías del árbol.
export const tambienNecesitas: Record<string, { productos: string[]; categorias: string[] }> = {
  // TODO(cliente): confirmar complementos por línea
  // Fundado en las descripciones: la manta es "indispensable para la instalación de pisos laminados"
  // y la cuarta caña sirve "para rematar uniones piso-pared".
  "/pisos-y-revestimientos/pisos-flotantes": {
    productos: ["MANTA-ISOLANT", "SL-CUARTA"],
    categorias: ["/pisos-y-revestimientos/zocalos-y-mantas"],
  },
};
