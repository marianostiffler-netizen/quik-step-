import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Quick-Step Argentina",
  description:
    "Contactanos para recibir asesoramiento sobre pisos laminados Quick-Step. Presupuestos, consultas técnicas y distribuidores.",
};

export default function ContactoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-qs-gray-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contacto
          </h1>
          <p className="mt-4 text-qs-gray text-lg max-w-2xl">
            ¿Tenés consultas sobre nuestros pisos? Completá el formulario y te
            respondemos a la brevedad.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-qs-blue focus:border-qs-blue outline-none transition"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-qs-blue focus:border-qs-blue outline-none transition"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-qs-blue focus:border-qs-blue outline-none transition"
                    placeholder="+54 11 ..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-qs-blue focus:border-qs-blue outline-none transition resize-none"
                    placeholder="Contanos sobre tu proyecto o consulta..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-qs-blue text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Enviar Consulta
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-qs-gray-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center">
                    <Mail size={18} className="text-qs-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-qs-gray">info@quickstep.com.ar</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-qs-gray-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center">
                    <Phone size={18} className="text-qs-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Teléfono
                    </p>
                    <p className="text-sm text-qs-gray">+54 11 0000-0000</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-qs-gray-light">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center">
                    <MapPin size={18} className="text-qs-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Ubicación
                    </p>
                    <p className="text-sm text-qs-gray">
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
