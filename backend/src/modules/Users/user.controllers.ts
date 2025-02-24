import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindParamasId } from 'src/modules/Users/dto/users.dto';

//qui utilizziamo i metodi creati nel service per le richieste http

@Controller('users')
// Tutte le rotte avranno il prefisso /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // qui sono i metodi get,post,put,delete
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<CreateUserDto[]> {
    return this.usersService.findAll();
  }

  @Get('email')
  findByEmail(@Query('email') email: string): Promise<CreateUserDto> {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param() params: FindParamasId): Promise<CreateUserDto> {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ): Promise<CreateUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
