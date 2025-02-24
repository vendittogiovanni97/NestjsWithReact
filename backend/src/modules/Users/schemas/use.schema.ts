import { Prop, Schema } from '@nestjs/mongoose';
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
}
