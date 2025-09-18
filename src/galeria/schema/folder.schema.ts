import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum } from 'src/auth/enum/roles';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'folders',
})
export class Folder {
  @Prop({
    default: uuidv4(),
  })
  folderId: string;

  @Prop()
  name: string;

  @Prop({ enum: RolesEnum, type: [String] })
  role: RolesEnum[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
