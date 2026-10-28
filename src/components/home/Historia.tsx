import Link from "next/link";
import { negocio } from "@/config/negocio";

// Oculta si el cliente no cargó la historia.
export default function Historia() {
  if (!negocio.historia) return null;
  return (
    <section className="bg-superficie border-y border-veta py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-nogal">La historia de Don Antonio</h2>
        <p className="mt-4 text-lg text-nogal-suave">{negocio.historia}</p>
        <Link href="/nosotros" className="btn-secundario mt-8 inline-flex justify-center">
          Conocé más
        </Link>
      </div>
    </section>
  );
}
