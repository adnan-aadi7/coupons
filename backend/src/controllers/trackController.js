const Click = require('../models/Click');
const Coupon = require('../models/Coupon');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');

/**
 * @desc    Track click and redirect to affiliate link with subid
 * @route   GET /api/track/:id
 */
exports.trackClick = async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    // 1. Detect User
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
        // Continue as guest
      }
    }

    // 2. Capture Metadata
    const clientIp = requestIp.getClientIp(req);

    // 3. Click Spam Protection (15 seconds Cooldown)
    // Check if the same user (or guest IP) clicked this exact coupon within the last 15s
    const cooldownPeriod = new Date(Date.now() - 5 * 1000);
    const spamQuery = {
      dealId: couponId,
      createdAt: { $gte: cooldownPeriod }
    };

    if (userId) {
      spamQuery.userId = userId;
    } else {
      spamQuery.ip = clientIp;
    }

    const existingClick = await Click.findOne(spamQuery);

    if (!existingClick) {
      // Log Click only if not a duplicate inside the cooldown window
      await Click.create({
        dealId: couponId,
        userId: userId,
        ip: clientIp,
        userAgent: req.headers['user-agent'],
        status: 'pending',
        estimatedCashback: (coupon.discountType === 'percentage' ? (coupon.discountValue / 20) : 0.5)
      });

      // 4. Update coupon popularity
      coupon.popularity += 1;
      await coupon.save();

      // 5. Update store totalClicks (fire-and-forget, non-blocking)
      const Store = require('../models/Store');
      Store.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${coupon.store}$`, 'i') } },
        { $inc: { totalClicks: 1 } }
      ).exec().catch(() => {}); // swallow error silently
    } else {
      console.log(`[Click Spam Blocked] Duplicate click suppressed for Coupon: ${couponId} (IP: ${clientIp})`);
    }

    // 5. Monetize & Append SubID (Strictly Admitad Integration)
    let finalLink = coupon.link || '';

    // Fallback: If coupon has no direct link, fetch the associated store's Admitad affiliate link
    if (!finalLink) {
      const Store = require('../models/Store');
      const storeObj = await Store.findOne({ name: { $regex: new RegExp(`^${coupon.store}$`, 'i') } });
      if (storeObj && storeObj.affiliateUrl) {
        finalLink = storeObj.affiliateUrl;
      } else if (storeObj && storeObj.baseUrl) {
        finalLink = storeObj.baseUrl;
      }
    }

    if (userId && finalLink) {
      // Append SubID directly for Admitad tracking
      const separator = finalLink.includes('?') ? '&' : '?';
      if (!finalLink.includes('subid=')) {
        finalLink += `${separator}subid=${userId}`;
      }
    }

    // 6. Redirect
    res.redirect(finalLink || 'https://google.com');

  } catch (error) {
    console.error('Tracking Error:', error.message);
    res.status(500).json({ success: false, message: 'Redirection failed' });
  }
};
