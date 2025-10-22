import { Module } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BlogCategory,
  BlogCategorySchema,
} from './entities/blog-category.entity';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogCategory.name,
        schema: BlogCategorySchema,
      },
    ]),
    RedisModule,
  ],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],
})
export class BlogCategoryModule {}
