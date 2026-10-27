// Datos del negocio. Los campos en null están PENDIENTES de que el cliente los confirme.
// Buscá "TODO(cliente)" para ver qué falta.

export type Negocio = {
  nombre: string;
  whatsapp: string | null;
  telefono: string | null;
  email: string | null;
  direccion: {
    calle: string | null;
    localidad: string;
    provincia: string;
    codigoPostal: string | null;
    pais: string;
  };
  horarios: { dias: string; horas: string }[] | null;
  sitioUrl: string | null;
};

export const negocio: Negocio = {
  nombre: "Maderera Don Antonio",
  whatsapp: null, // TODO(cliente): número en formato internacional sin + ni espacios, ej. 549342XXXXXXX
  telefono: null, // TODO(cliente): teléfono fijo/celular para mostrar
  email: "info@madereradonantonio.com.ar", // TODO(cliente): verificar que la casilla exista
  direccion: {
    calle: null, // TODO(cliente): calle y número
    localidad: "San Jorge",
    provincia: "Santa Fe",
    codigoPostal: null, // TODO(cliente)
    pais: "AR",
  },
  horarios: null, // TODO(cliente)
  sitioUrl: null, // TODO(cliente): dominio definitivo, ej. https://www.ejemplo.com.ar
};

// TODO(cliente): mientras whatsapp sea null, el link usa https://wa.me/?text=...
// que abre el selector de contacto de WhatsApp en vez de un chat directo.
export function waLink(texto: string): string {
  const base = negocio.whatsapp
    ? `https://wa.me/${negocio.whatsapp}`
    : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(texto)}`;
}

// "San Jorge, Santa Fe" (con la calle adelante si existe)
export function direccionCorta(): string {
  const { calle, localidad, provincia } = negocio.direccion;
  return [calle, localidad, provincia].filter(Boolean).join(", ");
}
