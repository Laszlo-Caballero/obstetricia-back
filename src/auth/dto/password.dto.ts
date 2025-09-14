import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  previousPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
