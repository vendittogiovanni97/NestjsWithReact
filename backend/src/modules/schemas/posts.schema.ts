import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDto } from './use.schema';

export type PostDocument = HydratedDocument<PostDto>;

@Schema({ timestamps: true })
export class PostDto {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: UserDto.name, required: true })
  author: UserDto | Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(PostDto);
