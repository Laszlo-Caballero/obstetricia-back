import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BlogCategory } from './entities/blog-category.entity';
import { Model } from 'mongoose';
import { RedisService } from 'src/redis/redis.service';
import { parseSlug } from '../utils/parseSlug';

@Injectable()
export class BlogCategoryService {
  private readonly redisKey = 'blogCategories';

  constructor(
    @InjectModel(BlogCategory.name)
    private blogCategoryModel: Model<BlogCategory>,
    private readonly redisService: RedisService,
  ) {}

  async create(createBlogCategoryDto: CreateBlogCategoryDto) {
    const slug = parseSlug(createBlogCategoryDto.name);

    const createdCategory = await this.blogCategoryModel.create({
      ...createBlogCategoryDto,
      slug,
    });

    await createdCategory.save();

    const allCategories = await this.blogCategoryModel.find();

    await this.redisService.set(this.redisKey, allCategories);

    return {
      message: 'Blog category created successfully',
      data: createdCategory,
      status: 201,
    };
  }

  async findAll() {
    const cachedCategories = await this.redisService.get<BlogCategory[]>(
      this.redisKey,
    );

    if (cachedCategories) {
      return {
        message: 'Blog categories retrieved successfully (from cache)',
        data: cachedCategories,
        status: 200,
      };
    }

    const categories = await this.blogCategoryModel.find();

    await this.redisService.set(this.redisKey, categories);

    return {
      message: 'Blog categories retrieved successfully',
      data: categories,
      status: 200,
    };
  }

  async findOne(id: number) {
    const category = await this.blogCategoryModel.findOne({
      blogCategoryId: id,
    });

    if (!category) {
      throw new HttpException('Blog category not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Blog category retrieved successfully',
      data: category,
      status: 200,
    };
  }

  async update(id: number, updateBlogCategoryDto: UpdateBlogCategoryDto) {
    const findCategory = await this.blogCategoryModel.findOne({
      blogCategoryId: id,
    });

    if (!findCategory) {
      throw new HttpException('Blog category not found', HttpStatus.NOT_FOUND);
    }

    const slug = parseSlug(updateBlogCategoryDto.name || findCategory.name);

    const update = await this.blogCategoryModel.updateOne(
      { blogCategoryId: id },
      {
        $set: {
          ...updateBlogCategoryDto,
          slug,
          blogCategoryId: id,
        },
      },
    );

    const allCategories = await this.blogCategoryModel.find();

    await this.redisService.set(this.redisKey, allCategories);

    return {
      message: 'Blog category updated successfully',
      data: update,
      status: 200,
    };
  }

  async remove(id: number) {
    const findCategory = await this.blogCategoryModel.findOne({
      blogCategoryId: id,
    });

    if (!findCategory) {
      throw new HttpException('Blog category not found', HttpStatus.NOT_FOUND);
    }

    await this.blogCategoryModel.deleteOne({ blogCategoryId: id });

    const allCategories = await this.blogCategoryModel.find();

    await this.redisService.set(this.redisKey, allCategories);

    return {
      message: 'Blog category removed successfully',
      data: findCategory,
      status: 200,
    };
  }
}
