import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newObj = await this.usersService.create(createUserDto);

    if (newObj) {
      return {
        message: `Usuario creado con éxito`,
        user: newObj,
      };
    }
  }

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();
    return {
      total: data.length,
      all: data,
    };
  }
}
