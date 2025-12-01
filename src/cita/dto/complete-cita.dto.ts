import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { CreateDiagnosticoDto } from 'src/diagnostico/dto/create-diagnostico.dto';
import { CreateRecetaDto } from 'src/farmacia/receta/dto/create-receta.dto';
import { CreatePruebaLaboratorioDto } from 'src/prueba-laboratorio/dto/create-prueba-laboratorio.dto';

export class CompleteCitaDto {
  @Type(() => CreateRecetaDto)
  @ValidateNested()
  @IsNotEmpty()
  receta: CreateRecetaDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateDiagnosticoDto)
  @IsNotEmpty({ each: true })
  diagnosticos: CreateDiagnosticoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePruebaLaboratorioDto)
  laboratorios: CreatePruebaLaboratorioDto[];
}
