import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusType } from '../interfaces/components';
import { Type } from 'class-transformer';

export class BlogQueryDto {
  @IsNumber()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsString()
  @IsOptional()
  categorySlug: string;

  @IsString()
  @IsOptional()
  search: string;

  @IsEnum(StatusType)
  @IsOptional()
  status: StatusType;
}
