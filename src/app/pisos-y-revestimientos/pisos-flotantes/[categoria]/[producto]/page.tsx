import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MessageCircle,
  Ruler,
  Layers,
  Award,
  Droplets,
  Package,
  Palette,
  CheckCircle2,
} from "lucide-react";
import {
  products,
  features,
  pricingInfo,
  getCategoryBySlug,
  getProductBySlug,
  getProductsByCategory,
} from "@/data/site-data";
import { waLink } from "@/config/negocio";
import ItemCard from "@/components/catalogo/ItemCard";
import PrecioItem from "@/components/catalogo/PrecioItem";
import TarjetaCategoria from "@/components/catalogo/TarjetaCategoria";
import { itemPiso, itemPorId } from "@/data/items";
import { tambienNecesitas } from "@/data/relaciones";
import CalculadoraCajas from "@/components/pisos/CalculadoraCajas";
import { aCentesimas, formatearM2 } from "@/lib/calculadora";
import { formatearPrecio } from "@/lib/precios";
import Migas from "@/components/catalogo/Migas";
import { RUTA_PISOS, buscarGrupo, grupos, hrefFichaPiso, hrefLineaPiso, resumenPorRuta } from "@/data/catalogo";

const grupo = buscarGrupo("pisos-y-revestimientos")!;

type Params = { categoria: string; producto: string };

export function generateStaticParams() {
  return products.map((p) => ({ categoria: p.category_id, producto: p.slug }));
}

function resolver({ categoria, producto }: Params) {
  const category = getCategoryBySlug(categoria);
  const product = getProductBySlug(producto);
  if (!category || !product || product.category_id !== category.id) return null;
  return { category, product };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const r = resolver(await params);
  if (!r) return {};
  const { category, product } = r;
  const { length, width, thickness } = product.dimensions;
  const precio =
    product.price_usd_m2 && product.price_usd_m2 > 0
      ? ` Desde ${formatearPrecio(product.price_usd_m2, "USD")} el m².`
      : "";
  return {
    title: `${product.sku} ${category.name} | Pisos flotantes | Maderera Don Antonio`,
    description: `Piso flotante Quick-Step ${category.name} ${product.sku}: ${length} × ${width} mm, ${thickness} mm de espesor, ${product.rating}.${precio}`,
    alternates: { canonical: hrefFichaPiso(category.slug, product.slug) },
  };
}

const tonos: Record<string, string> = {
  claro: "Claro",
  intermedio: "Intermedio",
  oscuro: "Oscuro",
  grisaceo: "Grisáceo",
};

export default async function FichaPage({ params }: { params: Promise<Params> }) {
  const r = resolver(await params);
  if (!r) notFound();
  const { category, product } = r;

  const { length, width, thickness } = product.dimensions;
  const precio = product.price_usd_m2 && product.price_usd_m2 > 0 ? product.price_usd_m2 : null;
  const coberturaX100 = product.coverage_m2 ? aCentesimas(product.coverage_m2) : null;
  const lineaUrl = hrefLineaPiso(category.slug);
  const otros = getProductsByCategory(category.id).filter((p) => p.sku !== product.sku).slice(0, 4);
  const relaciones = tambienNecesitas[RUTA_PISOS];
  const productosRel = (relaciones?.productos ?? []).flatMap((id) => itemPorId(id) ?? []);
  const resumen = resumenPorRuta();
  const categoriasRel = (relaciones?.categorias ?? []).flatMap((href) => {
    const c = grupos.flatMap((g) => g.categorias).find((x) => x.href === href);
    return c ? [c] : [];
  });
  const caracteristicas = product.features
    .map((id) => features.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const specs: { label: string; value: string; Icon: typeof Ruler }[] = [
    { label: "Medidas", value: `${length} × ${width} mm`, Icon: Ruler },
    { label: "Espesor", value: `${thickness} mm`, Icon: Layers },
    { label: "Clasificación", value: product.rating, Icon: Award },
  ];
  if (product.water_resistance_hours)
    specs.push({ label: "Resistencia al agua", value: `${product.water_resistance_hours} horas`, Icon: Droplets });
  if (coberturaX100)
    specs.push({ label: "Cobertura por caja", value: `${formatearM2(coberturaX100)} m²`, Icon: Package });
  if (product.tone) specs.push({ label: "Tono", value: tonos[product.tone] ?? product.tone, Icon: Palette });

  return (
    <>
      <section className="bg-pino pt-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Migas
            migas={[
              { label: "Inicio", href: "/" },
              { label: grupo.nombre, href: grupo.href },
              { label: "Pisos flotantes", href: RUTA_PISOS },
              { label: category.name, href: lineaUrl },
              { label: product.sku },
            ]}
          />

          <div className="mt-4 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
            <div>
              <Image
                src={`/products/ambientes/${product.image}`}
                alt={`Ambiente con piso ${category.name} ${product.sku}`}
                width={1517}
                height={950}
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="w-full aspect-[4/3] rounded-card object-cover"
              />
              <details className="mt-4">
                <summary className="tap inline-flex cursor-pointer items-center text-sm font-medium text-algarrobo">
                  Ver ficha técnica del fabricante
                </summary>
                <Image
                  src={`/products/${product.image}`}
                  alt={`Ficha técnica del piso ${product.sku}`}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="mt-3 h-auto w-full max-w-md rounded-card"
                />
              </details>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-algarrobo">
                  Piso flotante ·{" "}
                  <Link href={lineaUrl} className="hover:underline">Línea {category.name}</Link>
                </p>
                <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-nogal">{product.sku}</h1>
                <p className="mt-2 text-lg text-nogal-suave">{category.name} · {category.tagline}</p>
                <div className="mt-5">
                  <PrecioItem
                    precio={itemPiso(product, category.name).precio}
                    grande
                  />
                </div>
                {coberturaX100 && (
                  <p className="mt-1 text-sm text-nogal-suave tabular-nums">Caja: {formatearM2(coberturaX100)} m²</p>
                )}
                <p className="mt-1 text-xs text-nogal-suave">{pricingInfo.tax_note}</p>
              </div>

              <div className="tarjeta p-5">
                <h2 className="font-display text-lg font-bold text-nogal">Especificaciones</h2>
                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {specs.map(({ label, value, Icon }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon size={20} className="mt-0.5 shrink-0 text-algarrobo" aria-hidden="true" />
                      <div>
                        <dt className="text-xs text-nogal-suave">{label}</dt>
                        <dd className="font-semibold tabular-nums text-nogal">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                {caracteristicas.length > 0 && (
                  <ul className="mt-5 space-y-2 border-t border-veta pt-4">
                    {caracteristicas.map((f) => (
                      <li key={f.id} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-eucalipto" aria-hidden="true" />
                        <span className="text-sm text-nogal">{f.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {coberturaX100 ? (
                <CalculadoraCajas
                  sku={product.sku}
                  lineName={category.name}
                  coberturaCajaX100={coberturaX100}
                  precioM2Centavos={precio !== null ? aCentesimas(precio) : null}
                />
              ) : (
                <a
                  href={waLink(`Hola! Quisiera consultar por el piso Quick-Step ${category.name} ${product.sku}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Consultar por este piso
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {(productosRel.length > 0 || categoriasRel.length > 0) && (
        <section className="pb-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-nogal">También vas a necesitar</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {productosRel.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
              {categoriasRel.map((c) => (
                <TarjetaCategoria
                  key={c.href}
                  href={c.href}
                  nombre={c.nombre}
                  descripcion={c.descripcion}
                  imagen={c.imagen}
                  cantidad={resumen[c.href]?.cantidad ?? 0}
                  desde={resumen[c.href]?.desde ?? null}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {otros.length > 0 && (
        <section className="py-12 pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-nogal">Otros diseños de la línea {category.name}</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {otros.map((p) => (
                <ItemCard key={p.sku} item={itemPiso(p, category.name)} />
              ))}
            </div>
            <Link href={lineaUrl} className="btn-secundario mt-8">Ver la línea {category.name}</Link>
          </div>
        </section>
      )}
    </>
  );
}
