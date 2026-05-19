const express = require('express');
const router = express.Router();
const { createReview, getMyReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Secure all review routes

router.route('/')
  .post(createReview);

router.get('/me', getMyReviews);

module.exports = router;
