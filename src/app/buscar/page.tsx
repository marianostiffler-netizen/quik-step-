import type { Metadata } from "next";
import Link from "next/link";
import { grupos, productosIndexados, buscarGrupo, buscarCategoria, type ProductoIndexado } from "@/data/catalogo";
import { formatearPrecio } from "@/lib/precios";
import Migas from "@/components/catalogo/Migas";

export const metadata: Metadata = {
  alternates: { canonical: "/buscar" },
  title: "Buscar productos | Maderera Don Antonio",
  robots: { index: false },
};

// Minúsculas y sin tildes para comparar
function normalizar(t: string): string {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function etiqueta(p: ProductoIndexado): string {
  const g = buscarGrupo(p.grupo)?.nombre ?? p.grupo;
  const c = buscarCategoria(p.grupo, p.categoria)?.nombre ?? p.categoria;
  return `${g} › ${c}`;
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  const consulta = (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
  const terminos = normalizar(consulta).split(/\s+/).filter(Boolean);

  const resultados = terminos.length
    ? productosIndexados()
        .map((p) => ({ p, texto: normalizar(`${p.nombre} ${etiqueta(p)}`) }))
        .filter(({ texto }) => terminos.every((t) => texto.includes(t)))
        .map(({ p }) => p)
    : [];

  return (
    <section className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Migas migas={[{ label: "Inicio", href: "/" }, { label: "Buscar" }]} />
        <h1 className="mt-2 font-display text-3xl font-bold text-nogal md:text-5xl">Buscar productos</h1>

        <form role="search" action="/buscar" method="get" className="mt-6 flex max-w-xl gap-2">
          <label htmlFor="buscar-q" className="sr-only">
            Buscar productos
          </label>
          <input
            id="buscar-q"
            name="q"
            type="search"
            defaultValue={consulta}
            placeholder="Ej.: machimbre, piso, espejo"
            className="min-h-11 flex-1 rounded-lg border border-veta bg-superficie px-4 text-nogal placeholder:text-nogal-suave focus-visible:outline-2 focus-visible:outline-algarrobo"
          />
          <button type="submit" className="btn-primario">
            Buscar
          </button>
        </form>

        {consulta ? (
          <p className="mt-6 font-semibold text-nogal tabular-nums" aria-live="polite">
            {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"} para &ldquo;{consulta}&rdquo;
          </p>
        ) : (
          <p className="mt-6 text-nogal-suave">Escribí el nombre de un producto o de una categoría.</p>
        )}

        {resultados.length > 0 && (
          <ul className="mt-4 divide-y divide-veta tarjeta">
            {resultados.map((p) => (
              <li key={`${p.grupo}-${p.id}`}>
                <Link
                  href={p.href}
                  className="flex min-h-11 flex-col gap-1 p-4 hover:bg-pino focus-visible:outline-2 focus-visible:outline-algarrobo sm:flex-row sm:items-center sm:justify-between"
                >
                  <span>
                    <span className="block font-semibold text-nogal">{p.nombre}</span>
                    <span className="block text-sm text-nogal-suave">{etiqueta(p)}</span>
                  </span>
                  {p.precio && (
                    <span className="font-bold text-precio tabular-nums">
                      {formatearPrecio(p.precio.valor, p.precio.moneda)}
                      {p.precio.unidad && (
                        <span className="text-xs font-medium text-nogal-suave">
                          {p.precio.unidad === "c/u" ? ` ${p.precio.unidad}` : `/${p.precio.unidad}`}
                        </span>
                      )}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {consulta && resultados.length === 0 && (
          <div className="mt-4">
            <p className="text-nogal-suave">No encontramos productos con esa búsqueda. Probá con otra palabra o recorré el catálogo:</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {grupos.map((g) => (
                <li key={g.slug}>
                  <Link href={g.href} className="btn-secundario">
                    {g.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
