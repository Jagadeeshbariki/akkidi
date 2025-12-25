
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Load products from localStorage or use initial ones
    const stored = localStorage.getItem('akkidi_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('akkidi_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Handle initial category from URL
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) {
      if (cat.includes('RTE')) setActiveCategory(Category.RTE);
      else if (cat.includes('Ground')) setActiveCategory(Category.GROUND_NUTS);
      else if (cat.includes('Veg')) setActiveCategory(Category.VEGETABLES);
      else if (cat.includes('Crop')) setActiveCategory(Category.CROPS);
    }
  }, [location.search]);

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-4">Our Marketplace</h1>
        <p className="text-stone-500 max-w-2xl mx-auto">Discover the freshest produce direct from our village fields and hand-crafted snacks made by local women collectives.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center text-sm font-bold text-stone-400 uppercase tracking-widest">
              <Filter className="w-4 h-4 mr-2" /> Categories
            </h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              {['All', ...Object.values(Category)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`px-4 py-2 rounded-lg text-left transition-all ${
                    activeCategory === cat 
                      ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-200 translate-x-1' 
                      : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
              <SlidersHorizontal className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-400">No products found</h3>
              <button onClick={() => {setActiveCategory('All'); setSearchQuery('')}} className="mt-4 text-emerald-600 font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
