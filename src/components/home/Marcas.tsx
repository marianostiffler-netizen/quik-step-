import { negocio } from "@/config/negocio";

// Oculta si el cliente no confirmó las marcas.
export default function Marcas() {
  const marcas = negocio.marcas;
  if (!marcas?.length) return null;
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Marcas con las que trabajamos</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {marcas.map((m) => (
            <li key={m} className="tarjeta px-5 py-3 font-semibold text-nogal">
              {m}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
