/* SmartSaver Content Script */

const injectFloatingBanner = (count) => {
  if (document.getElementById('smartsaver-injected-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'smartsaver-injected-banner';
  banner.innerHTML = `
    <div class="smartsaver-flex">
      <div class="smartsaver-logo">Smart<span>Saver</span></div>
      <div class="smartsaver-msg">Found <strong>${count} verified coupons</strong> for this store!</div>
      <div class="smartsaver-actions">
        <button id="smartsaver-activate-btn">Activate Cashback</button>
        <button id="smartsaver-close">&times;</button>
      </div>
    </div>
  `;

  document.body.prepend(banner);

  document.getElementById('smartsaver-close').onclick = () => banner.remove();
  document.getElementById('smartsaver-activate-btn').onclick = (e) => {
    e.target.textContent = 'Activated!';
    e.target.style.background = '#059669';
    setTimeout(() => banner.remove(), 2000);
  };
};

// Check for coupons when page loaded
chrome.runtime.sendMessage({ 
  action: 'GET_STORE_DATA', 
  domain: window.location.hostname.replace('www.', '') 
}, (response) => {
  if (response && response.count > 0) {
    injectFloatingBanner(response.count);
  }
});
