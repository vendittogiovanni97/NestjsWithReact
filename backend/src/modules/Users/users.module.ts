import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDto } from '../schemas/use.schema';
import { UserSchema } from './users.schema';
import { UsersController } from './user.controllers';
import { UsersService } from './users.service';
import { PostDto, PostSchema } from '../schemas/posts.schema';
import { PostsController } from '../Posts/post.controller';
import { PostsService } from '../Posts/post.service';

@Module({
  imports: [
    //registra il modello
    MongooseModule.forFeature([
      { name: UserDto.name, schema: UserSchema },
      { name: PostDto.name, schema: PostSchema },
    ]),
  ],
  controllers: [UsersController, PostsController],
  providers: [UsersService, PostsService],
})
export class UsersModule {}
