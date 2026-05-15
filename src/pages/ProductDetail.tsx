import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu.ts';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR } from '../lib/utils.ts';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundItem = MENU_ITEMS.find(i => i.id === id);
    if (!foundItem) {
      toast.error('Item not found', { theme: 'dark' });
      navigate('/');
      return;
    }
    setItem(foundItem);
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: qty,
      imageUrl: item.imageUrl
    });
    toast.success(`Added ${qty} ${item.name} to cart!`, {
      position: 'bottom-center',
      theme: 'dark'
    });
  };

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <Link to="/#menu" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-3xl overflow-hidden border border-white/5"
          >
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4">{item.category}</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{item.name}</h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {item.description}
            </p>
            <p className="text-4xl font-bold text-white mb-10">{formatPKR(item.price)}</p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-6 bg-white/5 p-2 rounded-2xl border border-white/10 w-full sm:w-auto justify-between px-6">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="p-2 hover:text-primary transition-colors disabled:opacity-30"
                  disabled={qty <= 1}
                >
                  <Minus className="w-6 h-6" />
                </button>
                <span className="text-2xl font-bold w-8 text-center">{qty}</span>
                <button 
                  onClick={() => setQty(q => q + 1)}
                  className="p-2 hover:text-primary transition-colors"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full flex-grow flex items-center justify-center gap-3 bg-primary text-dark py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all transform active:scale-95"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
