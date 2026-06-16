import { ReservationStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @IsString()
  restaurantId!: string;

  @IsOptional()
  @IsString()
  tableId?: string;

  @IsDateString()
  date!: string;

  @IsString()
  timeSlot!: string;

  @IsInt()
  @Min(1)
  guestCount!: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateReservationDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  timeSlot?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  guestCount?: number;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
