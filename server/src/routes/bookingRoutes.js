const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', protect, createBooking);

// Get bookings for the logged-in user (student or tutor)
router.get('/', protect, getBookings);

// Update booking status (only for the tutor assigned)
router.put('/:id', protect, updateBookingStatus);

module.exports = router;
