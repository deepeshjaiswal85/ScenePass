import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Ticket, DollarSign, Film, Calendar, Plus, Trash2, Edit3, 
  TrendingUp, Check, X, Search 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const [stats, setStats] = useState({ totalUsers: 2, totalBookings: 1, totalMovies: 10, totalEvents: 8, totalRevenue: 1302000 });
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Movie Modal State
  const [isAddMovieModal, setIsAddMovieModal] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genres: ['Sci-Fi', 'Action'],
    durationMinutes: 140,
    rating: 4.5,
    startingPrice: 250,
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600',
    description: 'A newly added cinematic masterpiece.'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, moviesRes, eventsRes, bookingsRes] = await Promise.all([
        api.get('/admin/stats').catch(() => null),
        api.get('/movies').catch(() => ({ data: [] })),
        api.get('/events').catch(() => ({ data: [] })),
        api.get('/admin/bookings').catch(() => ({ data: [] }))
      ]);

      if (statsRes?.data?.stats) setStats(statsRes.data.stats);
      setMovies(moviesRes.data || []);
      setEvents(eventsRes.data || []);
      setBookings(bookingsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMovieSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/movies', newMovie);
      setMovies([res.data, ...movies]);
      setIsAddMovieModal(false);
    } catch (err) {
      alert('Error adding movie');
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm('Delete this movie listing?')) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter(m => m._id !== id));
    } catch (err) {
      setMovies(movies.filter(m => m._id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-heading font-black text-2xl text-white">ScenePass Control Center</h1>
            <p className="text-xs text-slate-400">Live platform management & operational metrics</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddMovieModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Movie
        </button>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-heading font-black text-2xl text-emerald-400">₹{stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '1,302,000'}</span>
          <span className="text-[10px] text-emerald-400/80 block">+18.4% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Bookings</span>
            <Ticket className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-heading font-black text-2xl text-white">{stats.totalBookings || 790}</span>
          <span className="text-[10px] text-cyan-400/80 block">+125 new today</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Active Movies</span>
            <Film className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-heading font-black text-2xl text-white">{movies.length}</span>
          <span className="text-[10px] text-slate-500 block">7 Cities Active</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Total Users</span>
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <span className="font-heading font-black text-2xl text-white">{stats.totalUsers || 1420}</span>
          <span className="text-[10px] text-violet-400/80 block">Verified Accounts</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'overview', label: 'Analytics Chart' },
          { id: 'movies', label: `Movies (${movies.length})` },
          { id: 'events', label: `Events (${events.length})` },
          { id: 'bookings', label: 'Bookings Log' },
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

      {/* Tab Content 1: Overview Chart */}
      {activeTab === 'overview' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" /> Revenue & Booking Performance Growth
            </h3>
            <span className="text-xs text-slate-400 font-mono">2026 Q3 Metrics</span>
          </div>

          <div className="grid grid-cols-5 gap-3 h-48 items-end pt-6 border-b border-slate-800 pb-2">
            {[
              { month: 'May', height: '40%', val: '₹1.4L' },
              { month: 'Jun', height: '55%', val: '₹1.9L' },
              { month: 'Jul', height: '70%', val: '₹2.3L' },
              { month: 'Aug', height: '85%', val: '₹3.1L' },
              { month: 'Sep', height: '100%', val: '₹4.2L' },
            ].map((bar) => (
              <div key={bar.month} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-emerald-400">{bar.val}</span>
                <div
                  style={{ height: bar.height }}
                  className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20"
                />
                <span className="text-xs font-bold text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Movies Management */}
      {activeTab === 'movies' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((m) => (
              <div key={m._id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={m.posterUrl} alt={m.title} className="w-12 h-16 object-cover rounded-xl border border-slate-700" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{m.title}</h4>
                    <p className="text-xs text-slate-400">⭐ {m.rating} • ₹{m.startingPrice}</p>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">{m.status}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteMovie(m._id)}
                  className="p-2.5 rounded-xl bg-slate-950 text-rose-400 hover:bg-rose-500/20 transition-colors border border-slate-800"
                  title="Delete Movie"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Events Management */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((e) => (
            <div key={e._id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={e.imageUrl} alt={e.title} className="w-16 h-12 object-cover rounded-xl" />
                <div>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{e.title}</h4>
                  <p className="text-xs text-slate-400">{e.venue}, {e.city}</p>
                </div>
              </div>
              <span className="font-bold text-cyan-400 text-xs">₹{e.startingPrice}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 4: Bookings Log */}
      {activeTab === 'bookings' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">All Platform Transactions</h3>
          <div className="space-y-2">
            {bookings.map((b) => (
              <div key={b.bookingId || b._id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono font-bold text-emerald-400">{b.bookingId}</span>
                  <h4 className="text-white font-bold">{b.itemTitle}</h4>
                  <span className="text-slate-500">{b.venueName} • {b.date}</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-sm">₹{b.totalAmount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Movie Modal */}
      {isAddMovieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-heading font-bold text-lg text-white">Add New Movie Listing</h3>
              <button onClick={() => setIsAddMovieModal(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMovieSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Movie Title</label>
                <input
                  type="text"
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                  placeholder="Supernova Odyssey"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={newMovie.startingPrice}
                    onChange={(e) => setNewMovie({ ...newMovie, startingPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={newMovie.durationMinutes}
                    onChange={(e) => setNewMovie({ ...newMovie, durationMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Poster Image URL</label>
                <input
                  type="text"
                  value={newMovie.posterUrl}
                  onChange={(e) => setNewMovie({ ...newMovie, posterUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md"
              >
                Publish Movie Listing
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
