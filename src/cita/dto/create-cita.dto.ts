import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCitaDto {
  @IsNumber()
  @IsPositive()
  pacienteId: number;

  @IsNumber()
  @IsPositive()
  personalId: number;

  @IsNumber()
  @IsPositive()
  programaId: number;

  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsNumber()
  @IsPositive()
  turnoId: number;

  @IsString()
  @IsOptional()
  nota?: string;
}
