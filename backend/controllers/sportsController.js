const store = require('../store');

const getSports = async (req, res) => {
  try {
    const { category, city, search } = req.query;
    let list = [...store.sports];
    if (category) list = list.filter(s => s.category === category);
    if (city) list = list.filter(s => s.city.toLowerCase() === city.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.title.toLowerCase().includes(q) || s.venue.toLowerCase().includes(q));
    }
    return res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSportsById = async (req, res) => {
  try {
    const { id } = req.params;
    const sport = store.sports.find(s => s._id === id);
    if (!sport) return res.status(404).json({ message: 'Sports event not found' });
    return res.json(sport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getSports, getSportsById };
