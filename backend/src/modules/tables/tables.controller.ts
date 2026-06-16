import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateTableDto, UpdateTableDto } from './dto/table.dto';
import { TablesService } from './tables.service';

@Controller()
export class TablesController {
  constructor(private readonly tables: TablesService) {}

  @Get('restaurants/:id/tables')
  findByRestaurant(@Param('id') restaurantId: string) {
    return this.tables.findByRestaurant(restaurantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/tables')
  adminFindAll() {
    return this.tables.adminFindAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/tables')
  create(@Body() dto: CreateTableDto) {
    return this.tables.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/tables/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTableDto) {
    return this.tables.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/tables/:id')
  deactivate(@Param('id') id: string) {
    return this.tables.deactivate(id);
  }
}
