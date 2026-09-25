import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const imageUrl = product.images?.[0] || 'https://via.placeholder.com/500';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back to Products Navigation Button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors bg-gray-100 hover:bg-orange-50 px-4 py-2 rounded-lg border border-gray-200"
        >
          <span>&larr;</span> Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {/* Product Image */}
        <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border border-gray-200">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md mb-2">
              {product.category?.name || 'Category'}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-3xl font-extrabold text-orange-600 mb-4">
              Rs. {product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-4">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : 'Out of Stock'}
              </span>
            </div>
          </div>

          <AddToCartButton
            product={{ ...product, price: Number(product.price) }}
          />
        </div>
      </div>
    </div>
  );
}