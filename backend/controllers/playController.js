const Play = require('../models/Play');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getPlays = async (req, res) => {
  try {
    const { category, city, search } = req.query;
    if (getDBStatus()) {
      let query = {};
      if (category) query.category = category;
      if (city) query.city = new RegExp(city, 'i');
      if (search) query.title = { $regex: search, $options: 'i' };
      const plays = await Play.find(query);
      return res.json(plays);
    } else {
      let list = [...store.plays];
      if (category) list = list.filter(p => p.category === category);
      if (city) list = list.filter(p => p.city.toLowerCase() === city.toLowerCase());
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(p => p.title.toLowerCase().includes(s) || p.venue.toLowerCase().includes(s));
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlayById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const play = await Play.findById(id);
      if (!play) return res.status(404).json({ message: 'Play not found' });
      return res.json(play);
    } else {
      const play = store.plays.find(p => p._id === id);
      if (!play) return res.status(404).json({ message: 'Play not found' });
      return res.json(play);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPlays, getPlayById };
