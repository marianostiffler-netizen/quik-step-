import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { negocio, direccionCorta, waLink } from "@/config/negocio";

export const metadata: Metadata = {
  title: "Contacto | Maderera Don Antonio",
  description:
    "Contactanos para asesoramiento sobre pisos flotantes, cielorrasos y servicios de maderera. Presupuestos sin compromiso.",
};

export default function ContactoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-wood-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-da-dark">
            Contacto
          </h1>
          <p className="mt-4 text-da-gray text-lg max-w-2xl">
            ¿Tenés consultas sobre nuestros productos o servicios? Completá el
            formulario y te respondemos por WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-wood-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-wood-200 flex items-center justify-center">
                    <MessageCircle size={18} className="text-wood-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-da-dark">WhatsApp</p>
                    <a
                      href={waLink("Hola! Quisiera hacer una consulta.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm text-da-gray hover:text-amber-600 transition-colors"
                    >
                      Escribinos por WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {negocio.email && (
              <div className="p-6 rounded-2xl bg-wood-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-wood-200 flex items-center justify-center">
                    <Mail size={18} className="text-wood-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-da-dark">Email</p>
                    <p className="text-sm text-da-gray">{negocio.email}</p>
                  </div>
                </div>
              </div>
              )}

              {negocio.telefono && (
              <div className="p-6 rounded-2xl bg-wood-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-wood-200 flex items-center justify-center">
                    <Phone size={18} className="text-wood-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-da-dark">Teléfono</p>
                    <p className="text-sm text-da-gray">{negocio.telefono}</p>
                  </div>
                </div>
              </div>
              )}

              <div className="p-6 rounded-2xl bg-wood-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-wood-200 flex items-center justify-center">
                    <MapPin size={18} className="text-wood-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-da-dark">Ubicación</p>
                    <p className="text-sm text-da-gray">{direccionCorta()}</p>
                  </div>
                </div>
              </div>

              {negocio.horarios && (
              <div className="p-6 rounded-2xl bg-wood-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-wood-200 flex items-center justify-center">
                    <Clock size={18} className="text-wood-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-da-dark">Horarios</p>
                    {negocio.horarios.map((h) => (
                      <p key={h.dias} className="text-sm text-da-gray">
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
