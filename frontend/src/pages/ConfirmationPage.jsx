import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Ticket, Download, Calendar, MapPin, Clock, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import api from '../services/api';

const ConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);

  useEffect(() => {
    if (!booking) {
      api.get(`/bookings/${id}`)
        .then(res => setBooking(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, booking]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 animate-pulse">
        <div className="w-16 h-16 bg-slate-900 rounded-full mx-auto" />
        <div className="h-8 bg-slate-900 rounded w-1/2 mx-auto" />
      </div>
    );
  }

  const bookingId = booking?.bookingId || id || 'SP-9920-X1';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0">
      
      {/* Success Badge */}
      <div className="text-center space-y-3 print:hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 animate-pulse">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest inline-block">
          Booking Confirmed
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">Your Tickets Are Ready!</h1>
        <p className="text-xs text-slate-400">Booking Reference ID: <span className="font-mono text-emerald-400 font-extrabold">{bookingId}</span></p>
      </div>

      {/* Modern Digital Ticket Pass Card */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl print:border-black print:text-black">
        
        {/* Ticket Header Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 text-slate-950 flex justify-between items-center">
          <div className="flex items-center gap-2 font-heading font-extrabold text-xl">
            <Ticket className="w-6 h-6 fill-slate-950" />
            <span>ScenePass Digital Ticket</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-mono font-bold text-xs">
            {bookingId}
          </span>
        </div>

        {/* Ticket Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                {booking?.bookingType || 'Event'} Pass
              </span>
              <h2 className="font-heading font-black text-2xl text-white">{booking?.itemTitle || 'Cyberpunk 2099'}</h2>
              
              <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> {booking?.venueName}, {booking?.city}</p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-400" /> {booking?.date} • {booking?.time}</p>
                <p className="text-white font-bold text-sm pt-1">
                  Seats: <span className="text-emerald-400 font-mono">{booking?.seats ? booking.seats.join(', ') : 'GA'}</span>
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-700 w-36 h-36 mx-auto sm:mx-0 flex-shrink-0">
              <QRCodeSVG
                value={`https://scenepass.com/verify/${bookingId}`}
                size={120}
                level="H"
              />
              <span className="text-[9px] font-mono text-slate-800 font-bold mt-1">SCAN AT ENTRY</span>
            </div>
          </div>

          {/* Pricing Math */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-4 pt-2">
            <div>
              <span className="block text-[10px] uppercase font-semibold">Quantity</span>
              <span className="font-bold text-white text-sm">{booking?.ticketQuantity || 1} Ticket(s)</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold">Payment Status</span>
              <span className="font-bold text-emerald-400 text-sm">COMPLETED ({booking?.paymentMethod || 'UPI'})</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-semibold">Total Paid</span>
              <span className="font-heading font-extrabold text-emerald-400 text-lg">₹{booking?.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Print / Download Ticket</span>
        </button>

        <Link
          to="/profile?tab=bookings"
          className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
        >
          <Ticket className="w-4 h-4 fill-slate-950" />
          <span>View My Bookings</span>
        </Link>
      </div>

    </div>
  );
};

export default ConfirmationPage;
