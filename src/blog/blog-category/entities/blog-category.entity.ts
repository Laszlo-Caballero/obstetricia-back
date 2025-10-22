import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'blog_categories',
})
export class BlogCategory {
  @Prop()
  blogCategoryId: number;

  @Prop()
  name: string;
}

export const BlogCategorySchema = SchemaFactory.createForClass(BlogCategory);

BlogCategorySchema.pre('save', async function (next) {
  const lastCategory = await this.model()
    .findOne()
    .sort({ blogCategoryId: -1 });
  this.blogCategoryId = lastCategory ? lastCategory.blogCategoryId + 1 : 1;
  next();
});
