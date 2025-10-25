import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  apellido_materno: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha_nacimiento: Date;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  distrito: string;

  @IsString()
  @MinLength(9)
  @MaxLength(9)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsString()
  @IsOptional()
  nota: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean = true;
}
