import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostDocument, PostDto } from '../schemas/posts.schema';
import { UserDto } from '../schemas/use.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostDto.name) private postModel: Model<PostDocument>,
    @InjectModel(UserDto.name) private userModel: Model<UserDto>,
  ) {}

  // Crea un nuovo post e lo associa all'utente
  async create(
    userId: string,
    createPostDto: Partial<PostDto>,
  ): Promise<PostDto> {
    // Creiamo il nuovo post
    const newPost = new this.postModel({
      ...createPostDto,
      author: new Types.ObjectId(userId),
    });
    const savedPost = await newPost.save();

    // Aggiorniamo l'array dei post dell'utente
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { posts: savedPost._id },
    });

    return savedPost;
  }

  async findAllPost(): Promise<PostDto[]> {
    return this.postModel.find().exec();
  }

  // Trova un post con i dettagli dell'autore
  async findOneWithAuthor(postId: string): Promise<PostDto> {
    const post = await this.postModel
      .findById(postId)
      .populate('author', 'name email') // Specifichiamo i campi che vogliamo dell'autore
      .exec();

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    return post;
  }

  // Trova tutti i post di un utente specifico
  async findByAuthor(userId: string): Promise<PostDto[]> {
    return this.postModel.find({ author: new Types.ObjectId(userId) }).exec();
  }
}
