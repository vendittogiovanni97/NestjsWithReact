import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
//Qui definiamo il nostro schema con classe che verrà creata nel database tramite module
@Schema()
export class UserDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({})
  hobbies: string[];

  // Relazione con i post dell'utente
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  posts: Types.ObjectId[];
}
