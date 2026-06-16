import { BadRequestException } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  it('rejects double bookings for the same table and time slot', async () => {
    const prisma = {
      restaurant: {
        findFirst: jest
          .fn()
          .mockResolvedValue({ id: 'restaurant-1', isActive: true }),
      },
      table: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'table-1',
          restaurantId: 'restaurant-1',
          capacity: 4,
          isActive: true,
        }),
      },
      reservation: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'existing',
          status: ReservationStatus.APPROVED,
        }),
        create: jest.fn(),
      },
    };
    const service = new ReservationsService(prisma as never);

    await expect(
      service.create('user-1', {
        restaurantId: 'restaurant-1',
        tableId: 'table-1',
        date: '2026-06-15',
        timeSlot: '19:00',
        guestCount: 2,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
