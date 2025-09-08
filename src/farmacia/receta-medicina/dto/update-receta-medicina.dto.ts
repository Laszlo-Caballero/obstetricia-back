import { PartialType } from '@nestjs/mapped-types';
import { CreateRecetaMedicinaDto } from './create-receta-medicina.dto';

export class UpdateRecetaMedicinaDto extends PartialType(CreateRecetaMedicinaDto) {}
