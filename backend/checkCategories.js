const mongoose = require('mongoose');
const Coupon = require('./src/models/Coupon');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const cats = await Coupon.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  console.log('=== Coupons by Category ===');
  cats.forEach(c => console.log(c.count, '-', c._id));
  process.exit(0);
});
