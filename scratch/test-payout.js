const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../backend/src/models/User');

const runTest = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coupons', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create a mock user
    const testUser = new User({
      name: 'Test Payout User',
      email: `testpayout_${Date.now()}@example.com`,
      password: 'password123',
    });

    // Add PayPal payout method
    testUser.payoutMethods.push({
      provider: 'paypal',
      email: 'alex_paypal@example.com',
      isPrimary: true
    });

    await testUser.save();
    console.log('✅ Success: User saved with PayPal Payout Method!');
    console.log('Payout Data:', testUser.payoutMethods[0]);

    // Cleanup
    await User.findByIdAndDelete(testUser._id);
    console.log('✅ Success: Test user cleaned up.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during test:', error);
    process.exit(1);
  }
};

runTest();
