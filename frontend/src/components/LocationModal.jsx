import React, { useState } from 'react';
import { MapPin, X, Check, Search } from 'lucide-react';
import { useCity } from '../context/CityContext';

const LocationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { selectedCity, changeCity, CITIES } = useCity();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredCities = CITIES.filter(c => 
    c.label.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Select Your City</h3>
              <p className="text-xs text-slate-400">Showtimes and events update based on your region</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Search */}
        <div className="my-4 relative">
          <input
            type="text"
            placeholder="Search city..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-slate-500 focus:outline-none transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* City Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
          {filteredCities.map((c) => {
            const isSelected = selectedCity === c.name;
            return (
              <button
                key={c.name}
                onClick={() => {
                  changeCity(c.name);
                  onClose();
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-800/40 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-3xl mb-2">{c.icon}</span>
                <span className="text-sm font-semibold flex items-center gap-1">
                  {c.label}
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-500">
            Selected city is remembered automatically across your booking sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
