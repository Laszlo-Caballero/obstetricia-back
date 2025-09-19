import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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
  @IsPositive()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stockMinimo: number;

  @IsString()
  @IsNotEmpty()
  dosis: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  unidades: number;

  @IsBoolean()
  @IsNotEmpty()
  necesitaReceta: boolean;

  @IsBoolean()
  @IsOptional()
  estado: boolean;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  categoriaId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  presentacionId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  recursoId: number;
}
