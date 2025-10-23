import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RequestUser } from 'src/auth/interface/type';
import { BlogQueryDto } from './dto/query.dto';
import { QueryPublicDto } from './dto/querypublic.dto';
import { RolesEnum } from 'src/auth/enum/roles';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @Auth()
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Req() req: RequestUser) {
    return this.blogService.create(createBlogDto, req.user.userId);
  }

  @Auth()
  @Get()
  findAll(@Query() query: BlogQueryDto) {
    return this.blogService.findAll(query);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Get('/public/published')
  findAllPublished(@Query() query: QueryPublicDto) {
    return this.blogService.findAllPublished(query);
  }
  @Get('/public/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }

  @Auth()
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Auth(RolesEnum.Administrador)
  @Patch('publish/:id')
  publish(@Param('id') id: string) {
    return this.blogService.publishBlog(+id);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
