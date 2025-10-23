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
import { BlogCategory } from './blog-category/entities/blog-category.entity';
import { BlogQueryDto } from './dto/query.dto';
import { QueryPublicDto } from './dto/querypublic.dto';
import { StatusType } from './interfaces/components';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Recurso)
    private recursoRepository: Repository<Recurso>,
    @InjectModel(Blog.name)
    private blogModel: Model<Blog>,
    @InjectModel(BlogCategory.name)
    private blogCategoryModel: Model<BlogCategory>,
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

    const categories = await this.blogCategoryModel.find({
      blogCategoryId: { $in: createBlogDto.categoryIds },
    });

    if (categories.length !== createBlogDto.categoryIds.length) {
      throw new HttpException(
        'One or more categories not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const slug = parseSlug(createBlogDto.title);

    const newBlog = await this.blogModel.create({
      ...createBlogDto,
      user,
      slug,
      image: recurso,
      category: categories,
    });

    await newBlog.save();

    return {
      message: 'Blog created successfully',
      data: newBlog,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(query: BlogQueryDto) {
    const filter = {
      ...(query?.categorySlug && {
        category: { $elemMatch: { slug: query.categorySlug } },
      }),
      ...(query?.search && { title: { $regex: query.search, $options: 'i' } }),
      ...(query?.status && { status: query.status }),
    };

    const countBlog = await this.blogModel.countDocuments(filter);

    const blogs = await this.blogModel
      .find(filter)
      .skip((query?.page - 1) * query?.limit)
      .limit(query?.limit)
      .exec();

    return {
      message: 'Blogs found successfully',
      data: blogs,
      metadata: {
        totalItems: countBlog,
        totalPages: Math.ceil(countBlog / query?.limit),
        currentPage: query?.page,
      },
      status: HttpStatus.OK,
    };
  }

  async findAllPublished(query: QueryPublicDto) {
    const filter = {
      status: 'PUBLISHED',
      ...(query?.categorySlug && {
        category: { $elemMatch: { slug: query.categorySlug } },
      }),
      ...(query?.search && { title: { $regex: query.search, $options: 'i' } }),
    };

    const countBlog = await this.blogModel.countDocuments(filter);

    const blogs = await this.blogModel
      .find(filter)
      .skip((query?.page - 1) * query?.limit)
      .limit(query?.limit)
      .exec();

    return {
      message: 'Blogs found successfully',
      data: {
        blogs,
        total: countBlog,
        totalPages: Math.ceil(countBlog / query?.limit),
        page: query?.page,
      },
      status: HttpStatus.OK,
    };
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

  async publishBlog(id: number) {
    const blog = await this.blogModel.findOne({ blogId: id });

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    await blog.updateOne({ status: StatusType.PUBLISHED });

    return {
      message: 'Blog published successfully',
      data: null,
      status: HttpStatus.OK,
    };
  }

  //TODO: Implement update and remove methods
  update(id: number, updateBlogDto: UpdateBlogDto) {
    console.log(updateBlogDto);

    return `This action updates a #${id} blog`;
  }
  //TODO: Implement update and remove methods
  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
