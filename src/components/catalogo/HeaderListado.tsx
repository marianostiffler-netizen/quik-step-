import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export default function HeaderListado({
  titulo,
  bajada,
  conteo,
}: {
  titulo: string;
  bajada: string;
  conteo: ReactNode;
}) {
  return (
    <section className="bg-pino pt-4 pb-10 md:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center text-sm text-nogal-suave">
          <Link href="/" className="tap inline-flex items-center hover:text-algarrobo">
            Inicio
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span className="tap inline-flex items-center px-1 text-nogal" aria-current="page">
            {titulo}
          </span>
        </nav>
        <h1 className="mt-2 font-display text-4xl font-bold text-nogal md:text-6xl">{titulo}</h1>
        <p className="mt-4 max-w-2xl text-lg text-nogal-suave">{bajada}</p>
        <p className="mt-4 font-semibold text-nogal tabular-nums">{conteo}</p>
      </div>
    </section>
  );
}
