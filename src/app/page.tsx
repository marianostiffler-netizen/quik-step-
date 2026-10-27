import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Categorias from "@/components/home/Categorias";
import Usos from "@/components/home/Usos";
import Destacados from "@/components/home/Destacados";
import ComoComprar from "@/components/home/ComoComprar";
import Asesoramiento from "@/components/home/Asesoramiento";
import DondeEstamos from "@/components/home/DondeEstamos";

export const metadata: Metadata = {
  title: "Maderera Don Antonio | Pisos, Espejos y Madera · San Jorge, Santa Fe",
  description:
    "Pisos flotantes Quick-Step, espejos LED artesanales, muebles de madera, machimbres y servicios de cepillado. San Jorge, Santa Fe, Argentina.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Categorias />
      <Usos />
      <Destacados />
      <ComoComprar />
      <Asesoramiento />
      <DondeEstamos />
    </>
  );
}
