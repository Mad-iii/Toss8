import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Clock } from 'lucide-react';
import MenuCard from '../components/MenuCard.tsx';
import CategoryFilterBar from '../components/CategoryFilterBar.tsx';
import CategoryBanner from '../components/CategoryBanner.tsx';
import { MENU_ITEMS } from '../data/menu.ts';

const CATEGORIES = [
  'Wok Tossed Chicken with Fries',
  'Wok Tossed Beef',
  'Wok Tossed Noodles',
  'Wok Tossed Chicken With Sticky Rice',
  'Wok Tossed Wings',
  'Wok Tossed Dumplings',
  'Add Ons',
  'Deals',
  'Beverages'
];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('Wok Tossed Chicken with Fries');
    const [searchTerm, setSearchTerm] = useState('');

    const categoriesData = CATEGORIES.map(category => ({
        name: category,
        id: category.toLowerCase().replace(/\s+/g, '-'),
        items: MENU_ITEMS.filter(item => 
            item.category === category && (
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.formula?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }));

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-150px 0px -40% 0px',
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const cat = CATEGORIES.find(c => c.toLowerCase().replace(/\s+/g, '-') === id);
                    if (cat) setActiveCategory(cat);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        
        CATEGORIES.forEach(cat => {
            const el = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'));
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
      <div className="bg-dark min-h-screen text-white pt-20">
        <CategoryFilterBar 
            categories={CATEGORIES} 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
            onSearchChange={setSearchTerm}
        />

        {/* Hero Section */}
        <section className="relative h-[250px] md:h-[400px] flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="w-full h-full"
                >
                    <img 
                        src="https://images.unsplash.com/photo-1512132411229-c30391241dd8?auto=format&fit=crop&q=80&w=1600" 
                        alt="Hero background" 
                        className="w-full h-full object-cover opacity-50"
                    />
                </motion.div>
            </div>
            
            <div className="relative z-10 text-center px-4">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display text-primary leading-tight uppercase"
                >
                    WOK-FIRED. STREET-BORN.<br/>FAISALABAD'S CHEMISTRY.
                </motion.h1>
                <div className="flex justify-center gap-3 mt-6">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-75" />
                    <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse delay-150" />
                </div>
            </div>
        </section>

        {/* Info Bar */}
        <div className="flex bg-tertiary border-y border-white/5 h-14 max-w-7xl mx-auto md:rounded-full md:my-8 md:px-8 items-center shadow-xl">
            <a href="tel:+923111170558" className="flex-1 flex items-center justify-center gap-3 border-r border-white/5 hover:bg-white/5 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-300">Call: 03111170558</span>
            </a>
            <div className="flex-1 flex items-center justify-center gap-3 hover:bg-white/5 transition-colors">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-300">11:00 AM - 02:00 AM</span>
            </div>
        </div>f

        {/* Global Search Results if searching */}
        {searchTerm && (
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl text-primary text-center font-bold font-display tracking-widest">
                    REACTION ANALYSIS FOR: "{searchTerm.toUpperCase()}"
                </div>
            </div>
        )}

        {/* Menu Categories */}
        {categoriesData.map(category => (
            category.items.length > 0 && (
                <div key={category.id} className="pb-20">
                    <CategoryBanner title={category.name} id={category.id} />
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {category.items.map(item => (
                                <MenuCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    variant="horizontal"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )
        ))}
        
        {/* Footer */}
        <footer className="bg-tertiary py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-display text-primary mb-4 uppercase tracking-widest">TOSS8 | WOK FRIES CHEMISTRY</h3>
                <div className="w-20 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="p-8 border border-white/5 rounded-3xl bg-black/20 backdrop-blur-sm">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">Location</p>
                    <p className="text-white font-bold text-lg">37, Green Avenue,<br/>FAISALABAD</p>
                </div>
                <div className="p-8 border border-white/5 rounded-3xl bg-black/20 backdrop-blur-sm">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">Open Hours</p>
                    <p className="text-white font-bold text-lg">11:00 AM<br/>TO 02:00 AM</p>
                </div>
                <div className="p-8 border border-white/5 rounded-3xl bg-black/20 backdrop-blur-sm">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">Direct Link</p>
                    <p className="text-white font-bold text-lg underline decoration-primary underline-offset-8">03111170558</p>
                </div>
            </div>
          </div>
        </footer>
      </div>
    );
};

export default Home;