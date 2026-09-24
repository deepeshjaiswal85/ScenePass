import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import EventCard from '../components/EventCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const SportsPage = () => {
  const { selectedCity } = useCity();
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/sports?city=${selectedCity}`)
      .then(res => setSports(res.data))
      .catch(() => setSports([]))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
          <Trophy className="w-4 h-4" /> Live Stadium & Marathon Matches
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          Sports in <span className="text-amber-400">{selectedCity}</span>
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : sports.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          No sports fixtures listed in {selectedCity} right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport) => (
            <EventCard key={sport._id} item={sport} type="sport" />
          ))}
        </div>
      )}
    </div>
  );
};

export default SportsPage;
