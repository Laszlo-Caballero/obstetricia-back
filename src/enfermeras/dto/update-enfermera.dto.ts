import { PartialType } from '@nestjs/mapped-types';
import { CreateEnfermeraDto } from './create-enfermera.dto';

export class UpdateEnfermeraDto extends PartialType(CreateEnfermeraDto) {}
