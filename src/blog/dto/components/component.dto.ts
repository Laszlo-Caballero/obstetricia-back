import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ComponentType } from 'src/blog/interfaces/components';
import { TextDto } from './text/text.dto';
import { Type } from 'class-transformer';
import { ListDto } from './list/list.dto';
import { ImageDto } from './image/image.dto';

export class ComponentDto {
  @IsEnum(ComponentType)
  type: ComponentType;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TextDto)
  text?: TextDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ListDto)
  listItems?: ListDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  articles?: number[];
}
