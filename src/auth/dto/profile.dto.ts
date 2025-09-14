import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/personal/enum/gender';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaNacimiento: Date;

  @IsEnum(Gender)
  sexo: string;

  @IsString()
  @MinLength(9)
  @MaxLength(9)
  telefono: string;

  @IsString()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @IsString()
  @IsNotEmpty()
  codigoColegio: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsOptional()
  nota: string;
}
