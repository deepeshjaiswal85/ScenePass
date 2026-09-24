const express = require('express');
const router = express.Router();
const { getShows, getShowById, createShow } = require('../controllers/showController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getShows);
router.get('/:id', getShowById);
router.post('/', protect, adminOnly, createShow);

module.exports = router;
