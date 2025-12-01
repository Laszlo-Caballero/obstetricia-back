import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecetaMedicinaDto {
  @IsString()
  @IsNotEmpty()
  dosis: string;

  @IsString()
  @IsNotEmpty()
  indicacion: string;

  @IsNumber()
  @IsNotEmpty()
  medicinaId: number;
}
