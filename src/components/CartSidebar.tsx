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
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-darker">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag className="w-16 h-16 text-white/10 mb-4" />
                  <p className="text-gray-400">Your cart is empty.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-primary border border-primary/20 px-6 py-2 rounded-full hover:bg-primary hover:text-dark transition-all"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-500/10 p-1 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-auto">
                        <div className="flex items-center gap-3 bg-dark p-1 rounded-lg border border-white/10">
                          <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:text-primary"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:text-primary"><Plus className="w-4 h-4" /></button>
                        </div>
                        <span className="font-bold text-primary">{formatPKR(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-darker">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold text-primary">{formatPKR(total)}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full bg-primary text-dark py-4 rounded-2xl font-bold hover:bg-white transition-all transform active:scale-95"
                >
                  Proceed to Checkout
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
