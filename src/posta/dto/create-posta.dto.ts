import { IsLatLong, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsLatLong()
  lat: number;

  @IsNumber()
  @IsLatLong()
  lng: number;
}
