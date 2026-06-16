import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  CreateRestaurantDto,
  RestaurantQueryDto,
  UpdateRestaurantDto,
} from './dto/restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller()
export class RestaurantsController {
  constructor(private readonly restaurants: RestaurantsService) {}

  @Get('restaurants')
  findAll(@Query() query: RestaurantQueryDto) {
    return this.restaurants.findAll(query);
  }

  @Get('restaurants/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.restaurants.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/restaurants')
  adminFindAll() {
    return this.restaurants.adminFindAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/restaurants')
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurants.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/restaurants/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRestaurantDto) {
    return this.restaurants.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/restaurants/:id')
  deactivate(@Param('id') id: string) {
    return this.restaurants.deactivate(id);
  }
}
