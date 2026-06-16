export type UserRole = 'CUSTOMER' | 'ADMIN';
export type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
export type PriceRange = 'BUDGET' | 'MODERATE' | 'PREMIUM' | 'LUXURY';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  cuisine: string;
  city: string;
  address: string;
  heroImageUrl: string;
  gallery?: string[];
  description: string;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  openingTime: string;
  closingTime: string;
  averageSpend: number;
  tables?: Table[];
  featured?: boolean;
  trending?: boolean;
  popularityScore?: number;
  amenities?: string[];
  dressCode?: string;
  parking?: string;
  phone?: string;
  email?: string;
  reviews?: Review[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
};

export type Table = {
  id: string;
  restaurantId: string;
  label: string;
  capacity: number;
  isActive: boolean;
};

export type Reservation = {
  id: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  status: ReservationStatus;
  notes?: string;
  user?: Pick<User, 'name' | 'email'>;
  restaurant: Pick<Restaurant, 'id' | 'name' | 'slug' | 'city' | 'averageSpend'>;
  table: Pick<Table, 'id' | 'label' | 'capacity'>;
};

export type DashboardOverview = {
  totalReservations: number;
  todaysReservations: number;
  activeRestaurants: number;
  revenue: number;
  conversionRate: number;
  occupancyRate?: number;
  avgPartySize?: number;
};

export type TimeSlotAvailability = {
  time: string;
  available: boolean;
  popularity: 'low' | 'medium' | 'high' | 'peak';
  tablesLeft?: number;
};

export type AiInsight = {
  id: string;
  category: 'peak-times' | 'behavior' | 'performance' | 'prediction' | 'recommendation';
  title: string;
  summary: string;
  detail: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
};

export type RestaurantPerformance = {
  name: string;
  reservations: number;
  revenue: number;
  occupancy: number;
  trend: number;
};
