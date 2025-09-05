import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  personalId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  roleId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  recursoId?: number;
}
