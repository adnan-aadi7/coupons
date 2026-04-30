document.addEventListener('DOMContentLoaded', async () => {
  const loadingState = document.getElementById('loading');
  const contentState = document.getElementById('content');
  const noDealsState = document.getElementById('no-deals');
  const storeNameEl = document.getElementById('store-name');
  const couponCountEl = document.getElementById('coupon-count');
  const applyBtn = document.getElementById('apply-btn');

  // 1. Get Active Tab Info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname.replace('www.', '');

  storeNameEl.textContent = domain;

  // 2. Fetch Deals from API (via Background Script)
  try {
    const response = await chrome.runtime.sendMessage({ 
      action: 'GET_STORE_DATA', 
      domain: domain 
    });

    loadingState.classList.add('hidden');

    if (response && response.count > 0) {
      couponCountEl.textContent = response.count;
      contentState.classList.remove('hidden');
    } else {
      noDealsState.classList.remove('hidden');
    }
  } catch (err) {
    console.error('Failed to fetch store data:', err);
    loadingState.classList.add('hidden');
    noDealsState.classList.remove('hidden');
  }

  // 3. Handle Actions
  applyBtn.addEventListener('click', () => {
    applyBtn.disabled = true;
    applyBtn.textContent = 'Testing Magic...';
    
    // Simulate auto-apply logic
    setTimeout(() => {
      applyBtn.textContent = 'Success! -$24.50';
      applyBtn.style.background = '#059669'; // Darker emerald
    }, 2000);
  });

  document.getElementById('activate-btn').addEventListener('click', (e) => {
    e.target.textContent = 'ACTIVATED';
    e.target.disabled = true;
    e.target.style.opacity = '0.5';
  });
});
