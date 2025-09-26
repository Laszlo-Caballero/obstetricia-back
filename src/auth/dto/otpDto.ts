import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class OtpDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  code_otp: string;
}
