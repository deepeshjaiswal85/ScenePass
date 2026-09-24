const Favorite = require('../models/Favorite');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    if (getDBStatus()) {
      const favs = await Favorite.find({ userId });
      return res.json(favs);
    } else {
      const favs = store.favorites.filter(f => String(f.userId) === String(userId));
      return res.json(favs);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, itemType, title, posterUrl, rating, category } = req.body;

    if (getDBStatus()) {
      const existing = await Favorite.findOne({ userId, itemId });
      if (existing) {
        await Favorite.findByIdAndDelete(existing._id);
        return res.json({ favorited: false, message: 'Removed from favorites' });
      } else {
        const fav = await Favorite.create({ userId, itemId, itemType, title, posterUrl, rating, category });
        return res.json({ favorited: true, favorite: fav, message: 'Added to favorites' });
      }
    } else {
      const idx = store.favorites.findIndex(f => String(f.userId) === String(userId) && f.itemId === itemId);
      if (idx !== -1) {
        store.favorites.splice(idx, 1);
        return res.json({ favorited: false, message: 'Removed from favorites' });
      } else {
        const newFav = {
          _id: 'fav_' + Date.now(),
          userId,
          itemId,
          itemType: itemType || 'movie',
          title: title || 'Item',
          posterUrl: posterUrl || '',
          rating: rating || 4.5,
          category: category || 'Entertainment'
        };
        store.favorites.push(newFav);
        return res.json({ favorited: true, favorite: newFav, message: 'Added to favorites' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getFavorites, toggleFavorite };
