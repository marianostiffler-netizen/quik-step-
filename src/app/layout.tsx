import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { negocio, urlSitio } from "@/config/negocio";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="es" className={`${inter.variable} ${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
