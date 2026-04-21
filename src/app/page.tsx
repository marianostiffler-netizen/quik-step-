import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Maderera Don Antonio | Pisos, Espejos y Madera · San Jorge, Santa Fe",
  description:
    "Pisos flotantes Quick-Step, espejos LED artesanales, muebles de madera, machimbres y servicios de cepillado. San Jorge, Santa Fe, Argentina.",
};

export default function Home() {
  return <HomeContent />;
}
