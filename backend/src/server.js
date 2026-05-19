const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const connectDB = require('./config/db');
const admitadService = require('./services/admitadService');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/withdrawal', require('./routes/withdrawalRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/track', require('./routes/trackRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/affiliate', require('./routes/affiliateRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.get('/', (req, res) => {
  res.send('Coupon API is running...');
});

// Automated Cron Job: Sync Coupons, Deals & Stores from Admitad every 12 hours
cron.schedule('0 */12 * * *', async () => {
  console.log('--- RUNNING AUTOMATED ADMITAD SYNC ---');
  try {
    const result = await admitadService.syncAdmitadCoupons();
    if (result.success) {
      console.log(`AUTOMATED SYNC SUCCESS: Synced ${result.count} items and updated ${result.storesCount} stores.`);
    } else {
      console.error('AUTOMATED SYNC FAILED:', result.message);
    }
  } catch (error) {
    console.error('AUTOMATED SYNC CRITICAL ERROR:', error.message);
  }
  console.log('-------------------------------------');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Automated 12-hour sync scheduler initialized successfully.');
  });
}

// Export for Vercel Serverless Deployment
module.exports = app;
