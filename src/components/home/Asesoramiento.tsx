import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/config/negocio";

export default function Asesoramiento() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-card bg-nogal text-pino p-8 md:p-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">¿No sabés qué necesitás? Te asesoramos</h2>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            Contanos qué querés hacer —un techo, un deck, un mueble— y te ayudamos a elegir materiales y medidas.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={waLink("Hola! Necesito asesoramiento para un proyecto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Contanos tu proyecto
            </a>
            <Link href="/contacto" className="inline-flex min-h-11 items-center justify-center text-pino underline underline-offset-4">
              o escribinos desde el formulario
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
