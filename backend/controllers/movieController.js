const Movie = require('../models/Movie');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getMovies = async (req, res) => {
  try {
    const { city, genre, language, status, search, featured } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (city) query.cities = { $in: [new RegExp(city, 'i')] };
      if (status) query.status = status;
      if (featured) query.featured = featured === 'true';
      if (genre) query.genres = { $in: [genre] };
      if (language) query.languages = { $in: [language] };
      if (search) query.title = { $regex: search, $options: 'i' };

      const movies = await Movie.find(query).sort({ rating: -1 });
      return res.json(movies);
    } else {
      let list = [...store.movies];
      if (city) {
        list = list.filter(m => m.cities.some(c => c.toLowerCase() === city.toLowerCase()));
      }
      if (status) {
        list = list.filter(m => m.status === status);
      }
      if (featured) {
        list = list.filter(m => m.featured === (featured === 'true'));
      }
      if (genre) {
        list = list.filter(m => m.genres.includes(genre));
      }
      if (language) {
        list = list.filter(m => m.languages.includes(language));
      }
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(m => m.title.toLowerCase().includes(s) || m.genres.some(g => g.toLowerCase().includes(s)));
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const movie = await Movie.findById(id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      return res.json(movie);
    } else {
      const movie = store.movies.find(m => m._id === id || m.slug === id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      return res.json(movie);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
    if (getDBStatus()) {
      const movie = await Movie.create(req.body);
      return res.status(201).json(movie);
    } else {
      const newMovie = {
        _id: 'm_' + Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      store.movies.unshift(newMovie);
      return res.status(201).json(newMovie);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Movie.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Movie not found' });
      return res.json(updated);
    } else {
      const idx = store.movies.findIndex(m => m._id === id);
      if (idx === -1) return res.status(404).json({ message: 'Movie not found' });
      store.movies[idx] = { ...store.movies[idx], ...req.body };
      return res.json(store.movies[idx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await Movie.findByIdAndDelete(id);
      return res.json({ message: 'Movie removed successfully' });
    } else {
      store.movies = store.movies.filter(m => m._id !== id);
      return res.json({ message: 'Movie removed successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
