import React from 'react';
import { Plus } from 'lucide-react';

interface CategoryBannerProps {
  title: string;
  id: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ title, id }) => {
  return (
    <div id={id} className="relative w-full h-32 md:h-48 bg-dark overflow-hidden flex items-center mt-12 mb-8">
      {/* Repeating Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 10px 10px, white 2px, transparent 0)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-6 relative z-10">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary flex items-center justify-center text-dark flex-shrink-0">
          <Plus className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h2 className="text-5xl md:text-8xl font-display text-primary whitespace-nowrap leading-none pt-2">
          {title}
        </h2>
        <div className="flex-grow h-[2px] bg-primary/30 mt-2 min-w-[20px]" />
      </div>
    </div>
  );
};

export default CategoryBanner;
