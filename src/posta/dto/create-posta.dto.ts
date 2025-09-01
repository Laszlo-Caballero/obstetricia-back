import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePostaDto {
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

  @IsNumber()
  @IsNotEmpty()
  capacidad: number;

  @IsNumber()
  @IsNotEmpty()
  regionId: number;
}
