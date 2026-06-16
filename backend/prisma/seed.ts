import { PrismaClient, PriceRange, ReservationStatus, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

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
    description:
      'A restored Melaka kopitiam pouring hand-pulled kopi, charcoal-toasted kaya bread, and soft-boiled eggs.',
  },
];

const reservationNotes = [
  'Prefer halal seating section if available.',
  'Family makan — celebrating parents\' anniversary.',
  'Need high chair for toddler.',
  'Window seat if possible, celebrating birthday.',
];

async function main() {
  const passwordHash = await bcrypt.hash('TableBook123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tablebook.dev' },
    update: { name: 'Farid Ibrahim' },
    create: {
      name: 'Farid Ibrahim',
      email: 'admin@tablebook.dev',
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'guest@tablebook.dev' },
    update: { name: 'Siti Aminah' },
    create: {
      name: 'Siti Aminah',
      email: 'guest@tablebook.dev',
      passwordHash,
      role: UserRole.CUSTOMER,
    },
  });

  const createdRestaurants = [];

  for (const restaurant of restaurants) {
    const created = await prisma.restaurant.upsert({
      where: { slug: restaurant.slug },
      update: restaurant,
      create: restaurant,
    });

    createdRestaurants.push(created);

    for (const [index, capacity] of [2, 2, 4, 4, 6, 8].entries()) {
      await prisma.table.upsert({
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
    }
  }

  const now = new Date();
  const statuses = [
    ReservationStatus.APPROVED,
    ReservationStatus.PENDING,
    ReservationStatus.COMPLETED,
    ReservationStatus.REJECTED,
  ];
  const timeSlots = ['12:00', '12:30', '13:00', '19:00', '20:00', '20:30', '21:00'];

  for (let dayOffset = -24; dayOffset <= 8; dayOffset += 1) {
    for (const [index, restaurant] of createdRestaurants.entries()) {
      const table = await prisma.table.findFirst({
        where: { restaurantId: restaurant.id, capacity: { gte: 2 } },
        orderBy: { capacity: 'asc' },
      });

      if (!table) {
        continue;
      }

      const date = new Date(now);
      date.setDate(now.getDate() + dayOffset);
      date.setHours(0, 0, 0, 0);

      await prisma.reservation.create({
        data: {
          userId: index % 2 === 0 ? customer.id : admin.id,
          restaurantId: restaurant.id,
          tableId: table.id,
          date,
          timeSlot: timeSlots[(dayOffset + index + timeSlots.length * 10) % timeSlots.length],
          guestCount: [2, 4, 3, 5, 6][index % 5],
          status: statuses[(dayOffset + index + statuses.length * 10) % statuses.length],
          notes: dayOffset === 0 ? reservationNotes[index % reservationNotes.length] : undefined,
        },
      });
    }
  }

  console.log('Seeded TableBook Malaysia with admin@tablebook.dev and guest@tablebook.dev');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
