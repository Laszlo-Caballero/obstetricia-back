import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMetaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  area: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
