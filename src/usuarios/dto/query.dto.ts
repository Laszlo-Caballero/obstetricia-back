import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page: number;
}
