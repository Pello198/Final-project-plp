const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile,getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/users/profile
router.get('/profile', protect, getUserProfile);

// PUT /api/users/profile
router.put('/profile', protect, updateUserProfile);
const { getAllUsers } = require('../controllers/userController') // make sure correct path

router.get('/all', protect, getAllUsers)
router.get('/:id', protect, getUserById);

module.exports = router;
