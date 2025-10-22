import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
