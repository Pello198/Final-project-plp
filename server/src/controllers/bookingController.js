const Booking = require('../models/Booking');
const TutorProfile = require('../models/TutorProfile');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { tutor, subject, scheduledAt, notes } = req.body;

    if (!tutor || !subject || !scheduledAt) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newBooking = await Booking.create({
      student: req.user._id,
      tutor,
      subject,
      scheduledAt,
      notes,
      status: 'pending',
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get bookings for student or tutor
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'student') query.student = req.user._id;
    if (req.user.role === 'tutor') query.tutor = req.user._id;

    const bookings = await Booking.find(query)
      .populate('student', 'name email')
      .populate('tutor', 'user') // assuming tutorProfile has reference to user
      .sort({ scheduledAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update booking status (e.g., accepted, completed, canceled)
// @route   PUT /api/bookings/:id
// @access  Private (tutor)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.user.role !== 'tutor' || booking.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Please provide a status' });

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus };
