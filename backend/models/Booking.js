const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingType: { type: String, enum: ['movie', 'event', 'play', 'sports', 'activity'], default: 'movie' },
  itemTitle: { type: String, required: true },
  itemImage: { type: String },
  venueName: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  seats: [{ type: String }], // e.g. ["A3", "A4"] or Tier Name
  ticketQuantity: { type: Number, default: 1 },
  ticketPrice: { type: Number, required: true },
  convenienceFee: { type: Number, default: 35 },
  taxes: { type: Number, default: 18 },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'UPI' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'completed' },
  qrCodeUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
