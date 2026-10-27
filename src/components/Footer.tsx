import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, MessageCircle, Clock } from "lucide-react";
import { site, navigation } from "@/data/site-data";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

export function Footer() {
  return (
    <footer className="bg-wood-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-maderera.webp"
                alt="Maderera Don Antonio Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <div className="leading-tight">
                <span className="block text-white font-bold text-sm">MADERERA</span>
                <span className="block text-amber-500 text-xs font-semibold">DON ANTONIO</span>
              </div>
            </div>
            <p className="text-wood-300 text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-500">
              Secciones
            </h3>
            <ul className="space-y-0">
              {navigation.filter(n => n.id !== "inicio").map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-wood-300 hover:text-amber-500 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-500">
              Servicios
            </h3>
            <ul className="space-y-2 text-wood-300 text-sm">
              <li>Cepillado de madera</li>
              {/* TODO(cliente): confirmar si hacen cortes a medida antes de volver a mencionarlo */}
              <li>Lijado profesional</li>
              <li>Pisos flotantes Quick-Step</li>
              <li>Cielorrasos</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-amber-500">
              Contacto
            </h3>
            <ul className="space-y-3 text-wood-300 text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-amber-500 shrink-0" />
                <a
                  href={waLink("Hola! Quisiera hacer una consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-amber-500 transition-colors"
                >
                  Escribinos por WhatsApp
                </a>
              </li>
              {negocio.telefono && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-amber-500 shrink-0" />
                  {negocio.telefono}
                </li>
              )}
              {negocio.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-amber-500 shrink-0" />
                  {negocio.email}
                </li>
              )}
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                {direccionCorta()}, Argentina
              </li>
              {negocio.horarios && (
                <li className="flex items-start gap-2">
                  <Clock size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    {negocio.horarios.map((h) => (
                      <span key={h.dias} className="block">
                        {h.dias}: {h.horas}
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
            <Link
              href="/contacto"
              className="inline-flex min-h-11 items-center mt-4 px-5 bg-amber-500 text-wood-800 text-sm font-bold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-wood-700 text-center text-wood-400 text-xs">
          &copy; {new Date().getFullYear()} Maderera Don Antonio. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}
