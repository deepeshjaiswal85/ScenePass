const Booking = require('../models/Booking');
const Show = require('../models/Show');
const store = require('../store');
const { getDBStatus } = require('../config/db');

const createBooking = async (req, res) => {
  try {
    const {
      bookingType,
      itemTitle,
      itemImage,
      venueName,
      city,
      date,
      time,
      showId,
      seats,
      ticketQuantity,
      ticketPrice,
      convenienceFee,
      taxes,
      totalAmount,
      paymentMethod
    } = req.body;

    const userId = req.user ? req.user.id : 'u_guest';
    const bookingId = 'SP-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.random().toString(36).substring(2, 4).toUpperCase();

    // If it's a movie booking associated with a showId, lock the seats
    if (showId) {
      if (getDBStatus()) {
        const show = await Show.findById(showId);
        if (show && seats && seats.length > 0) {
          const alreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
          if (alreadyBooked) {
            return res.status(400).json({ message: 'One or more selected seats have already been booked by another user. Please re-select seats.' });
          }
          show.bookedSeats.push(...seats);
          await show.save();
        }
      } else {
        const show = store.shows.find(s => String(s._id) === String(showId));
        if (show && seats && seats.length > 0) {
          const alreadyBooked = seats.some(seat => show.bookedSeats.includes(seat));
          if (alreadyBooked) {
            return res.status(400).json({ message: 'One or more selected seats have already been booked by another user. Please re-select seats.' });
          }
          show.bookedSeats.push(...seats);
        }
      }
    }

    const bookingData = {
      bookingId,
      user: userId,
      bookingType: bookingType || 'movie',
      itemTitle: itemTitle || 'ScenePass Ticket',
      itemImage: itemImage || '',
      venueName: venueName || 'Venue',
      city: city || 'Jaipur',
      date: date || 'Today',
      time: time || 'Evening',
      showId: showId || null,
      seats: seats || [],
      ticketQuantity: ticketQuantity || (seats ? seats.length : 1),
      ticketPrice: ticketPrice || 250,
      convenienceFee: convenienceFee || 35,
      taxes: taxes || 18,
      totalAmount: totalAmount || 303,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: 'completed',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${bookingId}`,
      createdAt: new Date().toISOString()
    };

    if (getDBStatus()) {
      const booking = await Booking.create(bookingData);
      return res.status(201).json(booking);
    } else {
      store.bookings.unshift(bookingData);
      return res.status(201).json(bookingData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    if (getDBStatus()) {
      const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
      return res.json(bookings);
    } else {
      const userBookings = store.bookings.filter(b => String(b.user) === String(userId) || b.user === 'u_demo');
      return res.json(userBookings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const booking = await Booking.findOne({ $or: [{ _id: id }, { bookingId: id }] });
      if (!booking) return res.status(404).json({ message: 'Booking record not found' });
      return res.json(booking);
    } else {
      const booking = store.bookings.find(b => b._id === id || b.bookingId === id);
      if (!booking) return res.status(404).json({ message: 'Booking record not found' });
      return res.json(booking);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createBooking, getUserBookings, getBookingById };
