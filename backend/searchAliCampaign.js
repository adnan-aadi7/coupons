const axios = require('axios');
require('dotenv').config();

async function searchAli() {
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
    
    // Search with name parameter
    const searchRes = await axios.get('https://api.admitad.com/advcampaigns/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { query: 'AliExpress' }
    });

    console.log('Search Results:', JSON.stringify(searchRes.data.results.map(r => ({
      id: r.id,
      name: r.name,
      status: r.connection_status,
      actions: r.actions
    })), null, 2));

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

searchAli();
