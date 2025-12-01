import { IsNotEmpty, IsString } from 'class-validator';

export class MotivoDto {
  @IsString()
  @IsNotEmpty()
  razon: string;
}
