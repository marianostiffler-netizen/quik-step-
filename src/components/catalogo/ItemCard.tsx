import Image from "next/image";
import Link from "next/link";
import { Maximize2, MessageCircle } from "lucide-react";
import { waLink } from "@/config/negocio";
import PrecioItem from "./PrecioItem";
import type { ItemCatalogo, Silueta } from "./tipos";

const FORMA: Record<Silueta, string> = {
  horizontal: "h-12 w-16 rounded-md",
  vertical: "h-16 w-12 rounded-md",
  cuadrado: "h-14 w-14 rounded-md",
  ovalado: "h-16 w-12 rounded-[50%]",
  circular: "h-14 w-14 rounded-full",
};

export default function ItemCard({ item, onAmpliar }: { item: ItemCatalogo; onAmpliar?: () => void }) {
  const consulta = item.nombreConsulta ?? item.nombre;
  const precio = item.precio;
  const mensaje = precio
    ? `Hola! Quisiera consultar por: ${consulta}.`
    : `Hola! Quisiera consultar el precio de: ${consulta}.`;

  const proporcion = item.aspecto === "cuadrado" ? "aspect-square" : "aspect-[4/3]";
  const imagen = item.imagen && (
    <Image
      src={item.imagen.src}
      alt={item.imagen.alt}
      fill
      sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
      className="object-cover"
    />
  );

  return (
    <article id={item.id} className="tarjeta flex scroll-mt-24 flex-col overflow-hidden">
      {item.imagen ? (
        <div className="relative bg-pino">
          {item.href ? (
            <Link
              href={item.href}
              aria-label={`Ver detalle: ${item.nombre}`}
              className={`relative block focus-visible:outline-2 focus-visible:outline-algarrobo ${proporcion}`}
            >
              {imagen}
            </Link>
          ) : (
            <div className={`relative ${proporcion}`}>{imagen}</div>
          )}
          {onAmpliar && (
            <button
              type="button"
              onClick={onAmpliar}
              aria-haspopup="dialog"
              aria-label={`Ampliar imagen: ${item.nombre}`}
              className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-superficie/90 text-nogal shadow hover:bg-superficie focus-visible:outline-2 focus-visible:outline-algarrobo"
            >
              <Maximize2 size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      ) : item.bloque ? (
        <div className="flex min-h-36 flex-col items-center justify-center gap-2 bg-pino p-4 text-center">
          {item.bloque.silueta && (
            <span
              aria-hidden="true"
              className={`block border-2 border-algarrobo/50 bg-superficie ${FORMA[item.bloque.silueta]}`}
            />
          )}
          <p className="font-display text-3xl font-bold text-nogal tabular-nums">{item.bloque.grande}</p>
          {item.bloque.chico && <p className="text-sm text-nogal-suave tabular-nums">{item.bloque.chico}</p>}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-4">
        {item.eyebrow && <p className="text-xs font-semibold uppercase tracking-wide text-algarrobo">{item.eyebrow}</p>}
        <h3 className="mt-0.5 font-display text-lg font-bold text-nogal">
          {item.href ? (
            <Link href={item.href} className="hover:underline focus-visible:outline-2 focus-visible:outline-algarrobo">
              {item.nombre}
            </Link>
          ) : (
            item.nombre
          )}
        </h3>
        {item.descripcion && <p className="mt-1 text-sm text-nogal-suave">{item.descripcion}</p>}
        {item.chips && item.chips.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {item.chips.map((c) => (
              <li key={c} className="rounded-full bg-pino px-2.5 py-1 text-xs text-nogal-suave">
                {c}
              </li>
            ))}
          </ul>
        )}
        {item.detalles?.map((d) => (
          <p key={d} className="mt-2 text-xs text-nogal-suave tabular-nums">
            {d}
          </p>
        ))}

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <PrecioItem precio={precio} nota={item.nota} />
          {item.href ? (
            <Link href={item.href} className="btn-secundario w-full px-3!">
              Ver detalle
              <span className="sr-only">: {item.nombre}</span>
            </Link>
          ) : (
            <a
              href={waLink(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${precio ? "Consultar por WhatsApp" : "Consultar"}: ${item.nombre}`}
              className="btn-whatsapp w-full px-3!"
            >
              <MessageCircle size={18} aria-hidden="true" />
              {precio ? "Consultar por WhatsApp" : "Consultar"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
