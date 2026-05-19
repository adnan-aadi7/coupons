const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  phoneNumber: {
    type: String,
    match: [
      /^\+?([0-9]{1,3})?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Please add a valid phone number',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  savedCoupons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Coupon',
    },
  ],
  favoriteStores: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Store',
    },
  ],
  wallet: {
    pendingCashback: {
      type: Number,
      default: 0,
    },
    availableCashback: {
      type: Number,
      default: 0,
    },
    lifetimeSavings: {
      type: Number,
      default: 0,
    },
  },
  payoutMethods: [
    {
      provider: { type: String, enum: ['paypal'], default: 'paypal' },
      email: { type: String, required: true },
      isPrimary: { type: Boolean, default: true }
    }
  ],
  country: {
    type: String,
    default: 'United States',
  },
  contactPreferences: {
    deals: { type: Boolean, default: true },
    cashback: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  resetPasswordOTP: String,
  resetPasswordOTPExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
