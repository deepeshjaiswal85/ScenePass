const Review = require('../models/Review');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const getReviews = async (req, res) => {
  try {
    const { itemId } = req.query;
    if (getDBStatus()) {
      const query = itemId ? { itemId } : {};
      const reviews = await Review.find(query).sort({ createdAt: -1 });
      return res.json(reviews);
    } else {
      let list = [...store.reviews];
      if (itemId) {
        list = list.filter(r => r.itemId === itemId);
      }
      return res.json(list);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { itemId, itemType, rating, comment } = req.body;
    const userId = req.user ? req.user.id : 'u_demo';
    const userName = req.user ? req.user.name : 'Aarav Sharma';

    if (!itemId || !rating || !comment) {
      return res.status(400).json({ message: 'Rating and comment are required' });
    }

    const reviewData = {
      userId,
      userName,
      itemId,
      itemType: itemType || 'movie',
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    if (getDBStatus()) {
      const review = await Review.create(reviewData);
      return res.status(201).json(review);
    } else {
      reviewData._id = 'r_' + Date.now();
      store.reviews.unshift(reviewData);
      return res.status(201).json(reviewData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getReviews, createReview };
