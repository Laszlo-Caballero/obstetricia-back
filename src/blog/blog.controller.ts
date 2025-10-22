import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RequestUser } from 'src/auth/interface/type';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Auth()
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: RequestUser) {
    return this.blogService.create(createBlogDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
