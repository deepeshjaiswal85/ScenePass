import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Film, Calendar, Drama, Trophy, Activity, SlidersHorizontal } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import EventCard from '../components/EventCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import api from '../services/api';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [activeTab, setActiveTab] = useState('all');
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    Promise.all([
      api.get(`/movies?search=${encodeURIComponent(query)}`).catch(() => ({ data: [] })),
      api.get(`/events?search=${encodeURIComponent(query)}`).catch(() => ({ data: [] }))
    ]).then(([moviesRes, eventsRes]) => {
      setMovies(moviesRes.data || []);
      setEvents(eventsRes.data || []);
    }).finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          Search Results for <span className="text-emerald-400">"{query}"</span>
        </h1>
        <p className="text-xs text-slate-400">
          Found {movies.length + events.length} matching titles and experiences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        {[
          { id: 'all', label: `All Results (${movies.length + events.length})` },
          { id: 'movies', label: `Movies (${movies.length})` },
          { id: 'events', label: `Events (${events.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : (movies.length + events.length === 0) ? (
        <div className="py-20 text-center space-y-3">
          <Search className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Results Found</h3>
          <p className="text-xs text-slate-400">Try searching with a different keyword like "Cyberpunk", "Festival", or "Concert".</p>
        </div>
      ) : (
        <div className="space-y-10">
          {(activeTab === 'all' || activeTab === 'movies') && movies.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-xl text-white">Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
              </div>
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'events') && events.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-xl text-white">Events & Experiences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((e) => <EventCard key={e._id} item={e} type="event" />)}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchPage;
