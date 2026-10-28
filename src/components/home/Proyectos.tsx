import Link from "next/link";
import { proyectos } from "@/data/proyectos";

export default function Proyectos() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Comprá por proyecto</h2>
        <p className="mt-3 text-nogal-suave">Contanos para qué es y te mostramos las medidas habituales.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proyectos.map(({ titulo, href, medidas, Icono }) => (
            <Link
              key={titulo}
              href={href}
              className="tarjeta p-5 block min-h-11 transition hover:border-algarrobo hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pino text-algarrobo">
                <Icono size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-nogal">{titulo}</h3>
              <p className="mt-1 text-sm text-nogal-suave">{medidas}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
