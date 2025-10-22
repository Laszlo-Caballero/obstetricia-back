import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Recurso } from 'src/recurso/entities/recurso.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
    TypeOrmModule.forFeature([Auth, Recurso]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
