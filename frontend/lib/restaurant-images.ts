export const RESTAURANT_PLACEHOLDER = '/images/restaurants/default.jpg';

export function restaurantImage(slug: string, variant = 1) {
  return `/images/restaurants/${slug}-${variant}.jpg`;
}

export function restaurantGallery(slug: string, count = 4) {
  return Array.from({ length: count }, (_, i) => restaurantImage(slug, i + 1));
}
