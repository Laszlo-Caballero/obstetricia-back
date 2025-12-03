import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class QueryPruebaLaboratorioDto {
  @IsNumber()
  @Type(() => Number)
  limit: number;

  @IsNumber()
  @Type(() => Number)
  page: number;
}
