const tests = ['fashion', 'services', 'shopping', 'travel', 'education', 'computing', 'food', 'gaming', 'electronics', 'kids', 'books'];

Promise.all(tests.map(cat => 
  fetch('http://localhost:5000/api/coupons?category=' + encodeURIComponent(cat))
    .then(r => r.json())
    .then(d => `${cat}: ${d.count} coupons`)
)).then(results => results.forEach(r => console.log(r))).catch(console.error);
