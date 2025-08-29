import { PartialType } from '@nestjs/mapped-types';
import { CreatePruebaLaboratorioDto } from './create-prueba-laboratorio.dto';

export class UpdatePruebaLaboratorioDto extends PartialType(CreatePruebaLaboratorioDto) {}
