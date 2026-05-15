import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR } from '../lib/utils.ts';
import { toast } from 'react-toastify';

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ id, name, description, price, imageUrl }) => {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, qty: 1, imageUrl });
    toast.success(`Added ${name} to cart!`, {
      position: 'bottom-center',
      autoClose: 2000,
      theme: 'dark'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-darker rounded-2xl overflow-hidden border border-white/5 group h-full flex flex-col"
    >
      <Link to={`/product/${id}`} className="relative block h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darker to-transparent opacity-60" />
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${id}`}>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">{formatPKR(price)}</span>
          <button
            onClick={handleAdd}
            className="bg-primary text-dark p-2 rounded-xl hover:bg-white hover:text-dark transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
