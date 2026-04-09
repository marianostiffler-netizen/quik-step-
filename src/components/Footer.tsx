import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { site, navigation } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-wood-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-maderera.jpg"
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
            <ul className="space-y-2">
              {navigation.filter(n => n.id !== "inicio").map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-wood-300 hover:text-amber-500 text-sm transition-colors"
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
              <li>Cortes a medida</li>
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
                <Phone size={14} className="text-amber-500 shrink-0" />
                Consultanos sin compromiso
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-amber-500 shrink-0" />
                Escribinos por email
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-500 shrink-0 mt-0.5" />
                Buenos Aires, Argentina
              </li>
            </ul>
            <Link
              href="/contacto"
              className="inline-block mt-4 px-5 py-2 bg-amber-500 text-wood-800 text-sm font-bold rounded-lg hover:bg-amber-400 transition-colors"
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
