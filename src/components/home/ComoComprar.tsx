import Link from "next/link";

const pasos = [
  { n: "1", titulo: "Elegí", texto: "Recorré el catálogo con medidas y precios de referencia." },
  { n: "2", titulo: "Consultá", texto: "Escribinos por WhatsApp con lo que necesitás y te confirmamos precio y disponibilidad." },
  { n: "3", titulo: "Cerrá tu pedido", texto: "Coordinamos con vos la forma de pago y de entrega." },
];

export default function ComoComprar() {
  return (
    <section className="bg-superficie border-y border-veta py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">Cómo comprar en 3 pasos</h2>
        <p className="mt-3 text-nogal-suave">Simple y sin vueltas.</p>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {pasos.map((p) => (
            <li key={p.n}>
              <span className="font-display text-6xl font-extrabold text-algarrobo" aria-hidden="true">{p.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold text-nogal">{p.titulo}</h3>
              <p className="mt-2 text-nogal-suave">{p.texto}</p>
            </li>
          ))}
        </ol>
        <Link href="/como-comprar" className="btn-secundario mt-10 inline-flex justify-center">
          Ver cómo comprar
        </Link>
      </div>
    </section>
  );
}
