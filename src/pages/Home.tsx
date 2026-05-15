import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Flame, Clock, Leaf, MapPin, Phone, Instagram } from 'lucide-react';
import MenuCard from '../components/MenuCard.tsx';
import { MENU_ITEMS } from '../data/menu.ts';

const Home = () => {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Wraps', 'Salads', 'Drinks', 'Sides'];

  useEffect(() => {
    const filtered = filter === 'All' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === filter);
    setItems(filtered);
  }, [filter]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1920"
            className="w-full h-full object-cover opacity-40"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/20 to-dark" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-primary">
              TOSS 8
            </h1>
            <p className="text-xl md:text-3xl font-light text-gray-300 mb-8 tracking-wide">
              Fresh. Bold. <span className="text-white font-medium">Pakistani.</span>
            </p>
            <a
              href="#menu"
              className="inline-flex items-center gap-3 bg-primary text-dark px-10 py-5 rounded-full text-lg font-bold hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/20"
            >
              Order Now
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Categories / Menu Section */}
      <section id="menu" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">The Menu</h2>
              <p className="text-gray-400 max-w-lg">Hand-crafted wraps, vibrant salads, and refreshing drinks tailored for the bold.</p>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat 
                      ? 'bg-primary text-dark' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No items found for this category.</div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {items.map((item: any) => (
                <motion.div layout key={item.id}>
                  <MenuCard
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 bg-darker overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Taste Story</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Toss 8 was born from a simple idea: bringing the bold flavors of Pakistani street food into a modern, health-conscious context. We specialize in wraps that pack a punch and salads that satisfy, all made with premium ingredients sourced fresh every day.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-dark rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                  <Leaf className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Fresh Ingredients</span>
                </div>
                <div className="p-6 bg-dark rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                  <Clock className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Fast Delivery</span>
                </div>
                <div className="p-6 bg-dark rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-primary/50 transition-colors">
                  <Flame className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Made to Order</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border-8 border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1596797038530-2c39da5703d7?auto=format&fit=crop&q=80&w=800"
                  className="w-full h-full object-cover"
                  alt="About Toss 8"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-primary text-dark p-8 rounded-3xl hidden md:block">
                <p className="text-4xl font-bold">100%</p>
                <p className="text-sm font-bold uppercase tracking-widest">Handmade</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="location" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
             {/* Map Placeholder */}
            <div className="h-[450px] w-full rounded-3xl overflow-hidden grayscale contrast-125 border border-white/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14472.93482598379!2d67.060591!3d24.860734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e0638668741%3A0xe5433d76e4c25603!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Reach Out</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-gray-400">Phase 6, DHA, Karachi, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-gray-400">+92 300 000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Instagram</h4>
                    <p className="text-gray-400">@toss8pakistan</p>
                  </div>
                </div>
              </div>

              <div className="bg-darker p-8 rounded-3xl border border-white/5">
                <h4 className="font-bold text-xl mb-4">Opening Hours</h4>
                <div className="space-y-3">
                   <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Mon - Fri</span>
                    <span>12:00 PM - 12:00 AM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Sat - Sun</span>
                    <span>12:00 PM - 02:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
