import { ReservationStatus } from '@prisma/client';

export type SeedReservationInput = {
  userId: string;
  restaurantId: string;
  tableId: string;
  date: Date;
  timeSlot: string;
  guestCount: number;
  status: ReservationStatus;
  notes?: string;
  createdAt: Date;
};

const DAY_OF_WEEK_WEIGHTS: Record<number, number> = {
  0: 1.18, // Sun
  1: 0.72, // Mon
  2: 0.7, // Tue
  3: 0.76, // Wed
  4: 0.84, // Thu
  5: 1.08, // Fri
  6: 1.28, // Sat
};

const SEASONAL_BY_MONTH: Record<number, number> = {
  1: 1.1,
  2: 1.22,
  3: 0.94,
  4: 0.9,
  5: 1.06,
  6: 1.14,
  7: 0.86,
  8: 1.0,
  9: 0.93,
  10: 0.97,
  11: 1.04,
  12: 1.18,
};

const TIME_SLOTS = [
  { slot: '11:00', weight: 0.35, period: 'lunch' as const },
  { slot: '11:30', weight: 0.45, period: 'lunch' as const },
  { slot: '12:00', weight: 1.15, period: 'lunch' as const },
  { slot: '12:30', weight: 1.45, period: 'lunch' as const },
  { slot: '13:00', weight: 1.25, period: 'lunch' as const },
  { slot: '13:30', weight: 0.65, period: 'lunch' as const },
  { slot: '17:30', weight: 0.55, period: 'dinner' as const },
  { slot: '18:00', weight: 0.85, period: 'dinner' as const },
  { slot: '18:30', weight: 1.05, period: 'dinner' as const },
  { slot: '19:00', weight: 1.85, period: 'dinner' as const },
  { slot: '19:30', weight: 1.55, period: 'dinner' as const },
  { slot: '20:00', weight: 1.65, period: 'dinner' as const },
  { slot: '20:30', weight: 1.15, period: 'dinner' as const },
  { slot: '21:00', weight: 0.82, period: 'dinner' as const },
];

const GUEST_COUNTS = [2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 8];
const GUEST_WEIGHTS = [18, 16, 14, 12, 15, 10, 8, 7, 5, 4, 3, 2];

const reservationNotes = [
  'Prefer halal seating section if available.',
  'Family makan — celebrating parents\' anniversary.',
  'Need high chair for toddler.',
  'Window seat if possible, celebrating birthday.',
  'Corporate team lunch — need receipt.',
  'Allergic to shellfish, please note for kitchen.',
];

function mulberry32(seed: number) {
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted<T>(items: T[], weights: number[], random: () => number): T {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = random() * total;
  for (let index = 0; index < items.length; index += 1) {
    roll -= weights[index];
    if (roll <= 0) {
      return items[index];
    }
  }
  return items[items.length - 1];
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function resolveStatus(dayOffset: number, random: () => number): ReservationStatus {
  if (dayOffset > 3) {
    return random() < 0.72 ? ReservationStatus.PENDING : ReservationStatus.APPROVED;
  }
  if (dayOffset >= 0) {
    if (random() < 0.55) return ReservationStatus.APPROVED;
    if (random() < 0.78) return ReservationStatus.PENDING;
    return ReservationStatus.REJECTED;
  }
  if (random() < 0.62) return ReservationStatus.COMPLETED;
  if (random() < 0.88) return ReservationStatus.APPROVED;
  if (random() < 0.95) return ReservationStatus.CANCELLED;
  return ReservationStatus.REJECTED;
}

type TableRecord = {
  id: string;
  label: string;
  capacity: number;
};

type RestaurantRecord = {
  id: string;
  averageSpend: number;
  popularity: number;
};

type UserRecord = {
  id: string;
};

export function buildAnalyticsReservations({
  restaurants,
  tablesByRestaurant,
  users,
  historyDays = 120,
  futureDays = 14,
  anchorDate = new Date(),
}: {
  restaurants: RestaurantRecord[];
  tablesByRestaurant: Map<string, TableRecord[]>;
  users: UserRecord[];
  historyDays?: number;
  futureDays?: number;
  anchorDate?: Date;
}): SeedReservationInput[] {
  const random = mulberry32(20260616);
  const reservations: SeedReservationInput[] = [];
  const bookedSlots = new Set<string>();
  const today = startOfDay(anchorDate);

  for (let dayOffset = -historyDays; dayOffset <= futureDays; dayOffset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);

    const dayWeight = DAY_OF_WEEK_WEIGHTS[date.getDay()];
    const seasonalWeight = SEASONAL_BY_MONTH[date.getMonth() + 1];
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const lunchBoost = weekend ? 1.35 : 1;
    const dinnerBoost = date.getDay() === 5 || date.getDay() === 6 ? 1.28 : 1;
    const wave = 0.88 + Math.sin(dayOffset / 5.5) * 0.08 + Math.cos(dayOffset / 17) * 0.05;
    const portfolioTarget = Math.round(24 * dayWeight * seasonalWeight * wave);

    for (const restaurant of restaurants) {
      const tables = tablesByRestaurant.get(restaurant.id) ?? [];
      if (!tables.length) {
        continue;
      }

      const restaurantTarget = Math.max(
        1,
        Math.round(
          (portfolioTarget / restaurants.length) *
            restaurant.popularity *
            (0.82 + random() * 0.36),
        ),
      );

      for (let index = 0; index < restaurantTarget; index += 1) {
        const slotEntry = pickWeighted(
          TIME_SLOTS,
          TIME_SLOTS.map((entry) => {
            const periodBoost = entry.period === 'lunch' ? lunchBoost : dinnerBoost;
            return entry.weight * periodBoost;
          }),
          random,
        );

        const guestCount = pickWeighted(GUEST_COUNTS, GUEST_WEIGHTS, random);
        const fittingTables = tables.filter((table) => table.capacity >= guestCount);
        if (!fittingTables.length) {
          continue;
        }

        const table = pickWeighted(
          fittingTables,
          fittingTables.map((entry) => (entry.capacity === guestCount ? 3 : 2)),
          random,
        );

        const slotKey = `${restaurant.id}:${date.toISOString().slice(0, 10)}:${slotEntry.slot}:${table.id}`;
        if (bookedSlots.has(slotKey)) {
          continue;
        }
        bookedSlots.add(slotKey);

        const createdAt = new Date(date);
        createdAt.setDate(
          createdAt.getDate() - Math.floor(random() * 14) - (dayOffset <= 0 ? 1 : 0),
        );
        createdAt.setHours(9 + Math.floor(random() * 10), Math.floor(random() * 60), 0, 0);

        reservations.push({
          userId: users[Math.floor(random() * users.length)].id,
          restaurantId: restaurant.id,
          tableId: table.id,
          date: startOfDay(date),
          timeSlot: slotEntry.slot,
          guestCount,
          status: resolveStatus(dayOffset, random),
          notes: random() < 0.12 ? reservationNotes[Math.floor(random() * reservationNotes.length)] : undefined,
          createdAt,
        });
      }
    }
  }

  return reservations;
}
