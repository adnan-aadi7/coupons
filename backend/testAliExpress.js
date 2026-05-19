const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

async function testAli() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB.');

  const clientId = process.env.ADMITAD_CLIENT_ID;
  const clientSecret = process.env.ADMITAD_CLIENT_SECRET;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const authRes = await axios.post('https://api.admitad.com/token/', 'grant_type=client_credentials&client_id=' + clientId + '&scope=advcampaigns coupons', {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = authRes.data.access_token;
    console.log('Got token');

    const campaignsRes = await axios.get('https://api.admitad.com/advcampaigns/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 500 }
    });

    const campaigns = campaignsRes.data.results;
    const aliExpress = campaigns.find(c => c.name.toLowerCase().includes('aliexpress'));
    
    if (aliExpress) {
      console.log('Found AliExpress:', aliExpress.name, 'ID:', aliExpress.id);
      
      const couponsRes = await axios.get('https://api.admitad.com/coupons/', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit: 50, campaign: aliExpress.id }
      });
      console.log('Coupons for AliExpress:', couponsRes.data.results.length);
      if (couponsRes.data.results.length > 0) {
        console.log('Sample Coupon:', couponsRes.data.results[0].name);
      }
    } else {
      console.log('AliExpress campaign not found in active campaigns.');
    }
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
  process.exit();
}

testAli();
