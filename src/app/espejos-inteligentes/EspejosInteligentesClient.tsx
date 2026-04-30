"use client";

import { useState } from "react";
import { mirrors, discountTiers, shapeLabels } from "@/data/espejos-inteligentes-data";
import { MirrorCard } from "@/components/MirrorCard";

type ShapeFilter = "all" | "rectangular" | "square" | "oval" | "circular";

export default function EspejosInteligentesClient() {
  const [shapeFilter, setShapeFilter] = useState<ShapeFilter>("all");

  const filtered = mirrors.filter((m) => {
    if (shapeFilter === "all") return true;
    return m.shape === shapeFilter;
  });

  const shapeOptions = [
    { id: "all" as const, label: "Todos" },
    { id: "rectangular" as const, label: "Rectangulares" },
    { id: "square" as const, label: "Cuadrados" },
    { id: "oval" as const, label: "Ovalados" },
    { id: "circular" as const, label: "Circulares" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Espejos Inteligentes</h1>
          <p className="text-xl text-gray-300">
            Tecnología Touch, desempañador y reloj en un solo producto
          </p>
        </div>
      </section>

      {/* Filtros y Grilla */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filtros por forma */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por forma:</h2>
            <div className="flex flex-wrap gap-3">
              {shapeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setShapeFilter(opt.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    shapeFilter === opt.id
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">{filtered.length} espejos encontrados</p>
          </div>

          {/* Grilla de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {filtered.map((mirror) => (
              <MirrorCard key={mirror.id} mirror={mirror} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Descuentos Mayoristas */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Descuentos Mayoristas
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold">Cantidad</th>
                  <th className="py-4 px-6 text-left font-semibold">Descuento</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {discountTiers.map((tier) => (
                  <tr
                    key={tier.label}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      {tier.max === Infinity
                        ? `Más de ${tier.min} espejos`
                        : tier.min === 0
                        ? tier.label
                        : `${tier.min} a ${tier.max} espejos`}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-4 py-2 rounded-full font-bold text-lg bg-amber-100 text-amber-700">
                        {tier.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-6 text-lg font-medium">
            ¿Eres mayorista? Contáctanos para cotizaciones especiales
          </p>
        </div>
      </section>
    </>
  );
}
