import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Main Promo Banner */}
      <div className="lg:col-span-3 relative h-[220px] sm:h-[300px] md:h-[350px] rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
          alt="Fashion Sale Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex flex-col justify-center p-6 text-white">
          <span className="text-xs uppercase tracking-widest font-bold bg-orange-500 text-white px-2 py-1 rounded w-max mb-2">
            Fashion Sale
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-2">UP TO 70% OFF</h2>
          <p className="text-xs sm:text-sm text-gray-200 mb-4 max-w-sm">
            Extra 15% off with fashion vouchers on top trending collections.
          </p>
          <button className="bg-[#F57224] hover:bg-[#d05a17] text-white text-sm font-bold px-5 py-2.5 rounded-md w-max transition-all shadow-md">
            Shop Now
          </button>
        </div>
      </div>

      {/* Right Side App Download Card */}
      <div className="hidden lg:flex flex-col justify-between bg-orange-50 p-4 rounded-lg border border-orange-100 shadow-sm">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase">Download App</span>
          <h3 className="text-base font-bold text-gray-900 mt-1">Get Exclusive Vouchers</h3>
          <p className="text-xs text-gray-600 mt-1">Scan QR code to download app & enjoy free shipping!</p>
        </div>
        
        <div className="bg-white p-3 rounded-md border border-gray-200 text-center my-3">
          <div className="w-24 h-24 bg-gray-200 mx-auto rounded flex items-center justify-center text-xs text-gray-500 font-mono">
            [ QR Code ]
          </div>
        </div>

        <div className="text-xs font-semibold text-gray-700 space-y-1">
          <p className="flex items-center gap-1.5 text-green-700">✓ Free Shipping</p>
          <p className="flex items-center gap-1.5 text-green-700">✓ Exclusive Vouchers</p>
        </div>
      </div>
    </div>
  );
}