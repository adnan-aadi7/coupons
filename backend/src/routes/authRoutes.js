const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateProfile,
  toggleSavedCoupon,
  getHistory,
  addPayoutMethod,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/save-coupon/:id', protect, toggleSavedCoupon);
router.get('/history', protect, getHistory);
router.post('/payout-method', protect, addPayoutMethod);
router.post('/forgotpassword', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/resetpassword', resetPassword);

module.exports = router;
