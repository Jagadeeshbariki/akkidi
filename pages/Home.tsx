
import React from 'react';
import { Link } from 'react-router-dom';
import { FPO_DATA } from '../constants';
import { ArrowRight, Leaf, ShieldCheck, Users, Sun } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/farm-hero/1920/1080" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Farming landscape"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-widest text-sm">
              <Sun className="w-5 h-5" />
              <span>Authentic Farmer Producer Org</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-tight">
              Akkidi: Goodness <br/> of Millets
            </h1>
            <p className="text-xl text-stone-200 leading-relaxed font-light">
              {FPO_DATA.tagline}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl hover:translate-y-[-2px] flex items-center space-x-2">
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#about" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-bold transition-all">
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-100 rounded-3xl -rotate-2 -z-10"></div>
          <img 
            src="https://picsum.photos/seed/akkidi-women/800/1000" 
            alt="Women Self Help Group" 
            className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-serif font-bold text-stone-800">Rooted in Empowering Farmers</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            {FPO_DATA.description}
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">Women Led</h4>
                <p className="text-sm text-stone-500">Empowering 500+ SHG members</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800">100% Organic</h4>
                <p className="text-sm text-stone-500">Pure produce, no pesticides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="bg-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-2">Shop By Category</h2>
              <p className="text-stone-400">Everything from farm staples to ready-to-eat treats.</p>
            </div>
            <Link to="/shop" className="text-emerald-400 font-bold flex items-center hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Ground Nuts', img: 'https://picsum.photos/seed/nuts/400/500' },
              { name: 'Vegetables', img: 'https://picsum.photos/seed/veggies/400/500' },
              { name: 'Crops', img: 'https://picsum.photos/seed/crops/400/500' },
              { name: 'RTE Snacks', img: 'https://picsum.photos/seed/snacks/400/500' },
            ].map((cat, i) => (
              <Link key={i} to={`/shop?cat=${cat.name}`} className="group relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
