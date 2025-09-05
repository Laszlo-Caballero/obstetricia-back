import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPersonalDto } from './create-tipo-personal.dto';

export class UpdateTipoPersonalDto extends PartialType(CreateTipoPersonalDto) {}
