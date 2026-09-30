'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  price: number;
  stock: number;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Kya aap waqai is product ko delete karna chahte hain?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert('Product deleted successfully!');
      } else {
        const data = await res.json();
        alert('Failed to delete: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting.');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '24px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Manage Products (Admin)</h1>
        <Link
          href="/admin/products/new"
          style={{ padding: '10px 16px', backgroundColor: '#F57224', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <p style={{ color: '#000' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ color: '#000' }}>No products found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left', color: '#374151' }}>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Price (PKR)</th>
              <th style={{ padding: '12px' }}>Stock</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb', color: '#000' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{product.title}</td>
                <td style={{ padding: '12px' }}>Rs. {product.price}</td>
                <td style={{ padding: '12px' }}>{product.stock}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}