import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Phone, MapPin, Mail, MessageCircle, Clock } from "lucide-react";
import { site } from "@/data/site-data";
import { grupos } from "@/data/catalogo";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

const ayuda = [
  { label: "Cómo comprar", href: "/como-comprar" },
  { label: "Envíos y retiro", href: "/envios-y-retiro" },
  { label: "Medios de pago", href: "/medios-de-pago" },
  { label: "Cambios y devoluciones", href: "/cambios-y-devoluciones" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Botón de arrepentimiento", href: "/boton-de-arrepentimiento" },
];

const empresa = [
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
  { label: "Nosotros", href: "/nosotros" },
];

const linkClase =
  "inline-flex min-h-11 items-center text-veta hover:text-[#E8B98A] text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#E8B98A]";

function Titulo({ children }: { children: ReactNode }) {
  return <h2 className="font-display font-semibold text-sm uppercase tracking-wider mb-3 text-[#E8B98A]">{children}</h2>;
}

export function Footer() {
  const { calle, localidad, provincia } = negocio.direccion;
  const contacto: { key: string; icono: ReactNode; contenido: ReactNode }[] = [
    {
      key: "wa",
      icono: <MessageCircle size={14} className="text-[#E8B98A] shrink-0" aria-hidden="true" />,
      contenido: (
        <a href={waLink("Hola! Quisiera hacer una consulta.")} target="_blank" rel="noopener noreferrer" className={linkClase}>
          Escribinos por WhatsApp
        </a>
      ),
    },
  ];
  if (negocio.telefono)
    contacto.push({
      key: "tel",
      icono: <Phone size={14} className="text-[#E8B98A] shrink-0" aria-hidden="true" />,
      contenido: (
        <a href={`tel:${negocio.telefono}`} className={linkClase}>
          {negocio.telefono}
        </a>
      ),
    });
  if (negocio.email)
    contacto.push({
      key: "mail",
      icono: <Mail size={14} className="text-[#E8B98A] shrink-0" aria-hidden="true" />,
      contenido: (
        <a href={`mailto:${negocio.email}`} className={`${linkClase} break-all`}>
          {negocio.email}
        </a>
      ),
    });
  if (calle)
    contacto.push({
      key: "dir",
      icono: <MapPin size={14} className="text-[#E8B98A] shrink-0" aria-hidden="true" />,
      contenido: <span className="py-2">{direccionCorta()}, Argentina</span>,
    });
  if (negocio.horarios?.length)
    contacto.push({
      key: "hor",
      icono: <Clock size={14} className="text-[#E8B98A] shrink-0" aria-hidden="true" />,
      contenido: (
        <span className="py-2">
          {negocio.horarios.map((h) => (
            <span key={h.dias} className="block">
              {h.dias}: {h.horas}
            </span>
          ))}
        </span>
      ),
    });

  return (
    <footer className="bg-nogal text-pino">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Catálogo: los 4 grupos con sus categorías */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {grupos.map((g) => (
            <div key={g.slug}>
              <Titulo>{g.nombre}</Titulo>
              <ul>
                {g.categorias.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className={linkClase}>
                      {c.nombre}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={g.href} className={`${linkClase} underline underline-offset-4`}>
                    Ver todo
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-nogal-suave pt-10 md:grid-cols-3">
          {/* Marca + links del sitio */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo-maderera.webp" alt="Maderera Don Antonio Logo" width={24} height={24} className="rounded" />
              <div className="leading-tight">
                <span className="block font-display text-pino font-bold text-sm">MADERERA</span>
                <span className="block font-display text-[#E8B98A] text-xs font-semibold">DON ANTONIO</span>
              </div>
            </div>
            <p className="text-veta text-sm leading-relaxed">{site.description}</p>
            <ul className="mt-3">
              {empresa.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClase}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <Titulo>Ayuda</Titulo>
            <ul>
              {ayuda.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClase}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <Titulo>Contacto</Titulo>
            <ul className="space-y-1 text-veta text-sm">
              {contacto.map((c) => (
                <li key={c.key} className="flex items-center gap-2">
                  {c.icono}
                  {c.contenido}
                </li>
              ))}
            </ul>
            {negocio.mapaUrl && (
              <iframe
                src={negocio.mapaUrl}
                title={`Mapa de ubicación de ${negocio.nombre} en ${localidad}, ${provincia}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="mt-4 aspect-[4/3] w-full rounded-card border-0"
              />
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nogal-suave text-center text-veta text-xs">
          &copy; {new Date().getFullYear()} Maderera Don Antonio. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
