const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Concerts', 'Comedy', 'Workshops', 'Theatre', 'Festivals', 'Parties', 'Experiences'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  language: { type: String, default: 'English / Hindi' },
  duration: { type: String, default: '2 Hours' },
  ageLimit: { type: String, default: '16yrs+' },
  artists: [{ name: String, role: String, image: String }],
  ticketTiers: [{
    name: String, // e.g. "General Access", "VIP Pass"
    price: Number,
    availableSeats: Number
  }],
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
