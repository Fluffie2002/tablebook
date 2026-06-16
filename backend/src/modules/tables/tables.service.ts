import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';

@Injectable()
export class TablesService {
  constructor(private readonly prisma: PrismaService) {}

  findByRestaurant(restaurantId: string) {
    return this.prisma.table.findMany({
      where: { restaurantId, isActive: true },
      orderBy: [{ capacity: 'asc' }, { label: 'asc' }],
    });
  }

  adminFindAll() {
    return this.prisma.table.findMany({
      include: { restaurant: { select: { name: true, city: true } } },
      orderBy: [{ restaurant: { name: 'asc' } }, { label: 'asc' }],
    });
  }

  create(dto: CreateTableDto) {
    return this.prisma.table.create({ data: dto });
  }

  update(id: string, dto: UpdateTableDto) {
    return this.prisma.table.update({ where: { id }, data: dto });
  }

  deactivate(id: string) {
    return this.prisma.table.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
