import type { Metadata } from "next";
import { categories, products } from "@/data/site-data";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Pisos Flotantes Quick-Step | Maderera Don Antonio",
  description:
    "Pisos laminados Quick-Step con tecnología europea. Líneas Smart, Catedral, Premiere Plus, Eligna Wide y Vision.",
};

export default function ProductosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-wood-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-da-dark">
            Pisos Flotantes Quick-Step
          </h1>
          <p className="mt-4 text-da-gray text-lg max-w-2xl">
            Pisos laminados con tecnología europea: resistentes al agua,
            fácil instalación y diseños que imitan la madera natural.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-da-dark mb-8">
            Líneas de Producto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* All products grid */}
      <section className="py-16 bg-wood-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-da-dark mb-2">
            Todos los Diseños
          </h2>
          <p className="text-da-gray mb-8">
            {products.length} productos disponibles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
