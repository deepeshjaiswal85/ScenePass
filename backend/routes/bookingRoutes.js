const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, getBookingById } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', createBooking); // allows guest or logged in user
router.get('/', protect, getUserBookings);
router.get('/:id', getBookingById);

module.exports = router;
