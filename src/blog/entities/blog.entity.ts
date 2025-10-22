import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RecursoType } from 'src/recurso/interface/type';
import { ComponentProps } from '../interfaces/components';
import { User } from 'src/auth/interface/type';

@Schema({
  collection: 'blogs',
})
export class Blog {
  @Prop()
  blogId: number;

  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  legend: string;

  @Prop({
    type: Object,
  })
  image: RecursoType;

  @Prop({
    type: [Object],
  })
  components: ComponentProps[];

  @Prop({
    type: Object,
  })
  user: User;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.pre('save', async function (next) {
  const lastBlog = await this.model().findOne().sort({ blogId: -1 }).exec();

  if (!lastBlog) {
    this.blogId = 1;
  } else {
    this.blogId = lastBlog.blogId + 1;
  }

  next();
});
