import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Film, Calendar, Trophy, Drama, Activity, ArrowRight } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import EventCard from '../components/EventCard';
import HorizontalCarousel from '../components/HorizontalCarousel';
import { CardSkeleton } from '../components/SkeletonLoader';
import { useCity } from '../context/CityContext';
import api from '../services/api';

const Home = () => {
  const { selectedCity } = useCity();
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);
  const [plays, setPlays] = useState([]);
  const [sports, setSports] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/movies?city=${selectedCity}`).catch(() => ({ data: [] })),
      api.get(`/events?city=${selectedCity}`).catch(() => ({ data: [] })),
      api.get(`/plays?city=${selectedCity}`).catch(() => ({ data: [] })),
      api.get(`/sports?city=${selectedCity}`).catch(() => ({ data: [] })),
      api.get(`/activities?city=${selectedCity}`).catch(() => ({ data: [] })),
    ]).then(([moviesRes, eventsRes, playsRes, sportsRes, activitiesRes]) => {
      setMovies(moviesRes.data || []);
      setEvents(eventsRes.data || []);
      setPlays(playsRes.data || []);
      setSports(sportsRes.data || []);
      setActivities(activitiesRes.data || []);
    }).finally(() => setLoading(false));
  }, [selectedCity]);

  const featuredMovies = movies.filter(m => m.featured) ;
  const trendingMovies = movies.filter(m => m.status === 'now_showing');
  const upcomingMovies = movies.filter(m => m.status === 'coming_soon');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      
      {/* City Location Banner */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-900 to-slate-900 border border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Location Active</span>
            <h3 className="font-heading font-bold text-white text-base">
              Showing entertainment in <span className="text-emerald-400">{selectedCity}</span>
            </h3>
          </div>
        </div>
        <Link
          to="/movies"
          className="hidden sm:flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <span>View All Shows</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Hero Carousel */}
      {loading ? (
        <div className="w-full h-[450px] bg-slate-900 rounded-3xl animate-pulse" />
      ) : (
        <HeroBanner featuredMovies={featuredMovies.length > 0 ? featuredMovies : movies.slice(0, 3)} />
      )}

      {/* Trending Movies Carousel */}
      <HorizontalCarousel
        title="Trending Movies"
        subtitle={`Now showing in cinemas across ${selectedCity}`}
        actionButton={
          <Link to="/movies" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
            See All <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        {loading
          ? Array(5).fill(0).map((_, i) => <CardSkeleton key={i} />)
          : trendingMovies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
      </HorizontalCarousel>

      {/* Recommended Movies Section */}
      {movies.length > 3 && (
        <HorizontalCarousel
          title="Recommended For You"
          subtitle="Top rated blockbuster cinema experiences"
        >
          {movies.slice().reverse().map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </HorizontalCarousel>
      )}

      {/* Popular Events Carousel */}
      <HorizontalCarousel
        title="Popular Live Events"
        subtitle="Concerts, comedy specials & cultural festivals"
        actionButton={
          <Link to="/events" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
            Explore Events <ArrowRight className="w-3 h-3" />
          </Link>
        }
      >
        {events.map((event) => (
          <EventCard key={event._id} item={event} type="event" />
        ))}
      </HorizontalCarousel>

      {/* Upcoming Movies */}
      {upcomingMovies.length > 0 && (
        <HorizontalCarousel
          title="Upcoming In Cinemas"
          subtitle="Get ready for big screen releases coming next"
        >
          {upcomingMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </HorizontalCarousel>
      )}

      {/* Plays & Theatre Carousel */}
      {plays.length > 0 && (
        <HorizontalCarousel
          title="Theatre & Plays"
          subtitle="Drama, live musicals and storytelling"
          actionButton={
            <Link to="/plays" className="text-xs font-bold text-violet-400 hover:underline flex items-center gap-1">
              View Plays <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {plays.map((play) => (
            <EventCard key={play._id} item={play} type="play" />
          ))}
        </HorizontalCarousel>
      )}

      {/* Sports Matches */}
      {sports.length > 0 && (
        <HorizontalCarousel
          title="Live Sports Matches"
          subtitle="Cricket tournaments, marathons & leagues"
          actionButton={
            <Link to="/sports" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
              View Sports <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {sports.map((sport) => (
            <EventCard key={sport._id} item={sport} type="sport" />
          ))}
        </HorizontalCarousel>
      )}

      {/* Activities & Experiences */}
      {activities.length > 0 && (
        <HorizontalCarousel
          title="Activities & Unique Experiences"
          subtitle="Hot air balloons, amusement parks & city workshops"
          actionButton={
            <Link to="/activities" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
              View Activities <ArrowRight className="w-3 h-3" />
            </Link>
          }
        >
          {activities.map((activity) => (
            <EventCard key={activity._id} item={activity} type="activitie" />
          ))}
        </HorizontalCarousel>
      )}

    </div>
  );
};

export default Home;
