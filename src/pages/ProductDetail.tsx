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
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 group transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Chemistry</span>
        </Link>

        {/* Product UI */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-border shadow-2xl shadow-primary/5"
          >
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
          </motion.div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-primary/20 uppercase">
                  {item.category}
                </span>
                <span className="text-gray-500 font-mono text-[10px]">REACTION ID: {item.formula || 'F-000'}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display text-white mb-4 leading-none">{item.name}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Base Cost</span>
                <span className="text-4xl font-black text-primary">{formatPKR(item.price)}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 p-4 bg-surface border border-border rounded-3xl w-fit">
               <span className="text-xs font-black uppercase tracking-widest px-2">Quantity</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-dark border border-border hover:border-primary transition-all active:scale-90"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-2xl font-display w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-dark border border-border hover:border-primary transition-all active:scale-90"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-dark py-6 rounded-[2rem] font-display text-3xl flex items-center justify-center gap-4 hover:bg-white transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
            >
              <ShoppingCart className="w-8 h-8" />
              ADD TO BASKET
            </button>
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
