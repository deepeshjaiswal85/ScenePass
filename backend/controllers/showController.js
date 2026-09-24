const Show = require('../models/Show');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getShows = async (req, res) => {
  try {
    const { movieId, cinemaId, date, city } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (movieId) query.movieId = movieId;
      if (cinemaId) query.cinemaId = cinemaId;
      if (date) query.date = date;

      const shows = await Show.find(query).populate('cinemaId').populate('movieId');
      return res.json(shows);
    } else {
      let list = [...store.shows];
      if (movieId) {
        list = list.filter(s => String(s.movieId) === String(movieId));
      }
      if (cinemaId) {
        list = list.filter(s => String(s.cinemaId) === String(cinemaId));
      }
      if (date) {
        list = list.filter(s => s.date === date || date === 'Today');
      }

      // Attach Cinema and Movie objects for rich frontend view
      const enriched = list.map(s => {
        const cinemaObj = store.cinemas.find(c => String(c._id) === String(s.cinemaId)) || { name: 'ScenePass Cinema', city: 'Jaipur', address: 'Main Blvd' };
        const movieObj = store.movies.find(m => String(m._id) === String(s.movieId)) || { title: 'Movie' };
        return {
          ...s,
          cinemaId: cinemaObj,
          movieId: movieObj
        };
      });

      if (city) {
        return res.json(enriched.filter(item => item.cinemaId && item.cinemaId.city.toLowerCase() === city.toLowerCase()));
      }

      return res.json(enriched);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getShowById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const show = await Show.findById(id).populate('cinemaId').populate('movieId');
      if (!show) return res.status(404).json({ message: 'Show not found' });
      return res.json(show);
    } else {
      const show = store.shows.find(s => String(s._id) === String(id));
      if (!show) return res.status(404).json({ message: 'Show not found' });

      const cinemaObj = store.cinemas.find(c => String(c._id) === String(show.cinemaId)) || { name: 'ScenePass Cinema', city: 'Jaipur', address: 'Main Blvd' };
      const movieObj = store.movies.find(m => String(m._id) === String(show.movieId)) || { title: 'Movie' };

      return res.json({
        ...show,
        cinemaId: cinemaObj,
        movieId: movieObj
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createShow = async (req, res) => {
  try {
    if (getDBStatus()) {
      const show = await Show.create(req.body);
      return res.status(201).json(show);
    } else {
      const newShow = {
        _id: 's_' + Date.now(),
        bookedSeats: [],
        pricing: { regular: 220, premium: 350, vip: 500 },
        ...req.body,
        createdAt: new Date().toISOString()
      };
      store.shows.push(newShow);
      return res.status(201).json(newShow);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getShows, getShowById, createShow };
