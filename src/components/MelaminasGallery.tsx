"use client";

import { useState } from "react";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import { melaminas, type Melamina } from "@/data/melaminas-data";

const WA_NUMBER = "5493000000000"; // TODO: Reemplazá con el número real de WhatsApp

const waLink = (nombre: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hola! Me interesa consultar sobre la melamina: ${nombre}`
  )}`;

const FILTERS = [
  { id: "todo", label: "Todo" },
  { id: "mesopotamia", label: "Línea Mesopotamia" },
  { id: "tactil", label: "Línea Táctil" },
  { id: "blend", label: "Línea Blend" },
  { id: "urban-concept", label: "Línea Urban Concept" },
  { id: "hilados", label: "Línea Hilados" },
  { id: "etnica", label: "Línea Étnica" },
  { id: "nordica", label: "Línea Nórdica" },
  { id: "nature", label: "Línea Nature" },
  { id: "maderas-clasicas", label: "Línea Maderas clásicas" },
  { id: "lisos", label: "Línea Lisos" },
  { id: "revestimiento", label: "Revestimiento" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const LINE_BADGE: Record<string, string> = {
  "Línea Mesopotamia": "bg-amber-100 text-amber-700",
  "Línea Táctil": "bg-blue-100 text-blue-700",
  "Línea Blend": "bg-rose-100 text-rose-700",
  "Línea Urban Concept": "bg-slate-100 text-slate-700",
  "Línea Hilados": "bg-cyan-100 text-cyan-700",
  "Línea Étnica": "bg-yellow-100 text-yellow-700",
  "Línea Nórdica": "bg-indigo-100 text-indigo-700",
  "Línea Nature": "bg-emerald-100 text-emerald-700",
  "Línea Maderas clásicas": "bg-orange-100 text-orange-700",
  "Línea Lisos": "bg-gray-100 text-gray-700",
};

export default function MelaminasGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("todo");
  const [selected, setSelected] = useState<Melamina | null>(null);

  const filtered = melaminas.filter((m) => {
    if (activeFilter === "todo") return true;
    if (activeFilter === "mesopotamia")
      return m.linea === "Línea Mesopotamia" && !m.esRevestimiento;
    if (activeFilter === "tactil") return m.linea === "Línea Táctil";
    if (activeFilter === "blend")
      return m.linea === "Línea Blend" && !m.esRevestimiento;
    if (activeFilter === "urban-concept")
      return m.linea === "Línea Urban Concept" && !m.esRevestimiento;
    if (activeFilter === "hilados")
      return m.linea === "Línea Hilados" && !m.esRevestimiento;
    if (activeFilter === "etnica")
      return m.linea === "Línea Étnica" && !m.esRevestimiento;
    if (activeFilter === "nordica")
      return m.linea === "Línea Nórdica" && !m.esRevestimiento;
    if (activeFilter === "nature")
      return m.linea === "Línea Nature" && !m.esRevestimiento;
    if (activeFilter === "maderas-clasicas")
      return m.linea === "Línea Maderas clásicas" && !m.esRevestimiento;
    if (activeFilter === "lisos")
      return m.linea === "Línea Lisos" && !m.esRevestimiento;
    if (activeFilter === "revestimiento") return m.esRevestimiento;
    return true;
  });

  return (
    <>
      {/* ── FILTROS ── */}
      <div className="bg-white border-b border-wood-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                  activeFilter === f.id
                    ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                    : "bg-white text-wood-700 border-wood-200 hover:border-amber-400 hover:text-amber-600"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs text-da-gray pl-2">
              {filtered.length} colores
            </span>
          </div>
        </div>
      </div>

      {/* ── GRILLA DE MUESTRAS ── */}
      <section className="py-10 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className="group bg-white rounded-xl border border-wood-200 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-400/70 transition-all text-left focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <div className="relative aspect-square">
                  <Image
                    src={m.imagen}
                    alt={m.nombre}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                  />
                </div>
                <div className="p-2.5">
                  <p className="font-semibold text-sm text-da-dark leading-snug truncate">
                    {m.nombre}
                  </p>
                  <p className="text-xs text-da-gray mt-0.5">
                    Medidas: {m.medidas}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        LINE_BADGE[m.linea] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {m.linea.replace("Línea ", "")}
                    </span>
                    {m.esRevestimiento && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-700">
                        Rev.
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Textura grande */}
            <div className="relative aspect-square">
              <Image
                src={selected.imagen}
                alt={selected.nombre}
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    LINE_BADGE[selected.linea] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selected.linea}
                </span>
                {selected.esRevestimiento && (
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-orange-100 text-orange-700">
                    Revestimiento
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-da-dark mb-1">
                {selected.nombre}
              </h2>
              <p className="text-sm text-da-gray mb-5">
                Medidas: {selected.medidas}
              </p>

              <a
                href={waLink(selected.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-colors"
              >
                <MessageCircle size={18} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
