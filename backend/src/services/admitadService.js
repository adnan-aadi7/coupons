const axios = require('axios');
const Coupon = require('../models/Coupon');
const Store = require('../models/Store');

const ADMITAD_BASE_AUTH = process.env.ADMITAD_BASE_AUTH;
const ADMITAD_CLIENT_ID = process.env.ADMITAD_CLIENT_ID;
const ADMITAD_CLIENT_SECRET = process.env.ADMITAD_CLIENT_SECRET;

/**
 * Get Admitad API Token with full required scopes
 */
const getAccessToken = async () => {
  try {
    const auth = ADMITAD_BASE_AUTH || Buffer.from(`${ADMITAD_CLIENT_ID}:${ADMITAD_CLIENT_SECRET}`).toString('base64');
    
    const response = await axios.post('https://api.admitad.com/token/', 
      `grant_type=client_credentials&client_id=${ADMITAD_CLIENT_ID}&scope=advcampaigns coupons websites public_data advcampaigns_for_website coupons_for_website`,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Admitad Auth Error:', error.response?.data || error.message);
    return null;
  }
};

/**
 * Sync Stores and Coupons from Admitad to our Database
 */
exports.syncAdmitadCoupons = async () => {
  try {
    const token = await getAccessToken();
    if (!token) return { success: false, message: 'Failed to authenticate with Admitad' };

    console.log('Fetching websites/adspaces...');
    const websitesRes = await axios.get('https://api.admitad.com/websites/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!websitesRes.data.results || websitesRes.data.results.length === 0) {
      return { success: false, message: 'No active webspaces found on Admitad' };
    }
    const adspaceId = websitesRes.data.results[0].id;
    console.log(`Using Adspace ID: ${adspaceId}`);

    console.log('Fetching approved campaigns...');
    let campaigns = [];
    let campOffset = 0;
    const campLimit = 200;
    let campHasMore = true;

    while (campHasMore) {
      console.log(`Fetching campaigns offset ${campOffset}...`);
      const res = await axios.get(`https://api.admitad.com/advcampaigns/website/${adspaceId}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit: campLimit, offset: campOffset }
      });
      
      const results = res.data.results;
      if (!results || results.length === 0) {
        campHasMore = false;
      } else {
        const activeCamps = results.filter(c => c.connection_status === 'active');
        campaigns = campaigns.concat(activeCamps);
        
        if (results.length < campLimit) {
          campHasMore = false;
        } else {
          campOffset += campLimit;
        }
      }
    }
    console.log(`Found ${campaigns.length} approved campaigns.`);

    // Reset all stores to unverified. Only currently active ones will be re-verified in the loop below.
    await Store.updateMany({}, { verifiedStore: false });

    for (const camp of campaigns) {
      const storeSlug = camp.name.toLowerCase().replace(/\s+/g, '-');
      const logoUrl = camp.image || camp.logo || `https://logo.clearbit.com/${storeSlug}.com`;
      
      await Store.findOneAndUpdate(
        { slug: storeSlug },
        {
          name: camp.name,
          slug: storeSlug,
          logoUrl: logoUrl,
          category: camp.categories?.[0]?.name || 'General',
          verifiedStore: true,
          cashbackRate: parseFloat(camp.actions?.[0]?.payment_size) || 5,
          affiliateUrl: camp.gotolink || '',
          baseUrl: camp.site_url || ''
        },
        { upsert: true, new: true }
      );
    }

    // Now fetch coupons specific to our website/adspace (to get tracking promocodes!)
    console.log('Fetching website-specific coupons...');
    let admitadCoupons = [];
    let offset = 0;
    const limit = 500;
    let hasMore = true;

    while (hasMore) {
      console.log(`Fetching coupons offset ${offset}...`);
      const couponsRes = await axios.get(`https://api.admitad.com/coupons/website/${adspaceId}/`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { limit, offset }
      });
      
      const results = couponsRes.data.results;
      if (!results || results.length === 0) {
        hasMore = false;
      } else {
        admitadCoupons = admitadCoupons.concat(results);
        if (results.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
    }
    
    console.log(`Total coupons fetched from Admitad website coupons API: ${admitadCoupons.length}`);
    let syncedCount = 0;

    for (const ac of admitadCoupons) {
      const storeSlug = ac.campaign.name.toLowerCase().replace(/\s+/g, '-');
      let store = await Store.findOne({ slug: storeSlug });
      
      if (!store) continue;

      const existingCoupon = await Coupon.findOne({ admitadId: ac.id });
      
      // Classify as Coupon (requires promo code) or Deal (direct link offer)
      const isRealCode = ac.promocode && ac.promocode.trim() !== '' && ac.promocode !== 'NOT REQUIRED';
      const type = isRealCode ? 'coupon' : 'deal';
      const promoCodeValue = isRealCode ? ac.promocode.trim() : '';

      const couponData = {
        admitadId: ac.id,
        type: type,
        title: ac.name || ac.short_name,
        description: ac.description || '',
        code: promoCodeValue,
        link: ac.goto_link || store.affiliateUrl || store.baseUrl || '',
        store: store.name,
        category: store.category,
        brandLogo: store.logoUrl,
        expiryDate: ac.date_end,
        isHot: ac.is_exclusive || false,
        discountType: ac.discount_type === 'percentage' ? 'percentage' : 'fixed',
        discountValue: parseFloat(ac.discount_value) || 0,
        isCode: isRealCode,
        isActive: true
      };

      if (existingCoupon) {
        // Update existing
        await Coupon.findByIdAndUpdate(existingCoupon._id, couponData);
      } else {
        // Create new
        await Coupon.create(couponData);
        syncedCount++;
      }
    }

    return { success: true, count: syncedCount, storesCount: campaigns.length };
  } catch (error) {
    console.error('Sync Error:', error.response?.data || error.message);
    return { success: false, message: error.message };
  }
};
