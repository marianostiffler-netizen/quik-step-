"use client";

import { useState } from "react";
import Image from "next/image";
import { Droplets, FileText, Shield } from "lucide-react";
import { products, type Product } from "@/data/site-data";

// Mapeo de tonos por SKU
const PRODUCT_TONES: Record<string, string> = {
  // Smart
  "QSSM0314": "claro",
  "QSSM1292": "intermedio",
  "QSSM1487": "intermedio",
  "QSSM1656": "grisaceo",
  "QSSM5001": "claro",
  "QSSM5795": "intermedio",
  // Catedral
  "QSCT701": "intermedio",
  "QSCT702": "oscuro",
  "QSCT703": "grisaceo",
  // Premiere Plus
  "QPRH0316": "claro",
  "QPRH034": "intermedio",
  "QPRH1067": "grisaceo",
  "QPRH1577": "oscuro",
  // Nesto
  "NES897": "intermedio",
  "NES900": "grisaceo",
  "NES937": "claro",
  // Eligna Wide
  "QSEW3676": "intermedio",
  "QSEW3677": "grisaceo",
  "QSEW3678": "claro",
  "QSEW3680": "intermedio",
  "QSEW3784": "grisaceo",
  "QSEW3785": "oscuro",
  "QSEW3786": "intermedio",
  // Impressive
  "IM1856": "intermedio",
  // Vision
  "QSV1462": "intermedio",
  "QSV1464": "grisaceo",
  "QSV866": "claro",
  "QSV877": "oscuro",
};

const TONE_FILTERS = [
  { id: "todo", label: "Todos los Tonos" },
  { id: "claro", label: "Claros" },
  { id: "intermedio", label: "Intermedios" },
  { id: "oscuro", label: "Oscuros" },
  { id: "grisaceo", label: "Grisáceos" },
] as const;

const RESISTANCE_FILTERS = [
  { id: "todo", label: "Todas las Resistencias" },
  { id: "6", label: "6hs" },
  { id: "48", label: "48hs" },
  { id: "72", label: "72hs" },
  { id: "100", label: "100hs" },
] as const;

type FilterId = string;

// Badges de agua con degradado azul según horas
const WATER_BADGE: Record<number, string> = {
  6: "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-600",
  48: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-cyan-600",
  72: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-teal-600",
  100: "bg-gradient-to-r from-teal-500 to-emerald-500 text-white border-emerald-600",
};

// Badges de tráfico
const TRAFFIC_BADGE: Record<string, string> = {
  "AC4": "bg-gray-100 text-gray-700 border-gray-300",
  "AC5": "bg-purple-100 text-purple-700 border-purple-300",
};

export default function PisosSwatchGallery() {
  const [toneFilter, setToneFilter] = useState<FilterId>("todo");
  const [resistanceFilter, setResistanceFilter] = useState<FilterId>("todo");

  const filtered = products.filter((p) => {
    const tone = PRODUCT_TONES[p.sku];
    const toneMatch = toneFilter === "todo" || tone === toneFilter;
    
    const resistance = p.water_resistance_hours?.toString();
    const resistanceMatch = resistanceFilter === "todo" || resistance === resistanceFilter;
    
    return toneMatch && resistanceMatch;
  });

  const getWaterBadge = (hours: number | null) => {
    if (!hours) return null;
    const badgeClass = WATER_BADGE[hours];
    return badgeClass ? (
      <div className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg font-bold text-xs border-2 shadow-lg flex items-center gap-1 ${badgeClass}`}>
        <Droplets size={12} className="fill-current" />
        {hours}hs
      </div>
    ) : null;
  };

  const getTrafficBadge = (rating: string) => {
    const acLevel = rating.includes("AC5") ? "AC5" : "AC4";
    const badgeClass = TRAFFIC_BADGE[acLevel];
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-semibold border ${badgeClass}`}>
        {acLevel}
      </span>
    );
  };

  const hasBezelEIR = (category_id: string) => {
    return category_id === "eligna-wide" || category_id === "impressive";
  };

  return (
    <>
      {/* Filtros */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filtros por tono */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-sm font-medium text-gray-600 shrink-0">Tono:</span>
              {TONE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setToneFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                    toneFilter === f.id
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            
            {/* Filtros por resistencia */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-sm font-medium text-gray-600 shrink-0">Resistencia:</span>
              {RESISTANCE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setResistanceFilter(f.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                    resistanceFilter === f.id
                      ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">{filtered.length} pisos encontrados</p>
        </div>
      </div>

      {/* Grilla de swatches */}
      <section className="py-10 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <div
                key={p.sku}
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-300"
              >
                {/* Imagen cuadrada */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={`/products/${p.image}`}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    loading="lazy"
                  />
                  
                  {/* Badge de agua */}
                  {getWaterBadge(p.water_resistance_hours)}
                  
                  {/* Botón de hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-500 hover:text-white transition-colors flex items-center gap-2">
                      <FileText size={16} />
                      Ver Ficha Técnica
                    </button>
                  </div>
                </div>

                {/* Info de la tarjeta */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-500">{p.sku}</span>
                    {getTrafficBadge(p.rating)}
                  </div>
                  
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {p.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-2">
                    {hasBezelEIR(p.category_id) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                        Bisel-EIR
                      </span>
                    )}
                    {p.price_usd_m2 && (
                      <span className="text-xs font-bold text-amber-600 ml-auto">
                        USD {p.price_usd_m2.toFixed(2)}/m²
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
