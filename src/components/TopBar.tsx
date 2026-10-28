import { negocio } from "@/config/negocio";

// Barra superior fina: solo muestra los datos que el cliente ya confirmó.
// Si no hay ninguno, no se renderiza.
export default function TopBar() {
  const horario = negocio.horarios?.[0];
  const items = [
    negocio.retiro,
    negocio.envios,
    negocio.mediosDePago?.length ? `Medios de pago: ${negocio.mediosDePago.join(", ")}` : null,
    horario ? `${horario.dias}: ${horario.horas}` : null,
  ].filter((t): t is string => !!t);

  if (items.length === 0) return null;

  return (
    <div className="bg-nogal text-pino text-xs">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 sm:px-6 lg:px-8">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
