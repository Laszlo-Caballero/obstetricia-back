import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RolesEnum } from 'src/auth/enum/roles';

export class CreateFolderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @ArrayMinSize(1)
  role: RolesEnum[];
}
