import { Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [totalReservations, todaysReservations, activeRestaurants, approved] =
      await Promise.all([
        this.prisma.reservation.count(),
        this.prisma.reservation.count({
          where: { date: { gte: today, lt: tomorrow } },
        }),
        this.prisma.restaurant.count({ where: { isActive: true } }),
        this.prisma.reservation.findMany({
          where: {
            status: {
              in: [ReservationStatus.APPROVED, ReservationStatus.COMPLETED],
            },
          },
          include: { restaurant: true },
        }),
      ]);

    const revenue = approved.reduce(
      (sum, reservation) =>
        sum + reservation.guestCount * reservation.restaurant.averageSpend,
      0,
    );

    return {
      totalReservations,
      todaysReservations,
      activeRestaurants,
      revenue,
      conversionRate: totalReservations
        ? Math.round((approved.length / totalReservations) * 100)
        : 0,
    };
  }

  async trends() {
    const start = new Date();
    start.setDate(start.getDate() - 13);
    start.setHours(0, 0, 0, 0);
    const reservations = await this.prisma.reservation.findMany({
      where: { date: { gte: start } },
      include: { restaurant: true },
      orderBy: { date: 'asc' },
    });

    return Array.from({ length: 14 }).map((_, index) => {
      const day = new Date(start);
      day.setDate(start.getDate() + index);
      const key = day.toISOString().slice(0, 10);
      const daily = reservations.filter(
        (reservation) => reservation.date.toISOString().slice(0, 10) === key,
      );
      return {
        date: key,
        reservations: daily.length,
        revenue: daily.reduce(
          (sum, reservation) =>
            sum + reservation.guestCount * reservation.restaurant.averageSpend,
          0,
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
      orderBy: { _count: { timeSlot: 'desc' } },
    });

    return reservations.map((item) => ({
      timeSlot: item.timeSlot,
      reservations: item._count.timeSlot,
    }));
  }
}
