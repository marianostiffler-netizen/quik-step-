import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Ruler,
  Layers,
  Award,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import {
  categories,
  getProductsByCategory,
  getCategoryBySlug,
  features,
} from "@/data/site-data";
import { FeatureBadge } from "@/components/FeatureBadge";

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
    title: `Línea ${category.name} | Pisos Laminados Quick-Step`,
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

  return (
    <>
      {/* Header */}
      <section className="bg-qs-blue text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/productos"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Volver al Catálogo
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold">{category.name}</h1>
          <p className="mt-2 text-xl text-blue-200">{category.tagline}</p>
          <p className="mt-4 text-blue-100 max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Especificaciones de la Línea
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center shrink-0">
                <Ruler size={18} className="text-qs-blue" />
              </div>
              <div>
                <p className="text-xs text-qs-gray">Dimensiones</p>
                <p className="font-semibold text-gray-900">
                  {category.specs_summary.dimensions}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center shrink-0">
                <Layers size={18} className="text-qs-blue" />
              </div>
              <div>
                <p className="text-xs text-qs-gray">Espesor</p>
                <p className="font-semibold text-gray-900">
                  {category.specs_summary.thickness}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center shrink-0">
                <Award size={18} className="text-qs-blue" />
              </div>
              <div>
                <p className="text-xs text-qs-gray">Clasificación</p>
                <p className="font-semibold text-gray-900">
                  {category.specs_summary.rating}
                </p>
              </div>
            </div>
            {category.specs_summary.water_resistance && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-qs-blue-light flex items-center justify-center shrink-0">
                  <Droplets size={18} className="text-qs-blue" />
                </div>
                <div>
                  <p className="text-xs text-qs-gray">Resist. al Agua</p>
                  <p className="font-semibold text-gray-900">
                    {category.specs_summary.water_resistance}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 bg-qs-gray-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Características Destacadas
              </h2>
              <ul className="space-y-3">
                {category.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      size={18}
                      className="text-qs-blue shrink-0 mt-0.5"
                    />
                    <span className="text-gray-700">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Tecnologías Incluidas
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f) => (
                  <FeatureBadge key={f.id} {...f} compact />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Diseños Disponibles
          </h2>
          <p className="text-qs-gray mb-8">
            {products.length} diseño{products.length !== 1 ? "s" : ""} en la
            línea {category.name}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.sku}
                id={product.sku}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={`/products/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <span className="text-xs text-qs-gray font-mono">
                      {product.sku}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                      {product.dimensions.length}x{product.dimensions.width}x
                      {product.dimensions.thickness}mm
                    </span>
                    <span className="text-xs bg-qs-blue-light text-qs-blue px-2.5 py-1 rounded-full font-medium">
                      {product.rating}
                    </span>
                    {product.water_resistance_hours && (
                      <span className="text-xs bg-qs-blue text-white px-2.5 py-1 rounded-full font-medium">
                        {product.water_resistance_hours}hs resist. agua
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
