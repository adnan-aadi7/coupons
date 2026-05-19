const axios = require('axios');
require('dotenv').config();

async function checkCampaign() {
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
    
    const res = await axios.get('https://api.admitad.com/advcampaigns/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 1, connection_status: 'active' }
    });

    if (res.data.results.length > 0) {
      console.log('Campaign Keys:', Object.keys(res.data.results[0]));
      console.log('Campaign Sample:', JSON.stringify(res.data.results[0], null, 2));
    }

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

checkCampaign();
