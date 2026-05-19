const mongoose = require('mongoose');
const User = require('./src/models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coupons');
    console.log('Connected to MongoDB');

    const email = 'admin@smartsaver.com';
    const existing = await User.findOne({ email });
    
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log('Admin user updated successfully:', email);
    } else {
      const admin = await User.create({
        name: 'System Admin',
        email: email,
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('Admin user created successfully:', admin.email);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
}

createAdmin();
