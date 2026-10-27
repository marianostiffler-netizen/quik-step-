import type { MetadataRoute } from "next";
import { categories } from "@/data/site-data";
import { urlSitio } from "@/config/negocio";

// Rutas públicas. Excluidas a propósito: /landing (prueba) y /cielorrasos (próximamente).
// TODO(cliente): sumar /cielorrasos cuando tenga contenido.
const rutas = [
  "/",
  "/pisos-flotantes",
  ...categories.map((c) => `/pisos-flotantes/${c.slug}`),
  "/construccion-y-maderas",
  "/melaminas",
  "/espejos-inteligentes",
  "/espejos-artesanales",
  "/articulos-hogar",
  "/servicios",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlSitio();
  return rutas.map((ruta) => ({
    url: ruta === "/" ? base : `${base}${ruta}`,
  }));
}
