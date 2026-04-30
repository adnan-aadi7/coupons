const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String },
  link: { type: String, required: true },
  store: { type: String, required: true },
  brand: { type: String },
  category: { type: String },
  discountType: { type: String, enum: ['percentage', 'fixed', 'deal'] },
  discountValue: { type: Number },
  expiryDate: { type: Date },
  popularity: { type: Number, default: 0 },
  region: { type: String, default: 'US' },
  isActive: { type: Boolean, default: true },
  
  // New SmartSaver/Coupons.com Features
  usageCountToday: { type: Number, default: 0 },
  verifiedAt: { type: Date, default: Date.now },
  isPrintable: { type: Boolean, default: false },
  printableUrl: { type: String },
  successRate: { type: Number, default: 100 },
}, { timestamps: true });

// Index for faster searching
CouponSchema.index({ brand: 'text', category: 'text', store: 'text' });

module.exports = mongoose.model('Coupon', CouponSchema);
