const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../lib/mock-data.ts');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const img = \(id: string\) =>[\s\S]*?`https:\/\/images\.unsplash\.com\/\$\{id\}[^`]*`;/,
  '',
);

if (!content.includes("restaurant-images")) {
  content = content.replace(
    "} from '@/types/tablebook';",
    "} from '@/types/tablebook';\nimport { restaurantGallery, restaurantImage } from '@/lib/restaurant-images';",
  );
}

const restaurants = [
  'warung-pak-din',
  'madam-lis-kitchen',
  'saffron-lane',
  'bijan-heritage',
  'tiga-rasa-co',
  'kopitiam-lima-dua',
];

for (const slug of restaurants) {
  content = content.replace(
    new RegExp(`slug: '${slug}',[\\s\\S]*?gallery: \\[[\\s\\S]*?\\],`),
    (block) => {
      return block
        .replace(/heroImageUrl: img\('[^']*'\),/, `heroImageUrl: restaurantImage('${slug}'),`)
        .replace(/gallery: \[[\s\S]*?\],/, `gallery: restaurantGallery('${slug}'),`);
    },
  );
}

content = content.replace(
  /return full \? \{ \.\.\.full, \.\.\.restaurant \} : restaurant;/,
  `return full
    ? {
        ...restaurant,
        ...full,
        heroImageUrl: full.heroImageUrl,
        gallery: full.gallery,
        reviews: full.reviews,
        amenities: full.amenities,
        dressCode: full.dressCode,
        parking: full.parking,
        phone: full.phone,
        email: full.email,
        tables: full.tables ?? restaurant.tables,
      }
    : restaurant;`,
);

fs.writeFileSync(file, content);
console.log('mock-data.ts updated');
