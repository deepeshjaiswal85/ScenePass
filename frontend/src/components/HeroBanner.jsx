import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Ticket, Clock, Sparkles, ChevronRight } from 'lucide-react';
import TrailerModal from './TrailerModal';

const HeroBanner = ({ featuredMovies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Auto rotate banner every 7 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies || featuredMovies.length === 0) return null;

  const current = featuredMovies[currentIndex];

  return (
    <>
      <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl min-h-[420px] md:min-h-[500px] flex items-end">
        {/* Background Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={current.bannerUrl}
            alt={current.title}
            className="w-full h-full object-cover opacity-60 scale-105 transition-all duration-1000"
          />
          {/* Multi-stage Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-6 md:p-12 max-w-2xl flex flex-col items-start gap-4">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {current.rating} IMDb
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 font-bold text-xs uppercase">
              {current.certification || 'UA'}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none drop-shadow-md">
              {current.title}
            </h1>
            {current.tagline && (
              <p className="text-emerald-400 font-medium text-sm md:text-base mt-2 italic">
                "{current.tagline}"
              </p>
            )}
          </div>

          {/* Genres & Duration */}
          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-300 font-medium">
            <span>{current.genres ? current.genres.join(' • ') : 'Sci-Fi'}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-emerald-400" />
              {current.durationMinutes} mins
            </span>
            <span>•</span>
            <span className="text-slate-400">{current.languages ? current.languages.slice(0, 3).join(', ') : 'Hindi'}</span>
          </div>

          {/* Description snippet */}
          <p className="text-slate-300 text-xs md:text-sm line-clamp-2 max-w-xl font-normal leading-relaxed">
            {current.description}
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <Link
              to={`/movie/${current._id}`}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-sm md:text-base flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <Ticket className="w-5 h-5 fill-slate-950" />
              <span>Book Tickets</span>
            </Link>

            <button
              onClick={() => setIsTrailerOpen(true)}
              className="px-5 py-3 rounded-2xl bg-slate-900/80 border border-slate-700 hover:border-slate-500 text-white font-heading font-bold text-sm md:text-base flex items-center gap-2 backdrop-blur-md transition-all hover:bg-slate-800"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        {featuredMovies.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            {featuredMovies.map((m, idx) => (
              <button
                key={m._id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-500/50'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={current.trailerUrl}
        title={current.title}
      />
    </>
  );
};

export default HeroBanner;
