import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './entities/blog.entity';
import { Model } from 'mongoose';
import { parseSlug } from './utils/parseSlug';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
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

    const recurso = await this.recursoRepository.findOne({
      where: { recursoId: createBlogDto.imageId },
    });

    if (!recurso) {
      throw new HttpException('Recurso not found', HttpStatus.NOT_FOUND);
    }

    const slug = parseSlug(createBlogDto.title);

    const newBlog = await this.blogModel.create({
      ...createBlogDto,
      user,
      slug,
      image: recurso,
    });

    await newBlog.save();

    return {
      message: 'Blog created successfully',
      data: newBlog,
      status: HttpStatus.CREATED,
    };
  }

  async findAll() {
    return `This action returns all blog`;
  }

  async findOne(id: number) {
    const blog = await this.blogModel.findOne({
      where: { id },
      relations: ['user', 'image'],
    });

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Blog found successfully',
      data: blog,
      status: HttpStatus.OK,
    };
  }

  async findOneBySlug(slug: string) {
    const blog = await this.blogModel.findOne({
      slug,
    });

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Blog found successfully',
      data: blog,
      status: HttpStatus.OK,
    };
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
