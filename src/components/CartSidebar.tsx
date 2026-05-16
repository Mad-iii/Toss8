import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR } from '../lib/utils.ts';
import { useNavigate } from 'react-router-dom';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cart, total, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-dark border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-tertiary shadow-xl">
              <h2 className="text-2xl font-display text-white flex items-center gap-3 uppercase tracking-widest">
                <ShoppingBag className="w-6 h-6 text-primary" />
                Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-dark">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag className="w-16 h-16 text-white/5 mb-6" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Flask is currently empty</p>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white px-10 py-3 rounded-full font-display text-xl uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
                  >
                    Start Fusion
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-surface rounded-3xl border border-white/5 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white uppercase tracking-tight leading-tight">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-primary p-1 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center gap-4 bg-black/40 p-1.5 rounded-xl border border-white/5">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 text-gray-500 hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm font-bold w-4 text-center text-white">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 text-gray-500 hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <span className="font-black text-primary">{formatPKR(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-tertiary shadow-reverse-xl">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total</span>
                  <span className="text-3xl font-black text-white">{formatPKR(total)}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full bg-primary text-white py-5 rounded-[2rem] font-display text-3xl uppercase tracking-widest hover:scale-[1.02] transition-all transform active:scale-95 shadow-2xl shadow-primary/30"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
