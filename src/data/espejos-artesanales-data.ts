// Espejos artesanales con LED integrado. Mismo contenido que tenía la galería original.
// TODO(cliente): precios y unidad de venta; hasta entonces se muestra "Consultar precio".

export type EspejoArtesanal = {
  id: string;
  image: string;
  modelo: string;
  forma: string;
  medidas: string;
};

export const espejosArtesanales: EspejoArtesanal[] = [
  {
    id: "espejo-1",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).webp",
    modelo: "Espejo LED N°1",
    forma: "Rectangular horizontal con borde lateral curvo",
    medidas: "80 × 130 cm",
  },
  {
    id: "espejo-2",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (2).webp",
    modelo: "Espejo LED N°2",
    forma: "Rectangular vertical",
    medidas: "70 × 90 cm",
  },
  {
    id: "espejo-3",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38.webp",
    modelo: "Espejo LED N°3",
    forma: "Circular",
    medidas: "80 × 80 cm",
  },
  {
    id: "espejo-4",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39 (1).webp",
    modelo: "Espejo LED N°4",
    forma: "Rectangular horizontal",
    medidas: "90 × 70 cm",
  },
  {
    id: "espejo-5",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39.webp",
    modelo: "Espejo LED N°5",
    forma: "Rectangular vertical",
    medidas: "70 × 90 cm",
  },
];
