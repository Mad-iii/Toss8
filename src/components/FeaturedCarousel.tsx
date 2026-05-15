import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MenuItem } from '../data/menu.ts';
import MenuCard from './MenuCard.tsx';

interface FeaturedCarouselProps {
  items: MenuItem[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Couple seconds (4s)
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (items.length === 0) return null;

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 z-20 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-dark/50 border border-border text-white flex items-center justify-center hover:bg-primary hover:text-dark transition-all pointer-events-auto"
        >
          <ChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-dark/50 border border-border text-white flex items-center justify-center hover:bg-primary hover:text-dark transition-all pointer-events-auto"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Grid view for Desktop, Carousel for everything else or just specialized carousel */}
      {/* The user wants an infinite carousel specifically for featured section. 
          Usually this means a sliding row. */}
      
      <div className="max-w-7xl mx-auto px-4 overflow-hidden h-[500px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            className="absolute inset-x-0 mx-auto px-4 w-full md:max-w-md lg:max-w-5xl"
          >
             {/* Show current item and neighbors or just a focused view? 
                 Let's do a centered single focus for impact, or a multi-peek if on desktop. 
                 Since user asked for "infinite carousel", let's make it look premium. */}
             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 place-items-center">
                <div className="w-full max-w-sm md:max-w-none">
                    <MenuCard
                        id={items[currentIndex].id}
                        name={items[currentIndex].name}
                        description={items[currentIndex].description}
                        price={items[currentIndex].price}
                        imageUrl={items[currentIndex].imageUrl}
                        variant="vertical"
                    />
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary w-6' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
