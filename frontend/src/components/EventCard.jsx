import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, Ticket } from 'lucide-react';

const EventCard = ({ item, type = 'event' }) => {
  const detailPath = `/${type}s/${item._id}`;

  return (
    <div className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/90 text-slate-950 font-bold text-xs uppercase shadow-md">
            {item.category || type}
          </span>
        </div>

        {/* Rating Badge */}
        {item.rating && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-400 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{item.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          
          <div className="mt-2 flex flex-col gap-1 text-xs text-slate-400">
            {item.date && (
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {item.date} {item.time && `• ${item.time}`}
              </span>
            )}
            {item.venue && (
              <span className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {item.venue}, {item.city}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Tickets from</span>
            <span className="text-sm font-extrabold text-cyan-400">₹{item.startingPrice}</span>
          </div>

          <Link
            to={detailPath}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-bold text-xs border border-cyan-500/30 hover:border-cyan-500 transition-all"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Explore</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
