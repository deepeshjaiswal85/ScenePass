import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { User, Ticket, Heart, MapPin, Calendar, Clock, ChevronRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import api from '../services/api';

const ProfilePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'info';

  const { user, logout, isAdmin } = useAuth();
  const { favorites } = useFavorites();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (user) {
      setLoadingBookings(true);
      api.get('/bookings')
        .then(res => setBookings(res.data || []))
        .catch(() => setBookings([]))
        .finally(() => setLoadingBookings(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Please Sign In</h2>
        <p className="text-xs text-slate-400">Log in to view your digital bookings and saved favorites.</p>
        <Link to="/login" className="px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-2xl flex items-center justify-center uppercase shadow-lg shadow-emerald-500/20">
            {user.name ? user.name[0] : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-2xl text-white">{user.name}</h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {user.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {user.city || 'Jaipur'}</span>
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 font-bold text-xs transition-colors border border-slate-700"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        {[
          { id: 'info', label: 'Personal Info', icon: User },
          { id: 'bookings', label: `My Bookings (${bookings.length})`, icon: Ticket },
          { id: 'favorites', label: `Saved Favorites (${favorites.length})`, icon: Heart },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchParams({ tab: tab.id });
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-sm transition-all ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Info */}
      {activeTab === 'info' && (
        <div className="max-w-2xl p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-heading font-bold text-lg text-white">User Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Full Name</span>
              <span className="font-bold text-white text-sm">{user.name}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Email Address</span>
              <span className="font-bold text-white text-sm">{user.email}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Phone Number</span>
              <span className="font-bold text-white text-sm">{user.phone || '+91 98765 43210'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block mb-1">Default City</span>
              <span className="font-bold text-white text-sm">{user.city || 'Jaipur'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {loadingBookings ? (
            <div className="h-40 bg-slate-900 rounded-3xl animate-pulse" />
          ) : bookings.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Active Bookings</h3>
              <p className="text-xs text-slate-400">Explore movies and live events to make your first booking!</p>
              <Link to="/movies" className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs inline-block">
                Browse Movies
              </Link>
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.bookingId || b._id} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5 w-full md:w-auto">
                  {b.itemImage && (
                    <img src={b.itemImage} alt={b.itemTitle} className="w-16 h-24 object-cover rounded-2xl border border-slate-700" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                        ID: {b.bookingId}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold text-[10px] uppercase">
                        {b.bookingType}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-xl text-white mt-1">{b.itemTitle}</h3>
                    <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-2">
                      <span>{b.venueName}, {b.city}</span>
                      <span>•</span>
                      <span>{b.date} ({b.time})</span>
                      <span>•</span>
                      <span className="text-white font-bold">Seats: {b.seats ? b.seats.join(', ') : 'GA'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Amount Paid</span>
                    <span className="font-heading font-extrabold text-emerald-400 text-lg">₹{b.totalAmount}</span>
                  </div>

                  <Link
                    to={`/confirmation/${b.bookingId || b._id}`}
                    state={{ booking: b }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs border border-emerald-500/30 transition-all flex items-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>View E-Ticket</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Saved Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Saved Favorites Yet</h3>
              <p className="text-xs text-slate-400">Click the heart icon on any movie or event to save it here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {favorites.map((fav) => (
                <MovieCard key={fav._id} movie={fav} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
