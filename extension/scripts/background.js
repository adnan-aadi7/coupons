// SmartSaver Background Service Worker

const API_BASE = 'http://localhost:5000/api/coupons';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'GET_STORE_DATA') {
    fetch(`${API_BASE}?store=${request.domain}`)
      .then(response => response.json())
      .then(data => {
        sendResponse({
          success: true,
          count: data.count || 0,
          coupons: data.data || []
        });
      })
      .catch(err => {
        console.error('API Fetch Error:', err);
        sendResponse({ success: false, error: err.message });
      });
    
    return true; // Keep channel open for async response
  }
});

// Update Badge when tab url changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname.replace('www.', '');
      
      fetch(`${API_BASE}?store=${domain}`)
        .then(res => res.json())
        .then(data => {
          if (data.count > 0) {
            chrome.action.setBadgeText({ text: data.count.toString(), tabId: tabId });
            chrome.action.setBadgeBackgroundColor({ color: '#10b981', tabId: tabId });
          } else {
            chrome.action.setBadgeText({ text: '', tabId: tabId });
          }
        })
        .catch(() => {});
    } catch (e) {}
  }
});
