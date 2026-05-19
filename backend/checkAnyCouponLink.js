const axios = require('axios');
require('dotenv').config();

async function checkAny() {
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

    if (websitesRes.data.results.length === 0) {
      console.log('No webspaces found.');
      return;
    }

    const adspaceId = websitesRes.data.results[0].id;
    console.log(`Using Adspace ID: ${adspaceId}`);

    const couponsRes = await axios.get('https://api.admitad.com/coupons/', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { limit: 200, adspace: adspaceId }
    });

    const coupons = couponsRes.data.results;
    console.log(`Fetched ${coupons.length} coupons.`);
    
    let hasGoto = 0;
    let hasPromolink = 0;
    let allKeys = new Set();

    coupons.forEach(c => {
      Object.keys(c).forEach(k => allKeys.add(k));
      if (c.goto_link) hasGoto++;
      if (c.promolink) hasPromolink++;
    });

    console.log('All unique coupon keys across all fetched coupons:', Array.from(allKeys));
    console.log(`Coupons with goto_link: ${hasGoto}`);
    console.log(`Coupons with promolink: ${hasPromolink}`);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

checkAny();
