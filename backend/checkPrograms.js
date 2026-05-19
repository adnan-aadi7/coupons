require('dotenv').config();
const axios = require('axios');

const checkPrograms = async () => {
  try {
    const ADMITAD_CLIENT_ID = process.env.ADMITAD_CLIENT_ID;
    const ADMITAD_CLIENT_SECRET = process.env.ADMITAD_CLIENT_SECRET;
    const auth = Buffer.from(`${ADMITAD_CLIENT_ID}:${ADMITAD_CLIENT_SECRET}`).toString('base64');

    // 1. Get Token
    const tokenRes = await axios.post('https://api.admitad.com/token/', 
      `grant_type=client_credentials&client_id=${ADMITAD_CLIENT_ID}&scope=advcampaigns`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    const token = tokenRes.data.access_token;

    // 2. Get Joined Programs
    const response = await axios.get('https://api.admitad.com/advcampaigns/me/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 100 }
    });

    console.log('\n--- YOUR APPROVED PROGRAMS IN ADMITAD ---');
    response.data.results.forEach((p, i) => {
      console.log(`${i+1}. ${p.name} (Status: ${p.connection_status})`);
    });
    
    if (response.data.results.length === 0) {
      console.log('No programs are currently "Joined" for your ad space.');
    }
    console.log('-----------------------------------------\n');

  } catch (error) {
    console.error('Error checking programs:', error.response?.data || error.message);
  }
};

checkPrograms();
