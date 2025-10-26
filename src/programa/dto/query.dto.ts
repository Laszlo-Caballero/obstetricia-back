import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  searchByName?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  estado?: boolean;
}
