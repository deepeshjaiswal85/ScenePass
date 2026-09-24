const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  tagline: { type: String },
  description: { type: String, required: true },
  posterUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  trailerUrl: { type: String },
  genres: [{ type: String }],
  languages: [{ type: String }],
  formats: [{ type: String }], // ['2D', '3D', 'IMAX 3D', '4DX']
  durationMinutes: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  votesCount: { type: Number, default: 1250 },
  certification: { type: String, default: 'UA' }, // U, UA, A
  director: { type: String },
  cast: [{
    name: String,
    role: String,
    image: String
  }],
  status: { type: String, enum: ['now_showing', 'coming_soon'], default: 'now_showing' },
  cities: [{ type: String }],
  startingPrice: { type: Number, default: 200 },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);
