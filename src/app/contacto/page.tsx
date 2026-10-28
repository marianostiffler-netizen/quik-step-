import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import HeaderListado from "@/components/catalogo/HeaderListado";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

export const metadata: Metadata = {
  title: "Contacto | Maderera Don Antonio",
  description:
    "Contactanos por consultas sobre pisos flotantes, maderas y servicios de Maderera Don Antonio. Te respondemos por WhatsApp.",
};

export default function ContactoPage() {
  return (
    <>
      <HeaderListado
        titulo="Contacto"
        bajada="¿Tenés consultas sobre nuestros productos o servicios? Completá el formulario y te respondemos por WhatsApp."
        migas={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="tarjeta p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pino flex items-center justify-center">
                    <MessageCircle size={18} className="text-algarrobo" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-nogal">WhatsApp</p>
                    <a
                      href={waLink("Hola! Quisiera hacer una consulta.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm text-nogal-suave hover:text-algarrobo hover:underline focus-visible:outline-2 focus-visible:outline-algarrobo"
                    >
                      Escribinos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {negocio.email && (
              <div className="tarjeta p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pino flex items-center justify-center">
                    <Mail size={18} className="text-algarrobo" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-nogal">Email</p>
                    <p className="text-sm text-nogal-suave">{negocio.email}</p>
                  </div>
                </div>
              </div>
              )}

              {negocio.telefono && (
              <div className="tarjeta p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pino flex items-center justify-center">
                    <Phone size={18} className="text-algarrobo" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-nogal">Teléfono</p>
                    <p className="text-sm text-nogal-suave">{negocio.telefono}</p>
                  </div>
                </div>
              </div>
              )}

              <div className="tarjeta p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pino flex items-center justify-center">
                    <MapPin size={18} className="text-algarrobo" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-nogal">Ubicación</p>
                    <p className="text-sm text-nogal-suave">{direccionCorta()}</p>
                  </div>
                </div>
              </div>

              {negocio.horarios && (
              <div className="tarjeta p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pino flex items-center justify-center">
                    <Clock size={18} className="text-algarrobo" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-nogal">Horarios</p>
                    {negocio.horarios.map((h) => (
                      <p key={h.dias} className="text-sm text-nogal-suave">
                        {h.dias}: {h.horas}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
