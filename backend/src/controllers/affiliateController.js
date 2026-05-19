/**
 * Affiliate Controller
 * Handles monetization, Admitad API integration, and Postback/Webhook logic.
 */
const axios = require('axios');
const User = require('../models/User');
const Click = require('../models/Click');

// Credentials from .env
const SKIMLINKS_ID = process.env.SKIMLINKS_ID;
const ADMITAD_CLIENT_ID = process.env.ADMITAD_CLIENT_ID;
const ADMITAD_CLIENT_SECRET = process.env.ADMITAD_CLIENT_SECRET;
const ADMITAD_BASE_AUTH = process.env.ADMITAD_BASE_AUTH;

// Direct Affiliate Overrides
const DIRECT_PARTNERS = {
  'amazon': (url) => `${url}?tag=${process.env.AMAZON_TAG || 'your-amazon-tag-20'}`,
  'walmart': (url) => `${process.env.WALMART_PARTNER_URL || 'https://goto.walmart.com/c/default'}/?u=${encodeURIComponent(url)}`,
  'target': (url) => `${process.env.TARGET_PARTNER_URL || 'https://target.georiot.com/Proxy.ashx'}?GR_URL=${encodeURIComponent(url)}`
};

/**
 * Get Admitad Access Token
 * Used for fetching coupons and statistics from Admitad
 */
const getAdmitadToken = async () => {
  try {
    const response = await axios.post('https://api.admitad.com/token/', 
      'grant_type=client_credentials&scope=public_id+websites+manage_websites+advcampaigns+advcampaigns_for_website+coupons+coupons_for_website+statistics',
      {
        headers: {
          'Authorization': `Basic ${ADMITAD_BASE_AUTH}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Admitad Auth Error:', error.response ? error.response.data : error.message);
    return null;
  }
};

/**
 * Handle Admitad Postback (Conversion Webhook)
 * @route GET/POST /api/affiliate/postback
 */
exports.handlePostback = async (req, res) => {
  try {
    // Admitad usually sends parameters like subid, payment, status, etc.
    const { subid, payment, status, action_id, currency } = { ...req.query, ...req.body };

    console.log(`[Affiliate Postback] Received conversion for SubID: ${subid}, Amount: ${payment}, Status: ${status}`);

    if (!subid) {
      return res.status(400).send('No SubID provided');
    }

    // 1. Find User by SubID (We use UserID as SubID in our tracking)
    const user = await User.findById(subid);
    if (!user) {
      console.warn(`[Affiliate Postback] No user found for SubID: ${subid}`);
      return res.status(404).send('User not found');
    }

    // 2. Update User Wallet based on Status
    // Admitad statuses: 'approved', 'pending', 'rejected'
    const amount = parseFloat(payment) || 0;
    
    // We give 80% of the commission to the user, keep 20%
    const userShare = amount * 0.8;

    if (status === 'approved' || status === '1') {
      user.wallet.availableCashback += userShare;
      user.wallet.pendingCashback -= userShare;
      if (user.wallet.pendingCashback < 0) user.wallet.pendingCashback = 0;
      user.wallet.lifetimeSavings += userShare;
    } else if (status === 'pending' || status === '0') {
      user.wallet.pendingCashback += userShare;
    } else if (status === 'rejected' || status === '2') {
      user.wallet.pendingCashback -= userShare;
      if (user.wallet.pendingCashback < 0) user.wallet.pendingCashback = 0;
    }

    await user.save();

    // 3. Mark Click as Converted
    await Click.findOneAndUpdate(
      { userId: subid, status: 'pending' },
      { status: status === 'approved' ? 'converted' : 'pending' },
      { sort: { timestamp: -1 } }
    );

    res.status(200).send('Postback processed successfully');

  } catch (error) {
    console.error('Postback Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Monetize a raw retailer URL (Manual tool)
 */
exports.monetizeUrl = async (req, res) => {
  try {
    const { url, retailerName } = req.body;
    if (!url) return res.status(400).json({ success: false, message: 'URL is required' });

    let monetizedUrl = url;
    const lowerRetailer = retailerName ? retailerName.toLowerCase() : '';

    const partnerKey = Object.keys(DIRECT_PARTNERS).find(key => lowerRetailer.includes(key));
    if (partnerKey) {
      monetizedUrl = DIRECT_PARTNERS[partnerKey](url);
    } else {
      monetizedUrl = `https://go.skimresources.com/?id=${SKIMLINKS_ID}&url=${encodeURIComponent(url)}`;
    }

    res.status(200).json({ success: true, data: { originalUrl: url, monetizedUrl, method: partnerKey ? 'Direct' : 'Aggregator' } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to monetize link' });
  }
};

/**
 * Get active affiliate programs
 */
exports.getPrograms = async (req, res) => {
  const programs = [
    { name: 'Admitad Network', type: 'Aggregator', status: 'Active' },
    { name: 'Amazon', type: 'Direct', status: 'Active' },
    { name: 'Walmart', type: 'Direct', status: 'Active' },
    { name: 'Skimlinks', type: 'Aggregator', status: 'Active' }
  ];
  res.status(200).json({ success: true, programs });
};
