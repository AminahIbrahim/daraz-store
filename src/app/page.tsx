import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import HeroBanner from "@/components/HeroBanner";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };  
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

async function getCategories() {
  return await prisma.category.findMany();
}

async function getProducts(searchQuery?: string) {
  if (searchQuery) {
    return await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery } },
          { description: { contains: searchQuery } },
        ],
      },
      include: { category: true },
      take: 20, // Performance optimization
    });
  }

  return await prisma.product.findMany({
    include: { category: true },
    take: 20, // Fast initial load
  });
}

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams?.search || "";

  const categories = await getCategories();
  const products = await getProducts(searchQuery);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* 1. Daraz Hero Promo Banner (Only shows when not searching) */}
      {!searchQuery && <HeroBanner />}

      {/* 2. Categories Section */}
      {!searchQuery && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition text-center font-semibold text-sm text-gray-700 hover:text-orange-600 flex flex-col items-center justify-center gap-2"
              >
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 3. Featured / Searched Products Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery ? `Search Results for &quot;${searchQuery}&quot;` : "Flash Sale / Products"}
          </h2>
          {searchQuery && (
            <Link
              href="/"
              className="text-xs font-semibold text-orange-600 hover:underline"
            >
              Clear Search
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 font-medium">No products found for &quot;{searchQuery}&quot;</p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm font-semibold bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
                      className="object-cover p-2 group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase">
                    {product.category.name}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm mt-2 line-clamp-1 group-hover:text-orange-600 transition">
                    {product.title}
                  </h3>
                  <p className="text-lg font-black text-orange-600 mt-1">
                    Rs. {Number(product.price).toFixed(2)}
                  </p>
                </Link>

                <div className="p-4 pt-0">
                  <AddToCartButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: Number(product.price),
                      stock: product.stock,
                      images: product.images,
                      slug: product.slug,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}