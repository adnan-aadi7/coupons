const Review = require('../models/Review');
const Store = require('../models/Store');

/**
 * @desc    Create a new review
 * @route   POST /api/reviews
 * @access  Private
 */
exports.createReview = async (req, res) => {
  try {
    const { storeName, rating, content } = req.body;

    if (!storeName || !rating || !content) {
      return res.status(400).json({ success: false, message: 'Please provide all review details' });
    }

    const review = await Review.create({
      user: req.user.id,
      storeName,
      rating: Number(rating),
      content
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get current user reviews
 * @route   GET /api/reviews/me
 * @access  Private
 */
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
