'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (status === 'loading') {
      setError('Checking your session, please wait a moment and try again.');
      return;
    }

    if (!session?.user?.id) {
      setError('Please log in to place an order.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          totalAmount,
          userId: session.user.id,
          shippingAddress: `${shippingAddress}, ${city}`,
          fullName,
          phone,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      clearCart();
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to place order');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Order Placed!</h2>
            <p className="text-gray-600">Thank you for shopping with Daraz Clone. Redirecting you home...</p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Checkout</h1>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 shadow rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F57224] focus:border-[#F57224]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F57224] focus:border-[#F57224]"
            placeholder="03XXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F57224] focus:border-[#F57224]"
            placeholder="House #, Street #, Area"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F57224] focus:border-[#F57224]"
            placeholder="Karachi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#F57224] focus:border-[#F57224]"
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="JAZZCASH">JazzCash</option>
            <option value="EASYPAISA">EasyPaisa</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || cartItems.length === 0}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F57224] hover:bg-[#d05a17] focus:outline-none transition-colors cursor-pointer"
        >
          {loading ? 'Processing Order...' : `Place Order (Rs. ${totalAmount})`}
        </button>
      </form>
    </div>
  );
}