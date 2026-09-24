const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Amusement parks', 'Museums', 'Food experiences', 'Adventure activities', 'Workshops', 'Tourist attractions'], required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  city: { type: String, required: true },
  venue: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  operatingHours: { type: String, default: '10:00 AM - 8:00 PM' },
  highlights: [{ type: String }],
  rating: { type: Number, default: 4.6 },
  ticketTiers: [{
    name: String,
    price: Number
  }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
