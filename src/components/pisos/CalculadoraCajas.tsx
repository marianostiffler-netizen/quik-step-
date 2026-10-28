"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { waLink } from "@/config/negocio";
import { calcularCajas, formatearM2, parsearM2, DESPERDICIO_DEFAULT } from "@/lib/calculadora";
import { formatearCentavos } from "@/lib/precios";

type Props = {
  sku: string;
  lineName: string;
  coberturaCajaX100: number;
  precioM2Centavos: number | null;
};

export default function CalculadoraCajas({ sku, lineName, coberturaCajaX100, precioM2Centavos }: Props) {
  const [texto, setTexto] = useState("");
  const [desperdicioTxt, setDesperdicioTxt] = useState(String(DESPERDICIO_DEFAULT));

  const m2X100 = parsearM2(texto);
  const invalido = texto.trim() !== "" && m2X100 === null;

  const desperdicioNum = Number.parseInt(desperdicioTxt, 10);
  const desperdicio = Number.isNaN(desperdicioNum) ? DESPERDICIO_DEFAULT : Math.min(30, Math.max(0, desperdicioNum));

  const res =
    m2X100 !== null && m2X100 > 0
      ? calcularCajas({ m2X100, coberturaCajaX100, precioM2Centavos, desperdicioPct: desperdicio })
      : null;

  let href: string | undefined;
  if (res && m2X100 !== null) {
    const etiquetaCajas = `${res.cajas} ${res.cajas === 1 ? "caja" : "cajas"}`;
    const lineaPrecio =
      res.subtotalCentavos !== null
        ? `• Subtotal estimado: ${formatearCentavos(res.subtotalCentavos, "USD")} (sin IVA)`
        : "• Precio: a confirmar";
    href = waLink(
      [
        "Hola! Quiero hacer un pedido:",
        `• Piso Quick-Step ${lineName} ${sku}`,
        `• ${etiquetaCajas} (${formatearM2(res.m2LlevaX100)} m²)`,
        lineaPrecio,
        `Superficie a cubrir: ${formatearM2(m2X100)} m² + ${desperdicio}% de desperdicio.`,
      ].join("\n"),
    );
  }

  return (
    <section className="tarjeta p-5 md:p-6" aria-labelledby="calc-titulo">
      <h2 id="calc-titulo" className="font-display text-xl font-bold text-nogal">¿Cuántas cajas necesitás?</h2>
      <p className="mt-1 text-sm text-nogal-suave">
        Ingresá los m² a cubrir. Sumamos un margen de desperdicio por cortes y encastres.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor="calc-m2" className="text-sm font-medium text-nogal">m² a cubrir</label>
          <input
            id="calc-m2"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Ej. 12,5"
            aria-invalid={invalido}
            aria-describedby={invalido ? "calc-m2-ayuda" : undefined}
            className="mt-1 block min-h-11 w-full rounded-campo border border-veta bg-superficie px-3 text-nogal tabular-nums"
          />
          {invalido && (
            <p id="calc-m2-ayuda" className="mt-1 text-sm text-nogal-suave">
              Usá números con hasta 2 decimales, ej. 12,5
            </p>
          )}
        </div>
        <div>
          <label htmlFor="calc-desp" className="text-sm font-medium text-nogal">Desperdicio (%)</label>
          <input
            id="calc-desp"
            type="number"
            inputMode="numeric"
            min={0}
            max={30}
            step={1}
            value={desperdicioTxt}
            onChange={(e) => setDesperdicioTxt(e.target.value)}
            className="mt-1 block min-h-11 w-full rounded-campo border border-veta bg-superficie px-3 text-nogal tabular-nums"
          />
        </div>
      </div>

      <div aria-live="polite" className="mt-5 rounded-campo bg-pino p-4">
        {res ? (
          <div className="space-y-1 tabular-nums">
            <p className="text-lg font-semibold text-nogal">Cajas: {res.cajas}</p>
            <p className="text-nogal">m² que te llevás: {formatearM2(res.m2LlevaX100)} m²</p>
            <p className="text-sm text-nogal-suave">
              Incluye {desperdicio}% de desperdicio ({formatearM2(res.m2NecesariosX100)} m²)
            </p>
            {res.precioCajaCentavos !== null && (
              <p className="text-nogal">Precio por caja: {formatearCentavos(res.precioCajaCentavos, "USD")}</p>
            )}
            {res.subtotalCentavos !== null ? (
              <p className="pt-2 text-nogal">
                Subtotal estimado:{" "}
                <span className="block text-3xl font-bold text-precio">
                  {formatearCentavos(res.subtotalCentavos, "USD")}
                </span>
                <span className="text-sm text-nogal-suave">sin IVA</span>
              </p>
            ) : (
              <p className="pt-2 text-nogal">Subtotal: consultá precio</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-nogal-suave">Ingresá los m² a cubrir para ver cuántas cajas necesitás.</p>
        )}
      </div>

      <a
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        aria-disabled={href ? undefined : true}
        className={`btn-whatsapp mt-4 w-full justify-center ${href ? "" : "pointer-events-none opacity-50"}`}
      >
        <MessageCircle size={18} aria-hidden="true" />
        Pedir por WhatsApp
      </a>
      <p className="mt-2 text-xs text-nogal-suave">
        El precio final y la disponibilidad se confirman por WhatsApp.
      </p>
    </section>
  );
}
