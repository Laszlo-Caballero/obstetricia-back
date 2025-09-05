import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTurnoDto {
  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean = true;
}
