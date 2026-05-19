const axios = require('axios');
require('dotenv').config();

async function testKeys() {
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
    
    const couponsRes = await axios.get('https://api.admitad.com/coupons/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 10 }
    });

    couponsRes.data.results.forEach((c, idx) => {
      console.log(`\nCoupon ${idx} Keys:`, Object.keys(c));
      console.log(`- id: ${c.id}, name: ${c.name}`);
      console.log(`- has_affiliate_link: ${c.has_affiliate_link}`);
      console.log(`- promolink: ${c.promolink}`);
      console.log(`- frameset_link: ${c.frameset_link}`);
      console.log(`- goto_link: ${c.goto_link}`);
    });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testKeys();
