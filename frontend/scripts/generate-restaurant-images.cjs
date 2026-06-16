const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/restaurants');
const restaurants = [
  { slug: 'warung-pak-din', name: 'Warung Pak Din', sub: 'Malay Cuisine · Kuala Lumpur', tag: 'Nasi Lemak · Sambal · Ayam Percik', c1: '#1B7D4E', c2: '#F4C430' },
  { slug: 'madam-lis-kitchen', name: "Madam Li's Kitchen", sub: 'Chinese Malaysian · Petaling Jaya', tag: 'Dim Sum · Curry Laksa · Butter Prawns', c1: '#C41E3A', c2: '#FFD700' },
  { slug: 'saffron-lane', name: 'Restoran Saffron Lane', sub: 'Indian Malaysian · Penang', tag: 'Nasi Kandar · Roti Canai · Fish Curry', c1: '#E87722', c2: '#F9C74F' },
  { slug: 'bijan-heritage', name: 'Bijan Heritage', sub: 'Nyonya Cuisine · Kuala Lumpur', tag: 'Ayam Buah Keluak · Otak-Otak', c1: '#2D6A6A', c2: '#E8A87C' },
  { slug: 'tiga-rasa-co', name: 'Tiga Rasa & Co.', sub: 'Modern Malaysian · Johor Bahru', tag: 'Rendang Tacos · Teh Tarik Brulee', c1: '#0a2540', c2: '#8B5CF6' },
  { slug: 'kopitiam-lima-dua', name: 'Kopitiam Lima Dua', sub: 'Cafe Culture · Malacca', tag: 'Kopi-O · Kaya Toast · Soft Eggs', c1: '#6F4E37', c2: '#D4A574' },
];

const variants = [
  { x1: '0', y1: '0', x2: '1', y2: '1', op: 0.08 },
  { x1: '1', y1: '0', x2: '0', y2: '1', op: 0.1 },
  { x1: '0', y1: '1', x2: '1', y2: '0', op: 0.07 },
  { x1: '0.2', y1: '0', x2: '0.8', y2: '1', op: 0.09 },
];

for (const r of restaurants) {
  variants.forEach((v, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${r.name}">
  <defs><linearGradient id="bg" x1="${v.x1}" y1="${v.y1}" x2="${v.x2}" y2="${v.y2}"><stop offset="0%" stop-color="${r.c1}"/><stop offset="100%" stop-color="${r.c2}"/></linearGradient></defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <circle cx="960" cy="170" r="170" fill="#ffffff" opacity="${v.op}"/>
  <circle cx="180" cy="660" r="240" fill="#ffffff" opacity="0.05"/>
  <text x="72" y="360" fill="#ffffff" font-size="58" font-weight="700" font-family="system-ui,Segoe UI,sans-serif">${r.name}</text>
  <text x="72" y="430" fill="#ffffff" opacity="0.85" font-size="30" font-family="system-ui,Segoe UI,sans-serif">${r.sub}</text>
  <text x="72" y="500" fill="#ffffff" opacity="0.65" font-size="24" font-family="system-ui,Segoe UI,sans-serif">${r.tag}</text>
</svg>`;
    fs.writeFileSync(path.join(dir, `${r.slug}-${i + 1}.svg`), svg);
  });
}

console.log('Created', restaurants.length * variants.length, 'images');
