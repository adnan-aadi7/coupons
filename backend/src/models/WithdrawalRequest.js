const mongoose = require('mongoose');

const WithdrawalRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [5, 'Minimum withdrawal amount is $5']
  },
  payoutMethod: {
    provider: { type: String, enum: ['paypal'], default: 'paypal' },
    email: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  transactionId: {
    type: String, // To store PayPal payout batch ID later
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  processedAt: {
    type: Date
  }
});

module.exports = mongoose.model('WithdrawalRequest', WithdrawalRequestSchema);
