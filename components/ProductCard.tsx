
import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5 text-stone-400 hover:text-red-500" />
        </button>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full shadow-lg">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-stone-900">₹{product.price}</span>
            <span className="text-stone-500 text-sm ml-1">/{product.unit}</span>
          </div>
          <button className="flex items-center space-x-2 bg-stone-900 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
