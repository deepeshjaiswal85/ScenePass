const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  landmark: { type: String },
  facilities: [{ type: String }], // e.g. ['Recliners', 'Dolby Atmos', 'F&B Service', 'Parking']
  formats: [{ type: String }], // ['2D', '3D', 'IMAX']
  rating: { type: Number, default: 4.6 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cinema', cinemaSchema);
