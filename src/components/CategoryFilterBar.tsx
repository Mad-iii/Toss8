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
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-dark/95 backdrop-blur-md border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center overflow-hidden">
        
        {/* Search Expansion */}
        <div className="flex items-center flex-shrink-0 mr-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors pr-4 border-r border-border"
          >
            <Search className="w-5 h-5 text-primary" />
            <span className="hidden md:inline">Search</span>
          </button>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '150px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden ml-3"
              >
                <input
                  type="text"
                  placeholder="Formula code or name..."
                  className="bg-surface border border-border px-3 py-1 rounded-md text-xs outline-none focus:border-primary w-full"
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
                className="inline-flex items-center gap-2 py-2 px-4 bg-surface rounded-full text-sm font-bold border border-border text-primary"
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-darker border border-border rounded-2xl shadow-xl py-2 overflow-hidden"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    onCategoryChange(cat);
                                    setIsDropdownOpen(false);
                                }}
                                className={cn(
                                    "w-full px-4 py-3 text-left text-sm transition-colors",
                                    activeCategory === cat ? "bg-primary text-dark font-bold" : "hover:bg-surface text-gray-400"
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
           <button onClick={() => scroll('left')} className="p-1 hover:text-primary"><ChevronLeft /></button>
           <div 
             ref={scrollRef}
             className="flex items-center gap-2 overflow-x-auto no-scrollbar h-full px-2 scroll-smooth"
           >
             {categories.map((cat) => (
               <button
                 key={cat}
                 onClick={() => {
                   onCategoryChange(cat);
                   const el = document.getElementById(cat.toLowerCase().replace(/\s+/g, '-'));
                   if (el) {
                       const offset = 140; // sticky bar heights
                       window.scrollTo({
                           top: el.offsetTop - offset,
                           behavior: 'smooth'
                       });
                   }
                 }}
                 className={cn(
                   "whitespace-nowrap px-6 h-full flex items-center justify-center text-sm font-bold tracking-wider transition-all duration-300",
                   activeCategory === cat 
                     ? "bg-primary text-dark" 
                     : "text-gray-400 hover:text-white"
                 )}
               >
                 {cat.toUpperCase()}
               </button>
             ))}
           </div>
           <button onClick={() => scroll('right')} className="p-1 hover:text-primary"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilterBar;
