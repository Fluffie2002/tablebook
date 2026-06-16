import { Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

const REVENUE_STATUSES: ReservationStatus[] = [
  ReservationStatus.APPROVED,
  ReservationStatus.COMPLETED,
];

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private formatTrendDate(date: Date) {
    return date.toLocaleDateString('en-MY', { month: 'short', day: 'numeric' });
  }

  private reservationRevenue(
    reservation: { guestCount: number; restaurant: { averageSpend: number } },
  ) {
    return reservation.guestCount * reservation.restaurant.averageSpend;
  }

  private mapTimeSlotToHeatmapHour(timeSlot: string) {
    const hour = Number.parseInt(timeSlot.split(':')[0] ?? '0', 10);
    if (hour <= 12) return '12';
    if (hour <= 14) return '14';
    if (hour <= 18) return '18';
    if (hour === 19) return '19';
    if (hour === 20) return '20';
    return '21';
  }

  async overview() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [totalReservations, todaysReservations, activeRestaurants, approved, totalTables, partyStats] =
      await Promise.all([
        this.prisma.reservation.count(),
        this.prisma.reservation.count({
          where: { date: { gte: today, lt: tomorrow } },
        }),
        this.prisma.restaurant.count({ where: { isActive: true } }),
        this.prisma.reservation.findMany({
          where: { status: { in: REVENUE_STATUSES } },
          include: { restaurant: true },
        }),
        this.prisma.table.count({ where: { isActive: true } }),
        this.prisma.reservation.aggregate({
          _avg: { guestCount: true },
        }),
      ]);

    const todaysApproved = approved.filter(
      (reservation) =>
        reservation.date >= today &&
        reservation.date < tomorrow &&
        REVENUE_STATUSES.includes(reservation.status),
    );

    const revenue = approved.reduce(
      (sum, reservation) => sum + this.reservationRevenue(reservation),
      0,
    );

    const dailyCapacity = Math.max(totalTables * 2, 1);

    return {
      totalReservations,
      todaysReservations,
      activeRestaurants,
      revenue,
      conversionRate: totalReservations
        ? Math.round((approved.length / totalReservations) * 100)
        : 0,
      occupancyRate: Math.min(
        98,
        Math.round((todaysApproved.length / dailyCapacity) * 100),
      ),
      avgPartySize: Number((partyStats._avg.guestCount ?? 0).toFixed(1)),
    };
  }

  async trends() {
    const days = 30;
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const [reservations, totalTables] = await Promise.all([
      this.prisma.reservation.findMany({
        where: { date: { gte: start } },
        include: { restaurant: true },
        orderBy: { date: 'asc' },
      }),
      this.prisma.table.count({ where: { isActive: true } }),
    ]);

    const dailyCapacity = Math.max(totalTables * 2, 1);

    return Array.from({ length: days }).map((_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      const key = day.toISOString().slice(0, 10);
      const daily = reservations.filter(
        (reservation) => reservation.date.toISOString().slice(0, 10) === key,
      );
      const revenueReservations = daily.filter((reservation) =>
        REVENUE_STATUSES.includes(reservation.status),
      );

      return {
        date: this.formatTrendDate(day),
        reservations: daily.length,
        revenue: revenueReservations.reduce(
          (sum, reservation) => sum + this.reservationRevenue(reservation),
          0,
        ),
        occupancy: Math.min(
          98,
          Math.round((revenueReservations.length / dailyCapacity) * 100),
        ),
      };
    });
  }

  recentReservations() {
    return this.prisma.reservation.findMany({
      take: 8,
      include: {
        user: { select: { name: true, email: true } },
        restaurant: { select: { name: true, city: true } },
        table: { select: { label: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async popularTimes() {
    const reservations = await this.prisma.reservation.groupBy({
      by: ['timeSlot'],
      _count: { timeSlot: true },
      where: { status: { in: REVENUE_STATUSES } },
      orderBy: { _count: { timeSlot: 'desc' } },
    });

    return reservations.map((item) => ({
      timeSlot: item.timeSlot,
      reservations: item._count.timeSlot,
    }));
  }

  async heatmap() {
    const start = new Date();
    start.setDate(start.getDate() - 56);
    start.setHours(0, 0, 0, 0);

    const reservations = await this.prisma.reservation.findMany({
      where: {
        date: { gte: start },
        status: { in: REVENUE_STATUSES },
      },
      select: { date: true, timeSlot: true },
    });

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
    const hours = ['12', '14', '18', '19', '20', '21'] as const;
    const grid = Object.fromEntries(
      days.map((day) => [day, Object.fromEntries(hours.map((hour) => [hour, 0]))]),
    ) as Record<(typeof days)[number], Record<(typeof hours)[number], number>>;

    for (const reservation of reservations) {
      const dayIndex = (reservation.date.getDay() + 6) % 7;
      const day = days[dayIndex];
      const hour = this.mapTimeSlotToHeatmapHour(reservation.timeSlot) as (typeof hours)[number];
      grid[day][hour] += 1;
    }

    return days.map((day) => ({
      day,
      ...grid[day],
    }));
  }

  async restaurantPerformance() {
    const now = new Date();
    const currentPeriodStart = new Date(now);
    currentPeriodStart.setDate(now.getDate() - 30);
    currentPeriodStart.setHours(0, 0, 0, 0);

    const previousPeriodStart = new Date(currentPeriodStart);
    previousPeriodStart.setDate(currentPeriodStart.getDate() - 30);

    const [restaurants, reservations, totalTablesByRestaurant] = await Promise.all([
      this.prisma.restaurant.findMany({
        where: { isActive: true },
        select: { id: true, name: true, averageSpend: true },
      }),
      this.prisma.reservation.findMany({
        where: {
          date: { gte: previousPeriodStart },
          status: { in: REVENUE_STATUSES },
        },
        select: {
          restaurantId: true,
          guestCount: true,
          date: true,
        },
      }),
      this.prisma.table.groupBy({
        by: ['restaurantId'],
        _count: { _all: true },
        where: { isActive: true },
      }),
    ]);

    const tableCountMap = new Map(
      totalTablesByRestaurant.map((entry) => [entry.restaurantId, entry._count._all]),
    );

    return restaurants
      .map((restaurant) => {
        const current = reservations.filter(
          (reservation) =>
            reservation.restaurantId === restaurant.id &&
            reservation.date >= currentPeriodStart,
        );
        const previous = reservations.filter(
          (reservation) =>
            reservation.restaurantId === restaurant.id &&
            reservation.date >= previousPeriodStart &&
            reservation.date < currentPeriodStart,
        );

        const revenue = current.reduce(
          (sum, reservation) => sum + reservation.guestCount * restaurant.averageSpend,
          0,
        );
        const tableCount = Math.max(tableCountMap.get(restaurant.id) ?? 1, 1);
        const occupancy = Math.min(
          98,
          Math.round((current.length / (tableCount * 30 * 2)) * 100),
        );
        const trend =
          previous.length === 0
            ? 0
            : Number((((current.length - previous.length) / previous.length) * 100).toFixed(1));

        return {
          name: restaurant.name,
          reservations: current.length,
          revenue,
          occupancy,
          trend,
        };
      })
      .sort((left, right) => right.reservations - left.reservations)
      .slice(0, 5);
  }
}
