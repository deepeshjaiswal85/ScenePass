const Cinema = require('../models/Cinema');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getCinemas = async (req, res) => {
  try {
    const { city } = req.query;
    if (getDBStatus()) {
      let query = {};
      if (city) query.city = new RegExp(city, 'i');
      const cinemas = await Cinema.find(query);
      return res.json(cinemas);
    } else {
      let list = [...store.cinemas];
      if (city) {
        list = list.filter(c => c.city.toLowerCase() === city.toLowerCase());
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCinemaById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const cinema = await Cinema.findById(id);
      if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
      return res.json(cinema);
    } else {
      const cinema = store.cinemas.find(c => c._id === id);
      if (!cinema) return res.status(404).json({ message: 'Cinema not found' });
      return res.json(cinema);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createCinema = async (req, res) => {
  try {
    if (getDBStatus()) {
      const cinema = await Cinema.create(req.body);
      return res.status(201).json(cinema);
    } else {
      const newCinema = {
        _id: 'c_' + Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      store.cinemas.push(newCinema);
      return res.status(201).json(newCinema);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCinemas, getCinemaById, createCinema };
