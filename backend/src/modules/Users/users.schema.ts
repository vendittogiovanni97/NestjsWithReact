import { SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserDto } from '../schemas/use.schema';

export type UserDocument = HydratedDocument<UserDto>;
//Qua generiamo lo schema nel database
export const UserSchema = SchemaFactory.createForClass(UserDto);
