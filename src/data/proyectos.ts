// Usos / proyectos para comprar por obra. Los comparten el menú, la home y futuras páginas.
import { Home, Trees, Layers, Construction, Sofa, PanelTop, type LucideIcon } from "lucide-react";

export type Proyecto = { titulo: string; href: string; medidas: string; Icono: LucideIcon };

export const proyectos: Proyecto[] = [
  // TODO(cliente): confirmar los aislantes para techos (hoy solo la lana de vidrio tiene uso "techos")
  { titulo: "Techos", href: "/maderas-y-construccion?uso=techos", medidas: "Tirantes 2\"×4\" y 2\"×5\", machimbre ½\"×4\" y aislantes", Icono: Home },
  { titulo: "Cielorrasos", href: "/maderas-y-construccion?uso=cielorrasos", medidas: "Machimbre ½\"×4\"", Icono: PanelTop },
  { titulo: "Decks y pérgolas", href: "/maderas-y-construccion?uso=decks", medidas: "Eucalipto grandis 3\"×8\" y 4\"×10\", hasta 12 m", Icono: Trees },
  { titulo: "Entrepisos", href: "/maderas-y-construccion?uso=entrepisos", medidas: "Tirantes 2\"×6\" y machimbre 1\"×6\"", Icono: Layers },
  { titulo: "Encofrado", href: "/maderas-y-construccion?uso=encofrado", medidas: "Tablas 1\"×6\" y 1\"×8\" × 4 m", Icono: Construction },
  { titulo: "Interiores", href: "/pisos-y-revestimientos", medidas: "Pisos flotantes, melaminas y espejos", Icono: Sofa },
];
