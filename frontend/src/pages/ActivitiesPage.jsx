import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import EventCard from '../components/EventCard';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const ActivitiesPage = () => {
  const { selectedCity } = useCity();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/activities?city=${selectedCity}`)
      .then(res => setActivities(res.data))
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center gap-1.5">
          <Activity className="w-4 h-4" /> Adventure & Tourist Attractions
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
          Activities in <span className="text-emerald-400">{selectedCity}</span>
        </h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : activities.length === 0 ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          No activities listed for {selectedCity}. Explore other cities!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act) => (
            <EventCard key={act._id} item={act} type="activitie" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
