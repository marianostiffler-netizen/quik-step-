"use client";

import Image from "next/image";
import { Sparkles, X, Zap, Wind, Clock, Thermometer } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const espejos = [
  {
    id: "espejo-1",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (1).jpeg",
    modelo: "Espejo LED N°1",
    forma: "Rectangular horizontal con borde lateral curvo",
    medidas: "80 × 130 cm",
  },
  {
    id: "espejo-2",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38 (2).jpeg",
    modelo: "Espejo LED N°2",
    forma: "Rectangular vertical",
    medidas: "70 × 90 cm",
  },
  {
    id: "espejo-3",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.38.jpeg",
    modelo: "Espejo LED N°3",
    forma: "Circular",
    medidas: "80 × 80 cm",
  },
  {
    id: "espejo-4",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39 (1).jpeg",
    modelo: "Espejo LED N°4",
    forma: "Rectangular horizontal",
    medidas: "90 × 70 cm",
  },
  {
    id: "espejo-5",
    image: "/products/espejos/WhatsApp Image 2026-04-17 at 14.13.39.jpeg",
    modelo: "Espejo LED N°5",
    forma: "Rectangular vertical",
    medidas: "70 × 90 cm",
  },
];

const caracteristicasGenerales = [
  { icon: Zap,         label: "LED 3 tonos (Fría, Neutra, Cálida)" },
  { icon: Sparkles,    label: "Regulador de intensidad" },
  { icon: Wind,        label: "Desempañador integrado" },
  { icon: Thermometer, label: "Display LCD · Hora · Temperatura" },
  { icon: Clock,       label: "Sensor de movimiento" },
];

export default function EspejosGallery() {
  const [selectedEspejo, setSelectedEspejo] = useState<typeof espejos[0] | null>(null);

  return (
    <>
      {/* Características Generales */}
      <section className="py-12 bg-wood-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-da-dark mb-6"
          >
            Características Generales (Todos los Modelos)
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {caracteristicasGenerales.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-2 text-sm text-da-dark bg-white/75 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/60 shadow-sm"
              >
                <Icon size={16} className="text-amber-500 shrink-0" />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-da-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {espejos.map((espejo, index) => (
              <motion.div
                key={espejo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: "0 24px 40px -8px rgba(0,0,0,0.14)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedEspejo(espejo)}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-white/60 shadow-md hover:border-amber-500/40 transition-colors duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={espejo.image}
                    alt={`Espejo ${espejo.modelo}`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 bg-gradient-to-b from-white/60 to-white/90 backdrop-blur-sm">
                  <h3 className="font-bold text-lg text-da-dark group-hover:text-wood-600 transition-colors">
                    {espejo.modelo}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-amber-600">
                    {espejo.medidas}
                  </p>
                  <p className="mt-0.5 text-xs text-da-gray">{espejo.forma}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal con AnimatePresence */}
      <AnimatePresence>
        {selectedEspejo && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedEspejo(null)}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl w-full bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/40"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEspejo(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <X size={24} className="text-da-dark" />
              </button>
              <div className="relative aspect-video bg-gray-50">
                <Image
                  src={selectedEspejo.image}
                  alt={`Espejo ${selectedEspejo.modelo}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-da-dark mb-4">
                  {selectedEspejo.modelo}
                </h2>
                <div className="space-y-3 text-da-gray">
                  <p>
                    <span className="font-semibold text-da-dark">Medidas:</span>{" "}
                    {selectedEspejo.medidas}
                  </p>
                  <p>
                    <span className="font-semibold text-da-dark">Forma:</span>{" "}
                    {selectedEspejo.forma}
                  </p>
                  <p className="pt-2 border-t border-wood-200">
                    <span className="font-semibold text-da-dark">Tecnología:</span>{" "}
                    LED 3 tonos, sensor de movimiento, desempañador y display LCD.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
