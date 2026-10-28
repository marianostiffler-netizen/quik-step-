import { grupos } from "@/data/catalogo";
import { GrillaCategorias } from "@/components/catalogo/TarjetaCategoria";

export default function Grupos() {
  return (
    <section id="catalogo" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Comprá por categoría</h2>
        <p className="mt-3 text-nogal-suave">Elegí el rubro y consultá medidas, precios y disponibilidad.</p>
        <div className="mt-10">
          <GrillaCategorias items={grupos} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6" />
        </div>
      </div>
    </section>
  );
}
