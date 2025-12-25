
import React, { useState, useEffect, useRef } from 'react';
import { Product, Category } from '../types';
import { Trash2, Plus, Sparkles, Image as ImageIcon, CheckCircle, Upload, X } from 'lucide-react';
import { generateProductDescription } from '../geminiService';

export const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [toast, setToast] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: Category.GROUND_NUTS,
    price: 0,
    description: '',
    image: '',
    unit: 'kg'
  });

  useEffect(() => {
    const stored = localStorage.getItem('akkidi_products');
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('akkidi_products', JSON.stringify(updated));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const fullProduct: Product = {
      ...newProduct as Product,
      id: `AK-${Date.now().toString().slice(-6)}`,
      image: newProduct.image || `https://picsum.photos/seed/${Date.now()}/600/400`
    };

    const updated = [fullProduct, ...products];
    saveToStorage(updated);
    setNewProduct({ name: '', category: Category.GROUND_NUTS, price: 0, description: '', image: '', unit: 'kg' });
    setIsAdding(false);
    showToast('Product added successfully!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveToStorage(updated);
    showToast('Product removed.');
  };

  const handleAIGen = async () => {
    if (!newProduct.name || !newProduct.category) {
      alert("Please enter product name and category first.");
      return;
    }
    setIsLoadingAI(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.category);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setIsLoadingAI(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {toast && (
        <div className="fixed bottom-8 right-8 bg-stone-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 z-50 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="text-emerald-400 w-5 h-5" />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-stone-900">Inventory Management</h1>
          <p className="text-stone-500 mt-1">Add, remove, and manage AKKIDI FPO products.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
            isAdding ? 'bg-stone-200 text-stone-600 hover:bg-stone-300' : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isAdding ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          <span>{isAdding ? 'Close Panel' : 'New Product'}</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[2rem] p-8 border border-stone-200 mb-12 shadow-2xl animate-in zoom-in-95 duration-300">
          <h2 className="text-2xl font-bold mb-8 text-stone-800">Add New Product to Shop</h2>
          <form onSubmit={handleAddProduct} className="grid lg:grid-cols-3 gap-10">
            {/* Image Upload Column */}
            <div className="space-y-4">
               <label className="block text-sm font-bold text-stone-500 uppercase tracking-widest">Product Image</label>
               <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative aspect-square rounded-3xl border-4 border-dashed border-stone-100 bg-stone-50 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all overflow-hidden"
               >
                 {newProduct.image ? (
                   <img src={newProduct.image} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                   <div className="flex flex-col items-center p-6 text-center">
                      <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-stone-400 group-hover:text-emerald-500" />
                      </div>
                      <p className="text-stone-500 font-medium">Click to upload photo</p>
                      <p className="text-xs text-stone-400 mt-2">High-res PNG or JPG</p>
                   </div>
                 )}
                 <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                 />
               </div>
               <div className="pt-2">
                 <label className="block text-xs font-bold text-stone-400 mb-1">OR USE URL</label>
                 <input 
                  type="text" 
                  className="w-full text-xs px-4 py-2 bg-stone-50 border border-stone-100 rounded-lg outline-none focus:ring-1 focus:ring-emerald-300"
                  placeholder="Paste image address..."
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                 />
               </div>
            </div>

            {/* Main Info Column */}
            <div className="space-y-6 lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Product Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    value={newProduct.name}
                    onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g., Organic Ground Nuts"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Category</label>
                  <select 
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-stone-400">₹</span>
                    <input 
                      required
                      type="number" 
                      className="w-full pl-10 pr-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                      value={newProduct.price}
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-600 mb-2">Unit</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    value={newProduct.unit}
                    onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                    placeholder="kg, box, pack..."
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-stone-600 uppercase tracking-wider">Product Description</label>
                  <button 
                    type="button"
                    onClick={handleAIGen}
                    disabled={isLoadingAI}
                    className="flex items-center space-x-2 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 disabled:opacity-50 transition-colors uppercase tracking-widest"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{isLoadingAI ? 'Magic in progress...' : 'AI Describe'}</span>
                  </button>
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none resize-none transition-all"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Describe your product's health benefits and origin..."
                />
              </div>
              
              <button className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-200 uppercase tracking-widest">
                Confirm & Add to Inventory
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-[2rem] border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
          <h3 className="font-bold text-stone-800">Current Stock ({products.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-100/30 text-stone-400">
              <tr>
                <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">ID & Name</th>
                <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Category</th>
                <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest">Price Info</th>
                <th className="px-8 py-5 font-bold uppercase text-[10px] tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                        <img src={p.image} className="w-full h-full object-cover" alt={p.name} />
                      </div>
                      <div>
                        <div className="font-black text-stone-900 text-lg leading-tight">{p.name}</div>
                        <div className="text-[11px] font-bold text-stone-400 mt-1 uppercase tracking-tighter">UID: {p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white border border-stone-200 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">{p.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-emerald-700 text-xl">₹{p.price}</div>
                    <div className="text-xs font-bold text-stone-400">per {p.unit}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => removeProduct(p.id)}
                      className="p-3 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto text-stone-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p className="font-bold">No products in inventory</p>
                      <p className="text-sm">Start by clicking "New Product" above.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
