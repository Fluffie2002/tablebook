const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const dir = path.join(__dirname, '../public/images/restaurants');

const restaurants = [
  { slug: 'warung-pak-din', tags: 'food,asian,rice' },
  { slug: 'madam-lis-kitchen', tags: 'chinese,food,dining' },
  { slug: 'saffron-lane', tags: 'indian,curry,food' },
  { slug: 'bijan-heritage', tags: 'food,asian,dining' },
  { slug: 'tiga-rasa-co', tags: 'restaurant,food,plate' },
  { slug: 'kopitiam-lima-dua', tags: 'coffee,cafe,food' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    const request = (target) => {
      https
        .get(target, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            file.close();
            if (fs.existsSync(dest)) fs.unlinkSync(dest);
            const next = new URL(res.headers.location, target).toString();
            return request(next);
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${target}`));
            return;
          }
          res.pipe(file);
          file.on('finish', () => file.close(() => resolve(dest)));
        })
        .on('error', reject);
    };

    request(url);
  });
}

async function main() {
  for (const restaurant of restaurants) {
    for (let variant = 1; variant <= 4; variant += 1) {
      const lock = `${restaurant.slug}-${variant}`.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
      const url = `https://loremflickr.com/1200/800/${restaurant.tags}?lock=${lock}`;
      const dest = path.join(dir, `${restaurant.slug}-${variant}.jpg`);
      process.stdout.write(`Downloading ${restaurant.slug}-${variant}.jpg ... `);
      await download(url, dest);
      const size = fs.statSync(dest).size;
      console.log(`done (${Math.round(size / 1024)} KB)`);
    }
  }

  const defaultDest = path.join(dir, 'default.jpg');
  await download('https://loremflickr.com/1200/800/food,restaurant?lock=9999', defaultDest);
  console.log('Downloaded default.jpg');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
