import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: { category: true },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Category
          </span>
          <h1 className="text-2xl font-black text-gray-900">{category.name}</h1>
        </div>
        <Link
          href="/"
          className="text-xs font-semibold text-gray-500 hover:text-orange-600 transition"
        >
          ← Back to All Products
        </Link>
      </div>

      {category.products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 font-medium">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition group"
            >
              <Link href={`/product/${product.slug}`} className="p-4 block flex-1">
                <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden mb-3">
                  <Image
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mt-2 line-clamp-1 group-hover:text-orange-600 transition">
                  {product.title}
                </h3>
                <p className="text-lg font-black text-orange-600 mt-1">
                  ${Number(product.price).toFixed(2)}
                </p>
              </Link>

              <div className="p-4 pt-0">
                <AddToCartButton
                  product={{
                    id: product.id,
                    title: product.title,
                    price: Number(product.price),
                    images: product.images,
                    slug: product.slug,
                    stock: product.stock,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}