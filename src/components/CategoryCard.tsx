import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/site-data";
import { getProductsByCategory } from "@/data/site-data";

export function CategoryCard({ category }: { category: Category }) {
  const products = getProductsByCategory(category.id);
  const firstProduct = products[0];

  return (
    <Link
      href={`/productos/${category.slug}`}
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-qs-blue/20 transition-all duration-300"
    >
      {firstProduct && (
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          <Image
            src={`/products/${firstProduct.image}`}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-xl">{category.name}</h3>
            <p className="text-white/80 text-sm">{category.tagline}</p>
          </div>
        </div>
      )}

      <div className="p-5">
        <p className="text-sm text-qs-gray leading-relaxed line-clamp-2">
          {category.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            {category.specs_summary.thickness}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            {category.specs_summary.rating}
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            {products.length} diseños
          </span>
          {category.specs_summary.water_resistance && (
            <span className="text-xs bg-qs-blue text-white px-2.5 py-1 rounded-full font-medium">
              {category.specs_summary.water_resistance} resist. agua
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-1 text-qs-blue text-sm font-semibold group-hover:gap-2 transition-all">
          Ver colección <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
