import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicinaDto } from './create-medicina.dto';

export class UpdateMedicinaDto extends PartialType(CreateMedicinaDto) {}
