
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex items-center justify-center">
               {/* Using a placeholder. In a real environment, the user would place their logo.png in the root */}
               <img 
                src="logo.png" 
                alt="AKKIDI Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/initials/svg?seed=AKKIDI&backgroundColor=059669";
                }}
               />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-stone-900 leading-none">AKKIDI</span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">Farmer Produce</span>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-sm font-semibold text-stone-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">Home</Link>
            <Link to="/shop" className="text-sm font-semibold text-stone-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">Shop</Link>
            <Link to="/admin" className="text-sm font-semibold text-stone-600 hover:text-emerald-600 transition-colors uppercase tracking-wider">Admin Portal</Link>
            <button className="relative p-2 hover:bg-stone-100 rounded-full transition-colors group">
              <ShoppingCart className="w-6 h-6 text-stone-700 group-hover:text-emerald-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-stone-600 hover:text-emerald-600 transition-colors">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 py-6 px-4 space-y-6 shadow-xl animate-in slide-in-from-top-5 duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-stone-800">Home</Link>
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-stone-800">Products</Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-stone-800">Admin Portal</Link>
          <div className="pt-4 border-t border-stone-100">
            <button className="flex items-center space-x-3 w-full bg-emerald-600 text-white p-4 rounded-xl font-bold">
              <ShoppingCart className="w-6 h-6" />
              <span>View Cart</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
