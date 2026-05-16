import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-tertiary backdrop-blur-md border-b border-white/10 h-20 flex items-center shadow-lg">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center text-white">
        {/* Logo */}
      <Link to="/" className="hover:scale-105 transition-transform flex items-center">
        <img
          src="/images/Toss8_Text.png"
          alt="Toss8"
          className="h-14 md:h-16 w-auto object-contain"
        />
      </Link>

        {/* Location - Shown in center, text hidden on very small screens */}
        <div className="flex items-center gap-2 bg-surface px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border group cursor-pointer hover:border-primary/50 transition-all">
          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:animate-bounce" />
          <span className="text-[8px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white line-clamp-1">
            <span className="hidden xs:inline">37, Green Avenue, </span>FAISALABAD
          </span>
        </div>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative group p-2 md:p-3 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-all active:scale-90"
        >
          <ShoppingCart className="w-5 h-5 md:w-6 h-6 text-primary" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg border-2 border-dark">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
