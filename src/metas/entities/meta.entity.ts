import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MetaDocument = HydratedDocument<Meta>;

@Schema({ collection: 'metas', timestamps: true })
export class Meta {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true, default: 'Activo' })
  estado: string;
}

export const MetaSchema = SchemaFactory.createForClass(Meta);
