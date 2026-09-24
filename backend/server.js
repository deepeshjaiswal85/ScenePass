const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Database connection attempt
connectDB();

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    brand: 'ScenePass',
    timestamp: new Date().toISOString()
  });
});

// Register API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/cinemas', require('./routes/cinemaRoutes'));
app.use('/api/shows', require('./routes/showRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/plays', require('./routes/playRoutes'));
app.use('/api/sports', require('./routes/sportsRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎬 ScenePass Server running on http://localhost:${PORT}`);
});
