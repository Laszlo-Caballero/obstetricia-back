import { PartialType } from '@nestjs/mapped-types';
import { CreateObstetraDto } from './create-obstetra.dto';

export class UpdateObstetraDto extends PartialType(CreateObstetraDto) {}
