import type { MetadataRoute } from "next";
import { categories, products } from "@/data/site-data";
import { grupos, hrefFichaPiso, hrefLineaPiso } from "@/data/catalogo";
import { urlSitio } from "@/config/negocio";
import { esIndexable, paginasInfo } from "@/data/paginas-info";

// Rutas públicas: inicio, grupos, categorías, subcategorías, líneas y fichas de pisos, servicios y contacto.
const rutas = [
  "/",
  ...grupos.flatMap((g) => [
    g.href,
    ...g.categorias.flatMap((c) => [c.href, ...(c.subcategorias ?? []).map((s) => s.href)]),
  ]),
  ...categories.map((c) => hrefLineaPiso(c.slug)),
  ...products.map((p) => {
    const linea = categories.find((c) => c.id === p.category_id)!;
    return hrefFichaPiso(linea.slug, p.slug);
  }),
  "/servicios",
  "/contacto",
  // Páginas informativas: solo las que tienen algún texto confirmado
  ...paginasInfo().filter(esIndexable).map((p) => p.ruta),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlSitio();
  return [...new Set(rutas)].map((ruta) => ({
    url: ruta === "/" ? base : `${base}${ruta}`,
  }));
}
