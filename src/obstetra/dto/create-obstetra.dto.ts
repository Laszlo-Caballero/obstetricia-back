import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateObstetraDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty()
  apellido_materno: string;

  @IsString()
  @IsNotEmpty()
  cop: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsNumber()
  @IsPositive()
  programaId: number;
  @IsNumber()
  @IsPositive()
  postaId: number;
}
