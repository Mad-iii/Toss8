import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menu.ts';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR } from '../lib/utils.ts';
import { toast } from 'react-toastify';
import MenuCard from '../components/MenuCard.tsx';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([]);
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundItem = MENU_ITEMS.find(i => i.id === id);
    if (!foundItem) {
      toast.error('Formula not found in database', { theme: 'dark' });
      navigate('/');
      return;
    }
    setItem(foundItem);
    
    // Find related items (same category, excluding current)
    const related = MENU_ITEMS
      .filter(i => i.category === foundItem.category && i.id !== id)
      .slice(0, 3);
    setRelatedItems(related);
    
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!item) return;
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: qty,
      imageUrl: item.imageUrl
    });
    toast.success(`${qty} units added to basket!`, {
      position: 'bottom-center',
      autoClose: 2000,
      theme: 'dark'
    });
  };

  if (!item) return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-primary">
      <ShoppingCart className="w-12 h-12 animate-bounce" />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-12 group transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-[0.3em] text-[10px]">Back to Laboratory</span>
        </Link>

        {/* Product UI */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-surface shadow-2xl relative group"
          >
            {imgError ? (
               <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-black/40">
                  <span className="text-primary font-display text-5xl leading-none uppercase mb-4">{item.name}</span>
                  <div className="w-12 h-1 bg-primary/20" />
               </div>
            ) : (
               <img src={item.imageUrl} alt={item.name} onError={() => setImgError(true)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>

          <div className="flex flex-col h-full justify-center">
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] border border-primary/20 uppercase">
                  {item.category}
                </span>
                <div className="h-[1px] w-12 bg-white/10" />
                <span className="text-gray-500 font-bold text-[10px] tracking-widest">FORMULA: {item.formula || 'F-EXP'}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-display text-white mb-6 leading-[0.9] uppercase">{item.name}</h1>
              <p className="text-gray-400 text-xl leading-relaxed italic border-l-4 border-primary/40 pl-6 max-w-xl">
                {item.description}
              </p>
            </div>

            <div className="mb-12">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] block mb-2">Base Experiment Yield</span>
               <div className="flex items-baseline gap-2">
                 <span className="text-5xl md:text-7xl font-black text-white">{formatPKR(item.price * qty)}</span>
                 {qty > 1 && <span className="text-gray-600 text-lg font-bold">({qty} units)</span>}
               </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
                <div className="flex items-center justify-between gap-6 p-2 pr-6 bg-tertiary border border-white/5 rounded-full">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-primary hover:text-white transition-all active:scale-90 text-gray-400"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-display w-8 text-center text-white">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-primary hover:text-white transition-all active:scale-90 text-gray-400"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Set Batch Quantity</span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary text-white py-4 md:py-0 px-10 rounded-full font-display text-3xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all transform active:scale-[0.98] shadow-2xl shadow-primary/30 uppercase"
                >
                  <ShoppingCart className="w-8 h-8" />
                  ADD TO BASKET
                </button>
            </div>
            
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              * Precision tossed for optimal molecular satisfaction.
            </p>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl font-display mb-8">GOES WELL WITH</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedItems.map(rel => (
                <MenuCard
                  key={rel.id}
                  id={rel.id}
                  name={rel.name}
                  description={rel.description}
                  price={rel.price}
                  imageUrl={rel.imageUrl}
                  variant="vertical"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
