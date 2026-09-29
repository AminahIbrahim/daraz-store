export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
        
        {/* Column 1: Customer Care */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Customer Care</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">How to Buy</a></li>
            <li><a href="#" className="hover:text-orange-500">Returns & Refunds</a></li>
            <li>
              <a href="mailto:amnaibrahim0129@gmail.com" className="hover:text-orange-500 font-medium">
                Contact Us (Email)
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2: Earn with Daraz */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Earn with Daraz</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-orange-500">Daraz University</a></li>
            <li><a href="#" className="hover:text-orange-500">Sell on Daraz</a></li>
            <li><a href="#" className="hover:text-orange-500">Code of Conduct</a></li>
          </ul>
        </div>

        {/* Column 3: Developer Links */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Developer Links</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>
              <a 
                href="https://github.com/AminahIbrahim/daraz-store" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-orange-500 font-medium text-orange-600 underline"
              >
                GitHub Repository
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Download App */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Download App</h3>
          <div className="flex flex-col gap-3">
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2.5 rounded text-xs font-semibold text-center hover:bg-gray-800 transition block"
            >
              Google Play Store
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-black text-white px-4 py-2.5 rounded text-xs font-semibold text-center hover:bg-gray-800 transition block"
            >
              App Store
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 Daraz Clone. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built with Next.js, Prisma & Tailwind CSS</p>
      </div>
    </footer>
  );
}