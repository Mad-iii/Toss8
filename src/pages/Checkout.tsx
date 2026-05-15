import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR, WHATSAPP_NUMBER } from '../lib/utils.ts';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!customer.name || !customer.phone) {
      toast.error('Name and Phone are required');
      return false;
    }
    return true;
  };

  const getWhatsAppMessage = () => {
    let message = `Hi Toss 8! I'd like to order:\n`;
    cart.forEach(item => {
      message += `- ${item.name} x${item.qty} — ${formatPKR(item.price * item.qty)}\n`;
    });
    message += `\nTotal: ${formatPKR(total)}`;
    message += `\n\nName: ${customer.name}`;
    message += `\nPhone: ${customer.phone}`;
    if (customer.address) message += `\nAddress: ${customer.address}`;
    
    return encodeURIComponent(message);
  };

  const handleOrder = (type: 'whatsapp' | 'call') => {
    if (!validate()) return;
    
    if (type === 'whatsapp') {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`, '_blank');
    } else {
      window.location.href = `tel:+${WHATSAPP_NUMBER}`;
    }

    toast.success('Redirecting to order...', { position: 'bottom-center', theme: 'dark' });
    
    // In a pure frontend app, we might want to wait a bit before clearing cart
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark">
        <ShoppingBag className="w-16 h-16 text-white/10 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="bg-primary text-dark px-8 py-3 rounded-full font-bold">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-dark">
      <div className="max-w-5xl mx-auto">
        <Link to="/#menu" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-12 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Order Summary */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold border-b border-white/5 pb-4">Order Summary</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-3xl">
                  <div className="flex gap-4 items-center">
                    <img src={item.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
                    <div>
                      <h4 className="font-bold">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.qty} x {formatPKR(item.price)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-primary">{formatPKR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-darker p-8 rounded-3xl border border-white/10">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                <span>Items Subtotal</span>
                <span>{formatPKR(total)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 mb-6 pb-6 border-b border-white/5">
                <span>Delivery Fee</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold capitalize">Total Bill</span>
                <span className="text-3xl font-bold text-primary">{formatPKR(total)}</span>
              </div>
            </div>
          </section>

          {/* Customer Details */}
          <section className="bg-darker p-8 rounded-[40px] border border-white/5 sticky top-32">
            <h3 className="text-xl font-bold mb-8">Customer Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors"
                  placeholder="+92 3XX XXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Delivery Address (Optional)</label>
                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Enter your street address for delivery"
                />
              </div>

              <div className="pt-8 space-y-4">
                <button
                  onClick={() => handleOrder('whatsapp')}
                  className="w-full bg-green-600 text-white flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg hover:bg-green-500 transition-all shadow-xl shadow-green-500/10"
                >
                  <MessageCircle className="w-6 h-6" />
                  Order via WhatsApp
                </button>
                <button
                  onClick={() => handleOrder('call')}
                  className="w-full bg-primary text-dark flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all transform active:scale-95"
                >
                  <Phone className="w-6 h-6" />
                  Call to Order
                </button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">
                No payment gateway required. Pay on delivery or via direct transfer.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
