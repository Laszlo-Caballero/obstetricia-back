import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto, userId: number) {
    const user = await this.authRepository.findOne({
      where: { userId },
      relations: ['personal', 'recurso'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newBlog = await this.blogModel.create({
      ...createBlogDto,
      user,
    });

    await newBlog.save();

    return {
      message: 'Blog created successfully',
      data: newBlog,
      status: HttpStatus.CREATED,
    };
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  findOneBySlug(slug: string) {
    return `This action returns a blog with slug ${slug}`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
