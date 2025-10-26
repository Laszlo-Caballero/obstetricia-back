import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  estado?: string;
}
