import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, MessageCircle, Clock } from "lucide-react";
import { site, navigation } from "@/data/site-data";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

export function Footer() {
  return (
    <footer className="bg-nogal text-pino">
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
                <span className="block font-display text-pino font-bold text-sm">MADERERA</span>
                <span className="block font-display text-[#E8B98A] text-xs font-semibold">DON ANTONIO</span>
              </div>
            </div>
            <p className="text-veta text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#E8B98A]">
              Secciones
            </h3>
            <ul className="space-y-0">
              {navigation.filter(n => n.id !== "inicio").map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-veta hover:text-[#E8B98A] text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#E8B98A]">
              Servicios
            </h3>
            <ul className="space-y-2 text-veta text-sm">
              <li>Cepillado de madera</li>
              {/* TODO(cliente): confirmar si hacen cortes a medida antes de volver a mencionarlo */}
              <li>Lijado profesional</li>
              <li>Pisos flotantes Quick-Step</li>
              <li>Cielorrasos</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-[#E8B98A]">
              Contacto
            </h3>
            <ul className="space-y-3 text-veta text-sm">
              <li className="flex items-center gap-2">
                <MessageCircle size={14} className="text-[#E8B98A] shrink-0" />
                <a
                  href={waLink("Hola! Quisiera hacer una consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center hover:text-[#E8B98A] transition-colors"
                >
                  Escribinos por WhatsApp
                </a>
              </li>
              {negocio.telefono && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-[#E8B98A] shrink-0" />
                  {negocio.telefono}
                </li>
              )}
              {negocio.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-[#E8B98A] shrink-0" />
                  {negocio.email}
                </li>
              )}
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#E8B98A] shrink-0 mt-0.5" />
                {direccionCorta()}, Argentina
              </li>
              {negocio.horarios && (
                <li className="flex items-start gap-2">
                  <Clock size={14} className="text-[#E8B98A] shrink-0 mt-0.5" />
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
              className="btn-primario mt-4 text-sm"
            >
              Contactanos
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-nogal-suave text-center text-veta text-xs">
          &copy; {new Date().getFullYear()} Maderera Don Antonio. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}
