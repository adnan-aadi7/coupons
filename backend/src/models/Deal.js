const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  admitadId: { type: String, unique: true, sparse: true },
  type: { type: String, enum: ['coupon', 'deal'], default: 'deal' },
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String },
  link: { type: String, required: true },
  store: { type: String, required: true },
  brand: { type: String },
  brandLogo: { type: String },
  bannerImage: { type: String },
  isCode: { type: Boolean, default: false },
  terms: { type: String },
  verified: { type: Boolean },
  category: { type: String },
  discountType: { type: String, enum: ['percentage', 'fixed', 'deal'], default: 'deal' },
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

// Indexes for optimized searching and listings
DealSchema.index({ brand: 'text', category: 'text', store: 'text' });
DealSchema.index({ store: 1 });
DealSchema.index({ brand: 1 });
DealSchema.index({ category: 1 });
DealSchema.index({ isActive: 1 });

module.exports = mongoose.model('Deal', DealSchema);
