import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Ticket, ChevronLeft, MapPin, Clock, Calendar, AlertCircle } from 'lucide-react';
import SeatGrid from '../components/SeatGrid';
import api from '../services/api';

const SeatSelectionPage = () => {
  const { id } = useParams(); // showId
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrices, setSeatPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get(`/shows/${id}`)
      .then(res => setShow(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleToggleSeat = (seatId, price, category) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
      const newPrices = { ...seatPrices };
      delete newPrices[seatId];
      setSeatPrices(newPrices);
    } else {
      if (selectedSeats.length >= 8) {
        setErrorMsg('Maximum 8 seats allowed per booking transaction.');
        setTimeout(() => setErrorMsg(''), 3500);
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
      setSeatPrices({ ...seatPrices, [seatId]: price });
    }
  };

  // Pricing math
  const ticketSubtotal = Object.values(seatPrices).reduce((sum, p) => sum + p, 0);
  const convenienceFee = selectedSeats.length > 0 ? 35 * selectedSeats.length : 0;
  const taxes = selectedSeats.length > 0 ? Math.round(ticketSubtotal * 0.08) : 0;
  const grandTotal = ticketSubtotal + convenienceFee + taxes;

  const handleProceedCheckout = () => {
    if (selectedSeats.length === 0) return;

    // Navigate to checkout with payload state
    const checkoutData = {
      bookingType: 'movie',
      itemTitle: show?.movieId?.title || 'Movie Show',
      itemImage: show?.movieId?.posterUrl || '',
      venueName: show?.cinemaId?.name || 'Cinema',
      city: show?.cinemaId?.city || 'Jaipur',
      date: show?.date || 'Today',
      time: show?.startTime || '10:30 AM',
      showId: show?._id,
      seats: selectedSeats,
      ticketQuantity: selectedSeats.length,
      ticketPrice: ticketSubtotal,
      convenienceFee,
      taxes,
      totalAmount: grandTotal
    };

    navigate('/checkout', { state: { bookingPayload: checkoutData } });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4 animate-pulse">
        <div className="h-10 bg-slate-900 rounded w-1/3 mx-auto" />
        <div className="h-96 bg-slate-900 rounded-3xl" />
      </div>
    );
  }

  if (!show) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Showtime Session Expired or Not Found</h2>
        <Link to="/movies" className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-sm inline-block">
          Explore Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-heading font-black text-2xl text-white">
              {show.movieId?.title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
              <span className="text-emerald-400 font-semibold">{show.cinemaId?.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {show.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {show.startTime}</span>
              <span>•</span>
              <span className="font-bold text-white">{show.format}</span>
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </div>
        )}
      </div>

      {/* Main Interactive Grid & Order Summary Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Interactive Seat Grid */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80">
          <SeatGrid
            bookedSeats={show.bookedSeats || []}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            pricing={show.pricing}
          />
        </div>

        {/* Right 1 Col: Live Cart Order Summary */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 sticky top-28">
          <h3 className="font-heading font-extrabold text-xl text-white">Booking Summary</h3>

          {/* Selected seats list */}
          <div>
            <span className="text-xs text-slate-400 font-medium block mb-2">Selected Seats ({selectedSeats.length})</span>
            {selectedSeats.length === 0 ? (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-center text-xs text-slate-500 italic">
                Click seats in the theatre layout to select
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seatId) => (
                  <span
                    key={seatId}
                    className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs"
                  >
                    {seatId} (₹{seatPrices[seatId]})
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Math */}
          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Tickets Subtotal</span>
              <span className="font-semibold text-white">₹{ticketSubtotal}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST & Taxes (8%)</span>
              <span>₹{taxes}</span>
            </div>

            <div className="flex justify-between py-3 border-t border-slate-800 text-sm font-extrabold">
              <span className="text-white">Total Amount</span>
              <span className="text-emerald-400 text-base">₹{grandTotal}</span>
            </div>
          </div>

          {/* Proceed CTA */}
          <button
            disabled={selectedSeats.length === 0}
            onClick={handleProceedCheckout}
            className={`w-full py-4 rounded-2xl font-heading font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-xl ${
              selectedSeats.length > 0
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 cursor-pointer hover:scale-105'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span>Proceed to Checkout</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SeatSelectionPage;
