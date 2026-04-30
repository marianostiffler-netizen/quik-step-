import type { Metadata } from "next";
import EspejosInteligentesClient from "./EspejosInteligentesClient";

export const metadata: Metadata = {
  title: "Espejos Inteligentes | Maderera Don Antonio",
  description: "Espejos inteligentes con tecnología Touch, desempañador y reloj. Rectangulares, cuadrados, ovalados y circulares.",
};

export default function EspejosInteligentesPage() {
  return <EspejosInteligentesClient />;
}
