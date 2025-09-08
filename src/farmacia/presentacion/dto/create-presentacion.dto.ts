import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePresentacionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
