import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProgramaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
