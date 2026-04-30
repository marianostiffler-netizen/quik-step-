"use client";

import { useState } from "react";
import type { Mirror } from "@/data/espejos-inteligentes-data";
import { lightTypeLabels } from "@/data/espejos-inteligentes-data";

type Variant = "touch" | "full";

export function MirrorCard({ mirror }: { mirror: Mirror }) {
  const [variant, setVariant] = useState<Variant>("touch");

  const price = variant === "touch" ? mirror.pricing.touch : mirror.pricing.full;
  const variantLabel = variant === "touch" ? "Versión Touch" : "Versión Touch + Desempañador + Reloj";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Placeholder gris para la foto */}
      <div className="aspect-[4/5] bg-gray-200 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-32 h-40 mx-auto bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Foto pendiente</p>
          <p className="text-xs text-gray-400 mt-1">{mirror.name}</p>
        </div>
      </div>

      {/* Info de la tarjeta */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{mirror.name}</h3>
        
        {/* Características */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
            {lightTypeLabels[mirror.features.lightType]}
          </span>
          {mirror.features.frameIncluded && (
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              Bastidor incluido
            </span>
          )}
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            {mirror.dimensions.width}x{mirror.dimensions.height}cm
          </span>
        </div>

        {/* Selector de variante */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-2 block">Versión:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setVariant("touch")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                variant === "touch"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Touch
            </button>
            <button
              onClick={() => setVariant("full")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                variant === "full"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Full
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">{variantLabel}</p>
        </div>

        {/* Precio */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Precio:</span>
            <span className="text-xl font-bold text-amber-600">
              USD {price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
