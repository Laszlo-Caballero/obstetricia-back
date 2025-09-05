import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Gender } from '../enum/gender';

export class CreatePersonalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaNacimiento: Date;

  @IsEnum(Gender)
  sexo: string;

  @IsString()
  @MinLength(9)
  @MaxLength(9)
  telefono: string;

  @IsString()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @IsString()
  @IsNotEmpty()
  codigoColegio: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean = true;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  tipoPersonalId: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  turnoId: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  postaId: number;
}
