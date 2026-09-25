import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const products = query.trim()
    ? await prisma.product.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Search Results for: <span className="text-orange-600">&quot;{query}&quot;</span>
      </h1>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500 border border-gray-100">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between border border-gray-100 group"
            >
              <Link href={`/product/${product.slug}`} className="block flex-1">
                <div className="relative h-48 w-full mb-4 bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h2 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition">
                  {product.title}
                </h2>
                <div className="text-lg font-bold text-orange-600 mb-4">
                  Rs. {Number(product.price).toFixed(2)}
                </div>
              </Link>

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
          ))}
        </div>
      )}
    </div>
  );
}