const express = require('express');
const router = express.Router();
const { getCinemas, getCinemaById, createCinema } = require('../controllers/cinemaController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getCinemas);
router.get('/:id', getCinemaById);
router.post('/', protect, adminOnly, createCinema);

module.exports = router;
