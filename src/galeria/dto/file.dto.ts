import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class MoveFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_ ]*$/, {
    message: 'folder must not contain special characters or dots',
  })
  folder: string;
}
