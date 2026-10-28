import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Beneficios from "@/components/home/Beneficios";
import Grupos from "@/components/home/Grupos";
import Proyectos from "@/components/home/Proyectos";
import Destacados from "@/components/home/Destacados";
import Promo from "@/components/home/Promo";
import ComoComprar from "@/components/home/ComoComprar";
import Marcas from "@/components/home/Marcas";
import Historia from "@/components/home/Historia";
import Asesoramiento from "@/components/home/Asesoramiento";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Maderera Don Antonio | Pisos, Espejos y Madera · San Jorge, Santa Fe",
  description:
    "Pisos flotantes Quick-Step, espejos LED artesanales, muebles de madera, machimbres y servicios de cepillado. San Jorge, Santa Fe, Argentina.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Beneficios />
      <Grupos />
      <Proyectos />
      <Destacados />
      <Promo />
      <ComoComprar />
      <Marcas />
      <Historia />
      <Asesoramiento />
    </>
  );
}
