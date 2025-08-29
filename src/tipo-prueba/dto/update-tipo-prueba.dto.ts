import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoPruebaDto } from './create-tipo-prueba.dto';

export class UpdateTipoPruebaDto extends PartialType(CreateTipoPruebaDto) {}
