import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateTipoPersonalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  @IsOptional()
  estado?: boolean = true;
}
