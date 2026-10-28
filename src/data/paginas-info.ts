// Páginas informativas (ayuda y nosotros). Una sección con `texto: null` está pendiente del cliente
// y la página muestra un aviso neutro. Si TODAS están pendientes, la página no se indexa.
import { negocio, direccionCorta } from "../config/negocio.ts";
import { pasos } from "./pasos-compra.ts";

export type SeccionInfo = { titulo: string; texto: string | null };

export type PaginaInfoDatos = {
  ruta: string;
  titulo: string;
  descripcion: string;
  bajada?: string;
  secciones: SeccionInfo[];
};

const textoPaso = (titulo: string) => pasos.find((p) => p.titulo === titulo)!.texto;

export function paginasInfo(): PaginaInfoDatos[] {
  return [
    {
      ruta: "/como-comprar",
      titulo: "Cómo comprar",
      descripcion: "Cómo comprar en Maderera Don Antonio: elegí, consultá por WhatsApp y cerrá tu pedido.",
      bajada: "Comprar es simple: elegís en el catálogo y lo coordinamos por WhatsApp.",
      secciones: [
        { titulo: "Elegí", texto: textoPaso("Elegí") },
        { titulo: "Consultá", texto: textoPaso("Consultá") },
        { titulo: "Cerrá tu pedido", texto: textoPaso("Cerrá tu pedido") },
        { titulo: "Formas de pago", texto: null }, // TODO(cliente): medios de pago aceptados (ver también /medios-de-pago)
        { titulo: "Entrega", texto: null }, // TODO(cliente): cómo se entrega o retira el pedido
      ],
    },
    {
      ruta: "/envios-y-retiro",
      titulo: "Envíos y retiro",
      descripcion: "Envíos y retiro en el local de Maderera Don Antonio, San Jorge, Santa Fe.",
      secciones: [
        { titulo: "Retiro en el local", texto: negocio.retiro }, // TODO(cliente): condiciones y horarios de retiro
        { titulo: "Envíos y zonas", texto: negocio.envios }, // TODO(cliente): si hacen envíos y a qué zonas
        { titulo: "Costos", texto: null }, // TODO(cliente): cuánto cuesta el envío o cómo se calcula
        { titulo: "Plazos", texto: null }, // TODO(cliente): plazos de entrega y de preparación del pedido
      ],
    },
    {
      ruta: "/medios-de-pago",
      titulo: "Medios de pago",
      descripcion: "Medios de pago aceptados en Maderera Don Antonio.",
      secciones: [
        { titulo: "Medios aceptados", texto: negocio.mediosDePago?.length ? negocio.mediosDePago.join(", ") : null }, // TODO(cliente): lista de medios de pago
        { titulo: "Cuotas", texto: null }, // TODO(cliente): si hay cuotas, con qué tarjetas y en qué condiciones
        { titulo: "Descuentos", texto: null }, // TODO(cliente): descuentos por pago en efectivo o transferencia, si existen
      ],
    },
    {
      ruta: "/cambios-y-devoluciones",
      titulo: "Cambios y devoluciones",
      descripcion: "Política de cambios y devoluciones de Maderera Don Antonio.",
      secciones: [
        { titulo: "Plazo para cambios", texto: null }, // TODO(cliente): plazo y condiciones del producto
        { titulo: "Productos sin cambio", texto: null }, // TODO(cliente): qué productos no admiten cambio (ej. cortados o a pedido)
        { titulo: "Cómo pedir un cambio", texto: null }, // TODO(cliente): pasos y datos que hay que presentar
        { titulo: "Garantía", texto: null }, // TODO(cliente): garantía por producto o marca (verificar con el proveedor)
      ],
    },
    {
      ruta: "/preguntas-frecuentes",
      titulo: "Preguntas frecuentes",
      descripcion: "Preguntas frecuentes sobre compras en Maderera Don Antonio.",
      // TODO(cliente): preguntas y respuestas reales; no se inventan. Cuando existan, pasar a <details>/<summary>.
      secciones: [{ titulo: "Preguntas y respuestas", texto: null }],
    },
    {
      ruta: "/nosotros",
      titulo: "Nosotros",
      descripcion: "Conocé Maderera Don Antonio, San Jorge, Santa Fe.",
      secciones: [
        { titulo: "Nuestra historia", texto: negocio.historia }, // TODO(cliente): historia de Don Antonio y la maderera
        // "Dónde estamos" solo si hay calle cargada
        ...(negocio.direccion.calle ? [{ titulo: "Dónde estamos", texto: `${direccionCorta()}, Argentina` }] : []),
        { titulo: "Cómo trabajamos", texto: null }, // TODO(cliente): forma de trabajo, atención, tiempos
      ],
    },
    {
      ruta: "/boton-de-arrepentimiento",
      titulo: "Botón de arrepentimiento",
      descripcion: "Cómo pedir la revocación de tu compra en Maderera Don Antonio.",
      secciones: [
        // TODO(cliente): Disp. 954/2025 (Defensa del Consumidor) y Ley 24.240 art. 34: verificar con el abogado del cliente;
        // requiere formulario y código de registro en 24 h — Parte B
        { titulo: "Cómo pedir la revocación de tu compra", texto: null },
      ],
    },
  ];
}

export function esIndexable(p: PaginaInfoDatos): boolean {
  return p.secciones.some((s) => s.texto !== null);
}

export function paginaInfo(ruta: string): PaginaInfoDatos {
  return paginasInfo().find((p) => p.ruta === ruta)!;
}
