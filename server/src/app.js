require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const allowedOrigins = [
  'https://final-project-plp-omega.vercel.app', // <--- Your deployed frontend URL
  'http://localhost:3000',
  'http://localhost:5173', 
];
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Ensure all needed methods are allowed
  credentials: true, // IMPORTANT: If your login uses cookies or session auth
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
