import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDto } from './schemas/use.schema';
import { UserSchema } from './users.schema';
import { UsersController } from './user.controllers';
import { UsersService } from './users.service';

@Module({
  imports: [
    //registra il modello
    MongooseModule.forFeature([{ name: UserDto.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
