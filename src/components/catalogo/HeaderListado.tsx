import type { ReactNode } from "react";
import Migas, { type Miga } from "./Migas";

export type { Miga };

export default function HeaderListado({
  titulo,
  bajada,
  conteo,
  migas,
}: {
  titulo: string;
  bajada: string;
  conteo: ReactNode;
  /** Inicio › … › actual. La última es la página actual (sin link). */
  migas: Miga[];
}) {
  return (
    <section className="bg-pino pt-4 pb-10 md:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Migas migas={migas} />
        <h1 className="mt-2 font-display text-4xl font-bold text-nogal md:text-6xl">{titulo}</h1>
        <p className="mt-4 max-w-2xl text-lg text-nogal-suave">{bajada}</p>
        <p className="mt-4 font-semibold text-nogal tabular-nums">{conteo}</p>
      </div>
    </section>
  );
}
