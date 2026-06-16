import {

  AiInsight,

  DashboardOverview,

  Reservation,

  Restaurant,

  RestaurantPerformance,

  TimeSlotAvailability,

} from '@/types/tablebook';
import { restaurantGallery, restaurantImage } from '@/lib/restaurant-images';







export const restaurants: Restaurant[] = [

  {

    id: 'r1',

    name: 'Warung Pak Din',

    slug: 'warung-pak-din',

    cuisine: 'Malay Cuisine',

    city: 'Kuala Lumpur',

    address: '18 Jalan Bangkung, Bangsar, 59100 Kuala Lumpur',

    heroImageUrl: restaurantImage('warung-pak-din'),

    gallery: restaurantGallery('warung-pak-din'),

    priceRange: 'MODERATE',

    rating: 4.8,

    reviewCount: 612,

    openingTime: '07:00',

    closingTime: '22:00',

    averageSpend: 42,

    featured: true,

    trending: true,

    popularityScore: 96,

    amenities: ['Nasi lemak bar', 'Halal certified', 'Family seating', 'Takeaway'],

    dressCode: 'Casual',

    parking: 'Street parking along Jalan Bangkung',

    phone: '+60 3-2201 8842',

    email: 'hello@warungpakdin.my',

    description:

      'A Bangsar institution serving fragrant nasi lemak, sambal telur, and charcoal-grilled ayam percik since the early mornings. The kind of place KL locals queue for before work.',

    tables: [

      { id: 't1', restaurantId: 'r1', label: 'W1', capacity: 2, isActive: true },

      { id: 't2', restaurantId: 'r1', label: 'W2', capacity: 4, isActive: true },

      { id: 't3', restaurantId: 'r1', label: 'W3', capacity: 6, isActive: true },

    ],

    reviews: [

      { id: 'rv1', author: 'Hafiz Rahman', rating: 5, date: '2026-05-12', comment: 'Best nasi lemak in Bangsar. Sambal has the right kick — come before 9am on weekends.' },

      { id: 'rv2', author: 'Nurul Izzah', rating: 5, date: '2026-05-08', comment: 'Brought my parents from Ipoh. They said it tastes like home. Service cepat and friendly.' },

      { id: 'rv3', author: 'Raj Kumar', rating: 4, date: '2026-04-29', comment: 'Solid breakfast spot. Parking can be tight during peak hours but worth the wait.' },

    ],

  },

  {

    id: 'r2',

    name: "Madam Li's Kitchen",

    slug: 'madam-lis-kitchen',

    cuisine: 'Chinese Malaysian Cuisine',

    city: 'Petaling Jaya',

    address: '72 Jalan SS 15/4, SS 15, 47500 Petaling Jaya, Selangor',

    heroImageUrl: restaurantImage('madam-lis-kitchen'),

    gallery: restaurantGallery('madam-lis-kitchen'),

    priceRange: 'MODERATE',

    rating: 4.7,

    reviewCount: 489,

    openingTime: '11:00',

    closingTime: '22:30',

    averageSpend: 68,

    featured: true,

    trending: false,

    popularityScore: 88,

    amenities: ['Private rooms', 'Dim sum lunch', 'Air-conditioned', 'Wheelchair access'],

    dressCode: 'Smart casual',

    parking: 'Basement parking at SS 15 commercial block',

    phone: '+60 3-5622 3310',

    email: 'reservations@madamliskitchen.my',

    description:

      'Home-style Chinese Malaysian cooking — curry laksa, butter prawns, and a weekend dim sum trolley that draws families from across the Klang Valley.',

    tables: [

      { id: 't4', restaurantId: 'r2', label: 'M1', capacity: 2, isActive: true },

      { id: 't5', restaurantId: 'r2', label: 'M2', capacity: 4, isActive: true },

      { id: 't6', restaurantId: 'r2', label: 'M3', capacity: 8, isActive: true },

    ],

    reviews: [

      { id: 'rv4', author: 'Tan Mei Ling', rating: 5, date: '2026-05-15', comment: 'Our go-to for family gatherings. The salted egg yolk crab never disappoints.' },

      { id: 'rv5', author: 'Arif Zainal', rating: 5, date: '2026-05-02', comment: 'Dim sum on Sunday is packed — book ahead. Har gow is fresh and translucent.' },

    ],

  },

  {

    id: 'r3',

    name: 'Restoran Saffron Lane',

    slug: 'saffron-lane',

    cuisine: 'Indian Malaysian Cuisine',

    city: 'Penang',

    address: '88 Jalan Macalister, Georgetown, 10400 Penang',

    heroImageUrl: restaurantImage('saffron-lane'),

    gallery: restaurantGallery('saffron-lane'),

    priceRange: 'BUDGET',

    rating: 4.6,

    reviewCount: 734,

    openingTime: '10:00',

    closingTime: '02:00',

    averageSpend: 32,

    trending: true,

    popularityScore: 91,

    amenities: ['24-hour service', 'Nasi kandar line', 'Roti canai counter', 'Late-night dining'],

    dressCode: 'Casual',

    parking: 'Open lot behind Jalan Macalister',

    phone: '+60 4-228 7741',

    email: 'info@saffronlane.my',

    description:

      'Penang-style nasi kandar with a rainbow of curries ladled over fragrant rice. Open late for supper crowds and Grab drivers fueling up after midnight.',

    tables: [{ id: 't7', restaurantId: 'r3', label: 'S1', capacity: 4, isActive: true }],

    reviews: [

      { id: 'rv6', author: 'Kavitha Subramaniam', rating: 5, date: '2026-05-10', comment: 'Fish curry and ayam kurma are must-haves. Value for money even at 1am.' },

    ],

  },

  {

    id: 'r4',

    name: 'Bijan Heritage',

    slug: 'bijan-heritage',

    cuisine: 'Nyonya Cuisine',

    city: 'Kuala Lumpur',

    address: '25 Changkat Bukit Bintang, 50200 Kuala Lumpur',

    heroImageUrl: restaurantImage('bijan-heritage'),

    gallery: restaurantGallery('bijan-heritage'),

    priceRange: 'PREMIUM',

    rating: 4.9,

    reviewCount: 356,

    openingTime: '17:30',

    closingTime: '23:00',

    averageSpend: 125,

    featured: false,

    trending: true,

    popularityScore: 93,

    amenities: ['Peranakan tasting menu', 'Wine pairing', 'Private dining', 'Heritage decor'],

    dressCode: 'Smart casual',

    parking: 'Valet at Changkat Bukit Bintang',

    phone: '+60 3-2144 9035',

    email: 'dine@bijanheritage.my',

    description:

      'Refined Nyonya flavours in a restored shophouse — ayam buah keluak, otak-otak, and desserts that honour Baba-Nyonya heritage with modern plating.',

    tables: [

      { id: 't8', restaurantId: 'r4', label: 'B1', capacity: 2, isActive: true },

      { id: 't9', restaurantId: 'r4', label: 'B2', capacity: 4, isActive: true },

    ],

    reviews: [

      { id: 'rv7', author: 'Farid Ibrahim', rating: 5, date: '2026-05-18', comment: 'Ayam buah keluak done properly — rich, earthy, unforgettable. Perfect for special occasions.' },

    ],

  },

  {

    id: 'r5',

    name: 'Tiga Rasa & Co.',

    slug: 'tiga-rasa-co',

    cuisine: 'Modern Malaysian Cuisine',

    city: 'Johor Bahru',

    address: 'Lot P1.039, Mid Valley Southkey, 81100 Johor Bahru, Johor',

    heroImageUrl: restaurantImage('tiga-rasa-co'),

    gallery: restaurantGallery('tiga-rasa-co'),

    priceRange: 'PREMIUM',

    rating: 4.8,

    reviewCount: 412,

    openingTime: '11:00',

    closingTime: '23:00',

    averageSpend: 88,

    featured: true,

    popularityScore: 90,

    amenities: ['Open kitchen', 'Craft mocktails', 'Weekend brunch', 'Mall parking'],

    dressCode: 'Casual smart',

    parking: 'Mid Valley Southkey multi-storey parking',

    phone: '+60 7-334 2290',

    email: 'book@tigarasa.my',

    description:

      'A contemporary Malaysian kitchen celebrating the peninsula\'s three cultures — think beef rendang tacos, salted egg pasta, and teh tarik crème brûlée.',

    tables: [

      { id: 't10', restaurantId: 'r5', label: 'T1', capacity: 2, isActive: true },

      { id: 't11', restaurantId: 'r5', label: 'T2', capacity: 6, isActive: true },

    ],

    reviews: [

      { id: 'rv8', author: 'Wei Jie Lim', rating: 5, date: '2026-05-20', comment: 'Creative menu that still feels Malaysian. The rendang tacos are genius — order two portions.' },

    ],

  },

  {

    id: 'r6',

    name: 'Kopitiam Lima Dua',

    slug: 'kopitiam-lima-dua',

    cuisine: 'Cafe Culture',

    city: 'Malacca',

    address: '52 Jalan Hang Jebat, 75200 Melaka',

    heroImageUrl: restaurantImage('kopitiam-lima-dua'),

    gallery: restaurantGallery('kopitiam-lima-dua'),

    priceRange: 'BUDGET',

    rating: 4.5,

    reviewCount: 278,

    openingTime: '08:00',

    closingTime: '18:00',

    averageSpend: 36,

    popularityScore: 79,

    amenities: ['Kopi-o bar', 'Kaya toast', 'Heritage shophouse', 'Outdoor seating'],

    dressCode: 'Casual',

    parking: 'Public lot near Jonker Street',

    phone: '+60 6-283 5520',

    email: 'hello@kopitiam52.my',

    description:

      'A restored Melaka kopitiam pouring hand-pulled kopi, charcoal-toasted kaya bread, and soft-boiled eggs — the breakfast ritual of a UNESCO heritage city.',

    tables: [{ id: 't12', restaurantId: 'r6', label: 'K1', capacity: 4, isActive: true }],

    reviews: [

      { id: 'rv9', author: 'Siti Aminah', rating: 4, date: '2026-05-05', comment: 'Authentic old-town vibe. Kopi cham is smooth. Gets busy with tourists by 10am — come early.' },

    ],

  },

];



export const reservations: Reservation[] = [

  {

    id: 'res1',

    date: new Date().toISOString(),

    timeSlot: '19:00',

    guestCount: 4,

    status: 'APPROVED',

    user: { name: 'Siti Aminah', email: 'guest@tablebook.dev' },

    restaurant: { id: 'r1', name: 'Warung Pak Din', slug: 'warung-pak-din', city: 'Kuala Lumpur', averageSpend: 42 },

    table: { id: 't2', label: 'W2', capacity: 4 },

  },

  {

    id: 'res2',

    date: new Date(Date.now() + 86400000).toISOString(),

    timeSlot: '12:30',

    guestCount: 2,

    status: 'PENDING',

    user: { name: 'Tan Wei Ming', email: 'wei.ming@example.com' },

    restaurant: { id: 'r2', name: "Madam Li's Kitchen", slug: 'madam-lis-kitchen', city: 'Petaling Jaya', averageSpend: 68 },

    table: { id: 't4', label: 'M1', capacity: 2 },

  },

  {

    id: 'res3',

    date: new Date().toISOString(),

    timeSlot: '20:30',

    guestCount: 6,

    status: 'APPROVED',

    user: { name: 'Priya Devi', email: 'priya@example.com' },

    restaurant: { id: 'r5', name: 'Tiga Rasa & Co.', slug: 'tiga-rasa-co', city: 'Johor Bahru', averageSpend: 88 },

    table: { id: 't11', label: 'T2', capacity: 6 },

  },

];



export const overview: DashboardOverview = {

  totalReservations: 528,

  todaysReservations: 34,

  activeRestaurants: 18,

  revenue: 67200,

  conversionRate: 72,

  occupancyRate: 78,

  avgPartySize: 3.6,

};



export const trends = Array.from({ length: 14 }).map((_, index) => ({

  date: `${index + 1} Jun`,

  reservations: 18 + Math.round(Math.sin(index / 2) * 8) + index,

  revenue: 2800 + index * 380,

  occupancy: 62 + Math.round(Math.sin(index / 3) * 12) + index,

}));



export const popularTimes = [

  { timeSlot: '19:00', reservations: 142 },

  { timeSlot: '20:00', reservations: 128 },

  { timeSlot: '12:30', reservations: 96 },

  { timeSlot: '13:00', reservations: 88 },

  { timeSlot: '21:00', reservations: 72 },

  { timeSlot: '20:30', reservations: 68 },

  { timeSlot: '12:00', reservations: 54 },

];



export const restaurantPerformance: RestaurantPerformance[] = [

  { name: 'Warung Pak Din', reservations: 156, revenue: 6552, occupancy: 91, trend: 14.2 },

  { name: "Madam Li's Kitchen", reservations: 134, revenue: 9112, occupancy: 84, trend: 9.1 },

  { name: 'Bijan Heritage', reservations: 98, revenue: 12250, occupancy: 89, trend: 12.8 },

  { name: 'Tiga Rasa & Co.', reservations: 86, revenue: 7568, occupancy: 82, trend: 11.4 },

  { name: 'Restoran Saffron Lane', reservations: 112, revenue: 3584, occupancy: 76, trend: 6.3 },

];



export const heatmapData = [

  { day: 'Mon', '12': 28, '14': 22, '18': 38, '19': 52, '20': 48, '21': 24 },

  { day: 'Tue', '12': 32, '14': 26, '18': 42, '19': 58, '20': 52, '21': 28 },

  { day: 'Wed', '12': 36, '14': 30, '18': 48, '19': 64, '20': 58, '21': 30 },

  { day: 'Thu', '12': 40, '14': 34, '18': 54, '19': 72, '20': 66, '21': 34 },

  { day: 'Fri', '12': 44, '14': 38, '18': 68, '19': 88, '20': 82, '21': 48 },

  { day: 'Sat', '12': 52, '14': 42, '18': 78, '19': 98, '20': 92, '21': 56 },

  { day: 'Sun', '12': 48, '14': 40, '18': 72, '19': 86, '20': 78, '21': 44 },

];



export const liveActivity = [

  { id: '1', text: 'Siti Aminah booked Warung Pak Din for 4 guests at 19:00', time: '2m ago', type: 'booking' },

  { id: '2', text: "Madam Li's Kitchen — Table M2 approved for lunch", time: '5m ago', type: 'approval' },

  { id: '3', text: 'Bijan Heritage reached 89% occupancy for Saturday dinner', time: '12m ago', type: 'alert' },

  { id: '4', text: 'Tan Wei Ming requested halal seating at Madam Li\'s Kitchen', time: '18m ago', type: 'note' },

  { id: '5', text: 'Tiga Rasa & Co. trending +18% this week in Johor Bahru', time: '32m ago', type: 'trend' },

];



export const trustLogos = ['Grab', 'Foodpanda', 'Stripe', 'iPay88', 'Boost', 'Touch n Go'];



export const aiInsights: AiInsight[] = [

  {

    id: 'ai1',

    category: 'peak-times',

    title: 'Friday 7–8 PM is your highest-conversion window',

    summary: '72% of approved reservations cluster between 19:00–20:00 on Fridays across KL and JB venues.',

    detail: 'Friday dinner service drives 36% of weekly revenue. Warung Pak Din and Bijan Heritage show the strongest conversion during this window. Consider table holds and SMS reminders for peak slots — especially before public holidays.',

    confidence: 92,

    impact: 'high',

  },

  {

    id: 'ai2',

    category: 'behavior',

    title: 'Guests booking 3+ days ahead spend 24% more',

    summary: 'Advance planners select premium tables and add occasion notes more often.',

    detail: 'Party sizes average 4.1 for advance bookings vs 2.8 for same-day — common for family makan sessions. These guests prefer private rooms and window seating. Target them with WhatsApp confirmation and festive upsells before Hari Raya and CNY.',

    confidence: 87,

    impact: 'medium',

  },

  {

    id: 'ai3',

    category: 'performance',

    title: 'Bijan Heritage leads revenue per seat',

    summary: 'RM 125 average spend with 89% occupancy — top performer this month.',

    detail: 'Bijan Heritage converts 13% more reservations than portfolio average. Warung Pak Din leads on total covers. Restoran Saffron Lane shows strong late-night demand in Penang — consider extending kitchen hours on weekends.',

    confidence: 94,

    impact: 'high',

  },

  {

    id: 'ai4',

    category: 'prediction',

    title: 'Saturday Jun 21 projected at 92% capacity',

    summary: 'Based on 4-week trends, expect near-sellout across premium venues before the school holidays.',

    detail: 'Kuala Lumpur and Johor Bahru venues are pacing 16% above last month. Recommend opening overflow seating at Madam Li\'s Kitchen and pre-staffing Bijan Heritage for the 19:00–20:30 dinner rush.',

    confidence: 81,

    impact: 'high',

  },

  {

    id: 'ai5',

    category: 'recommendation',

    title: 'Enable waitlist for Kopitiam Lima Dua weekend brunch',

    summary: 'Weekend 09:00–11:00 slots fill 2.8× faster than weekday mornings.',

    detail: 'Heritage breakfast slots at Kopitiam Lima Dua have 94% fill rate within 48 hours of release. A waitlist with SMS notifications could recover an estimated 10–14 additional covers per weekend — especially during Melaka tourist peak season.',

    confidence: 78,

    impact: 'medium',

  },

];



export function getAvailability(slug: string): TimeSlotAvailability[] {

  const slots = [

    '11:00', '11:30', '12:00', '12:30', '13:00',

    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',

  ];

  const seed = slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  return slots.map((time, i) => {

    const busy = (seed + i * 7) % 10;

    const popularity = busy > 7 ? 'peak' : busy > 5 ? 'high' : busy > 3 ? 'medium' : 'low';

    const available = busy < 8;

    return { time, available, popularity, tablesLeft: available ? Math.max(1, 6 - (busy % 5)) : 0 };

  });

}



export function enrichRestaurant(restaurant: Restaurant): Restaurant {

  const full = restaurants.find((r) => r.slug === restaurant.slug);

  return full
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
    : restaurant;

}

