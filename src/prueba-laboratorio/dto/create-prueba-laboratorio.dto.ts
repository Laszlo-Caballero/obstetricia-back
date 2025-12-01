import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePruebaLaboratorioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  recursoId?: number;
}
