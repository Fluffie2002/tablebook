import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { DashboardService } from './dashboard.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/dashboard')
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('overview')
  overview() {
    return this.dashboard.overview();
  }

  @Get('trends')
  trends() {
    return this.dashboard.trends();
  }

  @Get('recent-reservations')
  recentReservations() {
    return this.dashboard.recentReservations();
  }

  @Get('popular-times')
  popularTimes() {
    return this.dashboard.popularTimes();
  }

  @Get('heatmap')
  heatmap() {
    return this.dashboard.heatmap();
  }

  @Get('restaurant-performance')
  restaurantPerformance() {
    return this.dashboard.restaurantPerformance();
  }
}
