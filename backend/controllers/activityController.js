const Activity = require('../models/Activity');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getActivities = async (req, res) => {
  try {
    const { category, city, search } = req.query;
    if (getDBStatus()) {
      let query = {};
      if (category) query.category = category;
      if (city) query.city = new RegExp(city, 'i');
      if (search) query.title = { $regex: search, $options: 'i' };
      const activities = await Activity.find(query);
      return res.json(activities);
    } else {
      let list = [...store.activities];
      if (category) list = list.filter(a => a.category === category);
      if (city) list = list.filter(a => a.city.toLowerCase() === city.toLowerCase());
      if (search) {
        const q = search.toLowerCase();
        list = list.filter(a => a.title.toLowerCase().includes(q) || a.venue.toLowerCase().includes(q));
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const activity = await Activity.findById(id);
      if (!activity) return res.status(404).json({ message: 'Activity not found' });
      return res.json(activity);
    } else {
      const activity = store.activities.find(a => a._id === id);
      if (!activity) return res.status(404).json({ message: 'Activity not found' });
      return res.json(activity);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getActivities, getActivityById };
