const axios = require('axios');
require('dotenv').config();

async function run() {
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
      params: { limit: 5, connection_status: 'active' }
    });

    res.data.results.forEach(camp => {
      console.log(`Campaign: ${camp.name}`);
      console.log(`- image: ${camp.image}`);
      console.log(`- logo: ${camp.logo}`);
      console.log(`- site_url: ${camp.site_url}`);
    });

  } catch (err) {
    console.error(err.message);
  }
}

run();
