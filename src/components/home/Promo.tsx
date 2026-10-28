import Link from "next/link";
import { promo } from "@/config/promo";

// Promo configurable: sin datos en src/config/promo.ts no se renderiza.
export default function Promo() {
  if (!promo) return null;
  return (
    <section className="pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="tarjeta border-algarrobo p-8 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-nogal">{promo.titulo}</h2>
          <p className="mt-3 max-w-2xl text-nogal-suave">{promo.texto}</p>
          {promo.href && (
            <Link href={promo.href} className="btn-primario mt-6 inline-flex justify-center">
              {promo.cta ?? "Ver más"}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
