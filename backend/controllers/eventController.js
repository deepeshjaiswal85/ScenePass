const Event = require('../models/Event');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getEvents = async (req, res) => {
  try {
    const { category, city, search, featured } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (category) query.category = category;
      if (city) query.city = new RegExp(city, 'i');
      if (featured) query.featured = featured === 'true';
      if (search) query.title = { $regex: search, $options: 'i' };

      const events = await Event.find(query).sort({ rating: -1 });
      return res.json(events);
    } else {
      let list = [...store.events];
      if (category) list = list.filter(e => e.category === category);
      if (city) list = list.filter(e => e.city.toLowerCase() === city.toLowerCase());
      if (featured) list = list.filter(e => e.featured === (featured === 'true'));
      if (search) {
        const s = search.toLowerCase();
        list = list.filter(e => e.title.toLowerCase().includes(s) || e.venue.toLowerCase().includes(s));
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.json(event);
    } else {
      const event = store.events.find(e => e._id === id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      return res.json(event);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    if (getDBStatus()) {
      const event = await Event.create(req.body);
      return res.status(201).json(event);
    } else {
      const newEvent = {
        _id: 'e_' + Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
      };
      store.events.unshift(newEvent);
      return res.status(201).json(newEvent);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Event.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Event not found' });
      return res.json(updated);
    } else {
      const idx = store.events.findIndex(e => e._id === id);
      if (idx === -1) return res.status(404).json({ message: 'Event not found' });
      store.events[idx] = { ...store.events[idx], ...req.body };
      return res.json(store.events[idx]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      await Event.findByIdAndDelete(id);
      return res.json({ message: 'Event removed' });
    } else {
      store.events = store.events.filter(e => e._id !== id);
      return res.json({ message: 'Event removed' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
