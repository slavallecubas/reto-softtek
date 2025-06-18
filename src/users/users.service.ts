import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.newOne(
      User.nuevaInstanciaFromDTO(createUserDto),
    );
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async getOneByEmail(email: string) {
    return await this.userRepository.getOneByEmail(email);
  }

  async getOneById(userId: string) {
    return await this.userRepository.getOneById(userId);
  }
}
