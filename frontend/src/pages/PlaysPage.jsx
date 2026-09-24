import React, { useState, useEffect } from 'react';
import { Drama, Search } from 'lucide-react';
import EventCard from '../components/EventCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const PlaysPage = () => {
  const { selectedCity } = useCity();
  const [plays, setPlays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/plays?city=${selectedCity}`)
      .then(res => setPlays(res.data))
      .catch(() => setPlays([]))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-violet-400 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
          <Drama className="w-4 h-4" /> Theatre & Performing Arts
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          Plays in <span className="text-violet-400">{selectedCity}</span>
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : plays.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          No theatre plays scheduled in {selectedCity} for this week. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plays.map((play) => (
            <EventCard key={play._id} item={play} type="play" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaysPage;
