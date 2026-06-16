import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateTableDto {
  @IsString()
  restaurantId!: string;

  @IsString()
  label!: string;

  @IsInt()
  @Min(1)
  capacity!: number;
}

export class UpdateTableDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
