'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

interface Product {
  id: string;
  title: string;
  slug?: string;
  price: number;
  images?: string[];
  stock: number;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        id: product.id,
        title: product.title,
        price: Number(product.price),
        image: product.images?.[0] || 'https://via.placeholder.com/150',
        stock: product.stock,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-gray-600">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-0.5 bg-gray-50 text-gray-600 hover:bg-gray-200"
          >
            -
          </button>
          <span className="px-3 py-0.5 font-semibold text-gray-700">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-0.5 bg-gray-50 text-gray-600 hover:bg-gray-200"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`w-full py-1.5 rounded text-xs font-bold text-white transition-all ${
          added ? 'bg-green-600' : 'bg-[#F57224] hover:bg-[#d05a17]'
        }`}
      >
        {added ? '✓ Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}