'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category?: {
    name: string;
    slug?: string;
  };
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || 'https://via.placeholder.com/600'
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: selectedImage,
        stock: product.stock,
      },
      selectedQuantity
    );

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
      {/* Image Display */}
      <div className="space-y-4">
        <div className="relative w-full h-[380px] md:h-[450px] bg-gray-50 rounded-md overflow-hidden">
          <Image
            src={selectedImage}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Thumbnail Gallery */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-16 h-16 rounded border transition ${
                  selectedImage === img ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover rounded" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded">
            {product.category?.name || 'Category'}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">{product.title}</h1>
          <p className="text-3xl font-extrabold text-orange-500 mt-4">
            Rs. {product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Stock Info */}
          <div className="mt-4">
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${
                product.stock > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                disabled={selectedQuantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 text-sm font-semibold">{selectedQuantity}</span>
              <button
                onClick={() => setSelectedQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
                disabled={selectedQuantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-6 rounded-md font-bold text-white transition ${
              product.stock > 0
                ? 'bg-orange-500 hover:bg-orange-600 active:scale-[0.99]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>

          {addedMessage && (
            <p className="text-sm text-green-600 font-semibold mt-2 text-center">
              ✓ Added {selectedQuantity} item(s) to your cart!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}