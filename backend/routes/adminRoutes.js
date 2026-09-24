const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getAllBookings } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/bookings', protect, adminOnly, getAllBookings);

module.exports = router;
