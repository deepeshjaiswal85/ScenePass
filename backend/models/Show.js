const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  screenName: { type: String, default: 'Screen 1' },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // e.g. "10:30 AM"
  format: { type: String, default: '2D' },
  language: { type: String, default: 'Hindi' },
  pricing: {
    regular: { type: Number, default: 200 },
    premium: { type: Number, default: 320 },
    vip: { type: Number, default: 500 }
  },
  bookedSeats: [{ type: String }], // Array of seat IDs like "A3", "B5"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Show', showSchema);
