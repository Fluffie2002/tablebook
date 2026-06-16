import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateRestaurantDto,
  RestaurantQueryDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: RestaurantQueryDto) {
    const where: Prisma.RestaurantWhereInput = {
      isActive: true,
      ...(query.city
        ? { city: { contains: query.city, mode: 'insensitive' } }
        : {}),
      ...(query.cuisine
        ? { cuisine: { contains: query.cuisine, mode: 'insensitive' } }
        : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: 'insensitive' } },
              { cuisine: { contains: query.search, mode: 'insensitive' } },
              { city: { contains: query.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    return this.prisma.restaurant.findMany({
      where,
      include: {
        tables: { where: { isActive: true }, orderBy: { capacity: 'asc' } },
      },
      orderBy: [{ rating: 'desc' }, { name: 'asc' }],
    });
  }

  async findBySlug(slug: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { slug },
      include: {
        tables: { where: { isActive: true }, orderBy: { capacity: 'asc' } },
      },
    });

    if (!restaurant || !restaurant.isActive) {
      throw new NotFoundException('Restaurant not found.');
    }

    return restaurant;
  }

  adminFindAll() {
    return this.prisma.restaurant.findMany({
      include: { tables: true, _count: { select: { reservations: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({ data: dto });
  }

  update(id: string, dto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({ where: { id }, data: dto });
  }

  deactivate(id: string) {
    return this.prisma.restaurant.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
