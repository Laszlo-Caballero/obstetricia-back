import { Type } from 'class-transformer';
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePostaDto {
  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  ipress: string;

  @IsLatitude()
  lat: string;

  @IsLongitude()
  lng: string;

  @IsString()
  @IsNotEmpty()
  altitud: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaInicioActividad: Date;

  @IsNumber()
  @IsNotEmpty()
  capacidad: number;

  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @IsNumber()
  @IsNotEmpty()
  provinciaId: number;

  @IsNumber()
  @IsNotEmpty()
  distritoId: number;
}
