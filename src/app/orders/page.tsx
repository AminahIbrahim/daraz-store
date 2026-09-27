'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/orders')
        .then(async (res) => {
          const text = await res.text();
          try {
            return text ? JSON.parse(text) : [];
          } catch (e) {
            console.error('Invalid JSON response:', text);
            return [];
          }
        })
        .then((data) => {
          if (data && data.orders) {
            setOrders(data.orders);
          } else if (Array.isArray(data)) {
            setOrders(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
          setLoading(false);
        });
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Please Login to View Orders</h2>
        <p className="text-gray-600 mb-4 text-sm">You need to be logged in to see your purchase history.</p>
        <Link href="/login" className="bg-[#F57224] text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-[#d85e19]">
          Login Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Order History</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet (or API endpoint needs setup).</p>
          <Link href="/" className="bg-[#F57224] text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-[#d85e19]">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4 gap-2">
                <div>
                  <span className="text-xs text-gray-500 block">Order ID: {order.id}</span>
                  <span className="text-xs text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-orange-50 text-[#F57224] text-xs font-bold rounded-full border border-orange-200">
                    {order.status || 'Pending'}
                  </span>
                  <span className="font-bold text-gray-800 text-sm">Rs. {Number(order.totalAmount || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image || item.product?.images?.[0] || 'https://via.placeholder.com/80'}
                      alt={item.title || item.product?.title || 'Product'}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{item.title || item.product?.title || 'Product Name'}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-gray-800">Rs. {(Number(item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}