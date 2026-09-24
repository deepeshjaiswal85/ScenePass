import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Film, MapPin, Search, Heart, User, Shield, LogOut, ChevronDown, 
  Menu, X, Ticket, Sparkles, Calendar, Trophy, Activity, Drama 
} from 'lucide-react';
import { useCity } from '../context/CityContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import LocationModal from './LocationModal';
import api from '../services/api';

const Navbar = () => {
  const { selectedCity } = useCity();
  const { user, logout, isAdmin } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const searchRef = useRef(null);

  // Live search debounce handler
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        api.get(`/movies?search=${encodeURIComponent(searchQuery)}`)
          .then(res => {
            setSearchSuggestions(res.data.slice(0, 5));
            setShowSuggestions(true);
          })
          .catch(() => setSearchSuggestions([]))
          .finally(() => setIsSearching(false));
      }, 250);

      return () => clearTimeout(timer);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navCategories = [
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Plays', path: '/plays', icon: Drama },
    { name: 'Sports', path: '/sports', icon: Trophy },
    { name: 'Activities', path: '/activities', icon: Activity },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
        {/* Top Navbar Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <Ticket className="w-6 h-6 fill-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white flex items-center gap-1">
                  Scene<span className="text-emerald-400">Pass</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-400/80 -mt-1">
                  Live & Motion
                </span>
              </div>
            </Link>

            {/* Location Selector Button */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all text-sm font-medium"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          {/* Global Search Bar with Live Suggestions */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies, events, plays, activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 rounded-full py-2 pl-10 pr-4 text-sm text-gray-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Live Auto-Suggest Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/80">
                {searchSuggestions.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery('');
                      navigate(`/movie/${item._id}`);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-slate-800/90 cursor-pointer transition-colors"
                  >
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-10 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                      <p className="text-xs text-slate-400 truncate">
                        {item.genres ? item.genres.join(', ') : 'Movie'} • ⭐ {item.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-3">
            {/* Favorites Icon */}
            <Link
              to="/profile?tab=favorites"
              className="relative p-2.5 rounded-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 transition-all"
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-md">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Admin Badge shortcut if Admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            {/* Auth Button or User Profile Pill */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-white transition-all text-sm font-medium"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center uppercase">
                    {user.name ? user.name[0] : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 divide-y divide-slate-800/80">
                    <div className="px-3 py-2">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 rounded-xl transition-all"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/profile?tab=bookings"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-emerald-400 rounded-xl transition-all"
                      >
                        <Ticket className="w-4 h-4" />
                        My Bookings
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm text-amber-400 hover:bg-slate-800 rounded-xl transition-all"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <div className="border-t border-slate-800/80 bg-slate-950/60 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <nav className="flex items-center gap-1">
              {navCategories.map((cat) => {
                const Icon = cat.icon;
                const isActive = location.pathname.startsWith(cat.path);
                return (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                      isActive
                        ? 'text-emerald-400 border-emerald-400 bg-emerald-500/5'
                        : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400/90">
                <Sparkles className="w-3.5 h-3.5" /> 100% Instant QR E-Tickets
              </span>
              <span>•</span>
              <span>Zero Convenience Fee on First Booking</span>
            </div>
          </div>
        </div>
      </header>

      {/* Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
