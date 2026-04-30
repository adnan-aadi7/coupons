const Click = require('../models/Click');
const Coupon = require('../models/Coupon');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');

/**
 * @desc    Track click and redirect to affiliate link
 * @route   GET /api/track/:id
 */
exports.trackClick = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    // 1. Detect User (Optional Auth)
    let userId = null;
    let token = req.cookies.token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
        userId = decoded.id;
      } catch (err) {
        // Invalid token, continue as guest
      }
    }

    // 2. Capture Metadata
    const clientIp = requestIp.getClientIp(req);
    
    // 3. Log Click with Attribution
    await Click.create({
      dealId: couponId,
      userId: userId,
      ip: clientIp,
      userAgent: req.headers['user-agent'],
      status: 'pending',
      estimatedCashback: (coupon.discountType === 'percentage' ? (coupon.discountValue / 20) : 0.5) // Hacky estimation for demo
    });

    // 4. Update popularity
    coupon.popularity += 1;
    await coupon.save();

    // 5. Redirect
    res.redirect(coupon.link);

  } catch (error) {
    console.error('Tracking Error:', error.message);
    res.status(500).json({ success: false, message: 'Redirection failed' });
  }
};
