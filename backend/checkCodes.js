const mongoose = require('mongoose');
const Coupon = require('./src/models/Coupon');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/coupons');
  const all = await Coupon.find({});
  const withCodes = all.filter(c => c.code && c.code.trim() !== '');
  console.log('--- DB COUPONS STATS ---');
  console.log('Total Coupons/Deals in DB:', all.length);
  console.log('With Promo Codes:', withCodes.length);
  if (withCodes.length > 0) {
    console.log('Sample of Coupon with code:');
    console.log(withCodes[0]);
  } else {
    console.log('No coupons have promo codes! Sample of one entry in DB:');
    if (all.length > 0) {
      console.log(all[0]);
    }
  }
  process.exit(0);
}

run();
