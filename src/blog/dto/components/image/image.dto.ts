import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ImageDto {
  @IsNumber()
  recursoId: number;

  @IsString()
  nombre: string;

  @IsString()
  extension: string;

  @IsString()
  url: string;

  @IsDate()
  @Type(() => Date)
  fechaSubida: Date;
}
