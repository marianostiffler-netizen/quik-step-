import Link from "next/link";
import { Home, Trees, Layers, Construction, Sofa, type LucideIcon } from "lucide-react";

const usos: { titulo: string; href: string; medidas: string; Icono: LucideIcon }[] = [
  { titulo: "Techos", href: "/construccion-y-maderas?uso=techos", medidas: "Tirantes 2\"×4\" y 2\"×5\", machimbre ½\"×4\" y aislantes", Icono: Home },
  { titulo: "Decks y pérgolas", href: "/construccion-y-maderas?uso=decks", medidas: "Eucalipto grandis 3\"×8\" y 4\"×10\", hasta 12 m", Icono: Trees },
  { titulo: "Entrepisos", href: "/construccion-y-maderas?uso=entrepisos", medidas: "Tirantes 2\"×6\" y machimbre 1\"×6\"", Icono: Layers },
  { titulo: "Encofrado", href: "/construccion-y-maderas?uso=encofrado", medidas: "Tablas 1\"×6\" y 1\"×8\" × 4 m", Icono: Construction },
  { titulo: "Interiores", href: "/pisos-flotantes", medidas: "Pisos flotantes, melaminas y espejos", Icono: Sofa },
];

export default function Usos() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Comprá por uso</h2>
        <p className="mt-3 text-nogal-suave">Contanos para qué es y te mostramos las medidas habituales.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {usos.map(({ titulo, href, medidas, Icono }) => (
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
