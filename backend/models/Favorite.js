const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true },
  itemType: { type: String, enum: ['movie', 'event', 'play', 'activity'], required: true },
  title: { type: String, required: true },
  posterUrl: { type: String, required: true },
  rating: { type: Number },
  category: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
