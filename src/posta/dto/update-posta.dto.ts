import { PartialType } from '@nestjs/mapped-types';
import { CreatePostaDto } from './create-posta.dto';

export class UpdatePostaDto extends PartialType(CreatePostaDto) {}
