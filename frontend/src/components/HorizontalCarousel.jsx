import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalCarousel = ({ title, subtitle, children, actionButton }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {actionButton}

          {/* Navigation Scroll Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-600 transition-all shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-5 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {React.Children.map(children, (child) => (
          <div className="w-[230px] sm:w-[260px] flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalCarousel;
