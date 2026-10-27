import type { ReactNode } from "react";
import { MapPin, Clock, Phone, MessageCircle, Mail } from "lucide-react";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

function Fila({ icono, titulo, children }: { icono: ReactNode; titulo: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pino text-algarrobo">{icono}</span>
      <div className="min-w-0">
        <p className="font-semibold text-nogal">{titulo}</p>
        <div className="text-nogal-suave break-words">{children}</div>
      </div>
    </li>
  );
}

export default function DondeEstamos() {
  const { calle, localidad, provincia } = negocio.direccion;
  // TODO(cliente): el mapa aparece cuando se cargue negocio.direccion.calle
  const mapaSrc = calle
    ? `https://www.google.com/maps?q=${encodeURIComponent(`${calle}, ${localidad}, ${provincia}, Argentina`)}&output=embed`
    : null;

  return (
    <section className="bg-superficie border-t border-veta py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Dónde estamos</h2>
        <p className="mt-3 text-nogal-suave">Escribinos por WhatsApp y te respondemos.</p>
        <div className={`mt-10 grid gap-10 items-center ${mapaSrc ? "md:grid-cols-2" : "max-w-xl"}`}>
          <ul className="space-y-6">
            <Fila icono={<MapPin size={22} aria-hidden="true" />} titulo="Dirección">
              {direccionCorta()}, Argentina
            </Fila>
            {negocio.horarios && (
              <Fila icono={<Clock size={22} aria-hidden="true" />} titulo="Horarios">
                {negocio.horarios.map((h) => (
                  <p key={h.dias}>{h.dias}: {h.horas}</p>
                ))}
              </Fila>
            )}
            {negocio.telefono && (
              <Fila icono={<Phone size={22} aria-hidden="true" />} titulo="Teléfono">
                <a href={`tel:${negocio.telefono}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{negocio.telefono}</a>
              </Fila>
            )}
            <Fila icono={<MessageCircle size={22} aria-hidden="true" />} titulo="WhatsApp">
              <a
                href={waLink("Hola! Quisiera hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center underline underline-offset-4"
              >
                Escribinos por WhatsApp
              </a>
            </Fila>
            {negocio.email && (
              <Fila icono={<Mail size={22} aria-hidden="true" />} titulo="Email">
                <a href={`mailto:${negocio.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{negocio.email}</a>
              </Fila>
            )}
          </ul>
          {mapaSrc && (
            <iframe
              src={mapaSrc}
              title="Mapa de ubicación"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full aspect-[4/3] rounded-card border-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
