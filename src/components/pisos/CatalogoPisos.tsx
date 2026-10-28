"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category, Product, Tone } from "@/data/site-data";
import { useDialogA11y } from "@/components/useDialogA11y";
import ItemCard from "@/components/catalogo/ItemCard";
import { itemPiso } from "@/data/items";

type Sort = "precio-asc" | "precio-desc" | "nombre";
type Key = "linea" | "espesor" | "transito" | "agua" | "tono";
type Sel = Record<Key, string[]>;

const VACIO: Sel = { linea: [], espesor: [], transito: [], agua: [], tono: [] };
const TONOS: { value: Tone; label: string }[] = [
  { value: "claro", label: "Claros" },
  { value: "intermedio", label: "Intermedios" },
  { value: "oscuro", label: "Oscuros" },
  { value: "grisaceo", label: "Grisáceos" },
];
const TITULOS: Record<Key, string> = {
  linea: "Línea",
  espesor: "Espesor",
  transito: "Tránsito",
  agua: "Resistencia al agua",
  tono: "Tono",
};

const transitoDe = (p: Product) => p.rating.split(" ")[0];
const precioDe = (p: Product) => (p.price_usd_m2 && p.price_usd_m2 > 0 ? p.price_usd_m2 : null);

function valoresDe(p: Product): Record<Key, string | null> {
  return {
    linea: p.category_id,
    espesor: String(p.dimensions.thickness),
    transito: transitoDe(p),
    agua: p.water_resistance_hours ? String(p.water_resistance_hours) : null,
    tono: p.tone ?? null,
  };
}

function Filtros({
  grupos,
  sel,
  onToggle,
  prefix,
}: {
  grupos: { key: Key; opciones: { value: string; label: string }[] }[];
  sel: Sel;
  onToggle: (k: Key, v: string) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-6">
      {grupos.map((g) => (
        <fieldset key={g.key}>
          <legend className="font-display text-sm font-bold text-nogal">{TITULOS[g.key]}</legend>
          <div className="mt-2 space-y-1">
            {g.opciones.map((o) => {
              const id = `${prefix}-${g.key}-${o.value}`;
              return (
                <label key={id} htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-nogal">
                  <input
                    id={id}
                    type="checkbox"
                    checked={sel[g.key].includes(o.value)}
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

export default function CatalogoPisos({ products, categories }: { products: Product[]; categories: Category[] }) {
  const [sel, setSel] = useState<Sel>(VACIO);
  const [sort, setSort] = useState<Sort>("precio-asc");
  const [abierto, setAbierto] = useState(false);
  const panelRef = useDialogA11y(abierto, () => setAbierto(false));

  const lineas = useMemo(() => [...categories].sort((a, b) => a.sort_order - b.sort_order), [categories]);
  const nombreLinea = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), [categories]);

  const grupos = useMemo(() => {
    const nums = (vals: (string | null)[]) =>
      [...new Set(vals.filter((v): v is string => v !== null))].sort((a, b) => Number(a) - Number(b));
    const vs = products.map(valoresDe);
    return [
      { key: "linea" as Key, opciones: lineas.map((c) => ({ value: c.id, label: c.name })) },
      { key: "espesor" as Key, opciones: nums(vs.map((v) => v.espesor)).map((v) => ({ value: v, label: `${v} mm` })) },
      {
        key: "transito" as Key,
        opciones: [...new Set(vs.map((v) => v.transito!))].sort().map((v) => ({ value: v, label: v })),
      },
      { key: "agua" as Key, opciones: nums(vs.map((v) => v.agua)).map((v) => ({ value: v, label: `${v} h` })) },
      {
        key: "tono" as Key,
        opciones: TONOS.filter((t) => vs.some((v) => v.tono === t.value)).map((t) => ({ value: t.value, label: t.label })),
      },
    ].filter((g) => g.opciones.length > 0);
  }, [products, lineas]);

  const resultado = useMemo(() => {
    const filtrados = products.filter((p) => {
      const v = valoresDe(p);
      return (Object.keys(sel) as Key[]).every((k) => sel[k].length === 0 || (v[k] !== null && sel[k].includes(v[k]!)));
    });
    return filtrados.sort((a, b) => {
      if (sort === "nombre") return a.name.localeCompare(b.name, "es");
      const pa = precioDe(a);
      const pb = precioDe(b);
      if (pa === null && pb === null) return 0;
      if (pa === null) return 1;
      if (pb === null) return -1;
      return sort === "precio-asc" ? pa - pb : pb - pa;
    });
  }, [products, sel, sort]);

  const toggle = (k: Key, v: string) =>
    setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const limpiar = () => setSel(VACIO);

  const activos = (Object.keys(sel) as Key[]).flatMap((k) =>
    sel[k].map((v) => ({
      k,
      v,
      label: grupos.find((g) => g.key === k)?.opciones.find((o) => o.value === v)?.label ?? v,
    }))
  );

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24 tarjeta p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-nogal">Filtros</h2>
            {activos.length > 0 && (
              <button type="button" onClick={limpiar} className="tap text-sm font-semibold text-algarrobo hover:underline">
                Limpiar
              </button>
            )}
          </div>
          <Filtros grupos={grupos} sel={sel} onToggle={toggle} prefix="d" />
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="btn-secundario lg:hidden"
            aria-haspopup="dialog"
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filtros{activos.length > 0 ? ` (${activos.length} activos)` : ""}
          </button>
          <p className="text-sm font-semibold text-nogal" aria-live="polite">
            {resultado.length} {resultado.length === 1 ? "piso" : "pisos"}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="orden-pisos" className="text-sm text-nogal-suave">
              Ordenar
            </label>
            <select
              id="orden-pisos"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="min-h-11 rounded-campo border border-veta bg-superficie px-3 text-sm text-nogal"
            >
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre</option>
            </select>
          </div>
        </div>

        {activos.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activos.map((a) => (
              <button
                key={`${a.k}-${a.v}`}
                type="button"
                onClick={() => toggle(a.k, a.v)}
                aria-label={`Quitar filtro ${TITULOS[a.k]}: ${a.label}`}
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
            <p className="text-nogal">No hay pisos con esos filtros.</p>
            <button type="button" onClick={limpiar} className="btn-secundario mt-4">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {resultado.map((p) => (
              <ItemCard key={p.sku} item={itemPiso(p, nombreLinea[p.category_id])} />
            ))}
          </div>
        )}
      </div>

      {abierto && (
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
            <Filtros grupos={grupos} sel={sel} onToggle={toggle} prefix="m" />
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
    </div>
  );
}
