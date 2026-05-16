import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils.ts';

interface CategoryFilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
}

const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  onSearchChange 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-tertiary/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center overflow-hidden">
        
        {/* Search Expansion */}
        <div className="flex items-center flex-shrink-0 mr-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors pr-4 border-r border-white/10"
          >
            <Search className="w-5 h-5 text-primary" />
            <span className="hidden md:inline">Search</span>
          </button>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '180px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden ml-3"
              >
                <input
                  type="text"
                  placeholder="Formula code or name..."
                  className="bg-black/20 border border-white/10 px-3 py-1 rounded-md text-xs outline-none focus:border-primary w-full text-white placeholder:text-gray-400"
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative flex-grow text-center">
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 py-2 px-4 bg-black/20 rounded-full text-sm font-bold border border-white/10 text-primary uppercase"
            >
                {activeCategory}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-tertiary border border-white/10 rounded-2xl shadow-2xl py-2 overflow-y-auto max-h-[70vh] z-50 shadow-black"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    onCategoryChange(cat);
                                    setIsDropdownOpen(false);
                                    const el = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'));
                                    if (el) { window.scrollTo({ top: el.offsetTop - 140, behavior: 'smooth' }); }
                                }}
                                className={cn(
                                    "w-full px-6 py-3 text-left text-xs uppercase tracking-widest transition-colors",
                                    activeCategory === cat ? "bg-primary text-white font-black" : "hover:bg-white/5 text-gray-300"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex flex-grow items-center relative overflow-hidden h-full">
           <button onClick={() => scroll('left')} className="p-1 text-white hover:text-primary transition-colors"><ChevronLeft /></button>
           <div 
             ref={scrollRef}
             className="flex items-center gap-1 overflow-x-auto no-scrollbar h-full px-2 scroll-smooth"
           >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => {
                   onCategoryChange(cat);
                   const id = cat === 'Featured' ? 'featured' : cat.toLowerCase().replace(/\s+/g, '-');
                   const el = document.getElementById(id);
                   if (el) {
                       window.scrollTo({
                           top: el.offsetTop - 140,
                           behavior: 'smooth'
                       });
                   }
                 }}
                 className={cn(
                   "whitespace-nowrap px-6 h-full flex items-center justify-center text-[10px] font-black tracking-widest transition-all duration-300 uppercase",
                   activeCategory === cat 
                     ? "bg-primary text-white" 
                     : "text-gray-300 hover:text-white hover:bg-white/5"
                 )}
               >
                 {cat}
               </button>
             ))}
           </div>
           <button onClick={() => scroll('right')} className="p-1 text-white hover:text-primary transition-colors"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
