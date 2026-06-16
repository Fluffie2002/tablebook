import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from './dto/reservation.dto';
import { ReservationsService } from './reservations.service';

@Controller()
export class ReservationsController {
  constructor(private readonly reservations: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('reservations')
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateReservationDto) {
    return this.reservations.create(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reservations/me')
  findMine(@CurrentUser() user: AuthUser) {
    return this.reservations.findMine(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reservations/:id/cancel')
  cancel(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.reservations.cancel(user.sub, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/reservations')
  adminFindAll() {
    return this.reservations.adminFindAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/reservations/:id/approve')
  approve(@Param('id') id: string) {
    return this.reservations.approve(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/reservations/:id/reject')
  reject(@Param('id') id: string) {
    return this.reservations.reject(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/reservations/:id')
  update(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.reservations.update(id, dto);
  }
}
