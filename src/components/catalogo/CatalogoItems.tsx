"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useDialogA11y } from "@/components/useDialogA11y";
import ItemCard from "./ItemCard";
import { ETIQUETA_ORDEN, type GrupoFiltro, type ItemCatalogo, type Orden, type Seleccion } from "./tipos";

type Props = {
  items: ItemCatalogo[];
  /** Filtros disponibles (derivados de los datos). Vacío = sin filtros. */
  grupos?: GrupoFiltro[];
  /** Opciones de orden; la primera es la inicial. */
  ordenes: Orden[];
  /** [singular, plural] para el conteo, ej. ["modelo", "modelos"]. */
  unidades: [string, string];
  /** Selección inicial de filtros (ej. desde la query string). */
  seleccionInicial?: Seleccion;
  /** Permite ampliar la imagen en un diálogo accesible. */
  ampliable?: boolean;
  /** Tarjetas más angostas (muestrarios). */
  compacto?: boolean;
  /** Prefijo para ids de controles (único por listado). */
  id: string;
};

function Filtros({
  grupos,
  sel,
  onToggle,
  prefix,
}: {
  grupos: GrupoFiltro[];
  sel: Seleccion;
  onToggle: (k: string, v: string) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-6">
      {grupos.map((g) => (
        <fieldset key={g.key}>
          <legend className="font-display text-sm font-bold text-nogal">{g.titulo}</legend>
          <div className="mt-2 space-y-1">
            {g.opciones.map((o) => {
              const id = `${prefix}-${g.key}-${o.value}`;
              return (
                <label key={id} htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-nogal">
                  <input
                    id={id}
                    type="checkbox"
                    checked={(sel[g.key] ?? []).includes(o.value)}
                    onChange={() => onToggle(g.key, o.value)}
                    className="h-5 w-5 accent-algarrobo"
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default function CatalogoItems({
  items,
  grupos = [],
  ordenes,
  unidades,
  seleccionInicial,
  ampliable = false,
  compacto = false,
  id,
}: Props) {
  const [sel, setSel] = useState<Seleccion>(seleccionInicial ?? {});
  const [sort, setSort] = useState<Orden>(ordenes[0]);
  const [abierto, setAbierto] = useState(false);
  const [ampliado, setAmpliado] = useState<ItemCatalogo | null>(null);
  const panelRef = useDialogA11y(abierto, () => setAbierto(false));
  const ampliadoRef = useDialogA11y(ampliado !== null, () => setAmpliado(null));

  const hayFiltros = grupos.length > 0;

  const resultado = useMemo(() => {
    const filtrados = items.filter((it) =>
      grupos.every((g) => {
        const elegidos = sel[g.key] ?? [];
        if (elegidos.length === 0) return true;
        const propios = it.valores?.[g.key] ?? [];
        return propios.some((v) => elegidos.includes(v));
      })
    );
    const nombre = (it: ItemCatalogo) => it.claveNombre ?? it.nombre;
    const cmpNombre = (a: ItemCatalogo, b: ItemCatalogo) =>
      nombre(a).localeCompare(nombre(b), "es", { numeric: true });
    return filtrados.sort((a, b) => {
      if (sort === "nombre-asc") return cmpNombre(a, b);
      if (sort === "nombre-desc") return cmpNombre(b, a);
      const pa = a.precio?.valor ?? null;
      const pb = b.precio?.valor ?? null;
      if (pa === null && pb === null) return cmpNombre(a, b);
      if (pa === null) return 1;
      if (pb === null) return -1;
      if (pa === pb) return cmpNombre(a, b);
      return sort === "precio-asc" ? pa - pb : pb - pa;
    });
  }, [items, grupos, sel, sort]);

  const toggle = (k: string, v: string) =>
    setSel((s) => {
      const actual = s[k] ?? [];
      return { ...s, [k]: actual.includes(v) ? actual.filter((x) => x !== v) : [...actual, v] };
    });
  const limpiar = () => setSel({});

  const activos = grupos.flatMap((g) =>
    (sel[g.key] ?? []).map((v) => ({
      g,
      v,
      label: g.opciones.find((o) => o.value === v)?.label ?? v,
    }))
  );

  const grilla = compacto
    ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4"
    : hayFiltros
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  const ordenId = `orden-${id}`;

  return (
    <div className={hayFiltros ? "lg:grid lg:grid-cols-[260px_1fr] lg:gap-10" : ""}>
      {hayFiltros && (
        <aside className="hidden lg:block">
          <div className="tarjeta sticky top-24 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-nogal">Filtros</h2>
              {activos.length > 0 && (
                <button type="button" onClick={limpiar} className="tap text-sm font-semibold text-algarrobo hover:underline">
                  Limpiar
                </button>
              )}
            </div>
            <Filtros grupos={grupos} sel={sel} onToggle={toggle} prefix={`${id}-d`} />
          </div>
        </aside>
      )}

      <div>
        <div className="flex flex-wrap items-center gap-3">
          {hayFiltros && (
            <button type="button" onClick={() => setAbierto(true)} className="btn-secundario lg:hidden" aria-haspopup="dialog">
              <SlidersHorizontal size={18} aria-hidden="true" />
              Filtros{activos.length > 0 ? ` (${activos.length} activos)` : ""}
            </button>
          )}
          <p className="text-sm font-semibold text-nogal tabular-nums" aria-live="polite">
            {resultado.length} {resultado.length === 1 ? unidades[0] : unidades[1]}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor={ordenId} className="text-sm text-nogal-suave">
              Ordenar
            </label>
            <select
              id={ordenId}
              value={sort}
              onChange={(e) => setSort(e.target.value as Orden)}
              className="min-h-11 rounded-campo border border-veta bg-superficie px-3 text-sm text-nogal"
            >
              {ordenes.map((o) => (
                <option key={o} value={o}>
                  {ETIQUETA_ORDEN[o]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {activos.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activos.map((a) => (
              <button
                key={`${a.g.key}-${a.v}`}
                type="button"
                onClick={() => toggle(a.g.key, a.v)}
                aria-label={`Quitar filtro ${a.g.titulo}: ${a.label}`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-veta bg-superficie px-3.5 text-sm text-nogal hover:border-algarrobo"
              >
                {a.label}
                <X size={14} aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={limpiar} className="tap text-sm font-semibold text-algarrobo hover:underline">
              Limpiar filtros
            </button>
          </div>
        )}

        {resultado.length === 0 ? (
          <div className="tarjeta mt-6 p-8 text-center">
            <p className="text-nogal">No hay {unidades[1]} con esos filtros.</p>
            <button type="button" onClick={limpiar} className="btn-secundario mt-4">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className={`mt-6 grid gap-4 md:gap-6 ${grilla}`}>
            {resultado.map((it) => (
              <ItemCard key={it.id} item={it} onAmpliar={ampliable && it.imagen ? () => setAmpliado(it) : undefined} />
            ))}
          </div>
        )}
      </div>

      {hayFiltros && abierto && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          className="fixed inset-0 z-50 flex flex-col bg-superficie lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-veta px-4 py-2">
            <h2 className="font-display text-lg font-bold text-nogal">Filtros</h2>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar filtros" className="tap flex items-center justify-center text-nogal">
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <Filtros grupos={grupos} sel={sel} onToggle={toggle} prefix={`${id}-m`} />
          </div>
          <div className="flex gap-3 border-t border-veta p-4">
            <button type="button" onClick={limpiar} className="btn-secundario">
              Limpiar
            </button>
            <button type="button" onClick={() => setAbierto(false)} className="btn-primario flex-1">
              Ver {resultado.length} {resultado.length === 1 ? "resultado" : "resultados"}
            </button>
          </div>
        </div>
      )}

      {ampliado?.imagen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-nogal/80 p-4" onClick={() => setAmpliado(null)}>
          <div
            ref={ampliadoRef}
            role="dialog"
            aria-modal="true"
            aria-label={ampliado.nombre}
            className="relative w-full max-w-3xl overflow-hidden rounded-card bg-superficie shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setAmpliado(null)}
              className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-superficie/90 text-nogal shadow"
            >
              <X size={22} aria-hidden="true" />
            </button>
            <div className="relative aspect-[4/3] bg-pino">
              <Image src={ampliado.imagen.src} alt={ampliado.imagen.alt} fill sizes="(min-width: 768px) 768px, 100vw" className="object-contain" />
            </div>
            <div className="p-5">
              <h2 className="font-display text-xl font-bold text-nogal">{ampliado.nombre}</h2>
              {ampliado.descripcion && <p className="mt-1 text-nogal-suave">{ampliado.descripcion}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
