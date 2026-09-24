import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Film, Clock, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { ShowtimesSkeleton } from '../components/SkeletonLoader';
import api from '../services/api';

const ShowtimesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCity } = useCity();

  const [movie, setMovie] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Date selection state
  const [selectedDate, setSelectedDate] = useState('Today');
  const [formatFilter, setFormatFilter] = useState('All');
  const [timeOfDayFilter, setTimeOfDayFilter] = useState('All');

  // Dates list generator
  const dateOptions = [
    { label: 'Today', dateStr: 'Today' },
    { label: 'Tomorrow', dateStr: 'Tomorrow' },
    { label: 'Sat, 26 Sep', dateStr: '2026-09-26' },
    { label: 'Sun, 27 Sep', dateStr: '2026-09-27' },
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/movies/${id}`),
      api.get(`/cinemas?city=${selectedCity}`),
      api.get(`/shows?movieId=${id}&city=${selectedCity}`)
    ]).then(([movieRes, cinemaRes, showsRes]) => {
      setMovie(movieRes.data);
      setCinemas(cinemaRes.data || []);
      setShows(showsRes.data || []);
    }).catch(err => {
      console.error(err);
    }).finally(() => setLoading(false));
  }, [id, selectedCity]);

  // Group showtimes by cinema
  const getCinemaShows = (cinemaId) => {
    return shows.filter(s => {
      const matchesCinema = (s.cinemaId._id === cinemaId) || (s.cinemaId === cinemaId);
      const matchesFormat = formatFilter === 'All' || s.format === formatFilter;
      return matchesCinema && matchesFormat;
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="h-20 bg-slate-900 rounded-2xl animate-pulse" />
        <ShowtimesSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Movie Banner Header */}
      {movie && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img src={movie.posterUrl} alt={movie.title} className="w-16 h-24 object-cover rounded-xl border border-slate-700" />
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Showtime Selection</span>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">{movie.title}</h1>
              <p className="text-xs text-slate-400 mt-1">
                {movie.genres ? movie.genres.join(' • ') : 'Action'} | {movie.durationMinutes} mins | {movie.languages ? movie.languages.join(', ') : 'Hindi'}
              </p>
            </div>
          </div>

          <Link to={`/movie/${movie._id}`} className="text-xs font-bold text-slate-400 hover:text-emerald-400 flex items-center gap-1">
            Movie Details <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Control Bar: Date Selector & Format Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        
        {/* Date Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0 mr-1" />
          {dateOptions.map((opt) => (
            <button
              key={opt.dateStr}
              onClick={() => setSelectedDate(opt.dateStr)}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-sm transition-all whitespace-nowrap ${
                selectedDate === opt.dateStr
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Format & Time Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Format:</span>
            {['All', '2D', '3D', 'IMAX 3D', '4DX'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  formatFilter === fmt
                    ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          <div className="text-slate-400 font-medium">
            Showing cinemas in <span className="text-emerald-400 font-bold">{selectedCity}</span>
          </div>
        </div>
      </div>

      {/* Cinemas & Showtimes List */}
      <div className="space-y-6">
        {cinemas.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <MapPin className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Cinemas Found in {selectedCity}</h3>
            <p className="text-xs text-slate-400">Try switching your location in the top bar to view showtimes in nearby cities.</p>
          </div>
        ) : (
          cinemas.map((cinema) => {
            const cinemaShows = getCinemaShows(cinema._id);
            return (
              <div key={cinema._id} className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-4">
                
                {/* Cinema Info Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
                      {cinema.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {cinema.address} {cinema.landmark && `(${cinema.landmark})`}
                    </p>
                  </div>

                  {/* Facilities tags */}
                  {cinema.facilities && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {cinema.facilities.map((fac) => (
                        <span key={fac} className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-medium border border-slate-700">
                          {fac}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Showtimes Pills */}
                {cinemaShows.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No showtimes available for the selected format.</p>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    {cinemaShows.map((show) => (
                      <button
                        key={show._id}
                        onClick={() => navigate(`/show/${show._id}/seats`)}
                        className="group flex flex-col items-center p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/80 hover:bg-emerald-500/10 transition-all min-w-[110px]"
                      >
                        <span className="font-heading font-extrabold text-base text-white group-hover:text-emerald-400">
                          {show.startTime}
                        </span>
                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-slate-400">
                          <span className="text-emerald-400">{show.format}</span>
                          <span>•</span>
                          <span>{show.language}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-1 font-semibold">
                          From ₹{show.pricing ? show.pricing.regular : 200}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default ShowtimesPage;
