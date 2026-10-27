"use client";

import { waLink } from "@/config/negocio";

// Formulario de contacto: arma el mensaje y abre WhatsApp (sin backend)
export function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const campo = (k: string) => String(datos.get(k) ?? "").trim();
    const nombre = campo("nombre");
    const email = campo("email");
    const telefono = campo("telefono");
    const mensaje = campo("mensaje");

    let texto = `Hola! Soy ${nombre}.\n${mensaje}`;
    if (email || telefono) texto += "\n";
    if (email) texto += `\nEmail: ${email}`;
    if (telefono) texto += `\nTeléfono: ${telefono}`;

    window.open(waLink(texto), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contacto-nombre" className="block text-sm font-medium text-da-dark mb-2">
            Nombre
          </label>
          <input id="contacto-nombre"
            name="nombre"
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border border-wood-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="contacto-email" className="block text-sm font-medium text-da-dark mb-2">
            Email
          </label>
          <input id="contacto-email"
            name="email"
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-wood-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contacto-telefono" className="block text-sm font-medium text-da-dark mb-2">
          Teléfono
        </label>
        <input id="contacto-telefono"
          name="telefono"
          type="tel"
          className="w-full px-4 py-3 rounded-xl border border-wood-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
          placeholder="Tu teléfono"
        />
      </div>

      <div>
        <label htmlFor="contacto-mensaje" className="block text-sm font-medium text-da-dark mb-2">
          Mensaje
        </label>
        <textarea id="contacto-mensaje"
          name="mensaje"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-wood-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
          placeholder="Contanos sobre tu proyecto o consulta..."
        />
      </div>

      <div>
        <button
          type="submit"
          className="min-h-11 px-8 py-3.5 bg-amber-500 text-wood-800 font-bold rounded-xl hover:bg-amber-400 transition-colors"
        >
          Enviar por WhatsApp
        </button>
        <p className="mt-2 text-xs text-da-gray">
          Se abre WhatsApp con tu consulta lista para enviar.
        </p>
      </div>
    </form>
  );
}
