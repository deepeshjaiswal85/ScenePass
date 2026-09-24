import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, Calendar, Play, Ticket, Heart, Share2, MessageSquare, ChevronRight, Check } from 'lucide-react';
import TrailerModal from '../components/TrailerModal';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/movies/${id}`),
      api.get(`/reviews?itemId=${id}`).catch(() => ({ data: [] }))
    ]).then(([movieRes, reviewRes]) => {
      setMovie(movieRes.data);
      setReviews(reviewRes.data || []);
    }).catch((err) => {
      console.error(err);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmittingReview(true);

    try {
      const res = await api.post('/reviews', {
        itemId: id,
        itemType: 'movie',
        rating: newRating,
        comment: newComment
      });

      setReviews([res.data, ...reviews]);
      setNewComment('');
      setReviewMessage('Thank you! Your review has been published.');
      setTimeout(() => setReviewMessage(''), 4000);
    } catch (err) {
      setReviewMessage('Failed to post review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
        <div className="w-full h-96 bg-slate-900 rounded-3xl" />
        <div className="h-8 bg-slate-900 rounded w-1/3" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Movie Not Found</h2>
        <Link to="/movies" className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm inline-block">
          Back to Movies
        </Link>
      </div>
    );
  }

  const fav = isFavorite(movie._id);

  return (
    <div className="space-y-12">
      
      {/* Cinematic Hero Backdrop Header */}
      <div className="relative bg-slate-950 border-b border-slate-800/80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={movie.bannerUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* Poster Card */}
            <div className="relative w-64 sm:w-72 flex-shrink-0 aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
              <button
                onClick={() => setIsTrailerOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/40 hover:bg-slate-950/20 group transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </div>
              </button>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-5 text-center md:text-left">
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 font-bold text-xs flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {movie.rating} ({movie.votesCount || 1250} votes)
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs uppercase">
                  {movie.certification || 'UA'}
                </span>
                {movie.formats && movie.formats.map((f) => (
                  <span key={f} className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
                    {f}
                  </span>
                ))}
              </div>

              <div>
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-emerald-400 text-sm md:text-base italic mt-1">"{movie.tagline}"</p>
                )}
              </div>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs md:text-sm text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {movie.durationMinutes} Minutes
                </span>
                <span>•</span>
                <span>{movie.genres ? movie.genres.join(', ') : 'Action'}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Released {movie.releaseDate}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                Languages: <span className="text-white font-medium">{movie.languages ? movie.languages.join(', ') : 'Hindi'}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
                <Link
                  to={`/movie/${movie._id}/shows`}
                  className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-base flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all"
                >
                  <Ticket className="w-5 h-5 fill-slate-950" />
                  <span>Book Tickets</span>
                </Link>

                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Trailer</span>
                </button>

                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    fav
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  title="Favorite"
                >
                  <Heart className={`w-5 h-5 ${fav ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Cols: Synopsis & Cast */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* About The Movie */}
          <div className="space-y-4">
            <h2 className="font-heading font-extrabold text-2xl text-white">About the Movie</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Director & Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-extrabold text-2xl text-white">Cast & Crew</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <img
                      src={actor.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                      alt={actor.name}
                      className="w-12 h-12 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{actor.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{actor.role || 'Actor'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-extrabold text-2xl text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Audience Reviews ({reviews.length})
              </h2>
            </div>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Share Your Rating & Thoughts</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-400 ml-2">{newRating} / 5 Stars</span>
              </div>

              <textarea
                placeholder="Write an authentic review about the storyline, cinematography, or performances..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-gray-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />

              {reviewMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                  <Check className="w-4 h-4" /> {reviewMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingReview}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                {submittingReview ? 'Publishing...' : 'Submit Review'}
              </button>
            </form>

            {/* Review Cards List */}
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r._id} className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-emerald-400 font-bold text-xs flex items-center justify-center">
                        {r.userName ? r.userName[0] : 'U'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{r.userName}</h4>
                        <span className="text-[10px] text-slate-500">Verified Moviegoer</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {r.rating}/5
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-10">
                    "{r.comment}"
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right 1 Col: Quick Booking Panel */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 sticky top-28">
            <h3 className="font-heading font-extrabold text-xl text-white">Book Cinema Seats</h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Starting Price</span>
                <span className="font-bold text-emerald-400 text-base">₹{movie.startingPrice || 200}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Available Formats</span>
                <span className="font-semibold text-white">{movie.formats ? movie.formats.join(', ') : '2D, 3D'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Languages</span>
                <span className="font-semibold text-white">{movie.languages ? movie.languages.join(', ') : 'Hindi'}</span>
              </div>
            </div>

            <Link
              to={`/movie/${movie._id}/shows`}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Ticket className="w-5 h-5 fill-slate-950" />
              <span>Select Date & Showtimes</span>
            </Link>
          </div>
        </div>

      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={movie.trailerUrl}
        title={movie.title}
      />
    </div>
  );
};

export default MovieDetailsPage;
