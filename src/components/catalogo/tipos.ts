import type { Precio } from "@/lib/precios";

// Silueta para productos sin foto propia (ej. espejos): se deriva de los datos reales.
export type Silueta = "horizontal" | "vertical" | "cuadrado" | "ovalado" | "circular";

export type ItemCatalogo = {
  id: string;
  nombre: string;
  /** Texto para la consulta por WhatsApp si difiere de `nombre` (ej. incluye el modelo). */
  nombreConsulta?: string;
  /** Clave de orden alfabético si difiere de `nombre`. */
  claveNombre?: string;
  eyebrow?: string;
  descripcion?: string;
  chips?: string[];
  /** Líneas de texto chico (medidas, grosor, etc.). */
  detalles?: string[];
  imagen?: { src: string; alt: string };
  /** Proporción de la imagen. Por defecto 4/3. */
  aspecto?: "4/3" | "cuadrado";
  /** Bloque visual neutro para productos sin foto. */
  bloque?: { grande: string; chico?: string; silueta?: Silueta };
  /** Ficha propia: la imagen y el título linkean ahí y el CTA pasa a "Ver detalle". */
  href?: string;
  /** Aclaración corta bajo el precio (ej. moneda). */
  nota?: string;
  /** null = sin precio cargado: se muestra "Consultar precio". */
  precio: Precio | null;
  /** Valores por filtro (clave del grupo -> valores). */
  valores?: Record<string, string[]>;
};

export type GrupoFiltro = {
  key: string;
  titulo: string;
  opciones: { value: string; label: string }[];
};

export type Orden = "precio-asc" | "precio-desc" | "nombre-asc" | "nombre-desc";

export type Seleccion = Record<string, string[]>;

export const ETIQUETA_ORDEN: Record<Orden, string> = {
  "precio-asc": "Precio: menor a mayor",
  "precio-desc": "Precio: mayor a menor",
  "nombre-asc": "Nombre (A–Z)",
  "nombre-desc": "Nombre (Z–A)",
};
