const axios = require('axios');
require('dotenv').config();

async function testSpecies() {
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
    
    // Fetch coupons filtering by species: 'promocode'
    const couponsRes = await axios.get('https://api.admitad.com/coupons/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 10, species: 'promocode' }
    });

    console.log('Results length with species promocode:', couponsRes.data.results.length);
    if (couponsRes.data.results.length > 0) {
      console.log('First Promocode Coupon:', JSON.stringify(couponsRes.data.results[0], null, 2));
    }
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testSpecies();
