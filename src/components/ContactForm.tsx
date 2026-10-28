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
          <label htmlFor="contacto-nombre" className="mb-2 block text-sm font-medium text-nogal">
            Nombre
          </label>
          <input id="contacto-nombre"
            name="nombre"
            type="text"
            required
            className="min-h-11 w-full rounded-campo border border-veta bg-superficie px-4 py-3 text-nogal placeholder:text-nogal-suave focus-visible:border-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="contacto-email" className="mb-2 block text-sm font-medium text-nogal">
            Email
          </label>
          <input id="contacto-email"
            name="email"
            type="email"
            className="min-h-11 w-full rounded-campo border border-veta bg-superficie px-4 py-3 text-nogal placeholder:text-nogal-suave focus-visible:border-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contacto-telefono" className="mb-2 block text-sm font-medium text-nogal">
          Teléfono
        </label>
        <input id="contacto-telefono"
          name="telefono"
          type="tel"
          className="min-h-11 w-full rounded-campo border border-veta bg-superficie px-4 py-3 text-nogal placeholder:text-nogal-suave focus-visible:border-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo"
          placeholder="Tu teléfono"
        />
      </div>

      <div>
        <label htmlFor="contacto-mensaje" className="mb-2 block text-sm font-medium text-nogal">
          Mensaje
        </label>
        <textarea id="contacto-mensaje"
          name="mensaje"
          required
          rows={5}
          className="min-h-11 w-full rounded-campo border border-veta bg-superficie px-4 py-3 text-nogal placeholder:text-nogal-suave focus-visible:border-algarrobo focus-visible:outline-2 focus-visible:outline-algarrobo resize-none"
          placeholder="Contanos sobre tu proyecto o consulta..."
        />
      </div>

      <div>
        <button
          type="submit"
          className="btn-whatsapp"
        >
          Enviar por WhatsApp
        </button>
        <p className="mt-2 text-xs text-nogal-suave">
          Se abre WhatsApp con tu consulta lista para enviar.
        </p>
      </div>
    </form>
  );
}
