const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  toggleSavedCoupon,
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.post('/save-coupon/:id', protect, toggleSavedCoupon);

module.exports = router;
