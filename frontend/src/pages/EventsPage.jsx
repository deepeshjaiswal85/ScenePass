import React, { useState, useEffect } from 'react';
import { Calendar, Search, SlidersHorizontal } from 'lucide-react';
import EventCard from '../components/EventCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const EVENT_CATEGORIES = ['All', 'Concerts', 'Comedy', 'Workshops', 'Theatre', 'Festivals', 'Experiences'];

const EventsPage = () => {
  const { selectedCity } = useCity();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/events?city=${selectedCity}`)
      .then(res => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  const filtered = events
    .filter(e => selectedCategory === 'All' || e.category === selectedCategory)
    .filter(e => searchQuery === '' || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.venue.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Live Experience Finder
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          Events in <span className="text-cyan-400">{selectedCity}</span>
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[240px]">
            <input
              type="text"
              placeholder="Search event name or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-4 text-sm text-gray-200 placeholder-slate-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <h3 className="text-lg font-bold text-white">No Events Found</h3>
          <p className="text-xs text-slate-400">Try changing the category or location selector.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <EventCard key={item._id} item={item} type="event" />
          ))}
        </div>
      )}

    </div>
  );
};

export default EventsPage;
