import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class HighlightDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsBoolean()
  bold?: boolean;
}

export class TextDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsOptional()
  highlight?: HighlightDto;
}
