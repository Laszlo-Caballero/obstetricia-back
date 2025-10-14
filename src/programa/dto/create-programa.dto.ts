import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProgramaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  estado: boolean = true;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  cupoMaximo: number;

  @IsBoolean()
  @IsNotEmpty()
  deribacion: boolean;

  @IsNumber()
  @IsNotEmpty()
  responsableId: number;
}
