const axios = require('axios');
require('dotenv').config();

async function run() {
  const clientId = process.env.ADMITAD_CLIENT_ID;
  const clientSecret = process.env.ADMITAD_CLIENT_SECRET;
  const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    console.log('Requesting token with banners scopes...');
    const authRes = await axios.post('https://api.admitad.com/token/', 
      'grant_type=client_credentials&client_id=' + clientId + '&scope=advcampaigns coupons websites banners banners_for_website public_data advcampaigns_for_website coupons_for_website', {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = authRes.data.access_token;
    console.log('Token retrieved successfully!');
    
    // Fetch websites
    const websitesRes = await axios.get('https://api.admitad.com/websites/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (websitesRes.data.results.length === 0) {
      console.log('No websites found');
      return;
    }
    
    const adspaceId = websitesRes.data.results[0].id;
    console.log(`Adspace ID: ${adspaceId}`);

    // Fetch active campaigns
    const campaignsRes = await axios.get(`https://api.admitad.com/advcampaigns/website/${adspaceId}/`, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 100, connection_status: 'active' }
    });
    
    const activeCamps = campaignsRes.data.results || [];
    console.log(`Active campaigns count: ${activeCamps.length}`);
    
    for (const item of activeCamps.slice(0, 5)) {
      console.log('Campaign Item keys:', Object.keys(item));
      console.log('Campaign Item detail:', JSON.stringify(item).slice(0, 300));
      const campaign = item.campaign || item;
      const campId = campaign.id;
      const campName = campaign.name;
      const url = `https://api.admitad.com/banners/${campId}/website/${adspaceId}/`;
      console.log(`Testing banners for active campaign "${campName}" (${campId}): ${url}`);
      try {
        const bannersRes = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { limit: 5 }
        });
        console.log(`- Success! Results count: ${bannersRes.data.results?.length}`);
        if (bannersRes.data.results && bannersRes.data.results.length > 0) {
          console.log('- Sample Banner:', JSON.stringify(bannersRes.data.results[0], null, 2));
        }
      } catch (err) {
        console.log(`- Failed: ${err.response?.status} - ${JSON.stringify(err.response?.data) || err.message}`);
      }
    }

  } catch (err) {
    console.error('Root Error:', err.message);
  }
}

run();
