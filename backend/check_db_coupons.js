const mongoose = require('mongoose');
require('dotenv').config();

const Coupon = require('./src/models/Coupon');
const Store = require('./src/models/Store');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const count = await Coupon.countDocuments({});
  console.log(`Total coupons: ${count}`);

  const withBanners = await Coupon.find({ bannerImage: { $exists: true, $ne: null, $ne: "" } });
  console.log(`Coupons with banners in database: ${withBanners.length}`);

  if (withBanners.length > 0) {
    console.log('Sample coupon with banner:');
    console.log(`- title: ${withBanners[0].title}`);
    console.log(`- store: ${withBanners[0].store}`);
    console.log(`- bannerImage: ${withBanners[0].bannerImage}`);
  }

  await mongoose.disconnect();
}

run();
