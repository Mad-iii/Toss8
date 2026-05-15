import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Clock } from 'lucide-react';
import MenuCard from '../components/MenuCard.tsx';
import CategoryFilterBar from '../components/CategoryFilterBar.tsx';
import CategoryBanner from '../components/CategoryBanner.tsx';
import FeaturedCarousel from '../components/FeaturedCarousel.tsx';
import { MENU_ITEMS } from '../data/menu.ts';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Featured');
  
  const categories = ['Featured', 'Wok Dishes', 'Loaded Fries', 'Deals', 'Drinks', 'Sides'];

  // Search logic
  const filteredFeatured = MENU_ITEMS.filter(item => 
    item.featured && 
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.formula?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFilteredItems = (cat: string) => {
    return MENU_ITEMS.filter(item => 
      item.category === cat && 
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.formula?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Intersection Observer for sticky tab high-lighting
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
          const cat = categories.find(c => c.toLowerCase().replace(/\s+/g, '-') === id);
          if (cat) setActiveCategory(cat);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    categories.forEach(cat => {
      const el = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Hero Banner */}
      <section className="bg-dark pt-20">
         <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
            <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=1920" 
                className="w-full h-full object-cover opacity-50"
                alt="Wok Flare"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl md:text-5xl font-display text-primary leading-tight"
                >
                    WOK-FIRED. STREET-BORN.<br/>FAISALABAD'S CHEMISTRY.
                </motion.h1>
                <div className="flex gap-2 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
            </div>
         </div>
         
         {/* Info Bar */}
         <div className="flex border-y border-border h-12">
            <a href="tel:+923000000000" className="flex-1 flex items-center justify-center gap-2 border-r border-border hover:bg-surface transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Call Now</span>
            </a>
            <div className="flex-1 flex items-center justify-center gap-2 hover:bg-surface transition-colors">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">12 PM - 12 AM</span>
            </div>
         </div>
      </section>

      {/* Sticky Category Bar */}
      <CategoryFilterBar 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
      />

      {/* Featured Section */}
      <section id="featured" className="py-12 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-display text-white mb-8 border-l-4 border-primary pl-4 uppercase">Featured Items</h2>
          
          {filteredFeatured.length === 0 && searchTerm ? (
              <div className="text-center py-20 text-gray-500 font-display text-2xl tracking-widest">
                  NO FORMULAS FOUND. TRY ANOTHER REACTION.
              </div>
          ) : (
            <>
                {searchTerm ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredFeatured.map(item => (
                        <MenuCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            variant="vertical"
                        />
                    ))}
                  </div>
                ) : (
                  <FeaturedCarousel items={filteredFeatured} />
                )}
            </>
          )}
        </div>
      </section>

      {/* Category Sections */}
      {categories.slice(1).map((cat) => {
        const catItems = getFilteredItems(cat);
        if (catItems.length === 0 && searchTerm) return null;

        return (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, '-')}>
            <CategoryBanner title={cat} id={`${cat.toLowerCase().replace(/\s+/g, '-')}-banner`} />
            <div className="max-w-7xl mx-auto px-4 pb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catItems.map(item => (
                  <MenuCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    variant="horizontal"
                    isFeatured={item.featured}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Search Empty State Fallback */}
      {searchTerm && categories.every(cat => cat === 'Featured' ? filteredFeatured.length === 0 : getFilteredItems(cat).length === 0) && (
          <div className="flex-grow flex items-center justify-center py-40">
               <div className="text-center">
                    <p className="text-primary font-display text-4xl mb-4">NO REACTIONS DETECTED</p>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Try searching for simple components like "Wok" or "Fries"</p>
               </div>
          </div>
      )}
    </div>
  );
};

export default Home;
