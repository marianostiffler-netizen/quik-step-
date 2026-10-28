import { MessageCircle, Calculator, Store, Truck, CreditCard, type LucideIcon } from "lucide-react";
import { negocio } from "@/config/negocio";

// Fijos: los verifica el propio sitio. Condicionales: solo si el cliente cargó el dato.
export default function Beneficios() {
  const items: { texto: string; Icono: LucideIcon }[] = [
    { texto: "Te asesoramos por WhatsApp", Icono: MessageCircle },
    { texto: "Calculadora de cajas en pisos flotantes", Icono: Calculator },
  ];
  if (negocio.retiro) items.push({ texto: negocio.retiro, Icono: Store });
  if (negocio.envios) items.push({ texto: negocio.envios, Icono: Truck });
  if (negocio.mediosDePago?.length) items.push({ texto: `Pagás con ${negocio.mediosDePago.join(", ")}`, Icono: CreditCard });

  return (
    <section className="border-y border-veta bg-superficie py-6">
      <ul className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-flow-col lg:auto-cols-fr">
        {items.map(({ texto, Icono }) => (
          <li key={texto} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pino text-algarrobo">
              <Icono size={20} aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-nogal">{texto}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
