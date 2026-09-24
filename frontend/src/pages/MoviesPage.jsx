import React, { useState, useEffect } from 'react';
import { Film, Filter, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const GENRES = ['All', 'Sci-Fi', 'Action', 'Adventure', 'Drama', 'Romance', 'Fantasy', 'Mystery', 'Comedy', 'Thriller'];
const LANGUAGES = ['All', 'Hindi', 'English', 'Telugu', 'Tamil', 'Rajasthani', 'Marathi'];

const MoviesPage = () => {
  const { selectedCity } = useCity();
  const [statusTab, setStatusTab] = useState('now_showing');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLang, setSelectedLang] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/movies?city=${selectedCity}`)
      .then(res => setMovies(res.data))
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  // Filter & Sort Logic
  const filteredMovies = movies
    .filter(m => m.status === statusTab)
    .filter(m => selectedGenre === 'All' || (m.genres && m.genres.includes(selectedGenre)))
    .filter(m => selectedLang === 'All' || (m.languages && m.languages.includes(selectedLang)))
    .filter(m => searchQuery === '' || m.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'price') return (a.startingPrice || 0) - (b.startingPrice || 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" /> Cinema Discover Engine
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Movies in <span className="text-emerald-400">{selectedCity}</span>
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setStatusTab('now_showing')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              statusTab === 'now_showing'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Now Showing ({movies.filter(m => m.status === 'now_showing').length})
          </button>
          <button
            onClick={() => setStatusTab('coming_soon')}
            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
              statusTab === 'coming_soon'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coming Soon ({movies.filter(m => m.status === 'coming_soon').length})
          </button>
        </div>
      </div>

      {/* Multi-Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Search */}
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search by movie title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2 pl-9 pr-4 text-sm text-gray-200 placeholder-slate-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl py-2 px-3 focus:outline-none focus:border-emerald-500"
            >
              <option value="rating">Highest Rated</option>
              <option value="title">Title (A-Z)</option>
              <option value="price">Starting Price</option>
            </select>
          </div>
        </div>

        {/* Genre Tags Scrollbar */}
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-medium block">Filter by Genre:</span>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedGenre === genre
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array(10).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">No Movies Match Your Criteria</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Try resetting your genre or language filter to discover available releases.
          </p>
          <button
            onClick={() => {
              setSelectedGenre('All');
              setSelectedLang('All');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
