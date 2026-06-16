import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { UserRole } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UploadsService } from './uploads.service';

class PresignUploadDto {
  @IsString()
  filename!: string;

  @IsString()
  contentType!: string;
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/uploads')
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post('presign')
  presign(@Body() dto: PresignUploadDto) {
    return this.uploads.createPresignedUrl(dto.filename, dto.contentType);
  }
}
