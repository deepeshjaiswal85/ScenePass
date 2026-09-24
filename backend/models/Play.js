const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Theatre', 'Comedy plays', 'Drama', 'Musical', 'Stand-up', 'Storytelling'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  city: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  language: { type: String, default: 'Hindi / English' },
  duration: { type: String, default: '100 mins' },
  director: { type: String },
  cast: [{ name: String, role: String }],
  rating: { type: Number, default: 4.7 },
  featured: { type: Boolean, default: false },
  ticketTiers: [{
    name: String,
    price: Number
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Play', playSchema);
