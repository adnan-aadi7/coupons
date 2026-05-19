const axios = require('axios');
require('dotenv').config();

async function testWebsiteCampaigns() {
  const clientId = process.env.ADMITAD_CLIENT_ID;
  const clientSecret = process.env.ADMITAD_CLIENT_SECRET;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const authRes = await axios.post('https://api.admitad.com/token/', 'grant_type=client_credentials&client_id=' + clientId + '&scope=advcampaigns coupons websites advcampaigns_for_website', {
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

    if (websitesRes.data.results.length === 0) return;
    const adspaceId = websitesRes.data.results[0].id;

    const res = await axios.get(`https://api.admitad.com/advcampaigns/website/${adspaceId}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 1 }
    });

    if (res.data.results.length > 0) {
      const camp = res.data.results[0];
      console.log('Keys of /advcampaigns/website/{id}/:', Object.keys(camp));
      console.log('Sample:', JSON.stringify(camp, null, 2));
    }

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

testWebsiteCampaigns();
