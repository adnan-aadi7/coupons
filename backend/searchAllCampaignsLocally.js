const axios = require('axios');
require('dotenv').config();

async function searchAll() {
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
    
    let allCampaigns = [];
    let offset = 0;
    const limit = 200;
    let hasMore = true;

    while (hasMore) {
      console.log(`Fetching campaigns offset ${offset}...`);
      const res = await axios.get('https://api.admitad.com/advcampaigns/', {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit, offset, connection_status: 'active' }
      });
      
      const results = res.data.results;
      if (!results || results.length === 0) {
        hasMore = false;
      } else {
        allCampaigns = allCampaigns.concat(results);
        if (results.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
    }

    console.log(`Total active campaigns: ${allCampaigns.length}`);
    const matches = allCampaigns.filter(c => c.name.toLowerCase().includes('ali'));
    console.log(`Matches for "ali":`, matches.map(c => ({ id: c.id, name: c.name, status: c.connection_status })));

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

searchAll();
