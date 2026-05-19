const axios = require('axios');
require('dotenv').config();

async function testAdspace() {
  const clientId = process.env.ADMITAD_CLIENT_ID;
  const clientSecret = process.env.ADMITAD_CLIENT_SECRET;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const authRes = await axios.post('https://api.admitad.com/token/', 'grant_type=client_credentials&client_id=' + clientId + '&scope=advcampaigns coupons websites', {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = authRes.data.access_token;
    
    // Fetch websites/adspaces
    const websitesRes = await axios.get('https://api.admitad.com/websites/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    console.log('Webspaces:', JSON.stringify(websitesRes.data.results.map(w => ({ id: w.id, name: w.name, status: w.status })), null, 2));

    if (websitesRes.data.results.length > 0) {
      const adspaceId = websitesRes.data.results[0].id;
      console.log(`Using Adspace ID: ${adspaceId}`);

      const couponsRes = await axios.get('https://api.admitad.com/coupons/', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit: 5, adspace: adspaceId }
      });

      console.log('Coupons fetched with Adspace:', couponsRes.data.results.length);
      if (couponsRes.data.results.length > 0) {
        const c = couponsRes.data.results[0];
        console.log('Coupon Keys:', Object.keys(c));
        console.log('Full Coupon Object:', JSON.stringify(c, null, 2));
      }
    }

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testAdspace();
