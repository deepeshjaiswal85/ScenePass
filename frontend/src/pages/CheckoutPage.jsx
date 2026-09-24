import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Ticket, ShieldCheck, MapPin, Calendar, Clock, ChevronLeft, Tag, Check, AlertCircle } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const payload = location.state?.bookingPayload || {
    bookingType: 'movie',
    itemTitle: 'Cyberpunk 2099: Neon Horizon',
    itemImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    venueName: 'ScenePass Luxe Multiplex - WTP',
    city: 'Jaipur',
    date: 'Today',
    time: '06:45 PM',
    seats: ['F1', 'F2'],
    ticketQuantity: 2,
    ticketPrice: 520,
    convenienceFee: 70,
    taxes: 42,
    totalAmount: 632
  };

  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const [email, setEmail] = useState(user?.email || 'aarav@scenepass.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SCENEPASS20') {
      const discount = Math.round(payload.ticketPrice * 0.2);
      setDiscountAmount(discount);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "SCENEPASS20" for 20% off.');
      setPromoApplied(false);
      setDiscountAmount(0);
    }
  };

  const finalAmount = Math.max(0, payload.totalAmount - discountAmount);

  const handlePaymentSuccess = async (paymentMethod) => {
    setIsPaymentModalOpen(false);

    try {
      const res = await api.post('/bookings', {
        ...payload,
        totalAmount: finalAmount,
        paymentMethod
      });

      // Navigate to confirmation page
      navigate(`/confirmation/${res.data.bookingId || res.data._id}`, {
        state: { booking: res.data }
      });
    } catch (err) {
      // Fallback local booking state generator
      const fallbackBooking = {
        bookingId: 'SP-' + Math.floor(1000 + Math.random() * 9000) + '-X9',
        ...payload,
        totalAmount: finalAmount,
        paymentMethod,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=SP-FALLBACK`,
        createdAt: new Date().toISOString()
      };
      navigate(`/confirmation/${fallbackBooking.bookingId}`, {
        state: { booking: fallbackBooking }
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Review & Checkout</h1>
          <p className="text-xs text-slate-400">Confirm ticket details and choose payment method</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Ticket summary & Contact form */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Order Item Box */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex gap-5 items-center">
            {payload.itemImage && (
              <img src={payload.itemImage} alt={payload.itemTitle} className="w-20 h-28 object-cover rounded-2xl border border-slate-700" />
            )}
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase">
                {payload.bookingType || 'Ticket'}
              </span>
              <h2 className="font-heading font-extrabold text-xl text-white">{payload.itemTitle}</h2>
              <div className="text-xs text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {payload.venueName}, {payload.city}</p>
                <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500" /> {payload.date} • {payload.time}</p>
                <p className="font-bold text-white">Seats: {payload.seats ? payload.seats.join(', ') : 'General Admission'}</p>
              </div>
            </div>
          </div>

          {/* Contact Details Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">Ticket Contact Delivery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">Your digital pass & QR code will be emailed and sent via SMS instant notification.</p>
          </div>

          {/* Promo Code Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" /> Have a Promo Code?
            </h3>
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Try 'SCENEPASS20'"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white uppercase placeholder:normal-case focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" /> Promo code applied! You saved ₹{discountAmount}
              </div>
            )}
            {promoError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {promoError}
              </div>
            )}
          </div>

        </div>

        {/* Right 1 Col: Pricing Math & Pay CTA */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 sticky top-28">
          <h3 className="font-heading font-extrabold text-xl text-white">Payment Breakdown</h3>

          <div className="space-y-3 text-xs border-b border-slate-800 pb-4">
            <div className="flex justify-between text-slate-300">
              <span>Tickets Cost ({payload.ticketQuantity}x)</span>
              <span className="font-semibold text-white">₹{payload.ticketPrice}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Convenience Fee</span>
              <span>₹{payload.convenienceFee}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST & Taxes</span>
              <span>₹{payload.taxes}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Promo Discount</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-sm font-black">
            <span className="text-white">Total Payable</span>
            <span className="text-emerald-400 text-lg">₹{finalAmount}</span>
          </div>

          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-heading font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/25 hover:scale-105"
          >
            <Ticket className="w-5 h-5 fill-slate-950" />
            <span>Proceed to Payment</span>
          </button>
        </div>

      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={finalAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default CheckoutPage;
