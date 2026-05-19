const mongoose = require('mongoose');
const Store = require('./src/models/Store');
const Coupon = require('./src/models/Coupon');
require('dotenv').config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB.');

  const allStores = await Store.find({});
  console.log(`Total stores in DB: ${allStores.length}`);
  allStores.forEach(s => {
    console.log(`- ${s.name} (Slug: ${s.slug}) | Verified: ${s.verifiedStore}`);
  });

  const allCoupons = await Coupon.find({});
  console.log(`Total coupons in DB: ${allCoupons.length}`);

  process.exit();
}

check();
