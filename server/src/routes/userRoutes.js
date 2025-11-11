const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
} = require('../controllers/userController');
const { protect} = require('../middleware/authMiddleware');

// Profile routes
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);


router.get('/', protect,  getAllUsers);
router.get('/:id', protect,  getUserById);

module.exports = router;
