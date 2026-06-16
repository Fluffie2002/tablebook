import { PrismaClient, PriceRange, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { buildAnalyticsReservations } from './seed-analytics';

const prisma = new PrismaClient();

const restaurants = [
  {
    name: 'Warung Pak Din',
    slug: 'warung-pak-din',
    cuisine: 'Malay Cuisine',
    city: 'Kuala Lumpur',
    address: '18 Jalan Bangkung, Bangsar, 59100 Kuala Lumpur',
    heroImageUrl: '/images/restaurants/warung-pak-din-1.jpg',
    priceRange: PriceRange.MODERATE,
    rating: 4.8,
    reviewCount: 612,
    openingTime: '07:00',
    closingTime: '22:00',
    averageSpend: 42,
    popularity: 1.22,
    description:
      'A Bangsar institution serving fragrant nasi lemak, sambal telur, and charcoal-grilled ayam percik from early morning.',
  },
  {
    name: "Madam Li's Kitchen",
    slug: 'madam-lis-kitchen',
    cuisine: 'Chinese Malaysian Cuisine',
    city: 'Petaling Jaya',
    address: '72 Jalan SS 15/4, SS 15, 47500 Petaling Jaya, Selangor',
    heroImageUrl: '/images/restaurants/madam-lis-kitchen-1.jpg',
    priceRange: PriceRange.MODERATE,
    rating: 4.7,
    reviewCount: 489,
    openingTime: '11:00',
    closingTime: '22:30',
    averageSpend: 68,
    popularity: 1.08,
    description:
      'Home-style Chinese Malaysian cooking with curry laksa, butter prawns, and a weekend dim sum trolley.',
  },
  {
    name: 'Restoran Saffron Lane',
    slug: 'saffron-lane',
    cuisine: 'Indian Malaysian Cuisine',
    city: 'Penang',
    address: '88 Jalan Macalister, Georgetown, 10400 Penang',
    heroImageUrl: '/images/restaurants/saffron-lane-1.jpg',
    priceRange: PriceRange.BUDGET,
    rating: 4.6,
    reviewCount: 734,
    openingTime: '10:00',
    closingTime: '02:00',
    averageSpend: 32,
    popularity: 0.96,
    description:
      'Penang-style nasi kandar with a rainbow of curries ladled over fragrant rice, open late for supper crowds.',
  },
  {
    name: 'Bijan Heritage',
    slug: 'bijan-heritage',
    cuisine: 'Nyonya Cuisine',
    city: 'Kuala Lumpur',
    address: '25 Changkat Bukit Bintang, 50200 Kuala Lumpur',
    heroImageUrl: '/images/restaurants/bijan-heritage-1.jpg',
    priceRange: PriceRange.PREMIUM,
    rating: 4.9,
    reviewCount: 356,
    openingTime: '17:30',
    closingTime: '23:00',
    averageSpend: 125,
    popularity: 1.18,
    description:
      'Refined Nyonya flavours in a restored shophouse — ayam buah keluak, otak-otak, and heritage desserts.',
  },
  {
    name: 'Tiga Rasa & Co.',
    slug: 'tiga-rasa-co',
    cuisine: 'Modern Malaysian Cuisine',
    city: 'Johor Bahru',
    address: 'Lot P1.039, Mid Valley Southkey, 81100 Johor Bahru, Johor',
    heroImageUrl: '/images/restaurants/tiga-rasa-co-1.jpg',
    priceRange: PriceRange.PREMIUM,
    rating: 4.8,
    reviewCount: 412,
    openingTime: '11:00',
    closingTime: '23:00',
    averageSpend: 88,
    popularity: 1.04,
    description:
      'A contemporary Malaysian kitchen celebrating the peninsula\'s three cultures with creative fusion plates.',
  },
  {
    name: 'Kopitiam Lima Dua',
    slug: 'kopitiam-lima-dua',
    cuisine: 'Cafe Culture',
    city: 'Malacca',
    address: '52 Jalan Hang Jebat, 75200 Melaka',
    heroImageUrl: '/images/restaurants/kopitiam-lima-dua-1.jpg',
    priceRange: PriceRange.BUDGET,
    rating: 4.5,
    reviewCount: 278,
    openingTime: '08:00',
    closingTime: '18:00',
    averageSpend: 36,
    popularity: 0.82,
    description:
      'A restored Melaka kopitiam pouring hand-pulled kopi, charcoal-toasted kaya bread, and soft-boiled eggs.',
  },
];

const demoUsers = [
  { name: 'Farid Ibrahim', email: 'admin@tablebook.dev', role: UserRole.ADMIN },
  { name: 'Siti Aminah', email: 'guest@tablebook.dev', role: UserRole.CUSTOMER },
  { name: 'Tan Wei Ming', email: 'wei.ming@example.com', role: UserRole.CUSTOMER },
  { name: 'Priya Devi', email: 'priya@example.com', role: UserRole.CUSTOMER },
  { name: 'Ahmad Hakim', email: 'ahmad.hakim@example.com', role: UserRole.CUSTOMER },
  { name: 'Lily Wong', email: 'lily.wong@example.com', role: UserRole.CUSTOMER },
  { name: 'Rajesh Kumar', email: 'rajesh@example.com', role: UserRole.CUSTOMER },
  { name: 'Nurul Izzati', email: 'nurul.izzati@example.com', role: UserRole.CUSTOMER },
];

async function main() {
  const passwordHash = await bcrypt.hash('TableBook123!', 12);

  const users = [];
  for (const user of demoUsers) {
    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: { name: user.name, role: user.role },
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        role: user.role,
      },
    });
    users.push(created);
  }

  const createdRestaurants = [];
  const tablesByRestaurant = new Map<string, { id: string; label: string; capacity: number }[]>();

  for (const restaurant of restaurants) {
    const { popularity, ...restaurantData } = restaurant;
    const created = await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: restaurantData,
      create: restaurantData,
    });

    createdRestaurants.push({ id: created.id, averageSpend: created.averageSpend, popularity });
    const tables = [];

    for (const [index, capacity] of [2, 2, 4, 4, 6, 8].entries()) {
      const table = await prisma.table.upsert({
        where: {
          restaurantId_label: {
            restaurantId: created.id,
            label: `T${index + 1}`,
          },
        },
        update: { capacity, isActive: true },
        create: {
          restaurantId: created.id,
          label: `T${index + 1}`,
          capacity,
        },
      });
      tables.push(table);
    }

    tablesByRestaurant.set(created.id, tables);
  }

  await prisma.reservation.deleteMany();

  const reservationData = buildAnalyticsReservations({
    restaurants: createdRestaurants,
    tablesByRestaurant,
    users,
  });

  const batchSize = 250;
  for (let index = 0; index < reservationData.length; index += batchSize) {
    await prisma.reservation.createMany({
      data: reservationData.slice(index, index + batchSize),
    });
  }

  console.log(
    `Seeded TableBook Malaysia with ${reservationData.length} reservations across ${createdRestaurants.length} venues.`,
  );
  console.log('Demo accounts: admin@tablebook.dev / guest@tablebook.dev (password: TableBook123!)');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
