'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Safe calculation for total items count
  const totalItemsCount = cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Shopping Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link
          href="/"
          className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Header with Back/Continue Shopping Link */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Shopping Cart ({totalItemsCount})</h1>
        <Link
          href="/"
          className="text-orange-600 font-semibold hover:underline flex items-center gap-1"
        >
          ← Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => {
            const itemPrice = Number(item.price) || 0;
            const itemQty = Number(item.quantity) || 1;

            return (
              <div
                key={item.id}
                className="border p-4 rounded-lg flex items-center justify-between bg-white shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title || 'Product'}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold text-sm md:text-base text-black">{item.title}</h2>
                    <p className="text-orange-500 font-bold">Rs. {itemPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, itemQty - 1))}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-black font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-black font-medium">{itemQty}</span>
                    <button
                      onClick={() => updateQuantity(item.id, itemQty + 1)}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-black font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Box */}
        <div className="border p-6 rounded-lg bg-gray-50 h-fit space-y-4">
          <h2 className="text-lg font-bold border-b pb-2 text-black">Order Summary</h2>

          <div className="flex justify-between font-bold text-lg text-black">
            <span>Total:</span>
            <span className="text-orange-500">Rs. {getTotalPrice().toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-md text-center block hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </Link>

          {/* Secondary Back Button under Summary */}
          <Link
            href="/"
            className="w-full text-center block text-sm text-gray-600 hover:text-orange-500 underline pt-2"
          >
            Add More Items
          </Link>
        </div>
      </div>
    </div>
  );
}