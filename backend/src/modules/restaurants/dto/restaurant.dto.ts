import { PriceRange } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class RestaurantQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  cuisine?: string;
}

export class CreateRestaurantDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsString()
  description!: string;

  @IsString()
  cuisine!: string;

  @IsString()
  city!: string;

  @IsString()
  address!: string;

  @IsString()
  heroImageUrl!: string;

  @IsEnum(PriceRange)
  priceRange!: PriceRange;

  @IsString()
  openingTime!: string;

  @IsString()
  closingTime!: string;

  @IsNumber()
  @Min(1)
  averageSpend!: number;
}

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cuisine?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  heroImageUrl?: string;

  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @IsOptional()
  @IsString()
  openingTime?: string;

  @IsOptional()
  @IsString()
  closingTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  averageSpend?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
