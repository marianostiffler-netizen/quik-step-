import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { negocio, waLink } from "@/config/negocio";

export default function Hero() {
  return (
    <section className="bg-pino py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 md:grid-cols-2 md:gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-algarrobo">
            Maderera en {negocio.direccion.localidad}, {negocio.direccion.provincia}
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-nogal">
            Madera y materiales para tu obra y tu casa
          </h1>
          <p className="mt-6 text-lg text-nogal-suave">
            Maderas de construcción, pisos flotantes, melaminas y espejos. Consultá precios y disponibilidad por WhatsApp y te asesoramos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink("Hola! Quisiera hacer una consulta sobre sus productos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Consultar por WhatsApp
            </a>
            <a href="#categorias" className="btn-secundario justify-center">
              Ver productos
            </a>
          </div>
        </div>
        <Image
          src="/products/ambientes/Vision-1462-01.webp"
          alt="Piso flotante de madera en una cocina"
          width={1517}
          height={950}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full rounded-card aspect-[4/3] object-cover"
        />
      </div>
    </section>
  );
}
