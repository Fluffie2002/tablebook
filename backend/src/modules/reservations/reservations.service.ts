import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateReservationDto) {
    const date = this.normalizeDate(dto.date);
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id: dto.restaurantId, isActive: true },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }

    const table = dto.tableId
      ? await this.prisma.table.findFirst({
          where: {
            id: dto.tableId,
            restaurantId: dto.restaurantId,
            capacity: { gte: dto.guestCount },
            isActive: true,
          },
        })
      : await this.findAvailableTable(
          dto.restaurantId,
          date,
          dto.timeSlot,
          dto.guestCount,
        );

    if (!table) {
      throw new BadRequestException(
        'No table is available for that party size and time.',
      );
    }

    const existing = await this.prisma.reservation.findFirst({
      where: {
        restaurantId: dto.restaurantId,
        tableId: table.id,
        date,
        timeSlot: dto.timeSlot,
        status: { in: [ReservationStatus.PENDING, ReservationStatus.APPROVED] },
      },
    });

    if (existing) {
      throw new BadRequestException(
        'That table is already reserved for this time.',
      );
    }

    return this.prisma.reservation.create({
      data: {
        userId,
        restaurantId: dto.restaurantId,
        tableId: table.id,
        date,
        timeSlot: dto.timeSlot,
        guestCount: dto.guestCount,
        notes: dto.notes,
      },
      include: this.includeRelations(),
    });
  }

  findMine(userId: string) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: this.includeRelations(),
      orderBy: [{ date: 'desc' }, { timeSlot: 'desc' }],
    });
  }

  adminFindAll() {
    return this.prisma.reservation.findMany({
      include: this.includeRelations(),
      orderBy: [{ date: 'desc' }, { timeSlot: 'desc' }],
    });
  }

  cancel(userId: string, id: string) {
    return this.prisma.reservation.update({
      where: { id, userId },
      data: { status: ReservationStatus.CANCELLED, cancelledAt: new Date() },
      include: this.includeRelations(),
    });
  }

  approve(id: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: ReservationStatus.APPROVED },
      include: this.includeRelations(),
    });
  }

  reject(id: string) {
    return this.prisma.reservation.update({
      where: { id },
      data: { status: ReservationStatus.REJECTED },
      include: this.includeRelations(),
    });
  }

  update(id: string, dto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? this.normalizeDate(dto.date) : undefined,
      },
      include: this.includeRelations(),
    });
  }

  private async findAvailableTable(
    restaurantId: string,
    date: Date,
    timeSlot: string,
    guestCount: number,
  ) {
    const tables = await this.prisma.table.findMany({
      where: { restaurantId, capacity: { gte: guestCount }, isActive: true },
      orderBy: { capacity: 'asc' },
    });

    for (const table of tables) {
      const existing = await this.prisma.reservation.findFirst({
        where: {
          restaurantId,
          tableId: table.id,
          date,
          timeSlot,
          status: {
            in: [ReservationStatus.PENDING, ReservationStatus.APPROVED],
          },
        },
      });

      if (!existing) {
        return table;
      }
    }

    return null;
  }

  private normalizeDate(value: string) {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  private includeRelations() {
    return {
      user: { select: { id: true, name: true, email: true } },
      restaurant: {
        select: {
          id: true,
          name: true,
          slug: true,
          city: true,
          averageSpend: true,
        },
      },
      table: { select: { id: true, label: true, capacity: true } },
    };
  }
}
