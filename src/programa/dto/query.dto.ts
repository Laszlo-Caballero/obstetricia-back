import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  page: number = 1;

  @IsString()
  @IsOptional()
  search?: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
