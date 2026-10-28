// Rutas de pisos flotantes. Módulo sin dependencias para poder usarlo también en componentes de cliente.
export const RUTA_PISOS = "/pisos-y-revestimientos/pisos-flotantes";
export const hrefLineaPiso = (slug: string) => `${RUTA_PISOS}/${slug}`;
export const hrefFichaPiso = (lineaSlug: string, productoSlug: string) => `${RUTA_PISOS}/${lineaSlug}/${productoSlug}`;
