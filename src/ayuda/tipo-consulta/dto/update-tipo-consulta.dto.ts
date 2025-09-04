import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoConsultaDto } from './create-tipo-consulta.dto';

export class UpdateTipoConsultaDto extends PartialType(CreateTipoConsultaDto) {}
