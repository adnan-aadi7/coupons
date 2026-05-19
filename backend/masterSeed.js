const mongoose = require('mongoose');
const Store = require('./src/models/Store');
const Coupon = require('./src/models/Coupon');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/coupons';

const storesData = [
  { name: 'Amazon', slug: 'amazon', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', category: 'General', cashbackRate: 5, verifiedStore: true },
  { name: 'Nike', slug: 'nike', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', category: 'Fashion', cashbackRate: 8, verifiedStore: true },
  { name: 'Walmart', slug: 'walmart', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg', category: 'General', cashbackRate: 4, verifiedStore: true },
  { name: 'Apple', slug: 'apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', category: 'Electronics', cashbackRate: 2, verifiedStore: true },
  { name: 'Adidas', slug: 'adidas', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', category: 'Fashion', cashbackRate: 10, verifiedStore: true },
  { name: 'Samsung', slug: 'samsung', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', category: 'Electronics', cashbackRate: 6, verifiedStore: true },
  { name: 'Sephora', slug: 'sephora', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Sephora_logo.svg', category: 'Beauty', cashbackRate: 12, verifiedStore: true },
  { name: 'Dell', slug: 'dell', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg', category: 'Electronics', cashbackRate: 7, verifiedStore: true }
];

const couponsData = [
  {
    title: 'Up to 20% Off on Electronics',
    store: 'Amazon',
    code: 'AMZN20',
    link: 'https://amazon.com',
    category: 'Electronics',
    discountType: 'percentage',
    discountValue: 20,
    brandLogo: 'https://logo.clearbit.com/amazon.com',
    isHot: true,
    popularity: 95
  },
  {
    title: 'Extra 15% Off Your Entire Order',
    store: 'Nike',
    code: 'NIKE15',
    link: 'https://nike.com',
    category: 'Fashion',
    discountType: 'percentage',
    discountValue: 15,
    brandLogo: 'https://logo.clearbit.com/nike.com',
    isHot: true,
    popularity: 88
  },
  {
    title: '$10 Off on Orders Over $50',
    store: 'Walmart',
    code: 'WMT10',
    link: 'https://walmart.com',
    category: 'General',
    discountType: 'fixed',
    discountValue: 10,
    brandLogo: 'https://logo.clearbit.com/walmart.com',
    isHot: false,
    popularity: 72
  },
  {
    title: 'Free Shipping on All Orders',
    store: 'Sephora',
    code: '',
    link: 'https://sephora.com',
    category: 'Beauty',
    discountType: 'fixed',
    discountValue: 0,
    brandLogo: 'https://logo.clearbit.com/sephora.com',
    isHot: true,
    popularity: 80
  },
  {
    title: '30% Off Clearance Items',
    store: 'Adidas',
    code: 'ADIC30',
    link: 'https://adidas.com',
    category: 'Fashion',
    discountType: 'percentage',
    discountValue: 30,
    brandLogo: 'https://logo.clearbit.com/adidas.com',
    isHot: true,
    popularity: 92
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Store.deleteMany({});
    await Coupon.deleteMany({});
    console.log('Cleared existing data');

    // Insert Stores
    await Store.insertMany(storesData);
    console.log('Inserted Stores');

    // Insert Coupons
    await Coupon.insertMany(couponsData);
    console.log('Inserted Coupons');

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
