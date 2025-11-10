const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getTutors, getTutorById } = require('../controllers/tutorController');
const { protect } = require('../middleware/authMiddleware');

router.post('/profile', protect, createOrUpdateProfile);
router.get('/', getTutors);
router.get('/:id', getTutorById);

module.exports = router;
