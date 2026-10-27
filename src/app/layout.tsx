import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { negocio, urlSitio } from "@/config/negocio";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const titulo = "Maderera Don Antonio | Pisos, Cielorrasos y Servicios en Madera";
// TODO(cliente): confirmar si hacen cortes a medida antes de volver a mencionarlo
const descripcion =
  "Maderera Don Antonio: pisos flotantes Quick-Step, cielorrasos, cepillado y lijado de madera. Tradición y calidad artesanal.";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio()),
  title: titulo,
  description: descripcion,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: negocio.nombre,
    title: titulo,
    description: descripcion,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
