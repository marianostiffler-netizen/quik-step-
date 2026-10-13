import type { Metadata } from "next";
import PremiumLanding from "@/components/landing/PremiumLanding";

export const metadata: Metadata = {
  title: "Maderera Don Antonio | Experiencia Premium",
  description:
    "La madera que tu hogar merece. Pisos flotantes Quick-Step, espejos LED inteligentes y muebles artesanales. San Jorge, Santa Fe.",
};

// Ruta alternativa de prueba: landing premium con scroll-driven animations.
// No modifica ninguna de las páginas de producto existentes.
export default function LandingPage() {
  return <PremiumLanding />;
}
