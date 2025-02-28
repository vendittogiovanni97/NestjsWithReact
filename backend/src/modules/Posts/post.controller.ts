// posts.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PostDto } from '../schemas/posts.schema';
import { PostsService } from './post.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('user/:userId')
  create(
    @Param('userId') userId: string,
    @Body() createPostDto: Partial<PostDto>,
  ) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  findAllPost(): Promise<PostDto[]> {
    return this.postsService.findAllPost();
  }

  @Get(':id/with-author')
  findOneWithAuthor(@Param('id') id: string) {
    return this.postsService.findOneWithAuthor(id);
  }

  @Get('by-author/:userId')
  findByAuthor(@Param('userId') userId: string) {
    return this.postsService.findByAuthor(userId);
  }
}
