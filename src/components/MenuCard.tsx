import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR, cn } from '../lib/utils.ts';
import { toast } from 'react-toastify';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  variant?: 'vertical' | 'horizontal';
  isFeatured?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  id, 
  name, 
  description, 
  price, 
  imageUrl, 
  variant = 'vertical',
  isFeatured = false
}) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, qty: 1, imageUrl });
    toast.success(`Formula added to basket!`, {
      position: 'bottom-center',
      autoClose: 1500,
      theme: 'dark'
    });
  };

  if (variant === 'vertical') {
    return (
      <motion.div
        whileHover={{ y: -8, borderColor: '#e8ff00' }}
        className="bg-surface rounded-2xl overflow-hidden border border-border group h-full flex flex-col relative"
      >
        <Link to={`/product/${id}`} className="relative block aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
        </Link>
        <div className="p-6 flex flex-col flex-grow relative">
          <Link to={`/product/${id}`}>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors font-display tracking-wide">{name}</h3>
          </Link>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-black text-white">{formatPKR(price)}</span>
            <button
              onClick={handleAdd}
              className="bg-primary text-dark w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-all transform active:scale-90"
            >
              <Plus className="w-6 h-6 stroke-[3px]" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-surface rounded-3xl p-3 md:p-5 border border-border flex items-center gap-4 md:gap-6 group relative overflow-hidden"
    >
      <div className="flex-grow flex flex-col">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
        </Link>
        <p className="text-xs md:text-sm text-gray-500 mb-3 line-clamp-2 md:line-clamp-3 pr-2">{description}</p>
        <div className="flex items-center gap-4 mt-auto">
          <span className="font-bold text-white text-base md:text-lg">{formatPKR(price)}</span>
          <button
            onClick={handleAdd}
            className="bg-primary text-dark w-8 h-8 rounded-full flex items-center justify-center hover:bg-white transition-all transform active:scale-90"
          >
            <Plus className="w-5 h-5 stroke-[3px]" />
          </button>
        </div>
      </div>
      
      <Link to={`/product/${id}`} className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
        <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-2xl md:rounded-3xl border border-border transition-transform group-hover:scale-105" 
        />
        {isFeatured && (
          <div className="absolute top-1 right-1 bg-secondary text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-lg">
            Featured
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default MenuCard;
