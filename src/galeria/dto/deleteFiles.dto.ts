import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFilesDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
