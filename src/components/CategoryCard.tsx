"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@/data/site-data";
import { getProductsByCategory } from "@/data/site-data";

export function CategoryCard({ category }: { category: Category }) {
  const products = getProductsByCategory(category.id);
  const firstProduct = products[0];

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 24px 40px -8px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/pisos-flotantes/${category.slug}`}
        className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-md overflow-hidden hover:border-amber-500/40 transition-colors duration-300"
      >
        {firstProduct && (
          <div className="relative aspect-[16/9] overflow-hidden bg-wood-100">
            <Image
              src={`/products/${firstProduct.image}`}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-xl drop-shadow">{category.name}</h3>
              <p className="text-white/80 text-sm drop-shadow">{category.tagline}</p>
            </div>
            {category.specs_summary.price_usd_m2 && (
              <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-lg">
                USD {category.specs_summary.price_usd_m2.toFixed(2)}/m²
              </div>
            )}
          </div>
        )}

        <div className="p-5">
          <p className="text-sm text-da-gray leading-relaxed line-clamp-2">
            {category.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs bg-wood-100/80 text-wood-700 px-2.5 py-1 rounded-full font-medium border border-wood-200/50">
              {category.specs_summary.thickness}
            </span>
            <span className="text-xs bg-wood-100/80 text-wood-700 px-2.5 py-1 rounded-full font-medium border border-wood-200/50">
              {category.specs_summary.rating}
            </span>
            <span className="text-xs bg-wood-100/80 text-wood-700 px-2.5 py-1 rounded-full font-medium border border-wood-200/50">
              {products.length} diseños
            </span>
            {category.specs_summary.water_resistance && (
              <span className="text-xs bg-wood-700 text-white px-2.5 py-1 rounded-full font-medium">
                {category.specs_summary.water_resistance}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-1 text-amber-600 text-sm font-semibold group-hover:gap-2 transition-all">
            Ver colección <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
