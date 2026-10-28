import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Migas from "@/components/catalogo/Migas";
import { waLink } from "@/config/negocio";
import { esIndexable, paginaInfo, type PaginaInfoDatos } from "@/data/paginas-info";

// Metadata de una página informativa: sin ningún texto confirmado no se indexa.
export function metadataInfo(ruta: string): Metadata {
  const p = paginaInfo(ruta);
  return {
    title: `${p.titulo} | Maderera Don Antonio`,
    description: p.descripcion,
    ...(esIndexable(p) ? {} : { robots: { index: false } }),
  };
}

const AVISO = "Estamos preparando esta información. Mientras tanto, escribinos por WhatsApp y te respondemos.";

export default function PaginaInfo({ ruta }: { ruta: string }) {
  const { titulo, bajada, secciones }: PaginaInfoDatos = paginaInfo(ruta);
  const hayPendientes = secciones.some((s) => s.texto === null);

  return (
    <>
      <section className="bg-pino pt-4 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Migas migas={[{ label: "Inicio", href: "/" }, { label: titulo }]} />
          <h1 className="mt-2 font-display text-4xl font-bold text-nogal md:text-6xl">{titulo}</h1>
          {bajada && <p className="mt-4 max-w-2xl text-lg text-nogal-suave">{bajada}</p>}
        </div>
      </section>
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {secciones.map((s) => (
            <div key={s.titulo} className="mt-8">
              <h2 className="font-display text-2xl font-bold text-nogal">{s.titulo}</h2>
              {s.texto === null ? (
                <p className="mt-2 text-nogal-suave">{AVISO}</p>
              ) : (
                s.texto.split("\n\n").map((parrafo) => (
                  <p key={parrafo} className="mt-2 text-nogal-suave">
                    {parrafo}
                  </p>
                ))
              )}
            </div>
          ))}
          {hayPendientes && (
            <a
              href={waLink(`Hola! Quisiera consultar sobre: ${titulo.toLowerCase()}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-10 inline-flex justify-center"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Escribinos por WhatsApp
            </a>
          )}
        </div>
      </section>
    </>
  );
}
