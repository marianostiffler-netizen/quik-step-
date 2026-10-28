import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MessageCircle,
  TreePine,
  Shield,
  MousePointerClick,
  Ruler,
  Layers,
  Award,
  Droplets,
  CheckCircle2,
  Package,
} from "lucide-react";
import {
  categories,
  getProductsByCategory,
  getCategoryBySlug,
  getPrecioDesdeLinea,
  features,
} from "@/data/site-data";
import { waLink } from "@/config/negocio";
import ItemCard from "@/components/catalogo/ItemCard";
import { itemPiso } from "@/data/items";
import { formatearPrecio } from "@/lib/precios";
import Migas from "@/components/catalogo/Migas";
import { RUTA_PISOS, buscarGrupo } from "@/data/catalogo";

const grupo = buscarGrupo("pisos-y-revestimientos")!;

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "wood-grain": TreePine,
  "water-drop": Droplets,
  shield: Shield,
  click: MousePointerClick,
};

export function generateStaticParams() {
  return categories.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) return {};
  return {
    title: `Línea ${category.name} | Pisos flotantes Quick-Step | Maderera Don Antonio`,
    description: `${category.name}: ${category.tagline}. ${category.description}`,
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const category = getCategoryBySlug(categoria);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);
  const s = category.specs_summary;
  const desde = getPrecioDesdeLinea(category.id);

  // Cantidad de diseños calculada de los datos (nunca escrita a mano)
  const maxDisenos = Math.max(...categories.map((c) => getProductsByCategory(c.id).length));
  const textoDisenos =
    `${products.length} ${products.length === 1 ? "diseño disponible" : "diseños disponibles"}` +
    (products.length === maxDisenos && products.length > 1 ? " — la colección más amplia" : "");
  const highlights = [textoDisenos, ...category.highlights];

  const specs: { label: string; value: string; Icon: typeof Ruler; precio?: boolean }[] = [
    { label: "Dimensiones", value: s.dimensions, Icon: Ruler },
    { label: "Espesor", value: s.thickness, Icon: Layers },
    { label: "Clasificación", value: s.rating, Icon: Award },
  ];
  if (s.water_resistance) specs.push({ label: "Resistencia al agua", value: s.water_resistance, Icon: Droplets });
  if (s.coverage_m2) specs.push({ label: "Cobertura por caja", value: `${new Intl.NumberFormat("es-AR").format(s.coverage_m2)} m²`, Icon: Package });

  return (
    <>
      <section className="bg-pino pt-4 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Migas
            migas={[
              { label: "Inicio", href: "/" },
              { label: grupo.nombre, href: grupo.href },
              { label: "Pisos flotantes", href: RUTA_PISOS },
              { label: category.name },
            ]}
          />
          <div className="mt-4 grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-algarrobo">Línea Quick-Step</p>
              <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-nogal">{category.name}</h1>
              <p className="mt-2 text-xl text-nogal-suave">{category.tagline}</p>
              <p className="mt-4 leading-relaxed text-nogal-suave">{category.description}</p>
              {desde !== null && (
                <p className="mt-6 text-3xl font-bold text-precio tabular-nums">
                  <span className="text-base font-medium text-nogal-suave">desde </span>
                  {formatearPrecio(desde, "USD")}
                  <span className="text-sm font-medium text-nogal-suave">/m²</span>
                </p>
              )}
              {s.promo && (
                <span className="mt-3 inline-block rounded-full bg-eucalipto px-3 py-1 text-sm font-semibold text-white">
                  {s.promo}
                </span>
              )}
            </div>
            {products[0] && (
              <Image
                src={`/products/ambientes/${products[0].image}`}
                alt={`Ambiente con piso ${category.name}`}
                width={1517}
                height={950}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full aspect-[16/10] rounded-card object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-nogal">Especificaciones de la línea</h2>
          <dl className="tarjeta mt-6 grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3 md:p-6">
            {specs.map(({ label, value, Icon, precio }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={20} className="mt-0.5 shrink-0 text-algarrobo" aria-hidden="true" />
                <div>
                  <dt className="text-xs text-nogal-suave">{label}</dt>
                  <dd className={`font-semibold tabular-nums ${precio ? "text-precio" : "text-nogal"}`}>{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-nogal">Por qué elegirla</h2>
            <ul className="mt-5 space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-eucalipto" aria-hidden="true" />
                  <span className="text-nogal">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-nogal">Tecnologías</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f) => {
                const Icon = iconMap[f.icon] || Shield;
                return (
                  <li key={f.id} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-veta">
                      <Icon size={16} className="text-algarrobo" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-nogal">{f.badge}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-nogal">Diseños disponibles</h2>
          <p className="mt-2 text-nogal-suave">
            {products.length} diseño{products.length !== 1 ? "s" : ""} en la línea {category.name}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {products.map((product) => (
              <ItemCard key={product.sku} item={itemPiso(product, category.name)} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 sm:flex-row sm:items-center sm:px-6">
          <a
            href={waLink(`Hola! Quisiera consultar por la línea ${category.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Consultar por WhatsApp
          </a>
          <Link href={RUTA_PISOS} className="btn-secundario">Ver todos los pisos</Link>
        </div>
      </section>
    </>
  );
}
