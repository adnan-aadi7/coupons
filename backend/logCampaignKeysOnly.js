const axios = require('axios');
require('dotenv').config();

async function logKeys() {
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
      params: { limit: 1, connection_status: 'active', adspace: 2942167 }
    });

    if (res.data.results.length > 0) {
      const camp = res.data.results[0];
      console.log('Campaign Keys:', Object.keys(camp));
      console.log('Campaign ID:', camp.id);
      console.log('Campaign Name:', camp.name);
      console.log('Campaign gotolink:', camp.gotolink);
      console.log('Campaign gotolink_url:', camp.gotolink_url);
      console.log('Campaign connection_status:', camp.connection_status);
    }

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

logKeys();
