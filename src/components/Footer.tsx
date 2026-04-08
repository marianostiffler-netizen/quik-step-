import Link from "next/link";
import { site } from "@/data/site-data";

export function Footer() {
  return (
    <footer className="bg-qs-blue text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="font-bold text-xl mb-3">
              <span className="text-qs-red italic">{"//"}</span> QUICK·STEP
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos"
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/tecnologia"
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  Tecnología
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contacto
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              ¿Tenés consultas sobre nuestros pisos?
              <br />
              Escribinos y te asesoramos.
            </p>
            <Link
              href="/contacto"
              className="inline-block mt-4 px-5 py-2 bg-white text-qs-blue text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-800 text-center text-blue-300 text-xs">
          &copy; {new Date().getFullYear()} Quick-Step. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
