'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, QrCode, CheckCircle, Store, HelpCircle, PhoneCall, Mail, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [showAppDropdown, setShowAppDropdown] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const executeSearch = () => {
    if (searchQuery.trim()) {
      // Fixed: Routing to /search with ?q= parameter matching SearchPage
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <header className="bg-[#F57224] text-white sticky top-0 z-50 shadow-md">
      {/* Top Mini Navigation Bar */}
      <div className="bg-[#d85e19] text-xs py-1 border-b border-orange-600/30 relative">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-orange-100 font-medium">
          <div className="flex gap-6 items-center">
            
            {/* SAVE MORE ON APP */}
            <div className="relative">
              <span 
                onClick={() => { setShowAppDropdown(!showAppDropdown); setShowSellModal(false); setShowHelpModal(false); }}
                className="hover:underline cursor-pointer select-none font-semibold text-white"
              >
                SAVE MORE ON APP
              </span>
              {showAppDropdown && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white text-gray-800 rounded-lg shadow-xl p-4 z-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-bold text-gray-900 text-sm">Download Daraz App</h3>
                    <button onClick={() => setShowAppDropdown(false)} className="text-gray-500 hover:text-red-500 text-xs font-bold">✕</button>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Get Exclusive Vouchers & Scan QR code to enjoy free shipping!</p>
                  <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center mb-3">
                    <QrCode className="w-16 h-16 text-gray-700 mb-1" />
                    <span className="text-[10px] text-gray-500 font-mono">Scan to Download</span>
                  </div>
                  <div className="space-y-1 text-xs text-gray-700">
                    <div className="flex items-center gap-1.5 text-green-600 font-medium"><CheckCircle className="w-3.5 h-3.5" /> Free Shipping</div>
                    <div className="flex items-center gap-1.5 text-green-600 font-medium"><CheckCircle className="w-3.5 h-3.5" /> Exclusive Vouchers</div>
                  </div>
                </div>
              )}
            </div>

            {/* SELL ON DARAZ */}
            <div className="relative">
              <span 
                onClick={() => { setShowSellModal(!showSellModal); setShowAppDropdown(false); setShowHelpModal(false); }}
                className="hover:underline cursor-pointer select-none font-semibold text-white"
              >
                SELL ON DARAZ
              </span>
              {showSellModal && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl p-4 z-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5"><Store className="w-4 h-4 text-orange-500" /> Start Selling Today</h3>
                    <button onClick={() => setShowSellModal(false)} className="text-gray-500 hover:text-red-500 text-xs font-bold">✕</button>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Join thousands of sellers growing their business with Daraz Clone. Zero commission options available for new sellers!
                  </p>
                  <ul className="text-xs text-gray-700 space-y-1.5 mb-4 list-disc list-inside">
                    <li className="font-medium">Free registration with CNIC</li>
                    <li className="font-medium">Access to millions of buyers across Pakistan</li>
                    <li className="font-medium">Secure and timely weekly payments</li>
                  </ul>
                  <button 
                    onClick={() => { setShowSellModal(false); alert("Seller registration portal coming soon!"); }}
                    className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold text-xs hover:bg-orange-600 transition"
                  >
                    Register as Seller
                  </button>
                </div>
              )}
            </div>

            {/* HELP & SUPPORT */}
            <div className="relative">
              <span 
                onClick={() => { setShowHelpModal(!showHelpModal); setShowAppDropdown(false); setShowSellModal(false); }}
                className="hover:underline cursor-pointer select-none font-semibold text-white"
              >
                HELP & SUPPORT
              </span>
              {showHelpModal && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-xl p-4 z-50 border border-gray-200">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-orange-500" /> Customer Care</h3>
                    <button onClick={() => setShowHelpModal(false)} className="text-gray-500 hover:text-red-500 text-xs font-bold">✕</button>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">Need assistance with your order, return, or payment? We are here 24/7.</p>
                  <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-md border mb-3">
                    <div className="flex items-center gap-2 font-medium"><PhoneCall className="w-3.5 h-3.5 text-orange-500" /> Helpline: 021-111-DARAZ (32729)</div>
                    <div className="flex items-center gap-2 font-medium"><Mail className="w-3.5 h-3.5 text-orange-500" /> Support: support@darazclone.pk</div>
                  </div>
                  <button 
                    onClick={() => { setShowHelpModal(false); alert("Live chat support connecting..."); }}
                    className="w-full bg-gray-900 text-white py-2 rounded-md font-semibold text-xs hover:bg-black transition"
                  >
                    Start Live Chat
                  </button>
                </div>
              )}
            </div>

          </div>

          <div className="flex gap-4">
            <Link href="/login" className="hover:underline">LOGIN</Link>
            <Link href="/signup" className="hover:underline">SIGN UP</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-white whitespace-nowrap">
          Daraz Clone
        </Link>

        {/* Search Bar with useRef for focus */}
        <div className="flex-1 max-w-xl flex items-center bg-white rounded-md overflow-hidden shadow-inner">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search in Daraz Clone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                executeSearch();
              }
            }}
            className="w-full bg-white text-gray-900 placeholder-gray-400 text-sm py-2 px-4 focus:outline-none"
          />

          {/* Clear 'X' Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="text-gray-400 hover:text-gray-600 px-2.5 flex items-center justify-center transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button 
            type="button" 
            aria-label="Search" 
            onClick={executeSearch}
            className="bg-[#D05A17] hover:bg-[#b84e12] text-white px-4 py-2.5 transition-colors flex items-center justify-center cursor-pointer"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/login" className="flex items-center gap-1 hover:text-orange-100 transition-colors">
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>

          <Link href="/cart" className="relative flex items-center gap-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md transition-colors">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#F57224] animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}