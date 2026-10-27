import { negocio, urlSitio } from "@/config/negocio";

// JSON-LD de LocalBusiness. Solo se publica cuando están cargados los datos
// reales mínimos: calle, (teléfono o WhatsApp) y sitioUrl. Si falta alguno
// devuelve null para no publicar datos inventados o incompletos.
export function LocalBusinessJsonLd() {
  const { direccion, telefono, whatsapp, sitioUrl, email } = negocio;
  if (!direccion.calle || !(telefono || whatsapp) || !sitioUrl) return null;

  const url = urlSitio();
  const datos = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: negocio.nombre,
    url,
    telephone: telefono ?? `+${whatsapp}`,
    ...(email ? { email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: direccion.calle,
      addressLocality: direccion.localidad,
      addressRegion: direccion.provincia,
      ...(direccion.codigoPostal ? { postalCode: direccion.codigoPostal } : {}),
      addressCountry: direccion.pais,
    },
    image: `${url}/logo-maderera.webp`,
    // TODO(cliente): `horarios` es texto libre. Para publicarlos hace falta
    // formato estructurado (openingHoursSpecification: dayOfWeek, opens, closes).
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\\u003c"),
      }}
    />
  );
}
