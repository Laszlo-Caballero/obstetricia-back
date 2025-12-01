import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiagnosticoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
