import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Clock, Ticket } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(movie._id);

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            fav
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          title={fav ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-white' : ''}`} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 font-bold text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{movie.rating}</span>
          {movie.votesCount && (
            <span className="text-[10px] text-slate-400 font-normal">
              ({(movie.votesCount / 1000).toFixed(1)}k)
            </span>
          )}
        </div>

        {/* Certification / Format Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 font-bold text-[10px] border border-slate-700 uppercase">
            {movie.certification || 'UA'}
          </span>
          {movie.formats && movie.formats[0] && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-slate-950 font-bold text-[10px] uppercase">
              {movie.formats[0]}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          
          <p className="text-xs text-slate-400 mt-1 line-clamp-1">
            {movie.genres ? movie.genres.join(' • ') : 'Action • Sci-Fi'}
          </p>
        </div>

        {/* Duration & Language info */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {movie.durationMinutes} mins
          </span>
          <span className="truncate max-w-[110px] font-medium text-slate-300">
            {movie.languages ? movie.languages.slice(0, 2).join(', ') : 'Hindi'}
          </span>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Starts from</span>
            <span className="text-sm font-extrabold text-emerald-400">₹{movie.startingPrice || 200}</span>
          </div>

          <Link
            to={`/movie/${movie._id}`}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 hover:border-emerald-500 transition-all shadow-sm"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Book</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
