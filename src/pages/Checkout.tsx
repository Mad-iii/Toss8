import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, MessageCircle, Phone, ArrowLeft, ShieldCheck, User, MapPin, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { formatPKR, WHATSAPP_NUMBER, DISPLAY_PHONE } from '../lib/utils.ts';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    instructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getWhatsAppMessage = () => {
    let message = "🧪 TOSS8 | Wok Fries Chemistry\n";
    message += "━━━━━━━━━━━━━━━\n";
    message += "👤 CUSTOMER DETAILS:\n";
    message += `- Name: ${formData.name || 'Not provided'}\n`;
    message += `- Phone: ${formData.phone || 'Not provided'}\n`;
    message += `- Address: ${formData.address || 'Not provided'}\n`;
    if (formData.instructions) {
      message += `- Instructions: ${formData.instructions}\n`;
    }
    message += "━━━━━━━━━━━━━━━\n";
    message += "🛒 ORDER DETAILS:\n";
    cart.forEach(item => {
      message += `- ${item.name} x[${item.qty}] — ${formatPKR(item.price * item.qty)}\n`;
    });
    message += "━━━━━━━━━━━━━━━\n";
    message += `💰 TOTAL: ${formatPKR(total)}\n`;
    message += "━━━━━━━━━━━━━━━";
    
    return encodeURIComponent(message);
  };

  const handleOrder = (type: 'whatsapp' | 'call') => {
    if (type === 'whatsapp') {
      if (!formData.name || !formData.phone || !formData.address) {
        toast.error('Please complete all required fields (Name, Phone, Address)', { position: 'bottom-center', theme: 'dark' });
        return;
      }
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${getWhatsAppMessage()}`, '_blank');
    } else {
      window.location.href = `tel:+${WHATSAPP_NUMBER}`;
    }

    toast.success('Initiating order protocol...', { position: 'bottom-center', theme: 'dark' });
    
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dark">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-8 border border-white/5">
            <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h2 className="text-3xl font-display text-white mb-6 uppercase tracking-widest">Flask is empty</h2>
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-display text-xl uppercase tracking-widest hover:scale-105 transition-transform">
            Return to Lab
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-dark">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-12 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-[0.2em] text-[10px]">Back To Cart</span>
        </Link>

        <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display text-white mb-4 uppercase">Checkout</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">Intput Details Before Checkout</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Customer Form */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-2xl font-display text-white uppercase tracking-widest">Info</h3>
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Required</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="03XX XXXXXXX"
                    className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-5 h-5 text-primary" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Full street address, phase, city"
                    rows={3}
                    className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Special Instructions (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-primary" />
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Extra spicy, no salt, leave at gate, etc."
                    rows={2}
                    className="w-full bg-surface border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Experiment Log (Order Summary) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                <h3 className="text-2xl font-display text-white uppercase tracking-widest">Order Id</h3>
                <span className="text-[10px] text-gray-500 font-black tracking-widest uppercase">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-surface p-6 rounded-[2rem] border border-white/5">
                  <div className="flex gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-inner">
                        <img src={item.imageUrl} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1 uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[10px] font-black p-1 px-2 bg-white/5 inline-block rounded text-gray-500 uppercase tracking-widest">Qty: {item.qty} units</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-primary">{formatPKR(item.price * item.qty)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-tertiary p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck className="w-32 h-32 text-white" />
                </div>
                
                <div className="flex justify-between items-center text-gray-400 mb-4 font-bold uppercase tracking-widest text-[10px]">
                    <span>Subtotal</span>
                    <span>{formatPKR(total)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-400 mb-10 pb-8 border-b border-white/10 font-bold uppercase tracking-widest text-[10px]">
                    <span>Shipping</span>
                    <span className="text-primary tracking-normal">CALCULATED AT DISPATCH</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-2xl md:text-3xl font-display text-white uppercase tracking-[0.2em]">Total Bill</span>
                    <span className="text-4xl md:text-6xl font-black text-primary">{formatPKR(total)}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleOrder('whatsapp')}
                className="w-full bg-[#25D366] text-white flex items-center justify-center gap-4 py-6 rounded-[2.5rem] font-display text-3xl uppercase tracking-widest hover:scale-[1.02] transition-all transform active:scale-[0.98] shadow-2xl shadow-green-500/20"
              >
                <MessageCircle className="w-10 h-10 fill-white text-[#25D366]" />
                Order via WhatsApp
              </button>
              
              <button
                onClick={() => handleOrder('call')}
                className="w-full bg-primary text-white flex items-center justify-center gap-4 py-6 rounded-[2.5rem] font-display text-3xl uppercase tracking-widest hover:scale-[1.02] transition-all transform active:scale-[0.98] shadow-2xl shadow-primary/20"
              >
                <Phone className="w-10 h-10 fill-white text-primary" />
                Call: {DISPLAY_PHONE}
              </button>
            </div>

            <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">
                Direct connection to lab technician. secure checkout.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
