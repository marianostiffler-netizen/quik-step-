import type { Metadata } from "next";
import { categories, products } from "@/data/site-data";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Catálogo de Pisos Laminados | Quick-Step Argentina",
  description:
    "Explorá todas las líneas de pisos laminados Quick-Step: desde la accesible Smart hasta la premium Vision.",
};

export default function ProductosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-qs-gray-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Catálogo de Productos
          </h1>
          <p className="mt-4 text-qs-gray text-lg max-w-2xl">
            Explorá todas las líneas de pisos laminados Quick-Step. Cada línea
            está diseñada para diferentes necesidades y ambientes.
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
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
      <section className="py-16 bg-qs-gray-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Todos los Diseños
          </h2>
          <p className="text-qs-gray mb-8">
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
