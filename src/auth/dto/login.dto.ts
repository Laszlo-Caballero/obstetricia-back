import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsPositive()
  postaId: number;
}
