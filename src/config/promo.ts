// Promoción destacada de la home. Si es null, la sección no se muestra.
export type Promo = { titulo: string; texto: string; href?: string; cta?: string };

export const promo: Promo | null = null; // TODO(cliente): promo vigente (título, texto y, si hay, link y botón)
