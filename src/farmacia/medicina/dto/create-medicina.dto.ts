import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMedicinaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;

  @IsNumber()
  @IsNotEmpty()
  presentacionId: number;
}
