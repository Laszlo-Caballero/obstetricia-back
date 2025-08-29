import { IsNotEmpty, IsString } from 'class-validator';

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
}
