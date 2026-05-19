require('dotenv').config();
const axios = require('axios');

const inspectLogos = async () => {
  try {
    const ADMITAD_CLIENT_ID = process.env.ADMITAD_CLIENT_ID;
    const ADMITAD_CLIENT_SECRET = process.env.ADMITAD_CLIENT_SECRET;
    const auth = Buffer.from(`${ADMITAD_CLIENT_ID}:${ADMITAD_CLIENT_SECRET}`).toString('base64');

    const tokenRes = await axios.post('https://api.admitad.com/token/', 
      `grant_type=client_credentials&client_id=${ADMITAD_CLIENT_ID}&scope=advcampaigns`,
      {
        headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    const token = tokenRes.data.access_token;

    const response = await axios.get('https://api.admitad.com/advcampaigns/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 10, connection_status: 'active' }
    });

    console.log('\n--- LOGO URLS FROM ADMITAD ---');
    response.data.results.forEach((p) => {
      console.log(`Brand: ${p.name}`);
      console.log(`- Image: ${p.image}`);
      console.log(`- Logo: ${p.logo}`);
    });
    console.log('------------------------------\n');

  } catch (error) {
    console.error('Error:', error.message);
  }
};

inspectLogos();
