import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'documentacion',
})
export class Documentacion {
  @Prop({
    type: Number,
  })
  version: number;

  @Prop({
    type: Object,
  })
  resource: {
    recursoId: number;
    nombre: string;
    extension: string;
    url: string;
    fechaSubida: Date;
  };

  @Prop({
    type: Object,
  })
  user: {
    userId: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  };
}

export const DocumentacionSchema = SchemaFactory.createForClass(Documentacion);
