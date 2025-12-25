
import React from 'react';
import { FPO_DATA } from '../constants';
import { Phone, Mail, MapPin, MessageCircle, Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-stone-400 py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center space-x-2 text-white">
            <Sprout className="w-8 h-8 text-emerald-500" />
            <span className="text-3xl font-bold tracking-tight">AKKIDI</span>
          </div>
          <p className="max-w-sm text-lg leading-relaxed">
            {FPO_DATA.tagline}
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://wa.me/918247859632" 
              className="p-3 bg-white/5 rounded-full hover:bg-emerald-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="/#/shop" className="hover:text-emerald-400 transition-colors">Marketplace</a></li>
            <li><a href="/#/admin" className="hover:text-emerald-400 transition-colors">Admin Portal</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Our Farmers</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              <span>{FPO_DATA.phone.join(', ')}</span>
            </li>
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              <span className="break-all">{FPO_DATA.email[0]}</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              <span>{FPO_DATA.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-sm text-center">
        &copy; {new Date().getFullYear()} AKKIDI Farmer Producer Organization. All rights reserved.
      </div>
    </footer>
  );
};
