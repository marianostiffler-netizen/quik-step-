"use client";

import { motion } from "framer-motion";
import { Sparkles, Thermometer, Clock, Wind, Zap } from "lucide-react";
import type { Mirror } from "@/data/espejos-inteligentes-data";

const FULL_FEATURES = [
  { icon: Zap,         label: "Touch 3 tonos" },
  { icon: Wind,        label: "Desempañador" },
  { icon: Clock,       label: "Display LCD" },
  { icon: Thermometer, label: "Temperatura" },
  { icon: Sparkles,    label: "Sensor mov." },
];

const BASIC_FEATURES = [
  { icon: Zap,     label: "Touch 3 tonos" },
  { icon: Sparkles, label: "LED regulable" },
];

export function MirrorCard({ mirror }: { mirror: Mirror }) {
  const features = mirror.fullFeatured ? FULL_FEATURES : BASIC_FEATURES;
  const isLarge = mirror.dimensions.width * mirror.dimensions.height >= 7000;

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/75 backdrop-blur-xl rounded-2xl border border-white/60 shadow-md overflow-hidden flex flex-col"
    >
      {/* Imagen / placeholder */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-2">
          {/* Silueta del espejo según shape */}
          <div
            className={`bg-gradient-to-br from-slate-300 to-slate-200 border-2 border-slate-300 shadow-inner flex items-center justify-center ${
              mirror.shape === "square"
                ? "rounded-lg w-24 h-24"
                : mirror.dimensions.height > mirror.dimensions.width
                ? "rounded-xl w-16 h-24"
                : "rounded-xl w-24 h-16"
            }`}
          >
            <div className="w-1/2 h-1/2 rounded-sm bg-white/40" />
          </div>
          <span className="text-xs text-slate-500 font-medium mt-1">Foto pendiente</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-violet-600 text-white shadow">
            <Zap size={9} />
            {mirror.modelo}
          </span>
          {mirror.fullFeatured ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-500 text-white shadow">
              Full
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-slate-400 text-white shadow">
              Basic
            </span>
          )}
          {isLarge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-500 text-white shadow">
              Gran formato
            </span>
          )}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-da-dark text-sm leading-snug mb-0.5">
          {mirror.name}
        </h3>
        <p className="text-xs text-da-gray mb-3">
          {mirror.dimensions.width}×{mirror.dimensions.height} cm ·{" "}
          {mirror.shape === "square" ? "Cuadrado" : "Rectangular"}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100"
            >
              <Icon size={9} />
              {label}
            </span>
          ))}
        </div>

        {/* Precio */}
        <div className="mt-auto pt-3 border-t border-wood-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-da-gray uppercase tracking-wide">Precio</p>
              <p className="text-xl font-extrabold text-amber-600 leading-none">
                USD {mirror.price_usd.toFixed(2)}
              </p>
              <p className="text-[10px] text-da-gray mt-0.5">
                ($ {mirror.price_ars.toLocaleString("es-AR")} ARS)
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
