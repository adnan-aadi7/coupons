const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
  dealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { 
    type: String, 
    enum: ['pending', 'converted', 'expired'],
    default: 'pending'
  },
  estimatedCashback: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
  region: { type: String },
  userAgent: { type: String }
});

module.exports = mongoose.model('Click', ClickSchema);
