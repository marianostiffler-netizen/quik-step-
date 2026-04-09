import Image from "next/image";
import Link from "next/link";
import { Droplets, Ruler, Layers } from "lucide-react";
import type { Product } from "@/data/site-data";
import { categories } from "@/data/site-data";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((c) => c.id === product.category_id);

  return (
    <Link
      href={`/pisos-flotantes/${product.category_id}#${product.sku}`}
      className="group block bg-white rounded-xl border border-wood-200 overflow-hidden hover:shadow-lg hover:border-amber-500/40 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-wood-100">
        <Image
          src={`/products/${product.image}`}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.water_resistance_hours && (
          <div className="absolute top-3 right-3 bg-wood-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Droplets size={12} />
            {product.water_resistance_hours}hs
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-wood-700 bg-wood-100 px-2 py-0.5 rounded-full">
            {category?.name}
          </span>
          <span className="text-xs text-da-gray font-mono">{product.sku}</span>
        </div>

        <h3 className="font-semibold text-sm mt-2 text-da-dark group-hover:text-wood-600 transition-colors">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-3 text-xs text-da-gray">
          <span className="flex items-center gap-1">
            <Ruler size={12} />
            {product.dimensions.length}x{product.dimensions.width}mm
          </span>
          <span className="flex items-center gap-1">
            <Layers size={12} />
            {product.dimensions.thickness}mm
          </span>
          <span className="ml-auto font-semibold text-da-dark">
            {product.rating}
          </span>
        </div>

        {product.price_usd_m2 && (
          <div className="mt-3 pt-3 border-t border-wood-100 flex items-center justify-between">
            <span className="text-base font-bold text-amber-600">
              USD {product.price_usd_m2.toFixed(2)}/m²
            </span>
            {product.coverage_m2 && (
              <span className="text-xs text-da-gray">
                Caja: {product.coverage_m2} m²
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
